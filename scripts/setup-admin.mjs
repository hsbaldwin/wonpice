import { randomBytes, scryptSync } from 'node:crypto';
import { stdin, stdout } from 'node:process';

if (!stdin.isTTY || !stdin.setRawMode) {
  process.stderr.write(
    '대화형 터미널에서 npm run admin:setup을 실행하세요. 비밀번호는 명령행 인자로 받지 않습니다.\n',
  );
  process.exit(1);
}
function secretInput(label) {
  return new Promise((resolve, reject) => {
    stdout.write(label);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    let answer = '';
    const handler = (chunk) => {
      for (const char of chunk) {
        if (char === '\u0003') {
          cleanup();
          reject(new Error('취소됨'));
          return;
        }
        if (char === '\r' || char === '\n') {
          cleanup();
          resolve(answer);
          return;
        }
        if (char === '\u007f') {
          answer = answer.slice(0, -1);
          continue;
        }
        if (char >= ' ') answer += char;
      }
    };
    function cleanup() {
      stdin.off('data', handler);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write('\n');
    }
    stdin.on('data', handler);
  });
}
try {
  const password = await secretInput('관리자 비밀번호 (12자 이상, 화면에 표시되지 않음): ');
  if (password.length < 12 || password.length > 1024)
    throw new Error('비밀번호는 12~1024자로 설정하세요.');
  const again = await secretInput('비밀번호 확인: ');
  if (password !== again) throw new Error('비밀번호가 일치하지 않습니다.');
  const salt = randomBytes(32);
  const hash = `scrypt$${salt.toString('hex')}$${scryptSync(password, salt, 64).toString('hex')}`;
  // Escape dollar signs for Next.js dotenv expansion. Keep both values server-only.
  stdout.write(
    '\n아래 두 줄을 .env.local에 저장하고 서버를 재시작하세요. 출력값도 비밀로 보관하세요.\n\n',
  );
  stdout.write(
    `ADMIN_PASSWORD_HASH=${hash.replaceAll('$', '\\$')}\nADMIN_SESSION_SECRET=${randomBytes(48).toString('hex')}\n`,
  );
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}

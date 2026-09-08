import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomBytes, randomUUID, scryptSync } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';

const enabled = process.env.ADMIN_HTTP_FIXTURE === 'true';

/** Opt-in: uses an existing production build and owns only its newly spawned loopback process. */
test(
  'production HTTP admin authentication, CSV access and standalone content tracing',
  { skip: !enabled, timeout: 45_000 },
  async (t) => {
    const port = Number(process.env.ADMIN_HTTP_PORT || '3004');
    assert.ok(
      Number.isInteger(port) && port >= 1024 && port <= 65535,
      'Valid fixture port required',
    );
    const origin = `http://127.0.0.1:${port}`;
    const standalone = resolve('.next/standalone');
    assert.ok(
      existsSync(join(standalone, 'server.js')),
      'Run npm run build before HTTP fixture tests',
    );
    // NEXT_PUBLIC_* is frozen by the build. Simulate the public Origin arriving at a separate proxy/backend port.
    const canonical = readFileSync(resolve('.next/server/app/index.html'), 'utf8').match(
      /rel="canonical" href="([^"]+)"/,
    )?.[1];
    assert.ok(canonical, 'Production build must include its canonical origin');
    const publicOrigin = new URL(canonical).origin;
    const directory = mkdtempSync(join(tmpdir(), 'masters-admin-http-'));
    const password = randomBytes(24).toString('base64url');
    const salt = randomBytes(32);
    const hash = `scrypt$${salt.toString('hex')}$${scryptSync(password, salt, 64).toString('hex')}`;
    // Generated test credentials exist only in memory / this child environment, never .env.local.
    const child = spawn(process.execPath, ['server.js'], {
      cwd: standalone,
      env: {
        ...process.env,
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: String(port),
        NEXT_PUBLIC_SITE_URL: publicOrigin,
        ADMIN_PASSWORD_HASH: hash,
        ADMIN_SESSION_SECRET: randomBytes(48).toString('hex'),
        DATABASE_PATH: join(directory, 'analytics.sqlite'),
        TRUST_PROXY: 'false',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    child.stdout.on('data', (chunk) => {
      output += String(chunk);
    });
    child.stderr.on('data', (chunk) => {
      output += String(chunk);
    });
    let spawnFailure: Error | undefined;
    child.on('error', (error) => {
      spawnFailure = error;
    });
    const childExited = new Promise<void>((resolveExit) =>
      child.once('close', () => resolveExit()),
    );
    const pause = (ms: number) => new Promise((resolvePause) => setTimeout(resolvePause, ms));
    const post = (path: string, body: string, cookie?: string, originHeader = publicOrigin) =>
      fetch(`${origin}${path}`, {
        method: 'POST',
        redirect: 'manual',
        headers: {
          Origin: originHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body,
      });
    try {
      let ready = false;
      for (let attempt = 0; attempt < 80; attempt++) {
        if (spawnFailure) throw spawnFailure;
        if (child.exitCode !== null)
          throw new Error(`Fixture exited before startup: ${output.slice(-1200)}`);
        // Readiness requires this child to report startup so we cannot accidentally test an existing service.
        if (/Ready in/.test(output)) {
          try {
            ready = (await fetch(`${origin}/admin/login`, { redirect: 'manual' })).status === 200;
          } catch {
            /* Wait for own listener. */
          }
        }
        if (ready) break;
        await pause(150);
      }
      assert.ok(ready, `Own fixture did not become ready: ${output.slice(-1200)}`);

      await t.test('standalone includes each trusted Markdown file with original content', () => {
        const names = readdirSync(resolve('content/posts')).filter((name) => name.endsWith('.md'));
        assert.ok(names.length > 0, 'The content directory must contain at least one post');
        for (const name of names) {
          const traced = join(standalone, 'content/posts', name);
          assert.ok(existsSync(traced), `Missing traced content: ${name}`);
          assert.equal(
            readFileSync(traced, 'utf8'),
            readFileSync(resolve('content/posts', name), 'utf8'),
          );
        }
        const trace = JSON.parse(
          readFileSync(resolve('.next/server/app/api/events/route.js.nft.json'), 'utf8'),
        ) as { files: string[] };
        for (const name of names)
          assert.ok(
            trace.files.some((file) => file.endsWith(`/content/posts/${name}`)),
            `Events API trace missing ${name}`,
          );
      });

      await t.test(
        'unauthenticated dashboard and CSV remain private and not indexable',
        async () => {
          const dashboard = await fetch(`${origin}/admin`, { redirect: 'manual' });
          assert.equal(dashboard.status, 307);
          assert.match(dashboard.headers.get('location') || '', /\/admin\/login$/);
          assert.match(dashboard.headers.get('cache-control') || '', /no-store/);
          assert.match(dashboard.headers.get('x-robots-tag') || '', /noindex/);
          const csv = await fetch(`${origin}/api/admin/export`);
          assert.equal(csv.status, 401);
          assert.match(csv.headers.get('cache-control') || '', /no-store/);
          assert.match(csv.headers.get('x-robots-tag') || '', /noindex/);
          const login = await fetch(`${origin}/admin/login`);
          const html = await login.text();
          assert.match(html, /관리자 비밀번호/);
          assert.doesNotMatch(html, /관리자 접근이 잠겨 있습니다/);
          assert.match(html, /name="robots" content="noindex, nofollow"/);
        },
      );

      let cookie = '';
      await t.test(
        'cross-origin and invalid login fail, successful login sets secure session attributes',
        async () => {
          const body = new URLSearchParams({ password }).toString();
          assert.equal(
            (await post('/api/admin/login', body, undefined, 'https://external.invalid')).status,
            403,
          );
          const wrong = await post(
            '/api/admin/login',
            new URLSearchParams({ password: 'wrong-password' }).toString(),
          );
          assert.equal(wrong.status, 303);
          assert.match(wrong.headers.get('location') || '', /\/admin\/login\?error=1$/);
          assert.equal(wrong.headers.get('set-cookie'), null);
          const result = await post('/api/admin/login', body);
          assert.equal(result.status, 303);
          assert.match(result.headers.get('location') || '', /\/admin$/);
          const setCookie = result.headers.get('set-cookie') || '';
          for (const expected of [/HttpOnly/i, /Secure/i, /SameSite=strict/i, /Max-Age=28800/i])
            assert.match(setCookie, expected);
          assert.match(result.headers.get('cache-control') || '', /no-store/);
          cookie = setCookie.split(';')[0];
          assert.ok(cookie.startsWith('masters_admin='));
        },
      );

      await t.test(
        'authenticated dashboard renders SSR statistics and CSV exports aggregate data',
        async () => {
          const payload = {
            eventId: randomUUID(),
            sessionId: randomUUID(),
            type: 'helper_start',
            path: '/',
            source: 'naver',
          };
          const event = await fetch(`${origin}/api/events`, {
            method: 'POST',
            headers: { Origin: publicOrigin, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          assert.equal(event.status, 200);
          const response = await fetch(`${origin}/admin`, {
            headers: { Cookie: cookie },
            redirect: 'manual',
          });
          assert.equal(response.status, 200);
          assert.match(response.headers.get('cache-control') || '', /no-store/);
          assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
          const html = await response.text();
          assert.match(html, /고객 여정 한눈에 보기/);
          assert.match(html, /도우미 전환 흐름/);
          assert.match(html, /UTC/);
          assert.doesNotMatch(html, /통계 저장소에 연결할 수 없습니다/);
          const csv = await fetch(`${origin}/api/admin/export`, { headers: { Cookie: cookie } });
          assert.equal(csv.status, 200);
          assert.match(csv.headers.get('content-type') || '', /text\/csv/);
          assert.match(csv.headers.get('content-disposition') || '', /attachment/);
          assert.match(csv.headers.get('cache-control') || '', /no-store/);
          const text = await csv.text();
          assert.match(text, /"helper_start"/);
          assert.match(text, /"naver"/);
          assert.doesNotMatch(text, new RegExp(payload.sessionId));
          const invalidRange = await fetch(
            `${origin}/api/admin/export?from=2026-01-01&to=2026-12-31`,
            { headers: { Cookie: cookie } },
          );
          assert.equal(invalidRange.status, 400);
          const tampered = await fetch(`${origin}/api/admin/export`, {
            headers: { Cookie: `${cookie}tampered` },
          });
          assert.equal(tampered.status, 401);
        },
      );

      await t.test(
        'logout rejects cross-origin requests then expires the browser cookie',
        async () => {
          assert.equal(
            (await post('/api/admin/logout', '', cookie, 'https://external.invalid')).status,
            403,
          );
          const response = await post('/api/admin/logout', '', cookie);
          assert.equal(response.status, 303);
          assert.match(response.headers.get('location') || '', /\/admin\/login$/);
          assert.match(response.headers.get('set-cookie') || '', /Max-Age=0/i);
          assert.match(response.headers.get('cache-control') || '', /no-store/);
          const withoutCookie = await fetch(`${origin}/admin`, { redirect: 'manual' });
          assert.equal(withoutCookie.status, 307);
          assert.equal((await fetch(`${origin}/api/admin/export`)).status, 401);
        },
      );
    } finally {
      // Stop only the child process created above, never a pre-existing service on this or any other port.
      if (child.exitCode === null && !spawnFailure) {
        child.kill('SIGTERM');
        await Promise.race([childExited, pause(3000)]);
        if (child.exitCode === null) {
          child.kill('SIGKILL');
          await childExited;
        }
      }
      rmSync(directory, { recursive: true, force: true });
    }
  },
);

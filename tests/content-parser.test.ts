import test from 'node:test';
import assert from 'node:assert/strict';
import { parseGuideMarkdown } from '../lib/content';

test('ordered guide blocks preserve one global heading sequence and complete compatibility HTML', async () => {
  const result = await parseGuideMarkdown(`## 첫 질문

첫 답변입니다.

<!-- visual: measurement-basics -->

## 두 번째 질문

| 항목 | 설명 |
| --- | --- |
| 창틀 | 범위를 구분 |

<!-- cta -->

## 세 번째 질문

마지막 답변입니다.

<!-- visual: measurement-fullness -->
`);
  assert.deepEqual(
    result.bodyBlocks.map((block) => block.type),
    ['html', 'visual', 'html', 'cta', 'html', 'visual'],
  );
  assert.deepEqual(result.headings, [
    { id: 'section-1', text: '첫 질문' },
    { id: 'section-2', text: '두 번째 질문' },
    { id: 'section-3', text: '세 번째 질문' },
  ]);
  for (const heading of result.headings) {
    assert.equal(result.html.split(`id="${heading.id}"`).length - 1, 1);
  }
  assert.match(result.html, /<th scope="row">창틀<\/th>/);
  assert.match(result.html, /class="guide-table-wrap" role="region"/);
  assert.equal(
    result.html,
    result.bodyBlocks
      .filter((block) => block.type === 'html')
      .map((block) => block.html)
      .join(''),
  );
  assert.doesNotMatch(result.html, /<!--\s*(?:visual|cta)/);
});

test('reference links remain resolved across visual and CTA boundaries', async () => {
  const result = await parseGuideMarkdown(`## 참고

[실측 설명][measure]

<!-- visual: rail-check -->

[측정 기준][measure]

<!-- cta -->

[measure]: /guides/installation/measurement-basics
`);
  assert.equal(result.html.split('href="/guides/installation/measurement-basics"').length - 1, 2);
  assert.doesNotMatch(result.html, /\[measure\]/);
});

test('untrusted HTML and unsafe URL schemes stay sanitized in every segment', async () => {
  const result = await parseGuideMarkdown(`## 안전한 본문

<script>alert('unsafe')</script>

<img src=x onerror="alert(1)">

<!-- visual: bedroom-blackout -->

[unsafe](javascript:alert%281%29)

**남길 글**

<!-- cta -->

<iframe src="https://example.com"></iframe>
`);
  assert.doesNotMatch(result.html, /<script|onerror|javascript:|<iframe/);
  assert.match(result.html, /<strong>남길 글<\/strong>/);
  assert.equal(result.bodyBlocks.filter((block) => block.type === 'visual').length, 1);
});

test('markers quoted as code are displayed as code and never become UI blocks', async () => {
  const result = await parseGuideMarkdown(
    '## 사용 예\n\n`<!-- cta -->`\n\n```md\n<!-- visual: does-not-exist -->\n```\n',
  );
  assert.ok(result.bodyBlocks.every((block) => block.type === 'html'));
  assert.match(result.html, /&#x3C;!-- cta -->/);
});

test('adjacent standalone markers keep their order without empty HTML blocks', async () => {
  const result = await parseGuideMarkdown(
    '<!-- visual: fabric-structure -->\n<!-- cta -->\n\n## 내용\n\n설명',
  );
  assert.deepEqual(
    result.bodyBlocks.map((block) => block.type),
    ['visual', 'cta', 'html'],
  );
});

for (const [label, content, message] of [
  ['unknown visual ID', '<!-- visual: not-a-guide -->', /Unknown guide visual/],
  ['malformed visual marker', '<!-- visual measurement-basics -->', /malformed guide marker/],
  ['unterminated visual marker', '<!-- visual: measurement-basics', /malformed guide marker/],
  ['CTA arguments', '<!-- cta: apply -->', /malformed guide marker/],
  ['unsupported directive', '<!-- chart: prices -->', /malformed guide marker/],
  ['inline marker', '문장 <!-- visual: rail-check --> 이어짐', /standalone Markdown blocks/],
  ['nested marker', '> <!-- cta -->', /standalone Markdown blocks/],
  [
    'duplicate visual',
    '<!-- visual: rail-check -->\n\n<!-- visual: rail-check -->',
    /Duplicate guide visual/,
  ],
] as const) {
  test(`rejects ${label} with source context`, async () => {
    await assert.rejects(parseGuideMarkdown(content, 'invalid-fixture.md'), (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.match(error.message, message);
      assert.match(error.message, /invalid-fixture\.md:\d+/);
      return true;
    });
  });
}

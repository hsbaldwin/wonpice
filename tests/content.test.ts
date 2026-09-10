import test from 'node:test';
import assert from 'node:assert/strict';
import {
  categories,
  getPosts,
  getPost,
  getRelatedPosts,
  helperHref,
  applyHref,
} from '../lib/content';
import { guideVisualIds } from '../lib/guide-visuals';

test('each supporting target keyword has one canonical representative and original posts', async () => {
  const expected = [
    '커튼 시공',
    '커튼 설치',
    '커튼 전문점',
    '커튼 업체',
    '인테리어 커튼',
    '거실 커튼',
    '침실 커튼',
    '신혼집 커튼',
  ];
  const assigned = categories.flatMap((category) => category.keywords);
  assert.deepEqual(new Set(assigned), new Set(expected));
  assert.equal(assigned.length, expected.length);
  assert.equal(new Set(categories.map((category) => category.slug)).size, 6);
  const posts = await getPosts();
  assert.equal(posts.length, 10);
  for (const category of categories) {
    assert.ok(posts.some((post) => post.category === category.slug));
    assert.equal(category.comparison.columns.length, 3);
    assert.ok(category.comparison.rows.length >= 3);
    assert.ok(category.faq.every((item) => item.answer.length > 20));
  }
});

test('all Markdown posts render searchable HTML and resolve valid related content', async () => {
  const posts = await getPosts();
  assert.equal(new Set(posts.map((post) => post.title)).size, posts.length);
  assert.equal(new Set(posts.map((post) => post.description)).size, posts.length);
  assert.equal(new Set(posts.map((post) => post.image)).size, posts.length);
  const usedVisuals = new Set<string>();
  for (const post of posts) {
    assert.ok(post.answer.trim().length > 20);
    assert.equal('consultation' in post, false);
    assert.equal(post.bodyBlocks.filter((block) => block.type === 'cta').length, 1);
    const visuals = post.bodyBlocks.filter((block) => block.type === 'visual');
    assert.ok(visuals.length >= 1);
    assert.equal(new Set(visuals.map((block) => block.id)).size, visuals.length);
    for (const visual of visuals) usedVisuals.add(visual.id);
    const inlineCtaIndex = post.bodyBlocks.findIndex((block) => block.type === 'cta');
    assert.ok(
      post.bodyBlocks
        .slice(0, inlineCtaIndex)
        .some((block) => block.type === 'html' && block.html.includes('<table>')),
    );
    assert.equal(
      post.html,
      post.bodyBlocks
        .filter((block) => block.type === 'html')
        .map((block) => block.html)
        .join(''),
    );
    assert.doesNotMatch(post.html, /<!--\s*(?:visual|cta)/);
    assert.match(post.html, /<h2 id="section-\d+">/);
    assert.match(post.html, /<p>/);
    assert.match(post.html, /<table>/);
    assert.equal(post.summary.length, 3);
    assert.equal(post.preparation.length, 3);
    assert.ok(post.headings.length >= 3);
    assert.equal(new Set(post.headings.map((h) => h.id)).size, post.headings.length);
    for (const heading of post.headings) assert.ok(post.html.includes(`id="${heading.id}"`));
    assert.equal(post.image, `/images/article-${post.slug}-2026.webp`);
    assert.ok(post.dateModified && post.dateModified >= post.date);
    assert.doesNotMatch(post.html, /제휴/);
    assert.ok(!post.html.includes('<script'));
    assert.ok(post.html.length > 200);
    assert.ok(!Number.isNaN(Date.parse(post.date)));
    assert.equal((await getPost(post.category, post.slug))?.href, post.href);
    assert.equal((await getRelatedPosts(post)).length, post.relatedPosts.length);
    assert.ok(!post.relatedPosts.includes(post.slug));
  }
  assert.deepEqual(usedVisuals, new Set(guideVisualIds));
  assert.equal(await getPost('installation', '../../package'), undefined);
  assert.equal(await getPost('unknown', 'measurement-basics'), undefined);
});

test('CTAs keep presets and origins explicit and point to the fixed relay route', () => {
  assert.equal(helperHref('bedroom'), '/?room=bedroom#helper');
  const url = new URL(
    applyHref('companies', 'post-cta', '/guides/companies/quote-comparison'),
    'https://example.com',
  );
  assert.equal(url.pathname, '/go/quote');
  assert.equal(url.searchParams.get('category'), 'companies');
  assert.equal(url.searchParams.get('placement'), 'post-cta');
  assert.equal(url.searchParams.get('from'), '/guides/companies/quote-comparison');
  assert.equal(url.searchParams.has('url'), false);
});

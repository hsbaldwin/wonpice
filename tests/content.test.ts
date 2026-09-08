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

test('each supporting target keyword has one canonical representative and original posts', async () => {
  const expected = [
    '커튼시공',
    '커튼설치',
    '커튼전문점',
    '커튼업체',
    '인테리어커튼',
    '거실커튼',
    '침실커튼',
    '신혼집커튼',
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
  for (const post of posts) {
    assert.match(post.html, /<h2 id="section-\d+">/);
    assert.match(post.html, /<p>/);
    assert.match(post.html, /<table>/);
    assert.equal(post.summary.length, 3);
    assert.equal(post.preparation.length, 3);
    assert.ok(post.headings.length >= 3);
    assert.equal(new Set(post.headings.map((h) => h.id)).size, post.headings.length);
    for (const heading of post.headings) assert.ok(post.html.includes(`id="${heading.id}"`));
    assert.ok(post.image?.startsWith('/images/'));
    assert.ok(post.dateModified && post.dateModified >= post.date);
    assert.doesNotMatch(post.html, /제휴/);
    assert.ok(!post.html.includes('<script'));
    assert.ok(post.html.length > 200);
    assert.ok(!Number.isNaN(Date.parse(post.date)));
    assert.equal((await getPost(post.category, post.slug))?.href, post.href);
    assert.equal((await getRelatedPosts(post)).length, post.relatedPosts.length);
    assert.ok(!post.relatedPosts.includes(post.slug));
  }
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

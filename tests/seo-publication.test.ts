import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

// Isolate module-level site settings just as two independent Next builds would.
function inspectPublication(indexable: boolean) {
  const script = `
    const sitemap = require('./app/sitemap.ts').default;
    const robots = require('./app/robots.ts').default;
    const content = require('./lib/content.ts');
    const categoryMetadata = require('./app/guides/[category]/page.tsx').generateMetadata;
    const postMetadata = require('./app/guides/[category]/[slug]/page.tsx').generateMetadata;
    (async () => {
      const posts = await content.getPosts();
      const categories = await Promise.all(content.categories.map(async category => ({
        path: '/guides/' + category.slug,
        metadata: await categoryMetadata({params: Promise.resolve({category: category.slug})}),
      })));
      const articles = await Promise.all(posts.map(async post => ({
        path: post.href,
        metadata: await postMetadata({params: Promise.resolve({category: post.category, slug: post.slug})}),
      })));
      console.log(JSON.stringify({sitemap: await sitemap(), robots: robots(), entries: [...categories,...articles]}));
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `;
  return JSON.parse(
    execFileSync(process.execPath, ['--import', 'tsx', '-e', script], {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: {
        ...process.env,
        SITE_INDEXABLE: String(indexable),
        NEXT_PUBLIC_SITE_URL: 'https://curtain.example',
      },
    }),
  );
}

test('preview publication excludes crawling and sitemap entries', () => {
  const result = inspectPublication(false);
  assert.equal(result.robots.rules.disallow, '/');
  assert.deepEqual(result.sitemap, []);
});

test('published SEO metadata uses unique canonical URLs and only public sitemap entries', () => {
  const result = inspectPublication(true);
  assert.equal(result.robots.rules.allow, '/');
  assert.equal(result.robots.sitemap, 'https://curtain.example/sitemap.xml');
  assert.equal(result.sitemap.length, 17);
  assert.equal(new Set(result.sitemap.map((item: { url: string }) => item.url)).size, 17);
  assert.ok(
    result.sitemap.every(
      (item: { url: string }) => !/\/(saved|admin|api|go)(\/|$)/.test(new URL(item.url).pathname),
    ),
  );
  assert.equal(result.entries.length, 14);
  for (const entry of result.entries) {
    const expected = `https://curtain.example${entry.path}`;
    assert.equal(entry.metadata.alternates.canonical, expected);
    assert.equal(entry.metadata.openGraph.url, expected);
    assert.ok(entry.metadata.title.length > 5);
    assert.ok(entry.metadata.description.length > 15);
    assert.equal(entry.metadata.keywords, undefined);
    assert.ok(result.sitemap.some((item: { url: string }) => item.url === expected));
  }
});

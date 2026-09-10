import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { getGuideImage } from '../lib/guide-images';
import { pageMetadata } from '../lib/seo';
import { absoluteUrl } from '../lib/site';

// Isolate module-level site settings just as two independent Next builds would.
function inspectPublication(indexable: boolean) {
  const script = `
    const sitemap = require('./app/sitemap.ts').default;
    const robots = require('./app/robots.ts').default;
    const content = require('./lib/content.ts');
    const images = require('./lib/guide-images.ts');
    const categoryMetadata = require('./app/guides/[category]/page.tsx').generateMetadata;
    const postMetadata = require('./app/guides/[category]/[slug]/page.tsx').generateMetadata;
    (async () => {
      const posts = await content.getPosts();
      const categories = await Promise.all(content.categories.map(async category => ({
        kind: 'category',
        path: '/guides/' + category.slug,
        title: category.seoTitle,
        image: images.getGuideImage(category.slug),
        metadata: await categoryMetadata({params: Promise.resolve({category: category.slug})}),
      })));
      const articles = await Promise.all(posts.map(async post => ({
        kind: 'article',
        path: post.href,
        title: post.title,
        image: images.getImageBySrc(post.image),
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
  for (const entry of result.entries) assert.equal(entry.metadata.robots.index, false);
});

test('published SEO metadata uses unique canonical URLs and only public sitemap entries', async () => {
  const result = inspectPublication(true);
  assert.equal(result.robots.rules.allow, '/');
  assert.equal(result.robots.sitemap, 'https://curtain.example/sitemap.xml');
  assert.equal(result.sitemap.length, 19);
  assert.equal(new Set(result.sitemap.map((item: { url: string }) => item.url)).size, 19);
  assert.ok(
    result.sitemap.every(
      (item: { url: string }) => !/\/(saved|admin|api|go)(\/|$)/.test(new URL(item.url).pathname),
    ),
  );
  assert.equal(result.entries.length, 16);
  for (const entry of result.entries) {
    const expected = `https://curtain.example${entry.path}`;
    assert.equal(entry.metadata.alternates.canonical, expected);
    assert.equal(entry.metadata.openGraph.url, expected);
    assert.ok(entry.metadata.title.absolute.length > 5);
    assert.ok(entry.metadata.description.length > 15);
    assert.equal(entry.metadata.keywords, undefined);
    assert.equal(entry.metadata.twitter.title, entry.metadata.title.absolute);
    assert.equal(entry.metadata.twitter.description, entry.metadata.description);
    assert.equal(entry.metadata.openGraph.siteName, '커튼 견적 도우미');
    assert.equal(entry.metadata.openGraph.locale, 'ko_KR');
    assert.equal(entry.metadata.openGraph.images.length, 1);
    assert.equal(entry.metadata.twitter.images.length, 1);
    const image = entry.metadata.openGraph.images[0];
    assert.deepEqual(entry.metadata.twitter.images[0], image);
    assert.equal(image.url, new URL(entry.image.src, 'https://curtain.example').toString());
    const actual = await sharp(`public${entry.image.src}`).metadata();
    assert.equal(entry.image.width, actual.width);
    assert.equal(entry.image.height, actual.height);
    if (entry.kind === 'article' || image.width !== undefined || image.height !== undefined) {
      assert.equal(image.alt, entry.image.alt);
      assert.equal(image.width, actual.width);
      assert.equal(image.height, actual.height);
    } else {
      assert.equal(image.alt, entry.title);
    }
    assert.equal(entry.metadata.robots.index, true);
    assert.doesNotMatch(JSON.stringify(entry.metadata), /제휴/);
    assert.ok(result.sitemap.some((item: { url: string }) => item.url === expected));
  }
});

test('image paths and GuideImage objects share a URL while objects preserve asset alt and dimensions', async () => {
  const asset = getGuideImage('installation');
  const actual = await sharp(`public${asset.src}`).metadata();
  const options = {
    title: '커튼 설치 구성 안내',
    description: '설치 전 확인할 레일과 원단 구성을 정리합니다.',
    path: '/guides/installation',
  };
  const [fromPath, fromAsset] = [asset.src, asset].map((image) =>
    JSON.parse(JSON.stringify(pageMetadata({ ...options, image }))),
  );
  const url = absoluteUrl(asset.src);
  for (const social of ['openGraph', 'twitter']) {
    assert.deepEqual(fromPath[social].images, [{ url, alt: options.title }]);
    assert.deepEqual(fromAsset[social].images, [
      { url, alt: asset.alt, width: actual.width, height: actual.height },
    ]);
    assert.equal(fromPath[social].images[0].url, fromAsset[social].images[0].url);
  }
  assert.notEqual(
    asset.alt,
    options.title,
    'Image alt must come from the asset, not the page title',
  );
});

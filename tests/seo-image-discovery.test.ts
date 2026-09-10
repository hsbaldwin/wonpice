import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { getImageBySrc } from '../lib/guide-images';

type Discovery = {
  metadata: { robots: { index: boolean; follow: boolean; 'max-image-preview'?: string } };
  sitemap: { url: string; images?: string[]; lastModified?: string }[];
  posts: { href: string; image: string; date: string; dateModified?: string }[];
};

function inspectDiscovery(indexable: boolean): Discovery {
  return JSON.parse(
    execFileSync(
      process.execPath,
      [
        '--import',
        'tsx',
        '-e',
        `
          const sitemap = require('./app/sitemap.ts').default;
          const { pageMetadata } = require('./lib/seo.ts');
          const { getPosts } = require('./lib/content.ts');
          (async () => {
            console.log(JSON.stringify({
              metadata: pageMetadata({title: '커튼 견적', description: '커튼 상담을 준비합니다.', path: '/'}),
              sitemap: await sitemap(),
              posts: (await getPosts()).map(({href, image, date, dateModified}) => ({href, image, date, dateModified})),
            }));
          })().catch(error => { console.error(error); process.exitCode = 1; });
        `,
      ],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        env: {
          ...process.env,
          SITE_INDEXABLE: String(indexable),
          NEXT_PUBLIC_SITE_URL: 'https://curtain.example',
        },
      },
    ),
  );
}

test('public image sitemap discovers registered editorial assets without changing page URLs or dates', () => {
  const { sitemap, posts, metadata } = inspectDiscovery(true);
  assert.equal(sitemap.length, 19);
  assert.equal(new Set(sitemap.map((entry) => entry.url)).size, 19);
  assert.deepEqual(metadata.robots, {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  });
  const discovered = new Set<string>();
  for (const entry of sitemap) {
    assert.ok(entry.images?.length, `Image discovery for ${entry.url}`);
    assert.equal(new Set(entry.images).size, entry.images.length);
    for (const imageUrl of entry.images) {
      const image = new URL(imageUrl);
      assert.equal(image.origin, 'https://curtain.example');
      assert.equal(image.search, '');
      assert.equal(image.hash, '');
      const asset = getImageBySrc(image.pathname);
      assert.ok(existsSync(`public${asset.src}`), asset.src);
      assert.ok(asset.width >= 1200, `Large original image available: ${asset.src}`);
      discovered.add(image.pathname);
    }
    const post = posts.find(
      (post) => new URL(post.href, 'https://curtain.example').href === entry.url,
    );
    if (post) {
      assert.deepEqual(entry.images, [new URL(post.image, 'https://curtain.example').href]);
      assert.equal(entry.lastModified, post.dateModified || post.date);
    } else {
      assert.equal(entry.lastModified, undefined, `Do not invent modification dates: ${entry.url}`);
    }
  }
  assert.equal(discovered.size, 16, 'All six category and ten article images are discoverable');
});

test('preview builds retain noindex and expose no image sitemap entries', () => {
  const { sitemap, metadata } = inspectDiscovery(false);
  assert.deepEqual(sitemap, []);
  assert.deepEqual(metadata.robots, { index: false, follow: true });
});

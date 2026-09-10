import test from 'node:test';
import assert from 'node:assert/strict';
import { categories, getPosts } from '../lib/content';
import { CTA_PLACEMENTS } from '../lib/analytics-server';

const origin = process.env.SEO_TEST_URL;
const canonicalOrigin =
  process.env.SEO_EXPECT_CANONICAL_ORIGIN ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000';
const indexable = process.env.SEO_EXPECT_INDEXABLE === 'true';

function decode(value: string) {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&lt;': '<',
    '&gt;': '>',
  };
  return value.replace(
    /&(?:amp|quot|lt|gt|#39);|&#(?:x[\da-f]+|\d+);/gi,
    (entity) =>
      entities[entity] ??
      String.fromCodePoint(
        entity[2].toLowerCase() === 'x'
          ? parseInt(entity.slice(3), 16)
          : parseInt(entity.slice(2), 10),
      ),
  );
}
function attributes(tag: string) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]),
  );
}
function normalizeSearchText(value: string) {
  return decode(value.replace(/<[^>]+>/g, ' ')).replace(/[^\p{L}\p{N}]/gu, '');
}
function metadata(html: string, key: string, route: string) {
  const found = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => attributes(m[0]))
    .filter((tag) => tag.name === key || tag.property === key);
  assert.equal(found.length, 1, `One ${key}: ${route}`);
  assert.ok(found[0].content, `Nonempty ${key}: ${route}`);
  return found[0].content;
}
function canonical(html: string, route: string) {
  const found = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => attributes(m[0]))
    .filter((tag) => tag.rel === 'canonical');
  assert.equal(found.length, 1, `One canonical: ${route}`);
  // Next may serialize an origin without its equivalent root slash.
  return new URL(found[0].href).toString();
}

test(
  'all public pages expose consistent SEO, crawlable assets and complete inquiry paths',
  { skip: !origin },
  async () => {
    const posts = await getPosts();
    const pages = [
      { path: '/', keywords: ['맞춤커튼'] },
      { path: '/guides', keywords: ['커튼'] },
      { path: '/about', keywords: ['서비스', '견적'] },
      ...categories.map((category) => ({
        path: `/guides/${category.slug}`,
        keywords: category.keywords,
      })),
      ...posts.map((post) => ({ path: post.href, keywords: [post.primaryKeyword] })),
    ];
    assert.equal(pages.length, 19);
    const publicPaths = new Set(pages.map((page) => page.path));
    const documents = new Map<string, string>();
    const titles = new Set<string>(),
      descriptions = new Set<string>(),
      imageUrls = new Set<string>();
    const linkedAnchors: { from: string; path: string; hash: string }[] = [];
    for (const page of pages) {
      const response = await fetch(new URL(page.path, origin), { redirect: 'manual' });
      assert.equal(response.status, 200, page.path);
      assert.match(response.headers.get('content-type') || '', /text\/html/, page.path);
      if (indexable)
        assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i, page.path);
      const document = await response.text();
      const html = document.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
      documents.set(page.path, html);
      assert.equal((html.match(/<footer\b/g) || []).length, 1, `One footer: ${page.path}`);
      const headers = [...html.matchAll(/<header\b[^>]*>/g)].map((m) => attributes(m[0]));
      assert.equal(
        headers.filter((tag) => /(?:^|\s)site-header(?:\s|$)/.test(tag.class || '')).length,
        1,
        `Shared header: ${page.path}`,
      );
      const body = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
      assert.ok(body, `Main SSR content: ${page.path}`);
      const headings = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
      assert.equal(headings.length, 1, `One main heading: ${page.path}`);
      for (const keyword of page.keywords)
        assert.ok(
          normalizeSearchText(body).includes(normalizeSearchText(keyword)),
          `${keyword} in main SSR content: ${page.path}`,
        );
      const expectedCanonical = new URL(page.path, canonicalOrigin).toString();
      assert.equal(canonical(html, page.path), expectedCanonical, page.path);
      const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
      assert.ok(head, `Document head: ${page.path}`);
      const titleTags = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/g)];
      assert.equal(titleTags.length, 1, `One title: ${page.path}`);
      const title = decode(titleTags[0][1]);
      const description = metadata(html, 'description', page.path);
      assert.ok(title.length > 5 && description.length > 15, page.path);
      assert.ok(!titles.has(title), `Unique title: ${page.path}`);
      assert.ok(!descriptions.has(description), `Unique description: ${page.path}`);
      titles.add(title);
      descriptions.add(description);
      assert.equal(metadata(html, 'og:title', page.path), title);
      assert.equal(metadata(html, 'twitter:title', page.path), title);
      assert.equal(metadata(html, 'og:description', page.path), description);
      assert.equal(metadata(html, 'twitter:description', page.path), description);
      assert.equal(new URL(metadata(html, 'og:url', page.path)).toString(), expectedCanonical);
      assert.equal(metadata(html, 'og:locale', page.path), 'ko_KR');
      const ogImage = metadata(html, 'og:image', page.path);
      assert.equal(metadata(html, 'twitter:image', page.path), ogImage);
      assert.equal(new URL(ogImage).origin, new URL(canonicalOrigin).origin);
      imageUrls.add(ogImage);
      const robots = metadata(html, 'robots', page.path).split(/,\s*/);
      assert.ok(robots.includes(indexable ? 'index' : 'noindex'), page.path);
      assert.ok(!indexable || !robots.includes('noindex'), page.path);
      assert.doesNotMatch(html, /<meta\b[^>]*name="keywords"/i);
      for (const match of html.matchAll(/<a\b[^>]*>/g)) {
        const anchor = attributes(match[0]);
        if (!anchor.href) continue;
        const link = new URL(anchor.href, expectedCanonical);
        if (link.origin !== new URL(canonicalOrigin).origin) continue;
        if (link.pathname === '/go/quote') {
          assert.match(anchor.rel || '', /\bsponsored\b/, `Qualified CTA: ${page.path}`);
          const cta = link.searchParams.get('cta') || link.searchParams.get('placement');
          assert.ok(
            (CTA_PLACEMENTS as readonly string[]).includes(cta || ''),
            `Known CTA: ${page.path}`,
          );
          continue;
        }
        assert.ok(
          publicPaths.has(link.pathname) || link.pathname === '/saved',
          `Known link ${anchor.href} on ${page.path}`,
        );
        if (link.hash && publicPaths.has(link.pathname))
          linkedAnchors.push({
            from: page.path,
            path: link.pathname,
            hash: decodeURIComponent(link.hash.slice(1)),
          });
      }
      const schemas = [
        ...document.matchAll(
          /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
        ),
      ].flatMap((m) => JSON.parse(m[1]));
      if (page.path !== '/') {
        const breadcrumbs = schemas.filter((schema) => schema['@type'] === 'BreadcrumbList');
        assert.equal(breadcrumbs.length, 1, `One BreadcrumbList: ${page.path}`);
        const items = breadcrumbs[0].itemListElement;
        assert.ok(items.length >= 2);
        assert.equal(items[0].name, '홈');
        assert.equal(items.at(-1).item, expectedCanonical);
        const nav = html.match(/<nav aria-label="현재 위치"[\s\S]*?<\/nav>/)?.[0] || '';
        for (const [index, item] of items.entries()) {
          assert.equal(item.position, index + 1);
          assert.ok(
            normalizeSearchText(nav).includes(normalizeSearchText(item.name)),
            `Visible breadcrumb: ${page.path}`,
          );
          assert.ok(publicPaths.has(new URL(item.item).pathname));
        }
      } else {
        assert.equal(schemas.filter((schema) => schema['@type'] === 'WebSite').length, 1);
        assert.match(normalizeSearchText(headings[0][1]), /커튼견적/);
        const sections = [
          'home-intro',
          'helper',
          'home-spaces',
          'home-essentials',
          'home-process',
          'home-faq',
          'home-inquiry',
        ];
        let previous = -1;
        for (const id of sections) {
          const position = body.indexOf(`id="${id}"`);
          assert.ok(position > previous, `Home section order: ${id}`);
          previous = position;
        }
        assert.match(html, /<main\b[^>]*data-home-content/);
        assert.doesNotMatch(html, /data-home-story|id="scene-/);
        assert.ok(
          body.includes('home-hero') && body.includes('home-final'),
          'Home inquiry entry points exist before hydration',
        );
      }
      const post = posts.find((item) => item.href === page.path);
      if (post) {
        const articles = schemas.filter((schema) => schema['@type'] === 'Article');
        assert.equal(articles.length, 1, `One Article: ${page.path}`);
        const article = articles[0];
        assert.equal(article.headline, post.title);
        assert.equal(article.description, post.description);
        assert.equal(article.mainEntityOfPage, expectedCanonical);
        assert.equal(article.datePublished, `${post.date}T00:00:00+09:00`);
        assert.equal(article.dateModified, `${post.dateModified || post.date}T00:00:00+09:00`);
        assert.equal(article.image, new URL(post.image!, canonicalOrigin).toString());
        assert.equal(ogImage, article.image);
        const visibleImages = [...body.matchAll(/<img\b[^>]*>/g)]
          .map((m) => attributes(m[0]))
          .map((img) => {
            const image = new URL(img.src, canonicalOrigin);
            return image.pathname === '/_next/image'
              ? image.searchParams.get('url')
              : image.pathname;
          });
        assert.ok(
          visibleImages.includes(post.image!),
          `Visible article image matches schema: ${page.path}`,
        );
        assert.equal(normalizeSearchText(headings[0][1]), normalizeSearchText(post.title));
        const answer = body.match(/<p class="guide-article-answer">([\s\S]*?)<\/p>/)?.[1];
        assert.equal(normalizeSearchText(answer || ''), normalizeSearchText(post.answer));
        const visuals = [...body.matchAll(/data-guide-visual="([^"]+)"/g)].map((m) => m[1]);
        assert.deepEqual(
          visuals,
          post.bodyBlocks.filter((block) => block.type === 'visual').map((block) => block.id),
          `All article diagrams appear once in content order: ${page.path}`,
        );
        const templates = [...body.matchAll(/<textarea\b([^>]*)>([\s\S]*?)<\/textarea>/g)]
          .filter((m) => /\breadonly(?:\s|=|$)/i.test(m[1]))
          .map((m) => decode(m[2]).trim());
        assert.ok(
          templates.includes(post.consultation.template),
          `Consultation template is readable before hydration: ${page.path}`,
        );
        assert.ok(body.includes('post-middle') && body.includes('post-bottom'));
        for (const heading of post.headings) {
          assert.ok(body.includes(`href="#${heading.id}"`));
          assert.ok(body.includes(`id="${heading.id}"`));
        }
        assert.match(body, /핵심 요약/);
        assert.match(body, /<table>/);
        assert.match(body, /상담 전에 준비할 내용/);
        assert.match(body, /이 링크를 통한 신청으로 운영자에게 수수료가 발생할 수 있습니다/);
      }
    }
    for (const anchor of linkedAnchors)
      assert.ok(
        documents.get(anchor.path)?.includes(`id="${anchor.hash}"`),
        `Working cross-page anchor ${anchor.path}#${anchor.hash} from ${anchor.from}`,
      );
    for (const image of imageUrls) {
      const url = new URL(image);
      const response = await fetch(new URL(url.pathname + url.search, origin), {
        redirect: 'manual',
      });
      assert.equal(response.status, 200, `Crawlable image: ${url.pathname}`);
      assert.match(response.headers.get('content-type') || '', /^image\//, url.pathname);
      assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i, url.pathname);
      assert.ok((await response.arrayBuffer()).byteLength > 0, url.pathname);
    }
    const sitemapResponse = await fetch(new URL('/sitemap.xml', origin));
    assert.equal(sitemapResponse.status, 200);
    const sitemap = await sitemapResponse.text();
    const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
    const expectedUrls = indexable
      ? pages.map((page) => new URL(page.path, canonicalOrigin).toString())
      : [];
    assert.equal(sitemapUrls.length, expectedUrls.length);
    assert.deepEqual(new Set(sitemapUrls), new Set(expectedUrls));
    const robotsResponse = await fetch(new URL('/robots.txt', origin));
    assert.equal(robotsResponse.status, 200);
    const robots = await robotsResponse.text();
    assert.match(robots, indexable ? /Allow: \/\s/ : /Disallow: \/\s/);
    if (indexable) assert.ok(robots.includes(new URL('/sitemap.xml', canonicalOrigin).toString()));
    for (const path of [
      '/?room=bedroom',
      '/?view=saved',
      '/guides/installation/measurement-basics?utm_source=qa',
    ]) {
      const response = await fetch(new URL(path, origin));
      assert.equal(response.status, 200, path);
      const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
      assert.equal(
        canonical(html, path),
        new URL(new URL(path, canonicalOrigin).pathname, canonicalOrigin).toString(),
      );
    }
    for (const path of [
      '/guides/companies/not-a-real-guide',
      '/guides/not-a-category',
      '/not-a-real-page',
    ]) {
      const response = await fetch(new URL(path, origin), { redirect: 'manual' });
      assert.equal(response.status, 404, path);
      assert.match(await response.text(), /noindex/, path);
    }
    const saved = await fetch(new URL('/saved', origin), { redirect: 'manual' });
    assert.equal(saved.status, 307);
    assert.equal(saved.headers.get('location'), '/?view=saved#helper');
  },
);

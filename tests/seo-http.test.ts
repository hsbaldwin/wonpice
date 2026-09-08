import test from 'node:test';
import assert from 'node:assert/strict';
import { categories, getPosts } from '../lib/content';

const origin = process.env.SEO_TEST_URL;
const canonicalOrigin =
  process.env.SEO_EXPECT_CANONICAL_ORIGIN ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000';

test(
  'server HTML exposes all keyword representatives, article bodies, structured data and working CTAs',
  { skip: !origin },
  async () => {
    const posts = await getPosts();
    const pages = [
      { path: '/', keywords: ['맞춤커튼'], article: false },
      { path: '/guides', keywords: ['커튼'], article: false },
      { path: '/about', keywords: ['서비스', '견적'], article: false },
      ...categories.map((category) => ({
        path: `/guides/${category.slug}`,
        keywords: category.keywords,
        article: false,
      })),
      ...posts.map((post) => ({
        path: post.href,
        keywords: [post.primaryKeyword.split(' ')[0]],
        article: true,
      })),
    ];
    const canonicalUrls: string[] = [];
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const publicPaths = new Set(pages.map((page) => page.path));
    assert.equal(pages.length, 19);
    for (const page of pages) {
      const response = await fetch(new URL(page.path, origin));
      assert.equal(response.status, 200, page.path);
      const document = await response.text();
      // Discard scripts so a hydrated payload cannot satisfy searchable-content checks.
      const html = document.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
      assert.equal((html.match(/<footer\b/g) || []).length, 1, `One footer: ${page.path}`);
      const body = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
      assert.ok(body, `Main content exists: ${page.path}`);
      assert.equal((body.match(/<h1\b/g) || []).length, 1, `One main heading: ${page.path}`);
      for (const keyword of page.keywords)
        assert.ok(body.includes(keyword), `${keyword} in main SSR content: ${page.path}`);
      const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
      assert.ok(canonical, `Canonical exists: ${page.path}`);
      assert.equal(
        new URL(canonical).toString(),
        new URL(page.path, canonicalOrigin).toString(),
        page.path,
      );
      canonicalUrls.push(new URL(canonical).toString());
      const title = html.match(/<title>(.*?)<\/title>/)?.[1];
      const description = html.match(/name="description" content="([^"]+)"/)?.[1];
      assert.ok(title && description);
      assert.ok(!titles.has(title), `Unique title: ${page.path}`);
      titles.add(title);
      assert.ok(!descriptions.has(description), `Unique description: ${page.path}`);
      descriptions.add(description);
      assert.doesNotMatch(html, /제휴/);
      assert.match(html, /name="twitter:title"/);
      assert.match(html, /property="og:locale" content="ko_KR"/);
      const robots = html.match(/name="robots" content="([^"]+)"/)?.[1];
      assert.ok(
        robots?.includes(process.env.SEO_EXPECT_INDEXABLE === 'true' ? 'index, follow' : 'noindex'),
      );
      const anchors = [...html.matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) =>
        m[1].replaceAll('&amp;', '&'),
      );
      for (const href of anchors) {
        const link = new URL(href, new URL(page.path, canonicalOrigin));
        if (link.origin === new URL(canonicalOrigin).origin && !link.pathname.startsWith('/go/')) {
          assert.ok(
            publicPaths.has(link.pathname) || link.pathname === '/saved',
            `Known link ${href} on ${page.path}`,
          );
          if (link.pathname === page.path && link.hash)
            assert.ok(
              html.includes(`id="${decodeURIComponent(link.hash.slice(1))}"`),
              `Working anchor ${href}`,
            );
        }
      }
      if (page.path !== '/') {
        const schemas = [
          ...document.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
        ].flatMap((m) => JSON.parse(m[1]));
        const breadcrumb = schemas.find((schema) => schema['@type'] === 'BreadcrumbList');
        assert.ok(breadcrumb && breadcrumb.itemListElement.length >= 2);
        assert.equal(breadcrumb.itemListElement[0].name, '홈');
        assert.equal(breadcrumb.itemListElement.at(-1).item, canonical);
        const nav = html.match(/<nav aria-label="현재 위치"[\s\S]*?<\/nav>/)?.[0] || '';
        for (const item of breadcrumb.itemListElement)
          assert.ok(
            nav.includes(item.name.replaceAll('&', '&amp;')),
            `Visible breadcrumb ${item.name}`,
          );
      }
      if (page.path === '/') {
        const sceneIds = [...body.matchAll(/id="(scene-[^"]+)"/g)].map((match) => match[1]);
        assert.deepEqual(sceneIds, ['scene-helper', 'scene-spaces']);
        const finalScene = body.match(
          /<section\b[^>]*id="scene-spaces"[^>]*>([\s\S]*?)<\/section>/,
        )?.[1];
        assert.ok(finalScene, 'The final home scene exists before hydration');
        assert.match(finalScene, /<footer\b[^>]*role="contentinfo"/);
        const footer = finalScene.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
        assert.ok(footer, 'The merged footer keeps its information');
        assert.match(footer, /href="\/guides"/);
        assert.match(footer, /href="\/about"/);
        assert.ok(!html.includes('class="site-header"'), 'Home omits the shared header');
        assert.ok(!html.split('</main>')[1]?.includes('<footer'), 'No separate home footer');
        const heading = body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
        assert.equal(
          heading
            ?.replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim(),
          '우리 집 견적을 미리 정리해보세요.',
        );
        const prepare = body.match(
          /<section\b[^>]*id="scene-helper"[^>]*>([\s\S]*?)<\/section>/,
        )?.[1];
        assert.ok(prepare, 'The helper is the first scene in server HTML');
        assert.match(prepare, /<button\b[^>]*class="[^"]*inquiry-start[^>]*>[\s\S]*?시작하기/);
        assert.ok(!prepare.includes('입력하면 자동 저장돼요. 문의할 때 참고하세요.'));
        assert.ok(!prepare.includes('role="tablist"'), 'The entry guide has no tab navigation');
        const heroPoster = (prepare.match(/<img\b[^>]*>/g) || []).find((image) =>
          /class="[^"]*\bloop-video-poster\b[^"]*"/.test(image),
        );
        assert.ok(heroPoster, 'Background video poster exists before hydration');
        assert.match(heroPoster, /\ssrc="[^"]+"/);
        assert.match(heroPoster, /loading="eager"/);
        assert.match(heroPoster, /fetchpriority="high"/i);
        assert.match(prepare, /class="loop-video helper-background"/);
        assert.match(prepare, /data-video-status="poster"/);
        assert.equal((prepare.match(/<video\b/g) || []).length, 1);
        assert.ok(body.includes('id="helper"'), 'Existing helper entry anchor remains available');
        assert.ok(body.includes('/go/quote?cta=home-direct'), 'No-JS direct quote link remains');
        const videos = body.match(/<video\b[^>]*>/g) || [];
        assert.equal(videos.length, 1);
        for (const video of videos) {
          assert.ok(!/\ssrc=/.test(video), 'SSR does not eagerly download the background video');
          assert.ok(video.includes('preload="none"'));
        }
      }
      if (page.path.startsWith('/guides')) {
        assert.ok(html.includes('class="site-header"'), 'Guide pages retain navigation');
        assert.ok(document.includes('application/ld+json'), `Structured data: ${page.path}`);
        assert.ok(document.includes('BreadcrumbList'), `Breadcrumb schema: ${page.path}`);
        assert.ok(
          body.includes('/?room=') || body.includes('/#helper') || body.includes('/go/quote?'),
          `Intent-appropriate CTA: ${page.path}`,
        );
        const applyLinks = (body.match(/<a\b[^>]*>/g) || []).filter((anchor) =>
          anchor.includes('/go/quote?'),
        );
        for (const anchor of applyLinks)
          assert.match(
            anchor,
            /rel="[^"]*\bsponsored\b[^"]*"/,
            `Qualified affiliate CTA: ${page.path}`,
          );
      }
      if (page.article) {
        assert.ok(/<h2\b/.test(body), `Article HTML: ${page.path}`);
        assert.ok(document.includes('"@type":"Article"'), `Article schema: ${page.path}`);
        const post = posts.find((p) => p.href === page.path)!;
        for (const heading of post.headings) {
          assert.ok(body.includes(`href="#${heading.id}"`));
          assert.ok(body.includes(`id="${heading.id}"`));
        }
        assert.match(body, /핵심 요약/);
        assert.match(body, /<table>/);
        assert.match(body, /상담 전에 준비할 내용/);
        assert.match(body, /이 링크를 통한 신청으로 운영자에게 수수료가 발생할 수 있습니다/);
        assert.match(document, /"dateModified"/);
        assert.match(document, /"image"/);
      }
    }
    assert.equal(new Set(canonicalUrls).size, pages.length);
    const sitemap = await (await fetch(new URL('/sitemap.xml', origin))).text();
    assert.equal(
      (sitemap.match(/<url>/g) || []).length,
      process.env.SEO_EXPECT_INDEXABLE === 'true' ? 19 : 0,
    );
    const robots = await (await fetch(new URL('/robots.txt', origin))).text();
    assert.match(
      robots,
      process.env.SEO_EXPECT_INDEXABLE === 'true' ? /Allow: \// : /Disallow: \//,
    );
    const missing = await fetch(new URL('/guides/companies/not-a-real-guide', origin));
    assert.equal(missing.status, 404);
    assert.match(await missing.text(), /noindex/);
    const saved = await fetch(new URL('/saved', origin), { redirect: 'manual' });
    assert.equal(saved.status, 307, 'Existing saved bookmarks redirect to the helper');
    assert.equal(saved.headers.get('location'), '/?view=saved#helper');
  },
);

# Image and font assets

## Home helper moving background

- The first section places the quotation helper over the home's single video background of actual sheer-curtain footage. On 2026-09-07 the existing Alef Morais / Pexels 38675645 source was reframed and retrimmed around the bright central curtain. This is a new edit of the same verified 3840 × 2160 source, not a different shoot or an upscaled replacement.
- Current local assets: `public/videos/curtain-helper-daylight.mp4` (2560 × 1440; 2,860,423 bytes) and `curtain-helper-daylight-mobile.mp4` (1080 × 1920; 1,770,730 bytes). Both are 4.5-second, 24fps actual-motion loops with a 0.75-second crossfade. No blur, whitening, sharpening, speed change, or exposure filter was applied.
- Matching first-frame posters: `public/images/curtain-helper-daylight-poster.webp` (2560 × 1440; 44,562 bytes) and `curtain-helper-daylight-mobile-poster.webp` (1080 × 1920; 30,396 bytes). Desktop is a native-size crop; mobile is downsampled from its own portrait crop.
- See [media sources and production records](media-sources.md) for verified source and license links, the exact crop and loop recipe, encoding, and full-frame decode checks. The previous `curtain-sheer-hd` and linen/sheers edits are retained as historical assets and are not the current home background.

## Unused home preparation image variant

- Project asset: `public/images/curtain-hero.webp` (1536 × 1024; 118,878 bytes).
- Status: unused. The user rejected the split static-image layout and confirmed retaining the original moving full-background layout. This generated asset is retained only as a record of the rejected variant; current pages do not reference it.
- Creation tool: built-in OpenAI image generation; created 2026-09-06. AI-generated curtain styling example, not an actual installation photo.
- Original preserved at `/Users/studio/.codex/generated_images/01a07597-35fe-7932-a60e-a233702ee567/exec-98c7fc4d-560f-4c5b-94ff-d0d26c73e847.png`.
- Converted with Sharp to WebP quality 90, effort 6, at the original dimensions without upscaling. The rejected variant used a bounded image panel and direct WebP delivery through `next/image` with `unoptimized`; those rendering choices do not describe the current home.
- Prompt:

> Use case: photorealistic-natural. Asset type: high-resolution editorial curtain photograph for the right half of a Korean curtain guide website hero. Primary request: a beautifully sharp, natural interior photograph of full-height ivory sheer curtains softly filtering daylight across a wide window in a quiet modern Korean apartment, with oatmeal linen drapes gathered at the far right, pale oak floor along the bottom and a small edge of an ivory upholstered sofa at the lower right. Composition: landscape 3:2, straight architectural verticals, eye-level view at a slight angle, curtains occupy 80 percent of the frame. The photograph must also crop gracefully to a near-square panel. Detailed translucent woven fabric and natural folds are the subject; show full curtain lengths and the way daylight falls onto the oak floor. Lighting: soft neutral morning daylight, gentle realistic shadows, bright but preserve visible fabric texture and detail in highlights, no blown-out windows. Palette: balanced ivory, warm off-white, pale oak and soft taupe, no yellow color cast. Style: premium understated editorial interior photography, photorealistic, crisp focus, subtle tactile detail, no haze, no artificial blur, no CGI gloss. Constraints: no text, no lettering, no watermark, no logos, no people, no excessive decoration. Generate at high resolution suitable for a retina website hero.

## Curtain photography

- Project asset: `public/images/curtain-natural.webp` (1120 × 1400; 68,382 bytes).
- Creation tool: built-in OpenAI image generation; created 2026-09-05. This is an AI-generated interior example, not an actual installation portfolio photo.
- Original preserved at `/Users/studio/.codex/generated_images/01a07199-dae9-7bd1-b0bc-11660b43e5d9/exec-03781753-0bcf-40f0-b6b4-f042115308de.png`.
- Inspected the generated photo and optimized a project copy with Sharp, width 1120, WebP quality 85. All website references use the project copy.
- Prompt:

> Use case: photorealistic-natural. Asset type: editorial interior photo for the right side of a premium Korean curtain quotation helper website. Primary request: one beautiful photoreal portrait 4:5 photograph of a contemporary Korean apartment living room. Subject: full-height white sheer curtains in the center across a generous window with a soft light beige drape gathered at the right. Warm pale oak floor, only a small corner of a pale cream sofa at bottom-left. Soft natural daylight filters through realistically textured translucent white fabric, balanced neutral tones with a slight cool blue cast in the daylight. Straight architectural verticals, slightly oblique view, calm understated editorial interior photography, no visual clutter, no dramatic staged decorations. Show the full fall and delicate repeated folds of curtains, floor at bottom. Constraints: no text, no logos, no watermark, no people; authentic natural materials and lighting, not a 3D render.

## Global website font · 2026-09-07

- Font: NanumSquare Neo variable from [NAVER's official distribution](https://campaign.naver.com/nanumsquare_neo/).
- The unmodified WOFF2 was extracted from the official `NaverNanumSquareNeo.zip` archive and saved as `public/fonts/NanumSquareNeo-Variable.woff2` (1,529,292 bytes). It contains 12,250 glyphs and a `wght` axis spanning 100–900. The Korean/Latin letters, digits and symbols used in the home UI were checked against its glyph map.
- `app/layout.tsx` loads the asset through `next/font/local` with `display: swap`, preload and the root CSS variable `--font-nanum-square-neo`. `--font-sans` applies it throughout public and admin pages, including native form controls and portal dropdowns. Font requests are served by this project rather than a remote font CDN.
- The distribution source and its use notice are recorded in `public/fonts/LICENSE-NanumSquareNeo.txt`. The existing unused PDF module and its font remain separate from the website.

## PDF Korean font

- Source: official [Noto CJK project](https://github.com/notofonts/noto-cjk), `Sans/Variable/TTF/Subset/NotoSansKR-VF.ttf`.
- Distribution license: SIL Open Font License 1.1, copied to `public/fonts/OFL-NotoSansKR.txt`.
- Static instance: `public/fonts/NotoSansKR-Regular.ttf`, instantiated from the original variable font with FontTools at `wght=400`. All original glyph coverage is retained. The static TTF is approximately 5.9 MiB; generated PDF files embed only the glyphs actually used. TTF is intentional: a smaller WOFF variant stalled in the current PDF renderer, while this TTF passed the rendering fixtures in approximately one second.
- The PDF font is served locally and is fetched only when PDF generation is requested. See `lib/pdf.tsx` for the shared browser and QA document renderer.

## PDF QA

Run `node scripts/run-pdf-qa.mjs` to create single-window, multi-room and 20-window fixtures under ignored `tmp/pdfs/`. Render those files with Poppler to review Korean glyphs, tables, pagination and clickable links. The runner bundles the TSX entry as ESM using the installed esbuild dependency. These fixtures use invented measurements, not customer records.

Verified on 2026-09-05 with Poppler page renders and pypdf extraction: one window produces 1 page, six rooms/14 windows produce 4 pages, and one room/20 windows produces 2 pages. Every rendered page was reviewed for Korean glyphs, header/footer placement, table grouping, clipping and page numbering. The original affiliate URL is present as a clickable link annotation in each generated document; `240.5 cm` measurements and all page numbers were checked in extracted text.

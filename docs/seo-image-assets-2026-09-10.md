# 커튼 가이드 생성 이미지 제작 기록

제작일: 2026-09-10 KST. 사용자의 이미지 생성 및 페이지 구현 요청에 따라 built-in image_gen 도구로 개별 이미지 6종을 새로 생성했다. API 키 또는 외부 스톡 사진을 사용하지 않았다.

## 스타일과 사용 범위

아이보리·원목·청회색을 공통으로 쓰고 신혼집에 세이지색을 더했다. 전문 시공 실적, 실제 상품 사진, 제품 차광 성능의 증거로 사용하지 않는다. 페이지에는 대체 텍스트와 AI 스타일 예시 설명을 제공한다. 실측 기준·빛샘 위치·낮과 밤 비침 차이는 별도의 SVG 설명 도해와 본문으로 안내한다.

- 홈: 거실·침실·신혼집 카드에 공간 이미지 3종.
- 가이드 허브: 거실 대표 이미지와 주제별 카드 이미지 6종.
- 카테고리 6개, 글 10개: 해당 주제의 대표 이미지.
- 서비스 안내: 상담 준비 이미지.
- Open Graph·Twitter·Article 구조화 데이터: 해당 페이지의 주제 이미지와 일치하도록 연결.

## 파일 처리

도구가 만든 원본은 1536 × 1024 PNG다. 원본은 아래 생성 폴더에 그대로 보존하고, 작업 폴더의 `output/imagegen/originals/`에도 복사했다. 웹용은 sharp로 크기 변경이나 자르기 없이 WebP quality 82, effort 6으로 변환했다. 실제 화면에서만 CSS object-fit으로 카드·표지 비율에 맞춘다.

Next Image에 원본 크기와 화면별 sizes를 지정했다. 각 읽기 페이지의 대표 이미지만 preload하고 나머지 카드는 기본 지연 로딩한다. 이미지 원본 크기를 지정하여 렌더링 전에 비율을 알 수 있도록 했다. 실제 네트워크 전송량은 Next 이미지 최적화 및 기기 해상도에 따라 달라진다.

원본 생성 폴더:
`/Users/studio/.codex/generated_images/01a088ff-4d1d-7cc2-a0d9-af1aa872c3e1/`

| 주제          | 원본 PNG                                        | 최종 웹 자산                                      |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| living-room   | `exec-88606d91-fe2a-46fc-bb18-23ae13e8ce54.png` | `public/images/editorial-living-room-2026.webp`   |
| bedroom       | `exec-b1216afe-9899-42e1-93ac-92783e2f2f74.png` | `public/images/editorial-bedroom-2026.webp`       |
| newlywed-home | `exec-280401d6-1720-4b64-b277-f63ce8620f72.png` | `public/images/editorial-newlywed-home-2026.webp` |
| interior      | `exec-29817b48-6c21-4c5a-87ce-b189b3235211.png` | `public/images/editorial-interior-2026.webp`      |
| installation  | `exec-fd41cd04-08cf-4eab-b32e-8733b9548483.png` | `public/images/editorial-installation-2026.webp`  |
| companies     | `exec-fe3846a8-799f-4ad2-99a0-fc6d69862f76.png` | `public/images/editorial-companies-2026.webp`     |

## 프롬프트와 디자인 명세

거실 항목은 사용한 디자인 명세를 요약한 것이며 원문 프롬프트라고 주장하지 않는다. 나머지 항목은 도구 호출에 전달한 프롬프트다.

### living-room

Design specification (not a verbatim prompt): a photorealistic attainable Korean apartment living room, ivory sheer curtains and muted slate-blue drapes around a tall central window, pale oak and a low light sofa, soft daylight, tactile cloth, coherent warm ivory / oak / blue-gray palette. Landscape 3:2, centered curtains suitable for wide and square crops. No people, writing, logos, watermark; a style illustration rather than actual project photography.

### bedroom

Use case: photorealistic-natural. Asset type: landscape 3:2 editorial cover for a Korean curtain guidance website. Make one professionally photographed tranquil, attainable modern apartment bedroom, framed at eye level with straight architectural verticals. Main subject a large window in the center-left with substantial muted slate-blue woven drapes, soft ivory sheer underlayer visible at the small opening. Low oak bed at right with ivory linen bedding, restrained small oak nightstand, soft indirect daylight and a warm subtle bedside lamp. Fabric folds and weave highly tactile and realistic, calm cream, warm oak and blue-gray palette, no pitch-black claim. Curtains should dominate and remain readable in a center square crop, photographic natural range not CGI, not excessively luxurious. No people, text, logos, watermark, split panels. This is an interior design illustration, not an actual installation or demonstration of measured blackout performance.

### newlywed-home

Use case: photorealistic-natural. Asset type: landscape 3:2 editorial interior cover for Korean curtain guide. Create one warm, refined but attainable newlywed apartment dining and living nook. Main subject centered tall window with soft ivory sheer and muted sage-gray curtains drawn aside, convincing ceiling track and natural fabric folds. Small round light-oak table and two simple curved oak chairs nearby, glimpse of an ivory sofa, cream plaster walls, few ceramic objects, no busy decoration. Soft late morning indirect daylight, high quality architectural photography with straight verticals, real fabric texture, believable Korean apartment proportions. Window and curtains dominate central 60% for square card cropping. Consistent creamy ivory / pale oak / quiet gray-green palette with gentle contrast, no orange grading. No people, logos, lettering, watermarks, collage. Illustrative style concept rather than client project photography.

### interior

Use case: photorealistic-natural. Asset type: landscape 3:2 editorial textile detail image for a Korean curtain material guide. One close, beautiful tactile photograph of three hanging curtain layers next to a softly lit window: fine translucent ivory sheer, matte warm oatmeal linen-look weave, heavier muted blue-gray tightly woven fabric. Show full rich vertical folds filling most of frame, focus on visible weave and edges, background is a simple softly out-of-focus warm ivory interior and pale oak. Natural side daylight, restrained editorial color and photographic detail, soft but realistic shadows, no excessive glossy texture. Composition readable as a wide header and central square crop. No people, hands, logos, text, tags, numbers, charts, measuring tools, split panels or watermarks. This visual is an example of textile appearance, not a physical transparency or blackout performance comparison.

### installation

Use case: photorealistic-natural. Asset type: landscape 3:2 editorial photograph for a Korean curtain installation preparation guide. Create one believable close-up architectural detail of the upper corner of a tall modern apartment window. A clean recessed ceiling curtain box contains two slim white parallel curtain tracks; ivory sheer fabric is suspended from the window-side track, muted blue-gray woven drape from the room-side track. The tracks and attached curtain tops are clearly visible with simple plausible consistent hooks, while soft vertical folds fill the center-right. View diagonally upward just enough to see the relationship of ceiling recess, tracks, window frame and fabric, not an exploded diagram or how-to assembly. Ivory plaster wall and soft natural daylight, refined warm neutral/slate-blue editorial photography, crisp textile texture. Composition balanced and clean for a broad web header and square crop. No people, hands, tools, labels, text, logos, watermark, impossible floating hardware. Interior style illustration, not an exact engineering specification or actual project evidence.

### companies

Use case: photorealistic-natural. Asset type: landscape 3:2 editorial still life photo for a Korean curtain quotation preparation guide. One elegant realistic composition on a light oak tabletop beside an ivory sheer-curtained window: overlapping generous curtain fabric samples in ivory sheer, oatmeal weave, muted slate-blue and pale sage; a simple blank open off-white notebook with completely empty pages and a graphite pencil; compact closed plain metal tape measure near the notebook. No writing, prices, charts or visible ruler numbers. The textile swatches and blank planning page fill central area so crop works square or wide. Soft diffuse side daylight, subtle natural shadows, tactile fibers and wood grain, warm ivory and desaturated blue-gray palette matching high-end yet attainable interiors editorial. Three-quarter overhead angle, clean and practical, no extravagant decor. No people, hands, branding, labels, watermark or collage. Illustration of consultation preparation, not an actual quote or product catalog.

## 확인 범위

생성 결과 6종을 시각적으로 확인하고, 웹 자산의 형식·크기·파일 존재 여부를 확인했다. 생성 이미지와 실측 설명을 구분하도록 캡션을 넣었다. 최종 페이지 통합 검증과 배포 상태는 [SEO 및 콘텐츠 구현 기록](seo-implementation-2026-09-10.md)을 참조한다.

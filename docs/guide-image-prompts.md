# 공간별 가이드 이미지 제작 프롬프트

제작일: 2026-09-07. 내장 `image_gen`을 사용한 생성 이미지입니다. 실제 시공 사례 사진이 아닙니다. 홈 두 번째 섹션의 각 제목에 맞는 서로 다른 공간을 묘사하며, 화면에는 별도 배지를 추가하지 않습니다.

납품 위치:

- 거실: `public/images/guide-living-room.webp`
- 침실: `public/images/guide-bedroom.webp`
- 신혼집: `public/images/guide-newlywed-home.webp`

각 파일은 1200×800 WebP로 프로젝트 내부에서 제공합니다. 기존 가이드 제목·문구·링크·레이아웃은 유지합니다. 아래는 내장 도구에 전달한 최종 프롬프트 원문입니다.

## living

```text
Use case: photorealistic-natural. Asset type: a photographic guide thumbnail for a Korean custom curtain website. Produce a single landscape 3:2 image, 1536x1024 if supported. Refined natural editorial interior photography, believable contemporary Korean apartment proportions, soft natural light, warm ivory walls and light oak, realistic woven fabric detail, clean but lived-in simplicity. Match a calm light ivory/sage website palette. Curtain fabric and the room's purpose must be immediately legible, including in a small central square crop and a shallow horizontal crop. Frame at eye level, straight architectural verticals, no fisheye, no extreme wide angle. Keep the essential furniture and curtains together near the center and middle-height band. No text, letters, watermark, logo, labels, collage, border, people, luxury mansion staging, floating furniture or CGI sheen.
Primary request: a bright LIVING ROOM with white sheer chiffon curtains softly diffusing broad daylight through a wide apartment window. Include a light neutral fabric sofa with its seat/back visible beside the window and a simple low oak coffee table, enough furniture to read clearly as a living room. Large softly glowing sheer curtain folds are the main fabric feature, supported by subtle warm beige side panels. A spacious airy feeling, soft clean sunshine without blown-out white detail. The central square crop must retain both the sofa and curtain fabric. This image accompanies the Korean heading 거실커튼 and the meaning 'gentle sunlight, an open feeling'.
```

## bedroom

```text
Use case: photorealistic-natural. Asset type: a photographic guide thumbnail for a Korean custom curtain website. Produce a single landscape 3:2 image, 1536x1024 if supported. Refined natural editorial interior photography, believable contemporary Korean apartment proportions, soft natural light, warm ivory walls and light oak, realistic woven fabric detail, clean but lived-in simplicity. Match a calm light ivory/sage website palette. Curtain fabric and the room's purpose must be immediately legible, including in a small central square crop and a shallow horizontal crop. Frame at eye level, straight architectural verticals, no fisheye, no extreme wide angle. Keep the essential furniture and curtains together near the center and middle-height band. No text, letters, watermark, logo, labels, collage, border, people, luxury mansion staging, floating furniture or CGI sheen.
Primary request: a calm BEDROOM with a neatly made double bed in ivory linen and substantial warm taupe-beige blackout curtains on the nearby window. Make the bed, pillows and dense opaque curtain folds both clearly visible in the central composition. A small part of the curtain is open, allowing restrained warm daylight through an inner sheer layer; the dominant mood is restful, soft, sheltered and slightly dimmer than a living room, but crisp and not dark or gloomy. Modest simple oak bedside furniture, no clutter. Bed and curtains should occupy the center-middle band and survive a central square crop. This image accompanies the Korean heading 침실커튼 and the meaning 'coziness for a restful room'.
```

## newlywed

```text
Use case: photorealistic-natural. Asset type: a photographic guide thumbnail for a Korean custom curtain website. Produce a single landscape 3:2 image, 1536x1024 if supported. Refined natural editorial interior photography, believable contemporary Korean apartment proportions, soft natural light, warm ivory walls and light oak, realistic woven fabric detail, clean but lived-in simplicity. Match a calm light ivory/sage website palette. Curtain fabric and the room's purpose must be immediately legible, including in a small central square crop and a shallow horizontal crop. Frame at eye level, straight architectural verticals, no fisheye, no extreme wide angle. Keep the essential furniture and curtains together near the center and middle-height band. No text, letters, watermark, logo, labels, collage, border, people, luxury mansion staging, floating furniture or CGI sheen.
Primary request: a welcoming compact shared home for a newly married couple, visually distinct from a sofa-focused living room and a bed-focused bedroom. An intimate ROUND LIGHT-OAK DINING TABLE with TWO chairs, two plain ceramic cups, and a tiny understated vase sits close to the apartment window. Behind it, elegant floor-length layered curtains combine warm cream sheers with very muted light sage fabric side curtains, creating an inviting balanced mix of two tastes. Clearly show the table and two chairs together with the curtains in the middle of the composition; keep these elements readable in a central square crop. Warm late morning daylight, tasteful and modest, everyday home rather than a wedding venue. No wedding decorations, no flowers dominating, no extra chairs. This image accompanies the Korean heading 신혼집커튼 and the meaning 'two people's tastes in one space'.
```

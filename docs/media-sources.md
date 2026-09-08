# 홈 커튼 미디어 출처와 제작 기록

최근 확인·제작일: 2026-09-07

## 홈 두 번째 섹션의 공간별 이미지

기존의 `curtain-natural.webp` 한 장을 세 카드에 반복하던 구성을 교체했습니다. 내장 `image_gen`으로 각 제목에 맞는 서로 다른 공간을 제작했으며 실제 시공 사례 사진을 의미하지 않습니다. [최종 제작 프롬프트](guide-image-prompts.md)에 각 이미지의 요청 원문을 보관합니다.

| 파일 (`public/images/` 기준) | 공간과 커튼                                       | 해상도     | 크기 (바이트) |
| ---------------------------- | ------------------------------------------------- | ---------- | ------------: |
| `guide-living-room.webp`     | 밝은 거실, 넓은 창의 흰 쉬폰과 소파               | 1200 × 800 |        83,224 |
| `guide-bedroom.webp`         | 침대가 보이는 차분한 침실, 베이지색 암막과 속커튼 | 1200 × 800 |        60,172 |
| `guide-newlywed-home.webp`   | 두 의자가 있는 원형 식탁, 크림·세이지색 이중커튼  | 1200 × 800 |        63,296 |

생성 원본은 각각 1536 × 1024 PNG입니다. 구도·색상 편집 없이 동일한 3:2 비율로 축소하고 Sharp의 WebP 품질 88, effort 6으로 인코딩했습니다. 세 파일 합계는 206,692바이트이며 브라우저에는 Next Image의 반응형 최적화본을 제공합니다. 이전 정지 이미지·첫 섹션 배경 영상은 수정하지 않았습니다.

생성 원본 보관 위치는 `/Users/studio/.codex/generated_images/01a07597-35fe-7932-a60e-a233702ee567/`입니다.

- 거실: `exec-7c7cfa8f-43c0-4dc8-b89b-3f1d1bb0944a.png`
- 침실: `exec-f8a83a9b-f696-4cc0-97ef-26324abe0477.png`
- 신혼집: `exec-15085af6-da99-47b4-9938-006cc0a2c15d.png`

## 현재 홈 도우미 배경

홈 첫 섹션의 중앙 안내와 견적 준비 입력 화면을 위한 실제 쉬폰 커튼 루프입니다. **새 촬영 원본으로 교체한 것이 아니라, 기존 Alef Morais의 4K 원본을 다른 구도와 시간 구간으로 재편집했습니다.** 커튼이 중앙을 넓게 덮는 구간을 선택하고 벽과 야외 풍경을 덜어내어 콘텐츠 뒤의 밝기와 구성을 단순하게 만들었습니다. 자연광과 직물의 원래 결을 유지하며 블러·백색 막·인위적인 업스케일을 영상에 적용하지 않았습니다. 중앙 안내와 입력 폼의 가독성은 화면의 반투명 배경 면으로 조정합니다.

홈에는 도우미 뒤의 단일 `LoopVideo` 배경만 있으며 로컬 영상과 같은 첫 프레임의 포스터를 사용합니다. 1023px 이하에서는 별도 세로 영상과 모바일 포스터를 선택합니다. 모션 감소·데이터 절약·자동재생 차단 시 포스터를 표시하는 동작을 유지합니다. 기존 `curtain-sheer-hd`, 저해상도 쉬폰·린넨 영상, 생성 정지 이미지 `curtain-hero.webp`는 제작 기록으로 보관하며 현재 홈 배경에서는 사용하지 않습니다.

## 현재 원본과 이용 조건

- 원본: Alef Morais, [Elegant Sheer Curtains in Sunlit Interior](https://www.pexels.com/video/elegant-sheer-curtains-in-sunlit-interior-38675645/), Pexels 38675645.
- 실제 확보 원본: 3840 × 2160, 약 12.17초, 약 29.84fps, 16,490,499바이트. H.264, `yuv420p`, BT.709.
- 원본 CDN: <https://videos.pexels.com/video-files/38675645/16428603_3840_2160_30fps.mp4>.
- 원본은 2026-09-06 확보·확인했고 [Pexels License](https://www.pexels.com/license/)는 2026-09-07 다시 확인했습니다. 웹사이트에서 무료 이용과 편집이 허용되며 출처 표기는 필수가 아닙니다. 원본의 재판매·스톡 플랫폼 재배포·제휴나 보증 암시는 허용되지 않습니다.
- 실제 촬영된 스타일 예시이며 커튼 명장 마스터즈의 실제 시공 사례나 작가의 제휴·보증으로 표시하지 않습니다.

## 현재 납품 파일

| 파일 (`public/` 기준)                               | 해상도      | 크기 (바이트) |
| --------------------------------------------------- | ----------- | ------------: |
| `videos/curtain-helper-daylight.mp4`                | 2560 × 1440 |     2,860,423 |
| `videos/curtain-helper-daylight-mobile.mp4`         | 1080 × 1920 |     1,770,730 |
| `images/curtain-helper-daylight-poster.webp`        | 2560 × 1440 |        44,562 |
| `images/curtain-helper-daylight-mobile-poster.webp` | 1080 × 1920 |        30,396 |

두 MP4는 정확히 4.5초, 24fps, 108프레임, H.264 High, `yuv420p`, BT.709, limited range입니다. CRF 20 / `preset slow`를 사용하고 오디오·원본 메타데이터를 제거했으며 `faststart`를 적용했습니다.

## 현재 편집과 재생성

- 데스크톱: 원본의 `x=440, y=360`에서 2560 × 1440을 크롭했습니다. 크롭 후 해상도를 늘리거나 줄이지 않았습니다.
- 모바일: 원본의 `x=1050, y=0`에서 1216 × 2160을 크롭하고 Lanczos로 1080 × 1920으로 축소했습니다.
- 시간: 원본 3–8.25초를 선택했습니다. 3–3.75초를 연결용 시작 구간으로 분리하고 3.75–8.25초를 본편으로 사용합니다. 출력 3.75초부터 마지막 0.75초를 시작 구간으로 교차 페이드하여 총 4.5초로 연결합니다. 자연 속도를 유지하며 역재생하지 않습니다.
- 영상 전체에 노출·색감 보정, 블러, 샤프닝, 백색 막을 추가하지 않았습니다. BT.709 limited range는 원본과 일치하는 명시적 인코딩 태그입니다.
- 각 포스터는 해당 최종 인코딩 MP4의 첫 프레임에서 `libwebp` 품질 90, 압축 단계 6으로 추출했습니다.

아래 함수는 FFmpeg 7.1 기준입니다. 원본을 작업 폴더에 확보한 뒤 실행합니다. FFmpeg는 앱 실행·빌드 의존성에 추가하지 않았습니다.

```sh
make_helper_loop() {
  output_name="$1"
  crop_filter="$2"
  ffmpeg -i sunlit-sheer-38675645-source.mp4 \
    -filter_complex "[0:v]trim=start=3:end=8.25,setpts=PTS-STARTPTS,${crop_filter},setsar=1,split=2[a][b];[a]trim=start=0.75:end=5.25,setpts=PTS-STARTPTS,fps=24[main];[b]trim=start=0:end=0.75,setpts=PTS-STARTPTS,fps=24[head];[main][head]xfade=transition=fade:duration=0.75:offset=3.75,format=yuv420p[v]" \
    -map '[v]' -an -map_metadata -1 -map_chapters -1 \
    -c:v libx264 -preset slow -crf 20 -profile:v high -pix_fmt yuv420p \
    -color_range tv -colorspace bt709 -color_trc bt709 -color_primaries bt709 \
    -movflags +faststart -threads 4 -r 24 -frames:v 108 \
    "public/videos/${output_name}.mp4"
  ffmpeg -i "public/videos/${output_name}.mp4" -frames:v 1 \
    -c:v libwebp -quality 90 -compression_level 6 -map_metadata -1 \
    -update 1 "public/images/${output_name}-poster.webp"
}
make_helper_loop curtain-helper-daylight 'crop=2560:1440:440:360'
make_helper_loop curtain-helper-daylight-mobile 'crop=1216:2160:1050:0,scale=1080:1920:flags=lanczos'
```

## 현재 파일 검증

- 두 영상의 전체 108프레임을 오류 없이 디코딩했고 실제 해상도·24fps·4.5초·무음 스트림을 확인했습니다.
- MP4 최상위 상자가 두 파일 모두 `ftyp / moov / free / mdat` 순서여서 재생 메타데이터가 앞에 있습니다.
- 포스터를 실제 해상도로 열어 확인하고, 영상 전체의 0.5초 간격 프레임 및 시작·교차 페이드·종료 경계 프레임을 시각적으로 검토했습니다.
- 160 × 90 회색조 비교에서 마지막→첫 프레임 MAE는 데스크톱 3.6778, 모바일 3.1609입니다. 일반 인접 프레임 최대 차이인 4.6065, 6.8238 이내였습니다. 이 수치는 시각 검토를 보완하며 브라우저에서의 가독성·연속 재생 확인을 대체하지 않습니다.
- 통합 브라우저 검증에서 1440 × 900 화면은 2560 × 1440 편집본, 320 × 568 화면은 1080 × 1920 편집본을 재생하며 각 포스터에서 영상으로 전환되는 것을 확인했습니다.

## 추가 영상 후보 검토

2026-09-07 새 공개 원본도 확인했으나 현재 중앙 안내 배경에 더 적합하지 않아 채택하지 않았습니다. Pexels [30286553](https://www.pexels.com/video/serene-indoor-view-with-sunlit-curtains-30286553/)은 1920 × 1080이지만 인물·창틀·야외 대비가 중심에 있고, [34270165](https://www.pexels.com/video/serene-view-through-sheer-white-curtains-34270165/)는 2160 × 3840이지만 회색 직물과 창틀 대비가 강했습니다. 그 결과 원래 확보한 4K 원본을 중앙 커튼 중심으로 재편집하는 방향을 선택했습니다. 아래는 이전 편집본의 역사 기록입니다.

## 이전 넓은 구도의 쉬폰 배경 원본과 이용 조건

- 원본: Alef Morais, [Elegant Sheer Curtains in Sunlit Interior](https://www.pexels.com/video/elegant-sheer-curtains-in-sunlit-interior-38675645/), Pexels 38675645.
- 확보한 실제 원본: 3840 × 2160, 약 12.17초, 약 29.84fps, 16,490,499바이트.
- 원본 CDN: <https://videos.pexels.com/video-files/38675645/16428603_3840_2160_30fps.mp4>.
- [Pexels License](https://www.pexels.com/license/)를 2026-09-06 확인했습니다. 웹사이트에서의 무료 이용과 편집을 허용하며 출처 표기는 필수가 아닙니다. 유지보수와 작가 크레딧을 위해 출처를 보관합니다.
- 실제 촬영된 커튼 연출의 스타일 예시입니다. 커튼 명장 마스터즈의 시공 사례나 작가의 제휴·보증으로 표시하지 않습니다.

## 이전 넓은 구도의 쉬폰 배경 납품 파일

| 파일 (`public/` 기준)                        | 해상도      | 크기 (바이트) |
| -------------------------------------------- | ----------- | ------------: |
| `videos/curtain-sheer-hd.mp4`                | 2880 × 1620 |     4,774,334 |
| `videos/curtain-sheer-hd-mobile.mp4`         | 1080 × 1920 |     2,182,312 |
| `images/curtain-sheer-hd-poster.webp`        | 2880 × 1620 |        63,238 |
| `images/curtain-sheer-hd-mobile-poster.webp` | 1080 × 1920 |        29,542 |

두 MP4는 H.264 High, `yuv420p`, BT.709, 24fps, 174프레임, 정확히 7.25초입니다. `libx264`의 `preset slow`, CRF 21을 사용하고 오디오를 제거했으며 `faststart`를 적용했습니다.

## 이전 넓은 구도의 쉬폰 배경 편집 방법

- 데스크톱: 3840 × 2160 원본에서 좌상단 기준 `x=0, y=180`의 3200 × 1800 영역을 자른 뒤 Lanczos로 2880 × 1620으로 축소했습니다.
- 모바일: 원본에서 `x=900, y=0`의 1216 × 2160 영역을 자른 뒤 Lanczos로 1080 × 1920으로 축소했습니다. 모바일 영상과 포스터에 동일한 구도를 적용합니다.
- 시간 구간: 원본의 2.5–10.5초를 사용합니다. 시작 0.75초인 2.5–3.25초를 반복 연결 구간으로 분리하고, 3.25–10.5초를 본편으로 삼습니다. 본편 출력의 6.5초부터 마지막 0.75초를 시작 구간으로 교차 페이드한 뒤 7.25초로 끝내어 반복 연결을 맞췄습니다.
- 노출·색상·블러·백색 막 필터, 역재생, 속도 변경은 적용하지 않았습니다.
- 각 포스터는 최종 인코딩된 해당 MP4의 첫 프레임에서 `libwebp` 품질 90, `compression_level 6`으로 추출했습니다. 화면 폭에 맞는 영상과 포스터를 함께 선택하므로 재생 전후의 구도를 일치시킵니다.

## 이전 넓은 구도의 쉬폰 배경 파일 검증

- 두 편집본의 174프레임 전체를 오류 없이 디코딩했습니다.
- 두 파일의 MP4 최상위 상자 순서가 `ftyp / moov / free / mdat`인 것을 확인해 빠른 재생 시작에 필요한 메타데이터가 앞에 있음을 검증했습니다.
- 두 포스터의 실제 해상도를 확인하고 반복 경계의 프레임을 시각적으로 검토했습니다.
- 낮은 해상도로 비교한 경계 밝기의 평균 절대 차이(MAE)는 데스크톱 3.2228, 모바일 4.3254입니다. 각각 일반 인접 프레임의 최대 차이 4.1822, 6.6088 이내였습니다. 이 수치는 프레임 시각 검토를 보완하며 브라우저에서의 가독성·재생 확인을 대체하지 않습니다.

## 기존 영상 원본과 이용 조건

| 사용 위치                          | 원본                                                                                                     | 작가                                                    | 확보한 원본                 |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------- |
| 이전 첫 섹션 배경 (현재 미사용)    | [A White Curtain in the Sunlight](https://www.pexels.com/video/a-white-curtain-in-the-sunlight-4623746/) | [Artem Podrez](https://www.pexels.com/@artempodrez/)    | 540 × 960, 24fps, 11.29초   |
| 이전 도우미 미리보기 (현재 미사용) | [A Flowing Cloth](https://www.pexels.com/video/a-flowing-cloth-7946521/)                                 | [Hanna Pad](https://www.pexels.com/@anna-nekrashevich/) | 1440 × 2732, 30fps, 11.50초 |

[Pexels License](https://www.pexels.com/license/)는 웹사이트에서의 무료 이용과 편집을 허용하며 출처 표기를 필수로 요구하지 않습니다. 원본 출처는 유지보수와 작가 크레딧을 위해 이 문서에 보관합니다. 영상은 스타일 예시이며 커튼 명장 마스터즈의 실제 시공 사례나 작가의 제휴·보증으로 표현하지 않습니다.

원본 페이지의 재생 자산에서 확인한 공개 CDN 주소:

- 쉬폰: <https://videos.pexels.com/video-files/4623746/4623746-sd_540_960_24fps.mp4>
- 린넨: <https://videos.pexels.com/video-files/7946521/7946521-uhd_1440_2732_30fps.mp4>

쉬폰 영상은 원본 확보 당시 원본 페이지에서 제공하는 최대 해상도가 540 × 960이었습니다. 인코딩 해상도를 인위적으로 늘리지 않고 밝은 배경 영상으로 사용했으나, 현재는 첫 섹션에서 제외했습니다. 두 영상 원본 모두 세로 구도입니다. 이전 린넨 영상은 당시 화면 배치에 따라 `object-fit: cover`로 잘라 표시하며, 외부 영상을 직접 재생하지 않고 아래의 로컬 편집본을 제공했습니다.

## 기존 영상 납품 파일

아래 기존 MP4는 H.264 High / Level 4.0, `yuv420p`, 24fps, 192프레임, 정확히 8초입니다. 오디오 스트림을 제거하고 `faststart`를 적용했습니다. 린넨·쉬폰 파일은 이전 제작 기록으로 보관하며 현재 홈에서는 사용하지 않습니다.

| 파일 (`public/` 기준)              | 해상도     | 크기 (바이트) |
| ---------------------------------- | ---------- | ------------: |
| `videos/curtain-sheer.mp4`         | 540 × 960  |       505,046 |
| `videos/curtain-sheer-mobile.mp4`  | 360 × 640  |       224,429 |
| `videos/curtain-linen.mp4`         | 720 × 1366 |     1,022,139 |
| `videos/curtain-linen-mobile.mp4`  | 480 × 910  |       467,237 |
| `images/curtain-sheer-poster.webp` | 540 × 960  |         7,404 |
| `images/curtain-linen-poster.webp` | 720 × 1366 |        20,670 |

포스터는 각 데스크톱 편집본의 첫 프레임을 WebP 품질 82로 추출했습니다. 따라서 포스터에서 재생 영상으로 바뀔 때 화면 구도가 달라지지 않습니다.

## 기존 영상 루프 편집과 재생성

원본의 2.5–10.5초 구간을 사용합니다. 출력의 7초 지점부터 마지막 23/24초 동안 원본 1.5–2.5초 구간으로 교차 페이드합니다. 마지막 프레임은 시작 프레임 바로 전 시점으로 이어져 반복 시 급격한 장면 전환을 줄입니다. 영상 역재생이나 속도 변경은 적용하지 않았습니다.

FFmpeg 7.1을 임시 작업 환경에서 사용했으며 애플리케이션 실행·빌드 의존성에는 추가하지 않았습니다. 재생성 시 공식 원본을 임시 작업 폴더에 확보한 뒤 아래 함수에 파일명을 전달합니다.

```sh
make_loop() {
  source_path="$1"
  output_path="$2"
  video_width="$3"
  video_crf="$4"
  ffmpeg -i "$source_path" \
    -filter_complex "[0:v]scale=${video_width}:-2:flags=lanczos,setsar=1,split=2[body][head];[body]trim=start=2.5:end=10.5,setpts=PTS-STARTPTS,fps=24[main];[head]trim=start=1.5:end=2.5,setpts=PTS-STARTPTS,fps=24[restart];[main][restart]xfade=transition=fade:duration=0.958333:offset=7,format=yuv420p[v]" \
    -map '[v]' -an -c:v libx264 -preset slow -crf "$video_crf" \
    -profile:v high -level 4.0 -movflags +faststart -threads 4 \
    -frames:v 192 "$output_path"
}

make_loop curtain-sheer-source.mp4 public/videos/curtain-sheer.mp4 540 23
make_loop curtain-sheer-source.mp4 public/videos/curtain-sheer-mobile.mp4 360 23
make_loop curtain-linen-source.mp4 public/videos/curtain-linen.mp4 720 25
make_loop curtain-linen-source.mp4 public/videos/curtain-linen-mobile.mp4 480 25

ffmpeg -i public/videos/curtain-sheer.mp4 -frames:v 1 \
  -c:v libwebp -quality 82 public/images/curtain-sheer-poster.webp
ffmpeg -i public/videos/curtain-linen.mp4 -frames:v 1 \
  -c:v libwebp -quality 82 public/images/curtain-linen-poster.webp
```

## 기존 영상 제작 시 파일 검증

- 네 영상 전체를 FFmpeg로 디코딩하여 오류 없이 192프레임을 확인했습니다.
- 각 파일의 오디오 스트림이 없고 `moov`가 `mdat`보다 앞에 있어 점진적 재생이 가능한 것을 확인했습니다.
- 시작·종료 연결을 64 × 64 밝기 프레임으로 비교했습니다. 경계의 평균 제곱 차이는 쉬폰 약 7, 린넨 약 10으로 각 영상의 일반 프레임 차이 범위 안에 있습니다. 이 수치는 브라우저에서의 시각 검증을 보완하는 확인값입니다.
- 포스터를 직접 열어 서로 다른 흰 쉬폰·베이지 원단 구도와 정상 디코딩을 확인했습니다.

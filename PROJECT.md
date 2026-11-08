# Project: WonPice Google Store Aesthetic Overhaul

## Architecture
WonPice is a Next.js 16 (Turbopack) statically exported (`output: "export"`) marketing and promotion landing page for the WonPice e-commerce solution. It is deployed to GitHub Pages with `basePath` resolution (`/wonpice`) and routes visitors to two live Cloud Run demo stores and a partner setup application funnel.

### Key Architectural Layers
1. **Design System & Typography Token Layer**: Google Sans / Roboto Flex geometric typography paired with Pretendard Variable for Korean; Tailwind v4 `@theme` design tokens (Google Blue `#1a73e8`/`#0b57d0`, Google Red `#ea4335`, Google Yellow `#fbbc04`, Google Green `#34a853`, Google tonal surfaces `#f8f9fa`, `#f1f3f4`, `#dadce0`, soft elevations).
2. **Global Navigation & Shell**: Sticky GNB with section anchor links, mobile drawer menu, and Google Blue rounded-full pill CTAs.
3. **Hero & Hardware Showcase Stage**: Google Store-style hero layout with generous whitespace, primary/secondary pill buttons, and realistic device/browser studio mockup showcase.
4. **Dual-Industry Solution Showcase**: Tabbed interactive showcases for Food ('제철곳간') and Fashion ('온결') with studio-quality UI mockups (replacing raw emojis), feature metrics, and outbound Cloud Run demo links.
5. **Infrastructure & Value Proposition (Bento Grid)**: Pixel-inspired asymmetric Bento grid cards highlighting 0% commission, PG approval, automated fulfillment, and AI marketing.
6. **Pricing, Eligibility Checker & Partner Onboarding Modal**: MD3-styled 3-tier pricing plans, interactive 3-second eligibility validation checklist, and an embedded Material Design 3 Partner Setup Dialog Modal adhering to the 12-field schema.
7. **FAQ, Channel Routes & Footer**: Clean MD3 accordion items, route-aware channel pages (`/channels/farm`, `/channels/fashion`, `/channels/food`), and trust-focused footer.
8. **E2E Testing Track**: Independent 4-tier requirement-driven test suite validating visual layout, responsiveness, interaction, and partner routing.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Google Sans / Geometric Typography | Load Google Sans/Roboto Flex + Pretendard with proper font metrics & fallbacks | M1 | Survey (Exp 1, 2) |
| 2 | Google MD3 Color System & Theme Tokens | Configure Tailwind v4 `@theme` with Google 4-color palette and tonal surfaces | M1 | Survey (Exp 1, 2) |
| 3 | ESLint Zero-Error Cleanliness | Fix 16 unescaped quote errors in JSX and 2 unused variable warnings | M1 | Survey (Exp 1, 3) |
| 4 | Google Store Header & Sticky GNB | Responsive header with logo, 5 section links, and Google Blue pill CTA | M2 | Survey (Exp 2, 3) |
| 5 | Mobile Navigation Drawer | Hamburger menu with slide-in drawer for smooth mobile navigation | M2 | Survey (Exp 2, 3) |
| 6 | Google Store Hero Section | Spacious headline, eyebrow badge, dual pill CTAs with Google hover micro-interactions | M2 | Survey (Exp 2) |
| 7 | Device & Studio Showcase Stage | Studio-quality browser/device mockup with floating Google tonal chip badges replacing emojis | M2 | Survey (Exp 1, 2) |
| 8 | KPI Metric Ribbon | 4-column clean statistics ribbon (0% commission, 3 days setup, 50% discount) | M2 | Survey (Exp 3) |
| 9 | Dual-Industry Interactive Tab Switcher | Smooth tab switching between Food ('제철곳간') and Fashion ('온결') | M3 | Survey (Exp 1, 3) |
| 10 | Studio-Quality Industry Showcase Mockups | High-fidelity UI cards with product visuals and metrics (zero emojis) | M3 | Survey (Exp 1, 2) |
| 11 | Outbound Live Demo Links | Reliable links to Cloud Run demo stores with proper `target="_blank"` and UTM params | M3 | Survey (Exp 1, 3) |
| 12 | Asymmetric Bento Grid Value Pillars | Google Pixel-style Bento cards for core solution pillars (0% fee, PG, fulfillment) | M3 | Survey (Exp 2, 3) |
| 13 | Channel Route Synchronization | Auto-activate corresponding industry tab on `/channels/fashion`, `/channels/food`, `/channels/farm` | M3 | Survey (Exp 1, 3) |
| 14 | MD3 Pricing Plan Cards | 3-tier pricing cards with signature Google Blue highlighting for Business plan | M4 | Survey (Exp 2, 3) |
| 15 | 3-Second Eligibility Checker | Interactive 3-checkbox checklist with dynamic eligibility feedback and badge | M4 | Survey (Exp 1, 3) |
| 16 | Material Design 3 Partner Setup Modal | 12-field partner application modal with regex validation, honeypot, and submission feedback | M4 | Survey (Exp 3) |
| 17 | Outbound Partner UTM Routing Fallback | Preserve all 9 existing UTM parameters (`?ref=wonpice_*`) for outbound conversion | M4 | Survey (Exp 1, 3) |
| 18 | MD3 Accordion FAQ Section | Smooth expanding FAQ items with subtle Google border transitions and 1:1 consult card | M4 | Survey (Exp 2, 3) |
| 19 | Google Store Footer & Trust Marks | Clean 4-column footer with anchor links, demo links, legal notices, and copyright | M4 | Survey (Exp 1, 3) |
| 20 | 4-Tier E2E Zero-Regression Test Suite | Opaque-box test suite covering T1 features, T2 boundary/mobile, T3 cross-feature, T4 journeys | M-E2E / M5 | Survey (Exp 3) |
| 21 | Adversarial Coverage Hardening (Tier 5) | White-box stress-testing and edge-case verification by Challengers | M5 | Project Pattern |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Google Design System Foundation & Lint Hygiene | Typography loading, Tailwind v4 `@theme` tokens, globals.css, ESLint fix | none | DONE |
| M2 | Navigation & Hero Hardware Showcase Overhaul | GNB with 5 links + mobile drawer, Google Blue pill CTAs, studio device mockup stage | M1 | DONE |
| M3 | Dual-Industry Showcase & Features Transformation | Eliminate emojis, studio-grade store mockups, Cloud Run demo links, Bento grid, channel route sync | M1, M2 | DONE |
| M4 | Pricing, Eligibility Checklist, FAQ & Partner Modal | MD3 pricing cards, interactive checklist, 12-field partner dialog modal, FAQ accordion, footer | M1, M2, M3 | PLANNED |
| M-E2E | E2E Testing Suite (Independent Track) | Automated test harness, Tiers 1-4 test suites, published `TEST_READY.md` | none (Parallel) | DONE |
| M5 | Final Milestone: 100% E2E Pass & Tier 5 Hardening | Phase 1: Pass 100% E2E tests (T1-T4); Phase 2: Tier 5 Adversarial Coverage Hardening | M1..M4, M-E2E | PLANNED |

---

## Interface Contracts
### Design Tokens ↔ Components (`app/globals.css` / `@theme`)
- Font Family:
  - `--font-google-sans`: `"Google Sans", "Product Sans", "Roboto Flex", "Pretendard Variable", sans-serif`
  - `--font-google-text`: `"Google Sans Text", "Roboto Flex", "Pretendard Variable", sans-serif`
- Google 4-Color Palette:
  - Primary / Blue: `#1a73e8` (hover `#1557b0`, active `#174ea6`, tonal container `#e8f0fe`, on-container `#1967d2`)
  - Red: `#ea4335` (tonal container `#fce8e6`)
  - Yellow: `#fbbc04` (darker text `#f29900`, tonal container `#fef7e0`)
  - Green: `#34a853` (tonal container `#e6f4ea`)
- Surface & Border Grays:
  - Surface Background: `#ffffff`
  - Surface Tonal 1: `#f8f9fa`
  - Surface Tonal 2: `#f1f3f4`
  - Outline / Border: `#dadce0`
  - On-Surface (Text Primary): `#202124`
  - On-Surface Variant (Text Secondary): `#5f6368`
- Button Classes:
  - Primary Pill: `bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full font-medium transition-all shadow-sm hover:shadow px-6 py-2.5`
  - Secondary Pill: `bg-white hover:bg-[#f8f9fa] text-[#1a73e8] border border-[#dadce0] rounded-full font-medium transition-all px-6 py-2.5`

### Partner Application Schema (`PartnerApplicationModal.tsx` ↔ Backend/Outbound)
- Form Fields:
  - `company`: string (1..60 chars, required)
  - `name`: string (1..30 chars, required)
  - `phone`: string (regex `/^0\d{1,2}-?\d{3,4}-?\d{4}$/`, required)
  - `email`: string (regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, required)
  - `industry`: enum (`fashion`, `food`, `beauty`, `living`, `b2b`, `other`)
  - `platform`: enum (`none`, `smartstore`, `cafe24`, `imweb`, `godo`, `other`)
  - `productCount`: enum (`s`, `m`, `l`, `xl`)
  - `plan`: enum (`starter`, `business`, `custom`, `undecided`)
  - `launch`: string (max 30 chars, optional)
  - `website`: string (optional, URL format)
  - `message`: string (max 2000 chars, optional)
  - `privacy`: boolean (`true` required)
  - Honeypot: field `hp_website` (must remain empty)
- Outbound Fallback URL:
  - `https://shop-site-950864605215.asia-northeast3.run.app/apply?ref=wonpice_*`

### Channel Routes ↔ DualIndustryShowcase
- Prop `initialIndustry`: `'food' | 'fashion'`
- `/channels/fashion` passes `initialIndustry="fashion"`
- `/channels/food` and `/channels/farm` pass `initialIndustry="food"`
- Default `/` passes `initialIndustry="food"`

---

## Code Layout
```
/home/antigravity/hsbaldwin/wonpice/
├── app/
│   ├── globals.css              # Design tokens, @theme, typography rules
│   ├── layout.tsx               # Font loading, metadata, root HTML
│   ├── page.tsx                 # Root landing page (composes all sections)
│   └── channels/
│       ├── farm/page.tsx        # Specialized SEO channel page
│       ├── fashion/page.tsx     # Specialized SEO channel page
│       └── food/page.tsx        # Specialized SEO channel page
├── components/
│   ├── Navbar.tsx               # GNB header with 5 section links & mobile drawer
│   ├── SolutionHero.tsx         # Hero section with studio device mockup stage
│   ├── DualIndustryShowcase.tsx # Tabbed Food & Fashion showcase (no emojis)
│   ├── SolutionInfrastructure.tsx # Asymmetric Bento grid value pillars
│   ├── SolutionPricing.tsx      # MD3 3-tier pricing cards & eligibility checker
│   ├── PartnerApplicationModal.tsx # 12-field MD3 application modal
│   ├── SolutionFaq.tsx          # MD3 accordion FAQ
│   └── Footer.tsx               # Google Store-styled footer
├── tests/                       # E2E test suite (Tiers 1-4)
│   └── e2e/
│       ├── tier1-features.test.ts
│       ├── tier2-boundary.test.ts
│       ├── tier3-cross-feature.test.ts
│       └── tier4-journeys.test.ts
├── public/                      # Static assets & SVG icons
├── next.config.ts               # Static export configuration
└── package.json                 # Project dependencies & scripts
```

# WonPice E2E Testing Infrastructure (TEST_INFRA)

## 1. Overview & Testing Philosophy

The WonPice E2E testing infrastructure provides an independent, opaque-box, requirement-driven verification harness for the WonPice e-commerce promotion platform.

### Core Principles
1. **Opaque-Box Testing**: All assertions validate the application strictly from the perspective of an external human user or merchant browser. Tests interact through visible text, accessible roles (buttons, links, headings, inputs), standard DOM attributes, HTTP response codes, and rendered viewports. No test relies on React internal state, private component props, or implementation trivia.
2. **Requirement-Driven Specification**: Every test case is derived directly from [ORIGINAL_REQUEST.md](file:///home/antigravity/hsbaldwin/wonpice/.agents/teamwork/ORIGINAL_REQUEST.md) and [PROJECT.md](file:///home/antigravity/hsbaldwin/wonpice/PROJECT.md) § Feature Inventory.
3. **Progressive Testability**: Tests are partitioned across 4 tiers. Tier 1 covers foundational feature existence and baseline happy paths; Tier 2 stresses boundaries and mobile viewports; Tier 3 verifies multi-section state transitions; Tier 4 exercises end-to-end merchant conversion funnels.
4. **Deterministic & Self-Contained**: The harness operates against the statically exported production build (`out/`) served via local HTTP server (`http://localhost:3000`), ensuring 100% parity with GitHub Pages deployment.

---

## 2. Test Runner Architecture

### Tech Stack
- **Runner**: [Playwright](https://playwright.dev/) (`@playwright/test` v1.65.0)
- **Engine**: Chromium (headless shell)
- **Target URL**: `http://localhost:3000` (configurable via `BASE_URL`)
- **Server Harness**: `serve out -p 3000` with automatic reuse of active server instances (`reuseExistingServer: true`)
- **Language**: TypeScript (`.test.ts`) executed natively via Playwright runner

### File Layout
```
/home/antigravity/hsbaldwin/wonpice/
├── playwright.config.ts             # Playwright global harness configuration
├── TEST_INFRA.md                    # Infrastructure architecture & guide (this file)
├── TEST_READY.md                    # Test execution summary & checklist
├── tests/
│   └── e2e/
│       ├── helpers.ts               # Shared test fixtures, mock data & selectors
│       ├── tier1-features.test.ts   # Tier 1: Comprehensive Feature Coverage
│       ├── tier2-boundary.test.ts   # Tier 2: Boundary, Mobile & Input Validation
│       ├── tier3-cross-feature.test.ts # Tier 3: Cross-Feature & Section Interactions
│       └── tier4-journeys.test.ts   # Tier 4: Real-World Merchant User Journeys
└── package.json                     # Runner scripts
```

---

## 3. Four-Tier Test Taxonomy

### Tier 1: Feature Coverage
Validates the presence, visual layout, and happy paths of all features outlined in `PROJECT.md` Feature Inventory:
- **Typography & Theme**: Google Sans / Roboto Flex font family stacks, MD3 4-color palette tokens (#1a73e8 blue, #ea4335 red, #fbbc04 yellow, #34a853 green), surface backgrounds, and border tokens.
- **Global Navigation (GNB)**: Sticky header, brand identity ("WonPice"), section navigation links (솔루션, 인프라, 요금제, FAQ), and primary Google Blue pill CTA.
- **Hero Stage & Studio Mockup**: Headline, subheadline, dual pill buttons (Primary Blue & Secondary outline), studio device mockup presentation, and floating Google tonal badges (zero raw emojis).
- **KPI Metrics Ribbon**: 4-column metric ribbon displaying 0% commission, 3-day launch, 50% discount terms.
- **Dual-Industry Solution Showcase**: Interactive tabs for Food ('제철곳간') and Fashion ('온결') with live Cloud Run outbound links and UTM tags.
- **Infrastructure Bento Grid**: 4 Pixel-inspired value pillar cards (0% fee, PG approval, fulfillment automation, AI marketing).
- **Channel Routes**: Route synchronization on `/channels/fashion`, `/channels/food`, and `/channels/farm`.
- **Pricing & Eligibility**: 3 MD3 pricing tiers (Starter, Business, Custom) with Business badge, plus interactive 3-checkbox eligibility validator.
- **MD3 Partner Application Modal**: 12-field partner dialog modal with input controls, honeypot field, and submit action.
- **Accordion FAQ & Footer**: Smooth expandable FAQ items, 1:1 consultation card, 4-column footer links, and legal notices.

### Tier 2: Boundary & Corner Cases
Tests edge conditions, responsive layouts, and defensive mechanisms:
- **Mobile Viewports (375px & 390px)**:
  - Responsive collapse of GNB into hamburger menu drawer.
  - Verification of no horizontal overflow (`scrollWidth <= clientWidth`).
  - Mobile drawer open, backdrop close, and Escape key dismissal.
  - Multi-column grid graceful downscaling to single-column stack.
- **Input Boundaries & Validation**:
  - Submitting empty partner form triggers field-level validation errors.
  - Phone regex limits (accepts `010-1234-5678`, `02-123-4567`; rejects `1234`, `abc`, `010-abc`).
  - Email regex limits (accepts `name@domain.co.kr`; rejects missing `@`, missing TLD).
  - Privacy checkbox requirement enforcement.
- **Spam Defense (Honeypot)**:
  - Invisible `hp_website` input remains hidden from genuine users.
  - Form detects and traps bot submissions when honeypot is populated.

### Tier 3: Cross-Feature Interactions
Tests state synchronization and navigation across disparate sections:
- **GNB Section Anchor Scrolling**: Clicking GNB navigation links smoothly updates viewport scroll position to corresponding target IDs (`#showcase`, `#infrastructure`, `#pricing`, `#faq`).
- **Tab Switching Dynamic Showcase**: Toggling between Food and Fashion updates mockup graphics, feature metrics, and outbound Cloud Run demo store URLs (`href` + UTM parameters).
- **Checklist Unlocking Partner CTAs**: Checking eligibility criteria dynamically updates discount badge and contextualizes partner CTA modal triggers.
- **Modal Trigger Propagation**: Triggering partner modal from Hero, GNB, Pricing cards, or FAQ passes correct plan/industry initial context.

### Tier 4: Real-World Merchant Journeys
Simulates complete, uninterrupted merchant end-to-end workflows:
- **Journey 1 (Food Merchant / '제철곳간')**: Farmer/producer lands on site, examines agricultural e-commerce demo, validates 50% discount eligibility, triggers partner application, fills valid form, and receives confirmation.
- **Journey 2 (Fashion Brand / '온결')**: Apparel brand founder explores modern lookbook showcase, compares Business pricing plan, opens modal with Business pre-selected, submits partner application.
- **Journey 3 (Skeptical Mobile Merchant Due Diligence)**: Visitor on 390px viewport audits 0% fee claim, inspects multiple FAQ accordion answers, navigates channel pages, and requests 1:1 consultation.

---

## 4. Invocation Commands & NPM Scripts

All test commands can be executed from the project root:

| Command | Description |
|---|---|
| `npm run test:e2e` | Run entire 4-tier E2E test suite |
| `npm run test:e2e:tier1` | Run Tier 1: Feature Coverage suite |
| `npm run test:e2e:tier2` | Run Tier 2: Boundary & Mobile suite |
| `npm run test:e2e:tier3` | Run Tier 3: Cross-Feature suite |
| `npm run test:e2e:tier4` | Run Tier 4: Real-World Merchant Journeys |
| `npx playwright test --ui` | Launch interactive Playwright UI mode |
| `npx playwright show-report`| View HTML test execution report |

### Environment Variables
- `BASE_URL`: Target server URL (default: `http://localhost:3000`).
- `CI`: When set, enables strict single-worker run with retries.

---

## 5. Pass / Fail Semantics

- **PASS**: All assertions across DOM presence, visual attributes, form states, and navigation succeed within the 5000ms assertion timeout.
- **FAIL**: Any unhandled exception, missing element, timeout, or unexpected DOM state triggers an immediate failure with screenshot capture in `test-results/`.
- **Exit Code**: Non-zero on any failing test; zero on 100% pass.

---
name: clone-website
description: "Reverse-engineer and clone one or more websites as pixel-perfect Next.js replicas with shadcn/ui and Tailwind CSS v4"
---

# Clone Website

You are an expert reverse-engineering and frontend architecture agent tasked with cloning target URLs into a pixel-perfect Next.js 16 application using Tailwind CSS v4 and shadcn/ui.

---

## Pre-Flight & Workspace Initialization

### Step 0: Workspace Verification & Auto-Scaffolding
Before inspecting or writing code, check if the current project workspace contains a Next.js application (check for `package.json` with Next.js and `src/app/layout.tsx`):
1. If the workspace is empty or lacks Next.js, run the bundled scaffolding script:
   ```bash
   node plugins/website-cloner/skills/clone-website/scripts/scaffold.mjs
   ```
2. Verify the base project compiles cleanly:
   ```bash
   npm run build
   ```

### Step 1: Port Availability Verification
Always verify that port 3000 (or the targeted dev port) is free before starting the dev server or QA verification:
```bash
node plugins/website-cloner/skills/clone-website/scripts/check-port.mjs --port 3000
```
If occupied by a stale dev process, free it automatically:
```bash
node plugins/website-cloner/skills/clone-website/scripts/check-port.mjs --port 3000 --kill
```

### Step 2: Browser Automation & Fallback Check
1. **Check for Browser MCP**: Look for active browser tools (`chrome_mcp`, `playwright`, `puppeteer`, `browser_action`, etc.).
2. **Headless Fallback**: If no Browser MCP tool is active, run the bundled extractor:
   ```bash
   node plugins/website-cloner/skills/clone-website/scripts/extract-browser.mjs <target-url> --out docs/research/raw-extraction.json
   ```
   and use web search / URL content reading tools to fetch HTML, CSS, assets, and metadata.

### Step 3: Authenticated Login & Dashboard Crawling (If Target Requires Auth)
When cloning pages behind a login wall, portal, or user dashboard:
1. Launch an interactive browser session for the user to log in (supports Google, GitHub, SAML, 2FA):
   ```bash
   node plugins/website-cloner/skills/clone-website/scripts/interactive-auth.mjs <login-url>
   ```
2. Once the user logs into their dashboard, the session is preserved and the plugin crawls and catalogs all authenticated subpages:
   ```bash
   node plugins/website-cloner/skills/clone-website/scripts/crawl-authenticated.mjs
   ```
3. Proceed to extract tokens and build each dashboard route under `src/app/dashboard/...` or target routes.

---

## Phased Cloning Pipeline

### Phase 1: Reconnaissance & Behavior Sweep
1. **Visual Audit**: Capture desktop (1440px), tablet (768px), and mobile (390px) screenshots of the target site. Save under `docs/design-references/<site-key>/`.
2. **Interaction Sweep**:
   - Scroll slowly through the page to detect sticky headers, reveal animations, and intersection triggers.
   - Click each tab/pill/dropdown and record multi-state CSS differences and card content.
   - Record hover effects (transforms, opacity, background transitions).
   - Document findings in `docs/research/<site-key>/BEHAVIORS.md`.
3. **Page Topology**: Map out the visual section hierarchy and save to `docs/research/<site-key>/PAGE_TOPOLOGY.md`.

### Phase 2: Foundation Build
1. **Design Tokens**: Extract exact computed color values and font families. Update `src/app/globals.css` with oklch tokens matching the target design.
2. **Typography & Metadata**: Configure fonts and metadata in `src/app/layout.tsx` or route layout.
3. **Asset Download**:
   - Enumerate all `<img>`, `<video>`, and background images.
   - Run the asset downloader:
     ```bash
     node plugins/website-cloner/skills/clone-website/scripts/download-assets.mjs --manifest docs/research/<site-key>/assets.json --dest public/sites/<site-key>/
     ```
4. **SVG Icons**: Extract inline SVGs and store reusable components in `src/components/icons.tsx` or site-scoped icon modules.
5. Verify build compiles: `npx tsc --noEmit`.

### Phase 3: Component Specification & Builder Dispatch
For each section in the page topology:
1. **Write Component Spec**: Create `docs/research/<site-key>/components/<ComponentName>.spec.md` with exact computed CSS values, HTML structure, states, and assets.
2. **Dispatch Builder**: Build each component in `src/components/...` following the specification strictly.
3. **Validate**: Verify types after each component: `npx tsc --noEmit`.

### Phase 4: Page Assembly
1. Wire all section components into the destination route (e.g. `src/app/page.tsx` or `src/app/<route>/page.tsx`).
2. Implement page-level behaviors (smooth scrolling, scroll-snap, z-index layers).
3. Run full verification: `npm run build`.

### Phase 5: Visual QA Diff
1. Compare the built page against target screenshots across desktop and mobile viewports.
2. Fix any spacing, font, or interaction discrepancies until the emulation is pixel-perfect.

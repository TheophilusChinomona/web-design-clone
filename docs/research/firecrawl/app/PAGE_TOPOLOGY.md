# Firecrawl App (/app) Page Topology & Behavior

## Target URL
`https://www.firecrawl.dev/app`

## Design System & Tokens
- **Primary / Heat Brand**: `#fa5d19` (`--heat-100`), with alpha tints (`--heat-4`, `--heat-8`, `--heat-16`, `--heat-20`).
- **Backgrounds**:
  - Light mode: `--background-base: #f9f9f9`, `--surface: #ffffff`
  - Dark mode: `--background-base: #0a0a0a`, `--surface: #171717`
- **Borders & Crosshairs**:
  - `--border-faint: #ededed` (light) / `#2a2a2a` (dark)
  - Geometric crosshair SVGs at card section intersections.
- **Layout Architecture**:
  - Fixed vertical grid guides: `left-[calc(50%-200px)]` and `right-[calc(50%-200px)]` with 1px width.
  - Centered 400px card container with subtle section borders and corner crosshair markers.

## Sections Top-to-Bottom
1. **Header Section**:
   - Firecrawl Flame logo + "FIRECRAWL" wordmark.
   - Crosshair intersection SVGs on top left and right.
2. **Auth Tabs**:
   - "Log In" and "Sign Up" toggle buttons.
   - Interactive state switching between Sign In and Sign Up modes.
   - Central divider.
3. **Form Section**:
   - Email Input with focus-within heat ring.
   - Password Input.
   - Action Button: "Create Account" (Sign Up) or "Log In" (Log In) with orange glow shadow (`shadow-[0_4px_12px_rgba(250,93,25,0.25)]`).
4. **Divider Section**:
   - Section separator with crosshair SVGs.
5. **OAuth / Social Logins**:
   - "Continue with GitHub" (GitHub icon)
   - "Continue with Google" (Google icon)
6. **Footer Legal Notice**:
   - Terms of Service & Privacy Policy links.
   - AI Agent prompt link: "Are you an AI agent? Get an API key here" pointing to `/agent-onboarding/SKILL.md`.

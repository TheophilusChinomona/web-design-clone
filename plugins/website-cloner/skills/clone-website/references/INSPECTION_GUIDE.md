# Website Inspection & Extraction Reference Guide

This reference guide details exact procedures for inspecting target websites via Browser MCP or headless scripts, capturing design tokens, cataloging components, and mapping responsive layouts.

---

## 1. Visual Audit Checklist
- [ ] **Full page screenshots**: Desktop (1440px), Tablet (768px), Mobile (390px).
- [ ] **State screenshots**: Hover states, active tabs, modal overlays, dropdown menus, mobile navigation drawers.
- [ ] **Dark & Light modes**: If the site supports theme switching, extract tokens for both.

---

## 2. Design Token Extraction Protocol

### Colors
Extract the live computed color palette across the page:
- `backgroundColor` / `background` (canvas, cards, popovers, badges)
- `color` (headings, body text, muted text, links)
- `borderColor` (cards, inputs, dividers)
- `accent` / `primary` / `destructive` / `ring`

### Typography
- Font families (primary sans, display serif, mono)
- Scale: Font size, line height, font weight, letter spacing for headings (H1–H6), body, captions, badges.

### Spacing & Metrics
- Container `max-width` (e.g. 1280px, 1400px, full-width)
- Grid columns and gap sizes
- Padding / margin rhythm (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px)
- `border-radius` (buttons, cards, inputs, pills)
- `box-shadow` elevation tokens

---

## 3. DOM & Interaction Topology

Before generating components:
1. **Identify Interaction Model**:
   - Scroll-driven vs Click-driven vs Time-driven (carousels).
2. **Multi-State Sweep**:
   - For stateful tabs: Click each tab in the browser and record rendered cards/text for each tab.
   - For sticky headers: Compare styles at scroll offset 0px vs 100px+.
3. **Layered Asset Audit**:
   - Scan containers for stacked background gradients, foreground PNG mockups, and absolute badge overlays.

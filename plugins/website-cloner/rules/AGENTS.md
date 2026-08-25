# Website Cloner Plugin Rules

## Purpose
This plugin equips Antigravity (AGY) agents with a comprehensive, two-stage engineering pipeline:
1. **Workflow 1 (`clone-website`)**: Reverse-engineering and cloning target websites into clean, pixel-perfect Next.js codebases.
2. **Workflow 2 (`convert-to-webapp`)**: Converting cloned visual interfaces into full-stack, production-ready web applications with OpenAPI 3.1 specifications, Zod validation, API route handlers, and live data wiring.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI & Components:** shadcn/ui (Radix/Base primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React & extracted SVG components
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **API & Schemas:** OpenAPI 3.1, Zod schema validation, Swagger/Scalar UI explorer

## Core Principles
1. **Pixel-Perfect Emulation**: Match the target site's spacing, colors, typography, and responsive breakpoints exactly using extracted computed styles.
2. **Real Content & Real Assets**: Extract actual text, SVG vectors, images, and videos from the target site. Do not substitute placeholder or generic dummy content unless unrecoverable.
3. **Dual Browser Inspection**: Utilize connected Browser MCP tools (Chrome MCP / Playwright / Puppeteer) for deep DOM and computed CSS inspection. Fall back to standalone headless extraction scripts when MCP is unavailable.
4. **Foundation First**: Establish design tokens in `globals.css`, layout wrappers, shared icon modules, and downloaded assets before constructing individual components.
5. **Specification-Driven Construction**: Every component must have a documented specification with exact CSS values before specialist builder agents are dispatched.
6. **Full-Stack Appification**: Any cloned visual interface can be promoted into a functional web application by reverse-engineering state, data models, and API contracts into OpenAPI 3.1 specs and Next.js App Router route handlers (`src/app/api/.../route.ts`).
7. **Zero Build Breaks**: Every subagent and build phase must compile cleanly (`npm run build` or `npx tsc --noEmit`) without errors.

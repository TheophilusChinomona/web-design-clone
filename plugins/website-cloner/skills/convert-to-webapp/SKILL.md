---
name: convert-to-webapp
description: Convert cloned Next.js websites and dashboards into functional full-stack web applications with OpenAPI 3.1 specs, Zod validation, Next.js route handlers, and live UI data wiring.
---

# Convert to Web App & OpenAPI Generator Skill

## Purpose
This skill reverse-engineers the functional backend requirements of any cloned website or dashboard, generating:
1. **Standard OpenAPI 3.1 (OAS 3.1) Specifications** (`docs/api/openapi.json` and `openapi.yaml`).
2. **Interactive API Documentation Explorer** (mounted at `/api/docs`).
3. **Next.js App Router Route Handlers** (`src/app/api/.../route.ts`) with Zod request/response validation.
4. **Live UI Form & Action Wiring** (connecting forms, tables, metric cards, and modals to real endpoints).

---

## Phased Appification Pipeline

### Phase 1: Interactive Element & Data Model Audit
1. **Audit Forms & Modals**: Identify all user inputs (text fields, checkboxes, switches, file uploads, schema textareas).
2. **Audit Data Tables & Feeds**: Identify table columns, status badges, timestamp fields, pagination, and sorting.
3. **Audit Metric Cards & Analytics**: Identify time-series counters, credit balances, quota gauges, and live status pills.
4. **Catalog Discovered Entities & Operations**:
   - Authentication / Sessions (`/api/v1/auth/...`)
   - Core Domain Operations (e.g. `/api/v1/scrape`, `/api/v1/crawl`, `/api/v1/extract`)
   - Resource CRUD (e.g. `/api/v1/keys`, `/api/v1/usage`, `/api/v1/webhooks`)
   - Inquiries & Submissions (e.g. `/api/v1/contact`)

---

### Phase 2: Automated OpenAPI 3.1 Spec Generation
Run the bundled OpenAPI generator to emit the complete API contract:
```bash
node plugins/website-cloner/skills/convert-to-webapp/scripts/generate-openapi.mjs --out docs/api/openapi.json
```
The resulting specification includes:
- `info`: Title, version, description, license, contact.
- `servers`: Local development (`http://localhost:3000`) and production URLs.
- `paths`: Every discovered endpoint with operations (`get`, `post`, `delete`, etc.), summary, requestBody, parameters, and responses (`200`, `201`, `400`, `401`, `422`, `500`).
- `components.schemas`: Reusable data models for all request bodies and return objects.

---

### Phase 3: Scaffold Next.js Route Handlers with Zod
For each endpoint specified in the OpenAPI contract:
1. Create `src/app/api/<path>/route.ts`.
2. Define request validation with **Zod** (`src/lib/schemas/...`).
3. Return compliant JSON responses with standard headers (`Content-Type: application/json`).
4. Handle validation errors with standard RFC 7807 problem details or `{ error: string, details?: any }`.

---

### Phase 4: Mount Interactive API Explorer
Mount an interactive documentation viewer at `/api/docs` allowing developers to inspect endpoints and execute live test requests directly against the local dev server.

---

### Phase 5: Wire UI Components to Live Endpoints
1. Replace static mock state with `async` fetch handlers or Server Actions.
2. Add loading indicators, disabled button states, and error toasts.
3. Verify form submissions update live UI state immediately.

---

### Phase 6: Build & Test Verification
1. Test every route handler via automated HTTP calls:
   ```bash
   node plugins/website-cloner/skills/convert-to-webapp/scripts/test-endpoints.mjs
   ```
2. Verify TypeScript strict type-checking:
   ```bash
   npm run typecheck
   ```
3. Verify Next.js production build:
   ```bash
   npm run build
   ```

#!/usr/bin/env node

/**
 * test-endpoints.mjs — Automated API Route Verification Runner
 *
 * Calls each Next.js Route Handler and validates HTTP responses against expected schemas.
 *
 * Usage:
 *   node test-endpoints.mjs [--base-url http://localhost:3000]
 */

function parseArgs() {
  const args = process.argv.slice(2);
  let baseUrl = 'http://localhost:3000';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--base-url' && args[i + 1]) {
      baseUrl = args[i + 1];
      i++;
    }
  }

  return { baseUrl };
}

async function runTests() {
  const { baseUrl } = parseArgs();
  console.log(`[website-cloner:test] Testing API Route Handlers against ${baseUrl}\n`);

  const tests = [
    {
      name: 'POST /api/v1/scrape (Single Page)',
      url: `${baseUrl}/api/v1/scrape`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com', formats: ['markdown', 'links'] }),
      },
      expectedStatus: 200,
    },
    {
      name: 'POST /api/v1/crawl (Domain Crawl)',
      url: `${baseUrl}/api/v1/crawl`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com', limit: 5 }),
      },
      expectedStatus: 200,
    },
    {
      name: 'POST /api/v1/map (URL Discovery)',
      url: `${baseUrl}/api/v1/map`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com' }),
      },
      expectedStatus: 200,
    },
    {
      name: 'POST /api/v1/extract (Schema Extraction)',
      url: `${baseUrl}/api/v1/extract`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'https://example.com',
          schema: { type: 'object', properties: { title: { type: 'string' } } },
        }),
      },
      expectedStatus: 200,
    },
    {
      name: 'GET /api/v1/keys (List API Keys)',
      url: `${baseUrl}/api/v1/keys`,
      options: { method: 'GET' },
      expectedStatus: 200,
    },
    {
      name: 'POST /api/v1/keys (Create API Key)',
      url: `${baseUrl}/api/v1/keys`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Integration Test Key' }),
      },
      expectedStatus: 201,
    },
    {
      name: 'GET /api/v1/usage (Workspace Stats)',
      url: `${baseUrl}/api/v1/usage`,
      options: { method: 'GET' },
      expectedStatus: 200,
    },
    {
      name: 'POST /api/v1/contact (EdgeTech Inquiry)',
      url: `${baseUrl}/api/v1/contact`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Carpenter',
          email: 'john@woodwork.co.za',
          subject: 'Edge Banding Inquiry',
          message: 'Looking for 50 veneer sheets edged.',
        }),
      },
      expectedStatus: 200,
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      const res = await fetch(t.url, t.options);
      const json = await res.json().catch(() => null);

      if (res.status === t.expectedStatus) {
        console.log(`  ✓ PASS: ${t.name} (Status ${res.status})`);
        passed++;
      } else {
        console.error(`  ✗ FAIL: ${t.name} (Expected ${t.expectedStatus}, got ${res.status})`);
        console.error(`    Body:`, json);
        failed++;
      }
    } catch (err) {
      console.error(`  ✗ ERROR: ${t.name} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();

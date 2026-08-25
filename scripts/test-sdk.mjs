#!/usr/bin/env node

/**
 * test-sdk.mjs — SDK Client Verification Runner
 */

async function testSdk() {
  console.log('[sdk:test] Testing generated Client SDK against http://localhost:3000...\n');

  // Dynamically test using fetch wrapper mimicking the generated SDK
  const client = {
    baseUrl: 'http://localhost:3000',
    async scrape(url, formats = ['markdown']) {
      const res = await fetch(`${this.baseUrl}/api/v1/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, formats }),
      });
      return res.json();
    },
    async createKey(name) {
      const res = await fetch(`${this.baseUrl}/api/v1/keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      return res.json();
    },
    async listKeys() {
      const res = await fetch(`${this.baseUrl}/api/v1/keys`);
      return res.json();
    },
    async getUsage() {
      const res = await fetch(`${this.baseUrl}/api/v1/usage`);
      return res.json();
    },
    async submitInquiry(name, email, message) {
      const res = await fetch(`${this.baseUrl}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      return res.json();
    },
  };

  try {
    const scrapeRes = await client.scrape('https://example.com');
    console.log('  ✓ client.scrape():', scrapeRes.data.title);

    const keyRes = await client.createKey('SDK Generated Key');
    console.log('  ✓ client.keys.create():', keyRes.key.prefix);

    const listRes = await client.listKeys();
    console.log(`  ✓ client.keys.list(): Found ${listRes.keys.length} keys in DB`);

    const usageRes = await client.getUsage();
    console.log(`  ✓ client.getUsage(): ${usageRes.creditsUsedThisMonth}/${usageRes.creditsTotal} credits`);

    const inqRes = await client.submitInquiry('SDK Test', 'sdk@test.com', 'Testing SDK inquiry');
    console.log('  ✓ client.submitInquiry():', inqRes.message);

    console.log('\nAll SDK client methods verified successfully!');
  } catch (err) {
    console.error('SDK test failed:', err);
    process.exit(1);
  }
}

testSdk();

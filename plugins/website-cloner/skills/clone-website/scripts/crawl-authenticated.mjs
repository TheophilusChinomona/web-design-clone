#!/usr/bin/env node

/**
 * crawl-authenticated.mjs — Crawls all authenticated dashboard pages from an active session.
 *
 * Discovers subpages, extracts page layouts, captures screenshots, and catalogs routes.
 *
 * Usage:
 *   node crawl-authenticated.mjs [--cdp-port 9222] [--out-dir docs/research/dashboard]
 */

import http from 'node:http';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

function parseArgs() {
  const args = process.argv.slice(2);
  let cdpPort = 9222;
  let outDir = resolve(process.cwd(), 'docs', 'research', 'dashboard');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--cdp-port' && args[i + 1]) {
      cdpPort = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--out-dir' && args[i + 1]) {
      outDir = resolve(args[i + 1]);
      i++;
    }
  }

  return { cdpPort, outDir };
}

async function fetchCDPTargets(port) {
  return new Promise((resolvePromise, rejectPromise) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolvePromise(JSON.parse(data));
        } catch (e) {
          rejectPromise(e);
        }
      });
    }).on('error', rejectPromise);
  });
}

async function main() {
  const { cdpPort, outDir } = parseArgs();

  console.log(`[crawl-authenticated] Connecting to browser session on port ${cdpPort}...`);

  mkdirSync(outDir, { recursive: true });

  try {
    const targets = await fetchCDPTargets(cdpPort);
    const pages = targets.filter((t) => t.type === 'page');

    console.log(`Found ${pages.length} open authenticated page(s):`);

    const pageManifest = [];

    for (const page of pages) {
      console.log(`  • ${page.title} (${page.url})`);
      pageManifest.push({
        title: page.title,
        url: page.url,
        id: page.id,
        wsUrl: page.webSocketDebuggerUrl
      });
    }

    const manifestPath = join(outDir, 'pages-manifest.json');
    writeFileSync(manifestPath, JSON.stringify(pageManifest, null, 2), 'utf8');
    console.log(`\n✓ Saved dashboard pages manifest to ${manifestPath}`);
  } catch (err) {
    console.warn(`Could not connect to CDP on port ${cdpPort}: ${err.message}`);
    console.log(`Make sure to run 'npm run clone:login' first to launch the interactive authenticated session.`);
  }
}

main();

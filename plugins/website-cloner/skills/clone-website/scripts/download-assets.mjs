#!/usr/bin/env node

/**
 * download-assets.mjs — Batch downloads external assets with retry and concurrency control.
 *
 * Usage:
 *   node download-assets.mjs --manifest <manifest.json> --dest <output-dir>
 *   node download-assets.mjs --urls <url1> <url2> --dest <output-dir>
 */

import { existsSync, mkdirSync, createWriteStream } from 'node:fs';
import { resolve, join, basename, extname } from 'node:path';
import { pipeline } from 'node:stream/promises';
import https from 'node:https';
import http from 'node:http';

function parseArgs() {
  const args = process.argv.slice(2);
  let manifestPath = null;
  let destDir = resolve(process.cwd(), 'public', 'downloaded-assets');
  let urls = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--manifest' && args[i + 1]) {
      manifestPath = resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--dest' && args[i + 1]) {
      destDir = resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--urls') {
      i++;
      while (i < args.length && !args[i].startsWith('--')) {
        urls.push(args[i]);
        i++;
      }
      i--;
    }
  }

  return { manifestPath, destDir, urls };
}

async function downloadFile(url, destPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const parsedUrl = new URL(url);
      const client = parsedUrl.protocol === 'https:' ? https : http;

      await new Promise((resolvePromise, rejectPromise) => {
        client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            downloadFile(res.headers.location, destPath, retries - 1).then(resolvePromise).catch(rejectPromise);
            return;
          }
          if (res.statusCode !== 200) {
            rejectPromise(new Error(`Status ${res.statusCode}`));
            return;
          }
          const fileStream = createWriteStream(destPath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolvePromise();
          });
          fileStream.on('error', rejectPromise);
        }).on('error', rejectPromise);
      });
      return true;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
}

async function main() {
  const { manifestPath, destDir, urls } = parseArgs();

  mkdirSync(destDir, { recursive: true });

  let itemsToDownload = urls.map((u, i) => ({ url: u, name: basename(new URL(u).pathname) || `asset_${i}` }));

  if (manifestPath && existsSync(manifestPath)) {
    const raw = JSON.parse(readFileSync(manifestPath, 'utf8'));
    if (Array.isArray(raw)) {
      itemsToDownload = raw;
    } else if (raw.images || raw.assets) {
      itemsToDownload = (raw.images || raw.assets).map((img, i) => ({
        url: typeof img === 'string' ? img : img.src || img.url,
        name: img.name || basename(new URL(typeof img === 'string' ? img : img.src || img.url).pathname) || `asset_${i}`
      }));
    }
  }

  console.log(`Downloading ${itemsToDownload.length} assets to ${destDir}...`);

  for (const item of itemsToDownload) {
    if (!item.url) continue;
    const filename = item.name || `asset_${Date.now()}`;
    const targetFile = join(destDir, filename);
    try {
      await downloadFile(item.url, targetFile);
      console.log(`  ✓ ${filename}`);
    } catch (err) {
      console.warn(`  ✗ Failed to download ${item.url}: ${err.message}`);
    }
  }

  console.log('✓ Done downloading assets.');
}

main().catch((err) => {
  console.error('Download script error:', err);
  process.exit(1);
});

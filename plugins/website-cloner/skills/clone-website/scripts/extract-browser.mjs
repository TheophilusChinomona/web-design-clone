#!/usr/bin/env node

/**
 * extract-browser.mjs — Fallback DOM, asset, and CSS extractor when no Browser MCP is active.
 *
 * Usage:
 *   node extract-browser.mjs <target-url> [--out <output-json>]
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

function parseArgs() {
  const args = process.argv.slice(2);
  let url = null;
  let out = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out' && args[i + 1]) {
      out = resolve(args[i + 1]);
      i++;
    } else if (!url && !args[i].startsWith('--')) {
      url = args[i];
    }
  }

  return { url, out };
}

async function extractFromUrl(targetUrl) {
  console.log(`[extract-browser] Fetching page from: ${targetUrl}`);
  const res = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${targetUrl}: HTTP ${res.status}`);
  }

  const html = await res.text();
  const urlObj = new URL(targetUrl);
  const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

  // Extract basic elements using regex for zero-dependency standalone operation
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const description = metaDescMatch ? metaDescMatch[1] : '';

  const imageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const images = [];
  let m;
  while ((m = imageRegex.exec(html)) !== null) {
    let src = m[1];
    if (src.startsWith('//')) src = `${urlObj.protocol}${src}`;
    else if (src.startsWith('/')) src = `${baseUrl}${src}`;
    else if (!src.startsWith('http')) src = `${baseUrl}/${src}`;
    images.push({ src, raw: m[0] });
  }

  const fontRegex = /https:\/\/fonts\.googleapis\.com\/css2\?[^"'\s]+/gi;
  const fonts = [...new Set(html.match(fontRegex) || [])];

  const svgRegex = /<svg[\s\S]*?<\/svg>/gi;
  const svgs = html.match(svgRegex) || [];

  return {
    url: targetUrl,
    title,
    description,
    imageCount: images.length,
    images: images.slice(0, 50),
    fonts,
    svgCount: svgs.length,
    htmlLength: html.length,
    extractedAt: new Date().toISOString()
  };
}

async function main() {
  const { url, out } = parseArgs();

  if (!url) {
    console.error('Usage: node extract-browser.mjs <target-url> [--out <output-json>]');
    process.exit(1);
  }

  try {
    const data = await extractFromUrl(url);
    const jsonStr = JSON.stringify(data, null, 2);

    if (out) {
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, jsonStr, 'utf8');
      console.log(`✓ Extraction saved to ${out}`);
    } else {
      console.log(jsonStr);
    }
  } catch (err) {
    console.error('Extraction error:', err.message);
    process.exit(1);
  }
}

main();

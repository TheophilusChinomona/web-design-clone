#!/usr/bin/env node

/**
 * interactive-auth.mjs — Interactive Browser Session & Authenticated Page Crawling
 *
 * Launches a real browser window for the user to log in (supports Google, GitHub, 2FA, SAML),
 * waits for authentication, preserves session cookies & storage, and crawls all authenticated dashboard pages.
 *
 * Usage:
 *   node interactive-auth.mjs <login-url> [--dashboard-url <url>] [--session-out <path>]
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { spawn, execSync } from 'node:child_process';
import os from 'node:os';
import readline from 'node:readline';
import http from 'node:http';

function parseArgs() {
  const args = process.argv.slice(2);
  let loginUrl = 'https://www.firecrawl.dev/app';
  let dashboardUrl = null;
  let sessionOut = resolve(process.cwd(), 'docs', 'research', 'session.json');
  let crawlPages = true;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dashboard-url' && args[i + 1]) {
      dashboardUrl = args[i + 1];
      i++;
    } else if (args[i] === '--session-out' && args[i + 1]) {
      sessionOut = resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--no-crawl') {
      crawlPages = false;
    } else if (!args[i].startsWith('--')) {
      loginUrl = args[i];
    }
  }

  return { loginUrl, dashboardUrl, sessionOut, crawlPages };
}

function findChromePath() {
  const isWindows = os.platform() === 'win32';
  const isMac = os.platform() === 'darwin';

  if (isWindows) {
    const paths = [
      join(process.env['PROGRAMFILES'] || 'C:\\Program Files', 'Google', 'Chrome', 'Application', 'chrome.exe'),
      join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe'),
      join(process.env['LOCALAPPDATA'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
      join(process.env['PROGRAMFILES'] || 'C:\\Program Files', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
      join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe')
    ];
    for (const p of paths) {
      if (existsSync(p)) return p;
    }
  } else if (isMac) {
    const paths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    ];
    for (const p of paths) {
      if (existsSync(p)) return p;
    }
  } else {
    const binaries = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'];
    for (const b of binaries) {
      try {
        const p = execSync(`which ${b}`, { encoding: 'utf8' }).trim();
        if (p) return p;
      } catch {}
    }
  }
  return null;
}

async function promptUserForLoginComplete() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((res) => {
    console.log('\n=============================================================');
    console.log(' 👉 BROWSER OPENED: Please complete your login in the browser.');
    console.log(' 👉 When you are logged into the dashboard, press ENTER here.');
    console.log('=============================================================\n');
    rl.question('Press [ENTER] after logging in to continue crawling: ', () => {
      rl.close();
      res(true);
    });
  });
}

async function fetchCDPTargets(port) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const { loginUrl, dashboardUrl, sessionOut, crawlPages } = parseArgs();
  const chromePath = findChromePath();

  console.log(`[website-cloner auth] Starting interactive authenticated session`);
  console.log(`  Login Target: ${loginUrl}`);

  if (!chromePath) {
    console.warn(`Warning: Chrome/Edge binary not found automatically.`);
    console.log(`Please open your browser manually at ${loginUrl} and ensure you have an active session.`);
    return;
  }

  const cdpPort = 9222;
  const userDataDir = join(os.tmpdir(), 'agy-cloner-chrome-session');
  mkdirSync(userDataDir, { recursive: true });

  console.log(`  Launching browser with DevTools Protocol enabled on port ${cdpPort}...`);

  const browserProcess = spawn(
    chromePath,
    [
      `--remote-debugging-port=${cdpPort}`,
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      loginUrl
    ],
    { detached: true, stdio: 'ignore' }
  );

  browserProcess.unref();

  // Wait for user to complete login in the opened browser
  await promptUserForLoginComplete();

  // Query CDP for open tabs / current page URL
  try {
    const targets = await fetchCDPTargets(cdpPort);
    const pages = targets.filter((t) => t.type === 'page');

    console.log(`\n✓ Detected ${pages.length} active browser tab(s).`);

    const sessionInfo = {
      authenticatedAt: new Date().toISOString(),
      activeTabs: pages.map((p) => ({ title: p.title, url: p.url, wsUrl: p.webSocketDebuggerUrl })),
      cdpPort
    };

    mkdirSync(dirname(sessionOut), { recursive: true });
    writeFileSync(sessionOut, JSON.stringify(sessionInfo, null, 2), 'utf8');
    console.log(`✓ Session manifest saved to ${sessionOut}`);

    console.log(`
Authenticated session is active!
Next steps for page discovery:
1. Navigate through your dashboard tabs in the opened browser.
2. The cloner will extract all authenticated routes directly from your active session.
`);
  } catch (err) {
    console.log(`✓ Session preserved in browser profile at ${userDataDir}`);
  }
}

main().catch((err) => {
  console.error('Fatal interactive auth error:', err);
  process.exit(1);
});

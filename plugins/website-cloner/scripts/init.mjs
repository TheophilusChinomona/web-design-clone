#!/usr/bin/env node

/**
 * init.mjs — One-Command Website Cloner Project Initializer
 *
 * Scaffolds a brand-new, clean Next.js 16 + shadcn/ui + Tailwind CSS v4
 * workspace ready for /clone-website and /convert-to-webapp.
 *
 * Usage:
 *   node plugins/website-cloner/scripts/init.mjs [target-directory] [--url <target-url>] [--install]
 */

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PLUGIN_ROOT = resolve(__dirname, '..');
const TEMPLATE_DIR = join(PLUGIN_ROOT, 'resources', 'template');

function parseArgs() {
  const args = process.argv.slice(2);
  let targetDir = '';
  let targetUrl = '';
  let autoInstall = true;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      targetUrl = args[i + 1];
      i++;
    } else if (args[i] === '--no-install') {
      autoInstall = false;
    } else if (!args[i].startsWith('-') && !targetDir) {
      targetDir = args[i];
    }
  }

  if (!targetDir) {
    targetDir = targetUrl ? basename(new URL(targetUrl).hostname).replace(/\./g, '-') : 'cloned-website-app';
  }

  return { targetDir: resolve(process.cwd(), targetDir), targetUrl, autoInstall };
}

function log(step, msg) {
  console.log(`\x1b[36m[cloner:init:step-${step}]\x1b[0m ${msg}`);
}

function success(msg) {
  console.log(`\x1b[32m✓ ${msg}\x1b[0m`);
}

async function main() {
  const { targetDir, targetUrl, autoInstall } = parseArgs();
  const projectName = basename(targetDir);

  console.log(`\n\x1b[1;35m🚀 Initializing New Website Cloner Workspace...\x1b[0m\n`);
  console.log(`  • Project Directory: ${targetDir}`);
  if (targetUrl) console.log(`  • Target Clone URL:  ${targetUrl}`);

  // 1. Create target directory
  log(1, `Creating project directory at ${targetDir}...`);
  mkdirSync(targetDir, { recursive: true });
  success(`Directory initialized: ${projectName}`);

  // 2. Copy base scaffold template
  log(2, 'Copying Next.js 16 + shadcn/ui + Tailwind v4 base template...');
  if (existsSync(TEMPLATE_DIR)) {
    cpSync(TEMPLATE_DIR, targetDir, { recursive: true });
  }

  // 3. Customize package.json name
  const pkgPath = join(targetDir, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    pkg.name = projectName;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
  }

  // 4. Copy local plugin bundle for zero-configuration portability
  log(3, 'Bundling Website Cloner plugin locally into .agents/plugins/website-cloner...');
  const localPluginDest = join(targetDir, '.agents', 'plugins', 'website-cloner');
  mkdirSync(dirname(localPluginDest), { recursive: true });
  cpSync(PLUGIN_ROOT, localPluginDest, { recursive: true });
  success('Plugin embedded into project repository (.agents/plugins)');

  // 5. Run npm install
  if (autoInstall) {
    log(4, 'Installing dependencies (npm install)...');
    try {
      execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
      success('Dependencies installed successfully');
    } catch (err) {
      console.warn('⚠️ npm install had warnings, continuing...');
    }
  }

  console.log(`\n\x1b[1;32m🎉 Project ${projectName} is ready for cloning!\x1b[0m\n`);
  console.log(`To start cloning:`);
  console.log(`  1. cd ${projectName}`);
  console.log(`  2. agy`);
  if (targetUrl) {
    console.log(`  3. /clone-website ${targetUrl}`);
  } else {
    console.log(`  3. /clone-website <target-url>`);
  }
  console.log(`  4. /convert-to-webapp\n`);
}

main().catch((err) => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});

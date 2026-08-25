#!/usr/bin/env node

/**
 * scaffold.mjs — Auto-scaffolds a clean Next.js 16 + shadcn/ui + Tailwind v4 base
 * into target directory if it is not already initialized.
 *
 * Usage:
 *   node scaffold.mjs [--target <dir>] [--no-install] [--dry-run]
 */

import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Template directory is located at ../../../resources/template relative to this script
const TEMPLATE_DIR = resolve(__dirname, '..', '..', '..', 'resources', 'template');

function parseArgs() {
  const args = process.argv.slice(2);
  let target = process.cwd();
  let install = true;
  let dryRun = false;
  let force = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--target' && args[i + 1]) {
      target = resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--no-install') {
      install = false;
    } else if (args[i] === '--dry-run') {
      dryRun = true;
    } else if (args[i] === '--force') {
      force = true;
    }
  }

  return { target, install, dryRun, force };
}

function isNextJsProject(dir) {
  const pkgPath = join(dir, 'package.json');
  if (!existsSync(pkgPath)) return false;
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    return Boolean(pkg.dependencies?.next || pkg.devDependencies?.next);
  } catch {
    return false;
  }
}

function copyRecursive(src, dest, dryRun) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath, dryRun);
    } else {
      if (dryRun) {
        console.log(`  [dry-run] Copy: ${srcPath} -> ${destPath}`);
      } else {
        copyFileSync(srcPath, destPath);
        console.log(`  ✓ ${destPath}`);
      }
    }
  }
}

async function main() {
  const { target, install, dryRun, force } = parseArgs();

  console.log(`[website-cloner scaffold] Checking workspace at: ${target}`);

  if (!existsSync(TEMPLATE_DIR)) {
    console.error(`Error: Template resources not found at ${TEMPLATE_DIR}`);
    process.exit(1);
  }

  const hasNext = isNextJsProject(target);
  if (hasNext && !force) {
    console.log(`✓ Existing Next.js project detected in ${target}. Skipping scaffold.`);
    return;
  }

  console.log(`Scaffolding Next.js 16 + shadcn/ui + Tailwind v4 template into ${target}...`);
  copyRecursive(TEMPLATE_DIR, target, dryRun);

  if (install && !dryRun) {
    console.log('\nInstalling dependencies (npm install)...');
    try {
      execSync('npm install', { cwd: target, stdio: 'inherit' });
      console.log('✓ Dependencies installed successfully.');
    } catch (err) {
      console.warn('Warning: npm install returned an error. You may need to run npm install manually.');
    }
  }

  console.log('\n✓ Scaffold complete!');
}

main().catch((err) => {
  console.error('Fatal error during scaffold:', err);
  process.exit(1);
});

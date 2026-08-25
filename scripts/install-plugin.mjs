#!/usr/bin/env node

/**
 * install-plugin.mjs — Cross-platform installer for the Website Cloner AGY Plugin.
 *
 * Usage:
 *   node scripts/install-plugin.mjs [--global | --local] [--dry-run]
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync, symlinkSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import readline from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');
const PLUGIN_SOURCE = resolve(REPO_ROOT, 'plugins', 'website-cloner');

function parseArgs() {
  const args = process.argv.slice(2);
  let mode = null; // 'global' | 'local'
  let dryRun = false;

  for (const arg of args) {
    if (arg === '--global' || arg === '-g') mode = 'global';
    else if (arg === '--local' || arg === '-l') mode = 'local';
    else if (arg === '--dry-run') dryRun = true;
    else if (arg === '--help' || arg === '-h') {
      console.log(`
Website Cloner AGY Plugin Installer

Options:
  --global, -g   Register plugin globally in ~/.gemini/config/plugins.json
  --local, -l    Install plugin locally into .agents/plugins/website-cloner
  --dry-run      Simulate installation without making changes
  --help, -h     Show this help message
`);
      process.exit(0);
    }
  }

  return { mode, dryRun };
}

async function promptMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((res) => {
    console.log('\nWebsite Cloner Plugin Installation:');
    console.log('  1) Global registration in ~/.gemini/config/plugins.json (Recommended)');
    console.log('  2) Local project installation into .agents/plugins/website-cloner');
    rl.question('\nSelect an option (1 or 2) [1]: ', (answer) => {
      rl.close();
      const trimmed = answer.trim();
      if (trimmed === '2') res('local');
      else res('global');
    });
  });
}

function installGlobal(dryRun) {
  const homeDir = os.homedir();
  const geminiConfigDir = join(homeDir, '.gemini', 'config');
  const pluginsJsonPath = join(geminiConfigDir, 'plugins.json');

  console.log(`\nConfiguring global AGY Plugin registration...`);
  console.log(`  Config file: ${pluginsJsonPath}`);
  console.log(`  Plugin path: ${PLUGIN_SOURCE}`);

  let config = { entries: [] };
  if (existsSync(pluginsJsonPath)) {
    try {
      config = JSON.parse(readFileSync(pluginsJsonPath, 'utf8'));
      if (!Array.isArray(config.entries)) config.entries = [];
    } catch (e) {
      console.warn(`Warning: Existing plugins.json could not be parsed as JSON, backing up...`);
      config = { entries: [] };
    }
  }

  // Normalize paths for comparison (forward slashes for json config)
  const normalizedPluginPath = PLUGIN_SOURCE.replace(/\\/g, '/');
  const alreadyExists = config.entries.some((entry) => {
    const entryPath = (typeof entry === 'string' ? entry : entry.path || '').replace(/\\/g, '/');
    return entryPath.toLowerCase() === normalizedPluginPath.toLowerCase();
  });

  if (alreadyExists) {
    console.log(`\n✓ Plugin is already registered in ${pluginsJsonPath}`);
    return;
  }

  config.entries.push({ path: normalizedPluginPath });

  if (dryRun) {
    console.log(`\n[dry-run] Would write to ${pluginsJsonPath}:`);
    console.log(JSON.stringify(config, null, 2));
  } else {
    mkdirSync(geminiConfigDir, { recursive: true });
    writeFileSync(pluginsJsonPath, JSON.stringify(config, null, 2), 'utf8');
    console.log(`\n✓ Successfully registered website-cloner plugin globally in ${pluginsJsonPath}!`);
  }
}

function installLocal(dryRun) {
  const cwd = process.cwd();
  const targetDir = join(cwd, '.agents', 'plugins', 'website-cloner');

  console.log(`\nInstalling plugin locally to: ${targetDir}`);

  if (dryRun) {
    console.log(`[dry-run] Would copy ${PLUGIN_SOURCE} -> ${targetDir}`);
    return;
  }

  mkdirSync(dirname(targetDir), { recursive: true });
  cpSync(PLUGIN_SOURCE, targetDir, { recursive: true });
  console.log(`\n✓ Successfully installed website-cloner plugin locally to ${targetDir}!`);
}

async function main() {
  if (!existsSync(PLUGIN_SOURCE)) {
    console.error(`Error: Plugin directory not found at ${PLUGIN_SOURCE}`);
    process.exit(1);
  }

  let { mode, dryRun } = parseArgs();

  if (!mode) {
    // If running in a non-interactive CI or pipe, default to global
    if (!process.stdin.isTTY) {
      mode = 'global';
    } else {
      mode = await promptMode();
    }
  }

  if (mode === 'global') {
    installGlobal(dryRun);
  } else {
    installLocal(dryRun);
  }

  console.log(`
You can now start any new project:
  1. mkdir my-new-site && cd my-new-site
  2. agy
  3. /clone-website <target-url>
`);
}

main().catch((err) => {
  console.error('Fatal installer error:', err);
  process.exit(1);
});

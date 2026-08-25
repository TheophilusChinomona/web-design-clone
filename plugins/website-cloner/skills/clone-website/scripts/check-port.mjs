#!/usr/bin/env node

/**
 * check-port.mjs — Cross-platform port inspector and manager for the Website Cloner plugin.
 *
 * Usage:
 *   node check-port.mjs [--port 3000] [--kill] [--json]
 */

import net from 'node:net';
import { execSync } from 'node:child_process';
import os from 'node:os';

function parseArgs() {
  const args = process.argv.slice(2);
  let port = 3000;
  let kill = false;
  let json = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
      port = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--kill' || args[i] === '-k') {
      kill = true;
    } else if (args[i] === '--json') {
      json = true;
    }
  }

  return { port, kill, json };
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(false);
      }
    });
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port);
  });
}

function getPidsOnPort(port) {
  const isWindows = os.platform() === 'win32';
  const pids = new Set();

  try {
    if (isWindows) {
      const output = execSync(`netstat -ano`, { encoding: 'utf8' });
      const lines = output.split('\n');
      for (const line of lines) {
        if (line.includes(`:${port}`) && line.includes('LISTENING')) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && !isNaN(parseInt(pid, 10))) {
            pids.add(parseInt(pid, 10));
          }
        }
      }
    } else {
      const output = execSync(`lsof -i :${port} -t`, { encoding: 'utf8' });
      output.split('\n').forEach((line) => {
        const pid = line.trim();
        if (pid && !isNaN(parseInt(pid, 10))) {
          pids.add(parseInt(pid, 10));
        }
      });
    }
  } catch {
    // If no process found or command fails
  }

  return Array.from(pids);
}

function killPid(pid) {
  const isWindows = os.platform() === 'win32';
  try {
    if (isWindows) {
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
    } else {
      execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
    }
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const { port, kill, json } = parseArgs();

  const available = await isPortAvailable(port);
  const pids = !available ? getPidsOnPort(port) : [];

  if (kill && !available && pids.length > 0) {
    let killedCount = 0;
    for (const pid of pids) {
      if (killPid(pid)) {
        killedCount++;
      }
    }
    const nowAvailable = await isPortAvailable(port);
    if (json) {
      console.log(JSON.stringify({ port, available: nowAvailable, killedPids: pids, success: nowAvailable }, null, 2));
    } else {
      console.log(`✓ Terminated ${killedCount} process(es) on port ${port}. Port is now ${nowAvailable ? 'FREE' : 'IN USE'}.`);
    }
    return;
  }

  if (json) {
    console.log(JSON.stringify({ port, available, pids }, null, 2));
  } else {
    if (available) {
      console.log(`✓ Port ${port} is FREE and available.`);
    } else {
      console.log(`⚠ Port ${port} is IN USE by PID(s): ${pids.join(', ')}`);
      console.log(`  To free this port, run: node plugins/website-cloner/skills/clone-website/scripts/check-port.mjs --port ${port} --kill`);
    }
  }
}

main().catch((err) => {
  console.error('Error checking port:', err);
  process.exit(1);
});

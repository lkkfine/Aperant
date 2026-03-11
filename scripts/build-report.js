#!/usr/bin/env node
/**
 * Build Report Script
 * Generates a summary of build artifacts after compilation.
 *
 * Usage: node scripts/build-report.js
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m'
};

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Get directory size recursively
 */
function getDirSize(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;

  let size = 0;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      size += getDirSize(filePath);
    } else {
      size += stats.size;
    }
  }

  return size;
}

/**
 * Get file size
 */
function getFileSize(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  return fs.statSync(filePath).size;
}

/**
 * Get build artifacts info
 */
function getBuildArtifacts(buildDir) {
  const artifacts = [];
  const outDir = path.join(buildDir, 'out');
  const compiledDir = path.join(buildDir, 'compiled');

  // Priority: out/ > compiled/ > build/
  let mainBase = buildDir;
  if (fs.existsSync(outDir)) {
    mainBase = outDir;
  } else if (fs.existsSync(compiledDir)) {
    mainBase = compiledDir;
  }

  // Main process
  const mainDir = path.join(mainBase, 'main');
  if (fs.existsSync(mainDir)) {
    const mainJs = path.join(mainDir, 'index.js');
    const nodeModules = path.join(mainDir, 'node_modules');
    const prefix = mainBase === outDir ? 'out/' : (mainBase === compiledDir ? 'compiled/' : '');
    artifacts.push({
      name: `${prefix}main/index.js`,
      path: mainJs,
      size: getFileSize(mainJs),
      description: 'Electron main process'
    });
    if (fs.existsSync(nodeModules)) {
      artifacts.push({
        name: `${prefix}main/node_modules/`,
        path: nodeModules,
        size: getDirSize(nodeModules),
        description: 'Externalized dependencies'
      });
    }
  }

  // Preload script
  const preloadDir = path.join(mainBase, 'preload');
  if (fs.existsSync(preloadDir)) {
    const preloadJs = path.join(preloadDir, 'index.mjs');
    const prefix = mainBase === outDir ? 'out/' : (mainBase === compiledDir ? 'compiled/' : '');
    artifacts.push({
      name: `${prefix}preload/index.mjs`,
      path: preloadJs,
      size: getFileSize(preloadJs),
      description: 'Preload script'
    });
  }

  // Renderer
  const rendererDir = path.join(mainBase, 'renderer');
  if (fs.existsSync(rendererDir)) {
    const prefix = mainBase === outDir ? 'out/' : (mainBase === compiledDir ? 'compiled/' : '');
    artifacts.push({
      name: `${prefix}renderer/`,
      path: rendererDir,
      size: getDirSize(rendererDir),
      description: 'React UI'
    });
  }

  return artifacts;
}

/**
 * Get release packages info
 */
function getReleasePackages(buildDir) {
  const releases = [];

  // Check new releases directory first, fallback to old dist directory
  let distDir = path.join(buildDir, 'releases');
  if (!fs.existsSync(distDir)) {
    distDir = path.join(buildDir, 'dist');
  }

  if (!fs.existsSync(distDir)) {
    return releases;
  }

  const files = fs.readdirSync(distDir);

  for (const file of files) {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);

    if (file.endsWith('.exe') || file.endsWith('.dmg') || file.endsWith('.AppImage') || file.endsWith('.deb') || file.endsWith('.zip')) {
      releases.push({
        name: file,
        size: stats.size,
        type: 'installer'
      });
    } else if (stats.isDirectory() && (file.includes('unpacked') || file.includes('mac') || file.includes('linux') || file === 'win' || file === 'mac' || file === 'linux')) {
      releases.push({
        name: file + '/',
        size: getDirSize(filePath),
        type: 'unpacked'
      });
    }
  }

  return releases;
}

/**
 * Main function
 */
function main() {
  const buildDir = path.resolve(__dirname, '../build');

  if (!fs.existsSync(buildDir)) {
    console.log(`\n${colors.gray}No build directory found. Run 'npm run build' first.${colors.reset}\n`);
    return;
  }

  console.log(`\n${colors.green}${colors.bold}✓ Build Report${colors.reset}\n`);

  // Compiled artifacts
  const artifacts = getBuildArtifacts(buildDir);

  if (artifacts.length > 0) {
    const isCompiled = artifacts[0].name.startsWith('compiled/');
    const label = isCompiled ? 'build/compiled/):' : 'build/):';
    console.log(`${colors.cyan}${colors.bold}Compiled output (${label}${colors.reset}`);

    let totalCompiled = 0;
    for (const artifact of artifacts) {
      const sizeStr = formatBytes(artifact.size).padStart(10);
      console.log(`  ${colors.gray}${artifact.name.padEnd(30)}${colors.reset} ${colors.blue}${sizeStr}${colors.reset}  ${colors.gray}${artifact.description}${colors.reset}`);
      totalCompiled += artifact.size;
    }
    console.log(`  ${colors.gray}${'─'.repeat(55)}${colors.reset}`);
    console.log(`  ${'Total compiled:'.padEnd(30)} ${colors.bold}${formatBytes(totalCompiled)}${colors.reset}\n`);
  }

  // Release packages
  const releases = getReleasePackages(buildDir);

  if (releases.length > 0) {
    const distDir = path.join(buildDir, 'releases');
    const label = fs.existsSync(distDir) ? 'build/releases/):' : 'build/dist/):';
    console.log(`${colors.cyan}${colors.bold}Release packages (${label}${colors.reset}`);

    let totalReleases = 0;
    for (const release of releases) {
      const sizeStr = formatBytes(release.size).padStart(10);
      const typeIcon = release.type === 'installer' ? '📦' : '📁';
      console.log(`  ${typeIcon} ${colors.gray}${release.name.padEnd(40)}${colors.reset} ${colors.blue}${sizeStr}${colors.reset}`);
      totalReleases += release.size;
    }
    console.log(`  ${colors.gray}${'─'.repeat(55)}${colors.reset}`);
    console.log(`  ${'Total releases:'.padEnd(42)} ${colors.bold}${formatBytes(totalReleases)}${colors.reset}\n`);
  }

  // Tips
  console.log(`${colors.gray}Commands:${colors.reset}`);
  console.log(`${colors.gray}  npm run dev          - Start dev server with HMR${colors.reset}`);
  console.log(`${colors.gray}  npm run build:start  - Run built Electron app${colors.reset}`);
  console.log(`${colors.gray}  npm run build:full   - Clean + build + package${colors.reset}\n`);
}

main();

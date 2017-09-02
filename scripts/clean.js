/**
 * clean.js
 *
 * Cleans up process, browser, server and prerender build results.
 */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('../build.conf.js');

let browserAppOutDir = path.resolve(__dirname, '../', config.build.browserAppOutDir),
    serverAppOutDir = path.resolve(__dirname, '../', config.build.serverAppOutDir),
    processOutDir = path.resolve(__dirname, '../', config.process.dir),
    prerenderOutDir = path.resolve(__dirname, '../', config.prerender.outDir);

if (process.argv[2] === 'process') {
  shell.rm('-rf', `${processOutDir}/**/*.json`);
} else {
  shell.rm('-rf', browserAppOutDir, serverAppOutDir, prerenderOutDir);
}
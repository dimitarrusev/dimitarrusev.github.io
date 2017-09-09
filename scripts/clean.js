/**
 * clean.js
 *
 * Cleans up process, browser, server and prerender build results.
 */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('../build.conf.js');


if (process.argv[2] === 'processOutput') {
  let processOutDir = path.resolve(__dirname, '../', config.process.dir);

  shell.rm('-rf', `${processOutDir}/**/*.json`);
} else {
  let buildDir = path.resolve(__dirname, '../', config.build.outDir),
      prerenderOutDir = path.resolve(__dirname, '../', config.prerender.outDir);

  shell.rm('-rf', buildDir, prerenderOutDir);
}

/**
 * clean.js
 *
 * Cleans up process, browser, server and prerender build results.
 */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('../build.conf.js');


if (process.argv[2] === 'process') {
  let pagesDir = path.resolve(__dirname, '../', config.process.pages.dir);
  let articlesDir = path.resolve(__dirname, '../', config.process.articles.dir);

  shell.rm('-rf', `${pagesDir}/**/*.json`);
  shell.rm('-rf', `${articlesDir}/**/*.json`);
} else if (process.argv[2] === 'feed') {
  let feedDir = path.resolve(__dirname, '../', config.feed.outDir);
  let feedFilename = `${ config.feed.filename }.xml`;

  shell.rm('-rf', `${ feedDir }/${ feedFilename }`);
} else {
  let buildDir = path.resolve(__dirname, '../', config.build.outDir),
      prerenderOutDir = path.resolve(__dirname, '../', config.prerender.outDir);

  shell.rm('-rf', buildDir, prerenderOutDir);
}

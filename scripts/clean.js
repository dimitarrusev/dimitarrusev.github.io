/**
 * clean.js
 *
 * Cleans up process, browser, server and prerender build results.
 */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('../build.conf.js');

switch (process.argv[2]) {
    case 'process':
      const pagesDir = path.resolve(__dirname, '../', config.process.pages.dir);
      const articlesDir = path.resolve(__dirname, '../', config.process.articles.dir);

      shell.rm('-rf', `${pagesDir}/**/*.json`);
      shell.rm('-rf', `${articlesDir}/**/*.json`);
      break;

    case 'feed':
      const feedDir = path.resolve(__dirname, '../', config.feed.outDir);
      const feedFilename = `${ config.feed.filename }.xml`;

      shell.rm('-rf', `${ feedDir }/${ feedFilename }`);
      break;

    case 'sitemap':
      const sitemapDir = path.resolve(__dirname, '../', config.sitemap.outDir);
      const sitemapFilename = `${ config.sitemap.filename }.xml`;

      shell.rm('-rf', `${ sitemapDir }/${ sitemapFilename }`);
      break;

    case 'robots':
      const robotsDir = path.resolve(__dirname, '../', config.robots.outDir);
      const robotsFilename = `${ config.robots.filename }.txt`;

      shell.rm('-rf', `${ robotsDir }/${ robotsFilename }`);
      break;

    default:
      const buildDir = path.resolve(__dirname, '../', config.build.outDir);
      const prerenderOutDir = path.resolve(__dirname, '../', config.prerender.outDir);

      shell.rm('-rf', buildDir, prerenderOutDir);
}

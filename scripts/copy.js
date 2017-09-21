/**
 * copy.js
 *
 * Copies assets and content into distribution directory.
 */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('../build.conf.js');

const browserAppOutDir = path.resolve(__dirname, '../', config.build.browserAppOutDir),
      serverAppOutDir = path.resolve(__dirname, '../', config.build.serverAppOutDir),
      prerenderType = config.prerender.type,
      prerenderOutDir = path.resolve(__dirname, '../', config.prerender.outDir),
      processPagesOutDir = `${config.process.pages.dir.split('/').filter(piece => piece !== 'src')[0]}`,
      processArticlesOutDir = `${config.process.articles.dir.split('/').filter(piece => piece !== 'src')[0]}`;

const pages = `${browserAppOutDir}/${processPagesOutDir}`;
const articles = `${browserAppOutDir}/${processArticlesOutDir}`;

const staticAssets = [
  `${browserAppOutDir}/CNAME`,
  `${browserAppOutDir}/favicon.ico`,
  `${serverAppOutDir}/styles.*`
];

const dynamicAssets = [
  `${browserAppOutDir}/CNAME`,
  `${browserAppOutDir}/favicon.ico`,
  `${browserAppOutDir}/styles.*`,
  `${browserAppOutDir}/inline.*`,
  `${browserAppOutDir}/polyfills.*`,
  `${browserAppOutDir}/vendor.*`,
  `${browserAppOutDir}/main.*`
];

const assetsAndContent = (prerenderType === 'static') ? [...staticAssets, pages, articles] : [...dynamicAssets, pages, articles];

shell.cp('-R', assetsAndContent, prerenderOutDir);

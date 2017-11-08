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
      processArticlesOutDir = `${config.process.articles.dir.split('/').filter(piece => piece !== 'src')[0]}`,
      feedOutDir = path.resolve(__dirname, '../', config.feed.outDir),
      sitemapOutDir = path.resolve(__dirname, '../', config.sitemap.outDir);

const pages = `${browserAppOutDir}/${processPagesOutDir}`;
const articles = `${browserAppOutDir}/${processArticlesOutDir}`;

const staticAssets = [
  `${browserAppOutDir}/CNAME`,
  `${feedOutDir}/${ config.feed.filename }.xml`,
  `${sitemapOutDir}/${ config.sitemap.filename }.xml`,
  `${browserAppOutDir}/favicon.ico`,
  `${serverAppOutDir}/styles.*`
];

const dynamicAssets = [
  `${browserAppOutDir}/CNAME`,
  `${browserAppOutDir}/favicon.ico`,
  `${feedOutDir}/${ config.feed.filename }.xml`,
  `${sitemapOutDir}/${ config.sitemap.filename }.xml`,
  `${browserAppOutDir}/styles.*`,
  `${browserAppOutDir}/inline.*`,
  `${browserAppOutDir}/polyfills.*`,
  `${browserAppOutDir}/vendor.*`,
  `${browserAppOutDir}/main.*`,
  `${browserAppOutDir}/*.chunk.*`,
];

const assetsAndContent = (prerenderType === 'static')
                            ? [...staticAssets, pages, articles]
                            : [...dynamicAssets, pages, articles];

shell.cp('-R', assetsAndContent, prerenderOutDir);

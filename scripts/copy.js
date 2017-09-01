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
      processOutDir = `${config.process.dir.split('/').filter(piece => piece !== 'src')[0]}`;

const content = `${browserAppOutDir}/${processOutDir}`;

const staticAssets = [
  `${browserAppOutDir}/favicon.ico`,
  `${serverAppOutDir}/styles.*`
];

const dynamicAssets = [
  `${browserAppOutDir}/favicon.ico`,
  `${browserAppOutDir}/styles.*`,
  `${browserAppOutDir}/inline.*`,
  `${browserAppOutDir}/polyfills.*`,
  `${browserAppOutDir}/vendor.*`,
  `${browserAppOutDir}/main.*`
];

const assetsAndContent = (prerenderType === 'static') ? [...staticAssets, content] : [...dynamicAssets, content];

shell.cp('-R', assetsAndContent, prerenderOutDir);

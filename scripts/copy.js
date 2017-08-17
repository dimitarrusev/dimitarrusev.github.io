const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
let { documentType, outputPath } = require('../prerender.conf.js');

outputPath = path.resolve(__dirname, '../', outputPath);

let staticAssets = [
  path.resolve(__dirname, '../', 'build/browser/favicon.ico'),
  path.resolve(__dirname, '../', 'build/server/styles.*')
];

const dynamicAssets = [
  path.resolve(__dirname, '../', 'build/browser/favicon.ico'),
  path.resolve(__dirname, '../', 'build/browser/main.*'),
  path.resolve(__dirname, '../', 'build/browser/polyfills.*'),
  path.resolve(__dirname, '../', 'build/browser/styles.*'),
  path.resolve(__dirname, '../', 'build/browser/vendor.*')
];

shell.cp('-R', (documentType === 'static') ? staticAssets : dynamicAssets, outputPath);

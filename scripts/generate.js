/**
 * generate.js
 *
 * Generates directory structure for each route in accordance with the permalink settings.
 */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('../build.conf.js');
const { routes, permalink } = config.prerender;

if (process.argv[2] === 'buildDir') {
  let buildDir = path.resolve(__dirname, '../', config.build.outDir);

  if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);
} else {
  let outDir = path.resolve(__dirname, '../', config.prerender.outDir);

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  (permalink === 'pretty')
    ? routes.filter(route => route !== '/')
            .map(route => shell.mkdir('-p', `${outDir}/${route}`))
    : routes.filter(route => route !== '/')
            .filter(route => route.split('/').length > 1)
            .filter(route => route.split('/').shift() === 'blog')
            .map(route => {
              route = route.split('/');
              route.pop();
              route = route.join('/');
              shell.mkdir('-p', `${outDir}/${route}`);
            });
}

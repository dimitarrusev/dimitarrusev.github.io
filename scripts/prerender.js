/**
 * prerender.js
 *
 * Prerenders and spits out static or dynamic page for each route.
 */

require('zone.js/dist/zone-node');
require('reflect-metadata');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('../build.conf.js');
const { renderModuleFactory } = require('@angular/platform-server');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../build/server/main.bundle.js');

const routes = config.prerender.routes;
const document = fs.readFileSync(path.resolve(__dirname, '../', config.prerender.document), 'utf-8');
const permalink = config.prerender.permalink;
const outDir = path.resolve(__dirname, '../', config.prerender.outDir);

routes.forEach(route => {
  let url = route;
  let extraProviders = [
    provideModuleMap(LAZY_MODULE_MAP),
    {
      provide: 'serverUrl',
      useValue: 'http://localhost:4200/'
    }
  ];

  renderModuleFactory(
    AppServerModuleNgFactory,
    {
      document,
      url,
      extraProviders
    }
  ).then(document => {
    (permalink === 'pretty')
      ? (url === '/')
          ? fs.writeFileSync(`${outDir}/index.html`, document)
          : fs.writeFileSync(`${outDir}/${url}/index.html`, document)
      : (url === '/')
          ? fs.writeFileSync(`${outDir}/index.html`, document)
          : fs.writeFileSync(`${outDir}/${url}.html`, document);
  });
});

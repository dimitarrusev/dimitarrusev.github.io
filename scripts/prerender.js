require('zone.js/dist/zone-node');
require('reflect-metadata');
const fs = require('fs');
const { renderModuleFactory } = require('@angular/platform-server');
const { AppServerModuleNgFactory } = require('../dist/server/main.bundle.js');

const args = process.argv.slice(2);

if (args.length != 2) {
  process.stdout.write("Usage: node prerender.js <type> <url>");
  process.exit();
}

renderModuleFactory(
  AppServerModuleNgFactory,
  {
    document: (args[0] === 'static') ? fs.readFileSync('./src/index.html', 'utf-8') : fs.readFileSync('./dist/browser/index.html', 'utf-8'),
    url: args[1]
  }
).then(document => process.stdout.write(document));


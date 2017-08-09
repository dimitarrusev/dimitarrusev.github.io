require('zone.js/dist/zone-node');
require('reflect-metadata');
const fs = require('fs');
const path = require('path');
const { renderModuleFactory } = require('@angular/platform-server');
const { AppServerModuleNgFactory } = require('../dist/server/main.bundle.js');
let { routes, permalinkType, documentPath, outputPath } = require('../prerender.conf.js');

documentPath = path.resolve(__dirname, '../', documentPath);
outputPath = path.resolve(__dirname, '../', outputPath);

const document = fs.readFileSync(documentPath, 'utf-8');

routes.forEach(url => {
  renderModuleFactory(
    AppServerModuleNgFactory,
    {
      document,
      url
    }
  ).then(document => {
    if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

    // create directory structure and write files to disk
    // in accordance with the permalink type settings
    (permalinkType === 'pretty')
      ? (url === '/')
          ? fs.writeFileSync(`${outputPath}/index.html`, document)
          : (fs.existsSync(`${outputPath}/${url}`))
              ? fs.writeFileSync(`${outputPath}/${url}/index.html`, document)
              : fs.mkdir(`${outputPath}/${url}`, () => fs.writeFileSync(`${outputPath}/${url}/index.html`, document))
      : (url === '/')
          ? fs.writeFileSync(`${outputPath}/index.html`, document)
          : fs.writeFileSync(`${outputPath}/${url}.html`, document);
  });
});

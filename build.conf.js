const fs = require('fs');
const angularCliConfig = JSON.parse(fs.readFileSync('.angular-cli.json', 'utf-8'));

module.exports = {
  /**
   * .angular-cli.json configuration schema
   *
   * Dupcliate properties for ease of use.
   *
   * outDir: root output directory
   * browserAppOutDir: output directory for browser app build results
   * serverAppOutDir: output directory for server app build results
   */
  build: {
    outDir: angularCliConfig.apps.filter(app => app.name === 'browser')[0].outDir.split('/')[0],
    browserAppOutDir: angularCliConfig.apps.filter(app => app.name === 'browser')[0].outDir,
    serverAppOutDir: angularCliConfig.apps.filter(app => app.name === 'server')[0].outDir
  },

  /**
   * process.js configuration schema
   *
   * Processes markdown files to json.
   *
   * pages:
   * dir: directory containing page data in markdown format
   *
   * articles:
   * dir: directory containing articles in markdown format
   * excerptLength: excerpt character length
   * outFilenameFormat: filename format for processed entries (supported formats: year-month-day-slug, year-month-slug, year-slug, slug)
   * outSummaryFilename: filename for the summary file (filename or false)
   */
  process: {
    pages: {
      dir: 'src/content/pages',
      contentPropertyName: 'content'
    },
    articles: {
      dir: 'src/content/articles',
      contentPropertyName: 'content',
      excerptLength: 100,
      outFilenameFormat: 'slug',
      outSummaryFilename: 'articles.json'
    }
  },

  /**
   * prerender.js configuration schema
   *
   * Prerenders and spits out static or dynamic page for each route.
   *
   * routes: routes to prerender (should mirror your routes file)
   * type: document type (static or dynamic)
   * document: html document to be used as a base for each route
   * permalink: "pretty" for "pretty-URLs"
   * outDir: output directory for prerendered results
   */
  prerender: {
    routes: [
      '/',
      'about',
      'articles',
      'articles/first-post',
      'articles/second-post',
      'articles/third-post',
      'articles/fourth-post',
      'contact'
    ],
    type: 'dynamic',
    document: 'build/browser/index.html',
    permalink: 'pretty',
    outDir: 'dist'
  }
};

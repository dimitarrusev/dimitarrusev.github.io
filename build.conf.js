const fs = require('fs');
const angularCliConfig = JSON.parse(fs.readFileSync('.angular-cli.json', 'utf-8'));

module.exports = {
  /**
   * .angular-cli.json configuration schema
   *
   * Dupcliate properties for ease of use.
   *
   * browserAppOutDir: output directory for browser app build results
   * serverAppOutDir: output directory for server app build results
   */
  build: {
    browserAppOutDir: angularCliConfig.apps.filter(app => app.name === 'browser')[0].outDir,
    serverAppOutDir: angularCliConfig.apps.filter(app => app.name === 'server')[0].outDir
  },

  /**
   * process.js configuration schema
   *
   * Processes markdown files to json.
   *
   * dir: directory containing markdown files
   * outFilenameFormat: filename format for processed entries (supported formats: year-month-day-slug, year-month-slug, year-slug, slug)
   * outSummaryFilename: filename for the summary file (filename or false)
   */
  process: {
    dir: 'src/content/posts',
    outFilenameFormat: 'year-month-slug',
    outSummaryFilename: 'posts.json'
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
      'blog',
      'blog/2017/08/first-post',
      'blog/2017/08/second-post',
      'contact'
    ],
    type: 'dynamic',
    document: 'build/browser/index.html',
    permalink: 'pretty',
    outDir: 'dist'
  }
};

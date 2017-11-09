const fs = require('fs');
const angularCliConfig = JSON.parse(fs.readFileSync('.angular-cli.json', 'utf-8'));

module.exports = {
  /**
   * build configuration
   *
   * Build related settings.
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
   * process.js configuration
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
   * generate.js feed configuration
   *
   * Generates RSS feed.
   *
   * filename: filename for the generated feed
   * outDir: output directory for the generated feed
   * title: feed title
   * description: feed description
   * id: site id
   * link: site url
   * image: site image
   * favicon: site favicon
   * copyright: feed copyright info
   * generator: feed generator, defaults to 'Feed for Node.js'
   * feedLinks: object containing feed urls (example: feedLinks: { rss: 'https://domain.com/feed.xml' })
   * author: object containing author info (example: author: { name: 'John Doe', email: 'contact@johndoe.com', link: 'https://johdoe.com/about' })
   */
  feed: {
    filename: 'feed',
    outDir: 'src',
    title: 'Dimitar Rusev',
    description: 'Articles on front-end engineering.',
    id: 'https://dimitarrusev.com/',
    link: 'https://dimitarrusev.com/',
    image: '',
    copyright: 'Copyright 2017 Dimitar Rusev',
    feedLinks: {
      rss: 'https://dimitarrusev.com/feed.xml'
    },
    author: {
      name: 'Dimitar Rusev',
      email: 'contact@dimitarrusev.com',
      link: 'https://dimitarrusev.com/about'
    }
  },

  /**
   * generate.js sitemap configuration
   */
  sitemap: {
    filename: 'sitemap',
    outDir: 'src',
  },

  /**
   * generate.js robots configuration
   */
  robots: {
    filename: 'robots',
    outDir: 'src',
  },

  /**
   * prerender.js configuration
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
      'articles/fifth-post',
      'articles/sixth-post',
      'articles/seventh-post',
      'contact'
    ],
    type: 'dynamic',
    document: 'build/browser/index.html',
    permalink: 'pretty',
    outDir: 'dist'
  },
};

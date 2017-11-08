/**
 * generate.js
 *
 * Generates build directory, directory structure (in accordance with permalink settins),
 * feed or sitemap depending on user input.
 */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('../build.conf.js');

switch(process.argv[2]) {
  case 'build-directory':
    const buildDir = path.resolve(__dirname, '../', config.build.outDir);

    if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);
    break;

  case 'directory-structure':
    const { routes, permalink } = config.prerender;
    const outDir = path.resolve(__dirname, '../', config.prerender.outDir);

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
    break;

  case 'feed':
    const rss = require('rss');
    const articles = JSON.parse(fs.readFileSync(`${config.process.articles.dir}/${config.process.articles.outSummaryFilename}`, 'utf-8'));
    const feed = new rss({
      title: config.feed.title,
      description: config.feed.description,
      site_url: config.feed.siteUrl,
      feed_url: config.feed.feedUrl,
      image_url: config.feed.imageUrl,
      copyright: config.feed.copyright,
      language: config.feed.language
    });

    for (let article in articles) {
      if (articles.hasOwnProperty(article)) {
        article = articles[article];

        feed.item({
          title: article.title,
          description: article.excerpt.trim(),
          url: `https://dimitarrusev.com/articles/${ article.slug }`,
          categories: [`${ article.category }`],
          date: article.date
        });
      }
    }

    fs.writeFileSync(`${ config.feed.outDir }/${ config.feed.filename }.xml`, feed.xml({ indent: true }));
    break;

  case 'sitemap':
    const sm = require('sitemap');
    let sitemap = sm.createSitemap({
      hostname: `https://dimitarrusev.com`,
      cachetime: 600000, // 600 seconds (10 min) cache purge period
      urls: []
    });

    config.prerender.routes.forEach((route) => {
      sitemap.urls.push({
        url: route,
        changefreq: 'weekly',
        priority: 0.8,
        lastmodrealtime: true,
        lastmodfile: `${ config.prerender.outDir }/${ route }/index.html`
      });
    });

    fs.writeFileSync(`${ config.sitemap.outDir }/${ config.sitemap.filename }.xml`, sitemap.toString());
    break;
}

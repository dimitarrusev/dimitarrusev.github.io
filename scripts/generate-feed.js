/**
 * generate-feed.js
 *
 * Generates RSS feed.
 */

const fs = require('fs');
const rss = require('rss');
const config = require('../build.conf');

const feedOptions = {
  title: config.feed.title,
  description: config.feed.description,
  site_url: config.feed.siteUrl,
  feed_url: config.feed.feedUrl,
  image_url: config.feed.imageUrl,
  copyright: config.feed.copyright,
  language: config.feed.language
};

const feed = new rss(feedOptions);

const articles = JSON.parse(fs.readFileSync(`${config.process.articles.dir}/${config.process.articles.outSummaryFilename}`, 'utf-8'));

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

const xml = feed.xml({ indent: true });
fs.writeFileSync(`${ config.feed.outDir }/${ config.feed.filename }.xml`, xml);

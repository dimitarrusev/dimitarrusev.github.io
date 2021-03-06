/**
 * process.js
 *
 * Processes markdown files to json.
 */

const fs = require('fs');
const yaml = require('yaml-front-matter');
const marked = require('marked');
const prism = require('prismjs');
const config = require('../build.conf');

switch(process.argv[2]) {
  case 'pages':
    const markdownPageEntries = getMarkdownEntries(config.process.pages.dir);
    const processedPageEntries = processPageEntries(markdownPageEntries);

    writeIndividualPageFiles(processedPageEntries);
    break;

  case 'articles':
    const markdownArticleEntries = getMarkdownEntries(config.process.articles.dir);
    const processedArticleEntries = processArticleEntries(markdownArticleEntries);

    writeIndividualArticleFiles(processedArticleEntries);

    if (config.process.articles.outSummaryFilename) writeSummaryFile(processedArticleEntries);
    break;
}

function getMarkdownEntries(dir) {
  let items = fs.readdirSync(dir);
  let markdownEntries = [];

  items.filter(item => !item.isDirectory)
       .filter(filename => filename.split('.')[1] === 'md')
       .map(markdownEntry => markdownEntries.push(`${dir}/${markdownEntry}`));

  return markdownEntries;
};

function processPageEntries(pageEntries) {
  let processedPageEntries = [];

  pageEntries.forEach(pageEntry => {
    let contentPropertyName = config.process.pages.contentPropertyName;
    let processedPageEntry = yaml.loadFront(pageEntry, contentPropertyName);

    // add filename prop
    processedPageEntry.filename = pageEntry.replace(`${config.process.pages.dir}/`, '').split('.')[0] + '.json';

    // convert markdown to html
    processedPageEntry[contentPropertyName] = convertMarkdownToHtml(processedPageEntry[contentPropertyName]);

    processedPageEntries.push(processedPageEntry);
  });

  return processedPageEntries;
};

function processArticleEntries(articleEntries) {
  let processedArticleEntries = [];

  articleEntries.forEach(articleEntry => {
    let contentPropertyName = config.process.articles.contentPropertyName;
    let processedArticleEntry = yaml.loadFront(articleEntry, contentPropertyName);

    let date = processedArticleEntry.date.split(' ').splice(0, 1).join(' ').split('-');

    // add year, month and day props
    processedArticleEntry.year = date[0];
    processedArticleEntry.month = date[1];
    processedArticleEntry.day = date[2];

    // add monthname and dayname props
    processedArticleEntry.monthName = getMonthName(processedArticleEntry.date);
    processedArticleEntry.dayName = getDayName(processedArticleEntry.date);

    // add time and timezone props
    processedArticleEntry.time = processedArticleEntry.date.split(' ').splice(1, 1).join(' ');
    processedArticleEntry.timezone = processedArticleEntry.date.split(' ').splice(2, 1).join(' ');

    // add reading time prop
    processedArticleEntry.readingTime = calculateReadingTime(processedArticleEntry.content);

    // add excerpt prop
    processedArticleEntry.excerpt = processedArticleEntry.content.slice(0, config.process.articles.excerptLength);

    // convert markdown to html
    processedArticleEntry[contentPropertyName] = convertMarkdownToHtml(processedArticleEntry[contentPropertyName]);

    processedArticleEntries.push(processedArticleEntry);
  });

  processedArticleEntries.sort((a, b) => {
    let c = new Date(a.date),
        d = new Date(b.date);
    return c - d;
  });

  return processedArticleEntries;
};

function convertMarkdownToHtml(markdown) {
  let customRenderer = new marked.Renderer();

  customRenderer.code = (code, language) => {
    return `<pre class="language-${ language }"><code class="language-${ language }">${ highlightSyntax(code, language) }</code></pre>`;
  };

  marked.setOptions({
    renderer: customRenderer,
    langPrefix: 'language-'
  });

  return marked(markdown);
};

function highlightSyntax(code, language) {
  require(`prismjs/components/prism-${language}`);

  return prism.highlight(code, prism.languages[language]);
};

function generateFilename(format, date, slug) {
  let filename;
  let year = date.split('-')[0];
  let month = date.split('-')[1];
  let day = date.split('-')[2];

  switch(format) {
    case 'year-month-day-slug':
        filename = `${date}-${slug}.json`;
        break;
    case 'year-month-slug':
        filename = `${year}-${month}-${slug}.json`;
        break;
    case 'year-slug':
        filename = `${year}-${slug}.json`;
        break;
    case 'slug':
        filename = `${slug}.json`;
        break;
    default:
        filename = `${date}-${slug}.json`;
  }

  return filename;
};

function writeIndividualPageFiles(files) {
  files.forEach(file => {
    let filename = file.filename;

    fs.writeFileSync(`${config.process.pages.dir}/${filename}`, JSON.stringify(file));
  });
}

function writeIndividualArticleFiles(files) {
  files.forEach(file => {
    let filename = generateFilename(config.process.articles.outFilenameFormat, file.date, file.slug);

    fs.writeFileSync(`${config.process.articles.dir}/${filename}`, JSON.stringify(file), { flag: 'wx' });
  });
};

function writeSummaryFile(files) {
  let summaryFilename = config.process.articles.outSummaryFilename;
  let summary = files.map(entry => {
    let file = Object.assign({}, entry);

    delete file['content'];

    return file;
  });

  fs.writeFileSync(`${config.process.articles.dir}/${summaryFilename}`, JSON.stringify(summary));
}

function getDayName(date) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    return days[new Date(date).getDay()];
}

function getMonthName(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return months[new Date(date).getMonth()];
}

function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s+/g).length;
  const readingTime = Math.round(numberOfWords / wordsPerMinute);

  return (readingTime > 0) ? `${ readingTime } minute read` : `Less then 1 minute`;
}

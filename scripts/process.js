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

if (process.argv[2] === 'pages') {
  const markdownEntries = getMarkdownEntries(config.process.pages.dir);
  const processedPageEntries = processPageEntries(markdownEntries);

  writeIndividualPageFiles(processedPageEntries);
}

if (process.argv[2] === 'posts') {
  const markdownEntries = getMarkdownEntries(config.process.posts.dir);
  const processedPostEntries = processPostEntries(markdownEntries);

  writeIndividualPostFiles(processedPostEntries);

  if (config.process.posts.outSummaryFilename) writeSummaryFile(processedPostEntries);
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

function processPostEntries(postEntries) {
  let processedPostEntries = [];

  postEntries.forEach(postEntry => {
    let contentPropertyName = config.process.posts.contentPropertyName;
    let processedPostEntry = yaml.loadFront(postEntry, contentPropertyName);

    let date = processedPostEntry.date.split('-');

    // add year, month and day props
    processedPostEntry.year = date[0];
    processedPostEntry.month = date[1];
    processedPostEntry.day = date[2];

    // add monthname and dayname props
    processedPostEntry.monthName = getMonthName(processedPostEntry.date);
    processedPostEntry.dayName = getDayName(processedPostEntry.date);

    // add excerpt prop
    processedPostEntry.excerpt = processedPostEntry.content.slice(0, config.process.posts.excerptLength);

    // convert markdown to html
    processedPostEntry[contentPropertyName] = convertMarkdownToHtml(processedPostEntry[contentPropertyName]);

    processedPostEntries.push(processedPostEntry);
  });

  return processedPostEntries;
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

function writeIndividualPostFiles(files) {
  files.forEach(file => {
    let filename = generateFilename(config.process.posts.outFilenameFormat, file.date, file.slug);

    fs.writeFileSync(`${config.process.posts.dir}/${filename}`, JSON.stringify(file));
  });
};

function writeSummaryFile(files) {
  let summaryFilename = config.process.posts.outSummaryFilename;
  let summary = files.map(entry => {
    let file = Object.assign({}, entry);

    delete file['content'];

    return file;
  });

  fs.writeFileSync(`${config.process.posts.dir}/${summaryFilename}`, JSON.stringify(summary));
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

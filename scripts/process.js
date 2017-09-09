/**
 * process.js
 *
 * Processes markdown files to json.
 */

const fs = require('fs');
const yaml = require('yaml-front-matter');
const marked = require('marked');
const config = require('../build.conf');

function getMarkdownEntries(dir) {
  let items = fs.readdirSync(dir);
  let markdownEntries = [];

  items.filter(item => !item.isDirectory)
       .filter(filename => filename.split('.')[1] === 'md')
       .map(markdownEntry => markdownEntries.push(`${dir}/${markdownEntry}`));

  return markdownEntries;
};

function processMarkdownEntries(markdownEntries) {
  let processedMarkdownEntries = [];

  markdownEntries.forEach(markdownEntry => {
    let contentPropertyName = 'content';
    let processedMarkdownEntry = yaml.loadFront(markdownEntry, contentPropertyName);
    let date = processedMarkdownEntry.date.split('-');

    // add year, month and day props
    processedMarkdownEntry.year = date[0];
    processedMarkdownEntry.month = date[1];
    processedMarkdownEntry.day = date[2];

    // add monthname and dayname props
    processedMarkdownEntry.monthName = getMonthName(processedMarkdownEntry.date);
    processedMarkdownEntry.dayName = getDayName(processedMarkdownEntry.date);

    // add excerpt prop
    processedMarkdownEntry.excerpt = processedMarkdownEntry.content.slice(1, config.process.excerptLength);

    // convert markdown to html
    processedMarkdownEntry[contentPropertyName] = marked(processedMarkdownEntry[contentPropertyName]);

    processedMarkdownEntries.push(processedMarkdownEntry);
  });

  return processedMarkdownEntries;
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

function writeIndividualFiles(files) {
  files.forEach(entry => {
    let file = Object.assign({}, entry);
    let filename = generateFilename(config.process.outFilenameFormat, file.date, file.slug);

    delete file['excerpt'];

    fs.writeFileSync(`${config.process.dir}/${filename}`, JSON.stringify(file));
  });
};

function writeSummaryFile(files) {
  let summaryFilename = config.process.outSummaryFilename;
  let summary = files.map(entry => {
    let file = Object.assign({}, entry);

    delete file['content'];

    return file;
  });

  fs.writeFileSync(`${config.process.dir}/${summaryFilename}`, JSON.stringify(summary));
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

const markdownEntries = getMarkdownEntries(config.process.dir);
const processedMarkdownEntries = processMarkdownEntries(markdownEntries);

writeIndividualFiles(processedMarkdownEntries);

if (config.process.outSummaryFilename) writeSummaryFile(processedMarkdownEntries);

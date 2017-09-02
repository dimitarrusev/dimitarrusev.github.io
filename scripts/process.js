/**
 * process.js
 *
 * Processes markdown files to json.
 */

const fs = require('fs');
const yaml = require('yaml-front-matter');
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
  files.forEach(file => {
    let filename = generateFilename(config.process.outFilenameFormat, file.date, file.slug);

    fs.writeFileSync(`${config.process.dir}/${filename}`, JSON.stringify(file));
  });
};

function writeSummaryFile(files) {
  let summaryFilename = config.process.outSummaryFilename;
  let summary = files.filter(file => delete file['content']);

  fs.writeFileSync(`${config.process.dir}/${summaryFilename}`, JSON.stringify(summary));
}

const markdownEntries = getMarkdownEntries(config.process.dir);
const processedMarkdownEntries = processMarkdownEntries(markdownEntries);

writeIndividualFiles(processedMarkdownEntries);

if (config.process.outSummaryFilename) writeSummaryFile(processedMarkdownEntries);
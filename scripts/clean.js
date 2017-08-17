const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
let { outputPath } = require('../prerender.conf.js');
outputPath = path.resolve(__dirname, '../', outputPath);

shell.rm('-rf', outputPath);


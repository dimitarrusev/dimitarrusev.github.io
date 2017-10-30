/**
 * serve.js
 *
 * Serves static files using http-server.
 */

const spawn = require('child_process').spawn;
const config = require('../build.conf.js');

const httpServer = spawn('node_modules/.bin/http-server', [ config.prerender.outDir ], { stdio: 'inherit' });


var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if (req.url === '/' || req.url === '/styles.css' || req.url === '/favicon.ico') {
    httpHelpers.serveAssets(res, req); 
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  }
  
  // res.end(archive.paths.list);
};

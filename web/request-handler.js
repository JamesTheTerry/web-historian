var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, req); 
  } else if (req.method === 'POST') {
    httpHelpers.submitURL(res, req);
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  }
  
  
  
  // res.end(archive.paths.list);
};

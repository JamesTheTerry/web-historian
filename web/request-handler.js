var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  httpHelpers.serveAssets(res, req); 
  
  
  // res.end(archive.paths.list);
};

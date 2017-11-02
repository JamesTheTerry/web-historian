var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET' && (req.url === '/' || req.url === '/styles.css' || req.url === '/favicon.ico')) {
    httpHelpers.serveAssets(res, req); 
  } else if (req.method === 'POST') {
    // archive.readListOfUrls();
    // archive.isUrlInList('www.james-terry.com', function(x) {
    //   console.log(x);
    //   if (!x) {
    //     archive.addUrlToList('www.james-terry.com');
    //   }
    // });
    
    
    httpHelpers.submitURL(res, req);
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  }
  
  
  
  // res.end(archive.paths.list);
};

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  var headers = exports.headers;
  
  // This just gets the file type so we can set the header content-type properly
  var extname = String(path.extname(asset.url)).toLowerCase();    
  var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpeg': 'image/jpg',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
  };
  var contentType = mimeTypes[extname];
  
  
  var filepath = __dirname + '/public' + asset.url;
  console.log('filepath', filepath);
  if (asset.url === '/') {
    filepath += 'index.html';
  }
  
  fs.readFile(filepath, function(err, data) {
    if (err) { console.log(err); }
    headers['Content-Type'] = contentType;
    res.writeHead(200, headers);
    res.write(data);
    res.end(); // if we put something in the end() its basically writing it
  });
  
};



// As you progress, keep thinking about what helper functions you can put here!

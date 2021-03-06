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

exports.submitURL = function(res, req) {
  var body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    body = body.slice(4);
    console.log('Body: ', body);
    
    archive.isUrlInList(body, function(inList) {
      // console.log('inList', inList);
      if (!inList) {
        archive.addUrlToList(body);
        
        var headers = exports.headers;
        headers['Location'] = '/loading.html';
        res.writeHead(302, exports.headers);
        res.end();
        
      } else {
        
        archive.isUrlArchived(body, function(inArchive) {
          if (inArchive) {
            var headers = exports.headers;
            headers['Location'] = '/' + body;
            res.writeHead(302, exports.headers);
            res.end();
          } else {
            var headers = exports.headers;
            headers['Location'] = '/loading.html';
            res.writeHead(302, exports.headers);
            res.end();
          }
        });
      }
    });
  });
  
  
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
    '.svg': 'application/image/svg+xml',
    '.ico': 'image/x-icon'
  };
  var contentType = mimeTypes[extname];
  
  console.log(asset.url);
  var filepath = asset.url;

  if (asset.url === '/') {
    filepath = __dirname + '/public/index.html';
  } else if (asset.url === '/styles.css') {
    filepath = __dirname + '/public/styles.css';
  } else if (asset.url === '/favicon.ico') {
    filepath = __dirname + '/public/favicon.ico';
  } else if (asset.url === '/loading.html') {
    filepath = __dirname + '/public/loading.html';
  } else {
    console.log('what the hell');
    console.log(asset.url);
    contentType = mimeTypes['.html'];
    filepath = archive.paths.archivedSites + asset.url;
    console.log(filepath);
  }
  
  fs.readFile(filepath, function(err, data) {
    if (err) { console.log(err); }
    headers['Content-Type'] = contentType;
    res.writeHead(200, headers);
    res.end(data); // if we put something in the end() its basically writing it
  });
  
};



// As you progress, keep thinking about what helper functions you can put here!

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var https = require('https');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// reads the list (duh)
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) { console.log(err); }
    var listOfUrls = data.split('\n');
    return callback(listOfUrls);
  });
};

// uses readList to check if url is in the list
exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(siteList) {
    // console.log('url', url);
    // console.log('siteList', siteList);
    // console.log('includes?', siteList.includes(url));
    callback(siteList.includes(url));
  });
};

// gets called by isUrlInList if it isnt in the list, so we can add it... to the list
exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, '\n' + url, 'utf8', function(err) {
    console.log(err);
  });
};


exports.isUrlArchived = function(url, callback) {  
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    // console.log(files); // this is an array of the files in there
    // console.log('IS THE URL THERE?', files.includes(url));
    callback(files.includes(url), url);
  });
  
};

exports.downloadUrls = function(urls) {
  // console.log('Downloading the websites');
  // console.log('Urls to download', urls);
  
  var actuallyDownload = function(alreadyDownloaded, url) {
    if (alreadyDownloaded) {
      return;
    }
    console.log('We need to download: ', url);
    // fs.writeFileSync(exports.paths.archivedSites + '/' + url);
    https.get({host: url}, function(res) {
      // if (err) {
      //   console.log(err);
      // }
      var body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        // console.log('Body: ', body);
        fs.writeFile(exports.paths.archivedSites + '/' + url, body, (err) => {
          if (err) {
            throw err;
          }
          console.log('The file has been saved!');
        });
      });
    });
  };
  
  urls.forEach((url) => {
    exports.isUrlArchived(url, actuallyDownload);
  });
};














// swag

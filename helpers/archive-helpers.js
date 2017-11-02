var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
};

// uses readList to check if url is in the list
exports.isUrlInList = function(url, callback) {
};

// gets called by isUrlInList if it isnt in the list, so we can add it... to the list
exports.addUrlToList = function(url, callback) {
};


exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};

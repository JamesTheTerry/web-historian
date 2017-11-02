// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');

var CronJob = require('cron').CronJob;

new CronJob('* * * * *', function() {
  console.log('Cron Job Every Minute');
  archive.readListOfUrls(archive.downloadUrls);
}, null, true, 'America/Los_Angeles');
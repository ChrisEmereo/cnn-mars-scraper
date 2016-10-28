var request = require('request');
var cheerio = require('cheerio');
var url     = require('url');

function scrape(event, context, callback) {

  var current_year = new Date().getFullYear();

  console.log('Mars News ' + current_year + '\n');
  var host_name = 'http://www.cnn.com/specials/space-science';

  request(host_name, function(error, response, html) {
    if (error) {
      console.log("Error:", error);
      return;
    }

    var $ = cheerio.load(html);
    var base_link = 'http://www.cnn.com';
    var data = [];
    var rows = $('.cd__headline-text').parent('a');

    for (var i = 0; i < rows.length; i++) {
      var link = rows[i].attribs.href;
      if(!link.includes("http")) {
        var newLink = base_link + link;
        if(newLink.includes("mars") && newLink.includes("2016")) {
          data.push(newLink);
        }
      }
    }

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].toString());
    }

  });
}

scrape();

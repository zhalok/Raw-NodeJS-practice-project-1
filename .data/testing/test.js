const http = require("http");
const url = require("url");
const fs = require("fs");
const parsedUrl = url.parse("http://localhost:3000/");

var options = {
    host: parsedUrl.host,
    path: parsedUrl.path,
};

callback = function (response) {
    var str = '';

    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on('end', function () {

        console.log(str);
    });
}

http.request(options, callback).end();

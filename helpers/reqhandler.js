const url = require("url");
const { StringDecoder } = require('string_decoder');
const routes = require("../routes/route");
const notFoundHandler = require("../routes/route_handlers/notFoundHanlder")

const handler = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method;
    const headers = req.headers;
    const query = parsedUrl.query;
    const body = req.body;
    const decoder = new StringDecoder("utf-8");

    const reqData = {
        trimmedPath,
        method,
        headers,
        query,
        body
    }

    let maindata = "";

    req.on("data", (data) => {
        maindata += decoder.write(data);
        console.log(decoder.write(data));
    })

    req.on("end", (data) => {
        if (trimmedPath == "") {
            res.end("On default route");
            console.log(reqData);
        }

        maindata += decoder.end();
        reqData.body = maindata;
        const routeHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
        routeHandler(reqData, (statusCode, payrole) => {

            const jsonpayrole = JSON.stringify(payrole);
            res.writeHead(statusCode);
            res.end(jsonpayrole);

        })
        res.end("stream ended");
    });






}

module.exports = handler;
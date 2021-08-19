const url = require("url");
const { StringDecoder } = require('string_decoder');
const routes = require("../routes/route");
const notFoundHandler = require("../routes/route_handlers/notFoundHanlder")
const defaultRouteHandler = require("../routes/route_handlers/defaultRouteHandler");
const util = require("../helpers/util");


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

    console.log(trimmedPath);

    let maindata = "";

    req.on("data", (data) => {
        maindata += decoder.write(data);
        console.log(decoder.write(data));
    })

    req.on("end", (data) => {

        if (trimmedPath == "") {
            defaultRouteHandler(reqData, (statusCode, payrole) => {
                res.setHeader("Content-type", "application/json");
                res.writeHead(statusCode);
                res.end(JSON.stringify(payrole));
            })

        }

        maindata += decoder.end();
        reqData.body = util.parseJSON(maindata);
        const routeHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
        console.log(routeHandler);

        routeHandler(reqData, (statusCode, payrole) => {

            const jsonpayrole = JSON.stringify(payrole);
            res.setHeader("content-type", "application/json");
            res.writeHead(statusCode);
            res.end(jsonpayrole);

        })


    });






}

module.exports = handler;
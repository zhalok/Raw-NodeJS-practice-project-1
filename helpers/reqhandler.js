const url = require("url");
const { StringDecoder } = require('string_decoder');
const routes = require("../routes/route");
const notFoundHandler = require("../routes/route_handlers/notFoundHanlder")
const defaultRouteHandler = require("../routes/route_handlers/defaultRouteHandler");
const util = require("../helpers/util");
const route = require("../routes/route");
const bodyChecker = require("../helpers/checker").checkBodyInfo;
const checker = require("../helpers/checker");



const handler = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method;
    const headers = req.headers;
    const query = parsedUrl.query;
    const body = util.parseJSON(req.body);
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

    })

    req.on("end", (data) => {



        maindata += decoder.end();

        maindata = JSON.parse(maindata);
        reqData.body = maindata;



        const routeHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;


        routeHandler(reqData, (statusCode, payrole) => {

            const jsonpayrole = JSON.stringify(payrole);
            res.setHeader("content-type", "application/json");
            res.writeHead(statusCode);
            res.end(jsonpayrole);
            return;

        })


    });






}

module.exports = handler;
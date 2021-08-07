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

    const reqData = {
        trimmedPath,
        method,
        headers,
        query
    }

    const routeHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    routeHandler(reqData, (statusCode, payrole) => {

        const jsonpayrole = JSON.stringify(payrole);
        res.writeHead(statusCode);
        res.end(jsonpayrole);

    }
    )






}

module.exports = handler;
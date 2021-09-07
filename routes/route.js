const defualtRouteHandler = require("./route_handlers/defaultRouteHandler");
const sampleRouteHandler = require("./route_handlers/sampleRouteHandler");
const { tokenRouteHandler } = require("./route_handlers/tokenRouteHanlder");
const { userRouteHandler } = require("./route_handlers/userRouteHandler");
const { checkRouteHandler } = require("./route_handlers/checkHandlers");
const { test, work } = require("../lib/worker");

const route = {
    sample: sampleRouteHandler.handler,
    user: userRouteHandler,
    "": defualtRouteHandler,
    token: tokenRouteHandler,
    check: checkRouteHandler,

}

module.exports = route;
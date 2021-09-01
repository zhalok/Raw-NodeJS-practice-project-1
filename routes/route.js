const defualtRouteHandler = require("./route_handlers/defaultRouteHandler");
const sampleRouteHandler = require("./route_handlers/sampleRouteHandler");
const { tokenRouteHandler } = require("./route_handlers/tokenRouteHanlder");
const { userRouteHandler } = require("./route_handlers/userRouteHandler");
const { checkHandler } = require("./route_handlers/checkHandlers");

const route = {
    sample: sampleRouteHandler.handler,
    user: userRouteHandler,
    "": defualtRouteHandler,
    token: tokenRouteHandler,
    check: checkHandler,

}

module.exports = route;
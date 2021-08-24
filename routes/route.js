const defualtRouteHandler = require("./route_handlers/defaultRouteHandler");
const sampleRouteHandler = require("./route_handlers/sampleRouteHandler");
const userRouteHandler = require("./route_handlers/userRouteHandler");
const route = {
    sample: sampleRouteHandler.handler,
    user: userRouteHandler,
    "": defualtRouteHandler

}

module.exports = route;
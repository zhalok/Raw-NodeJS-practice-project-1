const sampleRouteHandler = require("./route_handlers/sampleRouteHandler");
const userRouteHandler = require("./route_handlers/userHandler");
const route = {
    sample: sampleRouteHandler,
    user: userRouteHandler

}

module.exports = route;
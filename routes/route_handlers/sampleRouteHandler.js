const readData = require("../../lib/data_helper");

const sampleRouteHandler = {}

sampleRouteHandler.GET = (info, callback) => {
    // console.log(readData);
    callback(200, "ok fine great");
}

sampleRouteHandler.POST = (info, callback) => {

    const name = info.body.name;
    const pass = info.body.pass;
    callback(200, {});
}

sampleRouteHandler.PUT = (info, callback) => {

}

sampleRouteHandler.DELETE = (info, callback) => {

}


sampleRouteHandler.handler = (info, callback) => {
    const request_method = info.method;
    const accepted_methods = ["GET", "POST", "PUT", "DELETE"];
    if (accepted_methods.indexOf(request_method) > -1) {
        sampleRouteHandler[request_method](info, callback)
    }
    else {
        callback(405, "unable to find method");
    }
}


module.exports = sampleRouteHandler;
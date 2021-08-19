const sampleRouteHandler = {}

sampleRouteHandler.GET = (info, callback) => {
    callback(200, { message: "ok on get method call" });
}

sampleRouteHandler.POST = (info, callback) => {

    const name = info.body.name;
    const pass = info.body.pass;
    callback(200, {});
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
const sampleRouteHandler = (info, callback) => {

    const response = { message: "We are in sample route" };
    callback(200, response);

}

module.exports = sampleRouteHandler;
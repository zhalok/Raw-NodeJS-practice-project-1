const notFoundHandler = (info, callback) => {
    callback(404, "Not found");
}

module.exports = notFoundHandler;
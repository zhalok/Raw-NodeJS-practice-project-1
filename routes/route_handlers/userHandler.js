const uerRouteHandler = {}


createUser = (callback) => {

    callback(200, { message: "User creating route called" });
}
getUser = (callback) => {
    console.log("on get user route method ")
    callback(200, { message: "User getting route called" });
}

updateUser = (callback) => {
    callback(200, { message: "User updating route called" });
}

deleteUser = (callback) => {

    callback(200, { message: "User deleting route called" });

}

const helper = {
    GET: getUser,
    POST: createUser,
    PUT: updateUser,
    DELETE: deleteUser
}

userRouteHandler = (info, callback) => {

    const requested_method = info.method;
    const accepted_methods = ["GET", "POST", "PUT", "DELETE"];
    if (accepted_methods.indexOf(requested_method) > -1) {
        const handler_method = helper[requested_method];
        handler_method(callback);
    }
}

module.exports = userRouteHandler;












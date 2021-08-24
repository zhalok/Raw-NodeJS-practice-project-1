const data_helper = require("../../lib/data_helper");
const checker = require("../../helpers/checker").checkBodyInfo;
const readData = data_helper.read;
const createData = data_helper.create;

// first name last name phone number password 


createUser = (info, callback) => {



    if (checker(info.body, ["firstname", "lastname", "username", "password"])) {
        createData("userdata", info.body.username, info.body, callback);
    }
    else {
        callback(200, { message: "Invalid information" });
    }

}

getUser = (info, callback) => {


    if (checker(info.body, ["username"])) {

        readData("userdata", info.body.username, callback);
    }
    else {
        callback(404, { message: "invalid information" });
    }




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
        handler_method(info, callback);

    }
    else {
        callback(404, { message: "Invalid Request" });
    }
}

module.exports = userRouteHandler;












const data_helper = require("../../lib/data_helper");
const checker = require("../../helpers/checker").checkBodyInfo;
const util = require("../../helpers/util");


const readData = data_helper.read;
const createData = data_helper.create;
const updateData = data_helper.update;
const deleteData = data_helper.delete;

const handler = {};


handler.createToken = (info, callback) => {

    const { username, password } = info.body;
    const hashedPassword = util.hash(password);
    readData("userdata", username, (status, data) => {
        if (status == 200) {

        }
    })


}

handler.getToken = (info, callback) => {

}

handler.updateToken = (info, callback) => {

}

handler.deleteToken = (info, callback) => {

}





handler.tokenRouteHandler = (info, callback) => {


    const helper = {
        GET: handler.getToken,
        POST: handler.createToken,
        PUT: handler.updateToken,
        DELETE: handler.deleteToken
    }

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

module.exports = handler.tokenRouteHandler;
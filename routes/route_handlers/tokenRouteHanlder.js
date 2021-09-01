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
    readData("userdata", username, (err, user) => {
        if (err) {
            callback(404, { message: "User Not Found" });
        }
        else {

            const user_username = user.username;
            const user_password = user.password;


            if (user_username == username && user_password == hashedPassword) {

                const token = util.createRandomString(10);
                const tokenData = {
                    user: user_username,
                    id: token,
                    validity: Date.now() + 3600 * 1000,
                }
                createData("tokens", token, tokenData, (status) => {
                    if (status == 200) {
                        callback(status, { message: "OK token Generated", tokenData });
                    }
                    else if (status == 500) {
                        callback(status, { message: "Service Error" });
                    }
                    else if (status == 409) {
                        callback(status, { message: "User already exists" });
                    }

                });
            }
            else {
                callback(401, { message: "invalid credentials" })
            }


        }
    })


}

handler.getToken = (info, callback) => {

    const token = info.query.id;

    readData("tokens", token, (err, data) => {
        if (err) {
            callback(404, { message: "Token Not FOund" });
        }
        else {
            let validity = data.validity;
            if (data.validity > Date.now()) {

                validity = Date.now() + 3600 * 1000;
                const newToken = { ...data };

                newToken.validity = validity;
                updateData("tokens", token, newToken, (err) => {
                    if (!err) {
                        callback(200, { message: "Welcome you are logged in", });
                    }
                    else {
                        callback(500, { message: "There was a problem" });
                    }
                })

            }
            else {
                callback(401, { message: "Token Expired" });
            }
        }
    })

}

handler.updateToken = (info, callback) => {

}

handler.deleteToken = (info, callback) => {
    const token = info.query.id;

    readData("tokens", token, (err, data) => {
        if (err) {
            callback(404, { message: "Token not found to delete" });
        }
        else {
            deleteData("tokens", token, (err1) => {
                if (err1) {
                    callback(500, { message: "Service error" });
                }
                else {
                    callback(200, { message: `Token ${token} was deleted successfully` });
                }
            })
        }
    })

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

module.exports = handler;
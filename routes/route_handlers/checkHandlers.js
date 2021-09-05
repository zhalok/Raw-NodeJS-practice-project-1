const { read, create, update } = require("../../lib/data_helper");
const { createRandomString } = require("../../helpers/util");
const { type } = require("os");
const { check, user } = require("../route");



const handler = {};

handler.createCheck = (info, callback) => {

    const protocol = (typeof info.body.protocol === "string" && ["http", "https"].indexOf(info.body.protocol) > -1) ? info.body.protocol : false;
    const url = (typeof info.body.url === "string" && info.body.url.length > 0) ? info.body.url : false;
    const method = (typeof info.body.method === "string" && ["GET", "POST", "PUT", "DELETE"].indexOf(info.body.method) > -1) ? info.body.method : false;
    const successCodes = (typeof info.body.successCodes == "object" && info.body.successCodes instanceof Array) ? info.body.successCodes : false;
    const timeout = (typeof info.body.timeout === "number" && info.body.timeout >= 1 && info.body.timeout <= 5 && info.body.timeout % 1 === 0) ? info.body.timeout : false;

    const obj = {
        protocol,
        url,
        method,
        successCodes,
        timeout
    }

    console.log(obj);

    if (protocol && url && method && successCodes && timeout) {

        const token = info.headers.token;
        read("tokens", token, (err, data) => {
            if (!err) {
                const user = data.user;

                read("userdata", user, (err, userdata) => {
                    if (!err) {
                        if (!userdata.checks)
                            userdata.checks = [];
                        console.log(userdata);
                        const checkObject = {
                            checkId: createRandomString(10),
                            protocol,
                            url,
                            successCodes,
                            timeout
                        }
                        userdata.checks.push(checkObject.checkId);

                        create("checks", checkObject.checkId, checkObject, (err) => {
                            if (!err) {
                                update("userdata", user, userdata, (err) => {
                                    if (!err) {
                                        callback(200, { messsage: "Your request has been listed successfully" });
                                    }
                                    else {
                                        console.log("hello hi");
                                        callback(400, { message: "there was a problem1" });
                                    }
                                })
                            }
                            else {
                                callback(400, { message: "there was a problem2" });
                            }
                        })
                    }
                    else {
                        callback(404, { message: "user not valid" });
                    }
                })






            }
            else {
                callback(404, { message: "Token not found or expired Please log in" });
            }
        })


    }
    else {
        callback(400, { Message: "bad request" });
    }


}

handler.getCheck = (info, callback) => {
    const checkId = info.query.id;
    read("checks", checkId, (err, data) => {
        if (!err) {
            callback(200, data);
        }
        else callback(404, { message: "check not found" });
    })

}

handler.updateCheck = (info, callback) => {

    const checkId = info.query.id;
    const checkProps = (typeof info.body.props == "string" && ["protocol", "url", "method", "successCodes", "timeout"].indexOf(info.body.props) > -1) ? info.body.props : false
    const checkVal = info.body.value;
    let flag = false;

    if (checkProps) {


        if (checkProps == "protocol" && typeof checkVal == "string" && ["http", "https"].indexOf(checkVal) > -1)
            flag = true;

        if (checkProps == "url" && typeof checkVal == "string" && checkVal.length > 0)
            flag = true;

        if (checkProps == "method" && typeof checkVal == "string" && ["GET", "POST", "PUT", "DELETE"].indexOf(checkVal) > -1)
            flag = true;

        if (checkProps == "successCodes" && typeof checkVal == "object" && checkVal instanceof Array)
            flag = true;

        if (checkProps == "timeout" && typeof checkVal == "number" && checkVal >= 1 && checkVal <= 5)
            flag = true;



    }

    if (flag) {
        const token = info.headers.token;
        read("tokens", token, (err, tokenData) => {

            if (!err && tokenData) {

                const user = tokenData.user;
                read("userdata", user, (err, userData) => {
                    if (!err && userData) {
                        const checks = userData.checks;
                        if (checks && checks.indexOf(checkId) > -1) {
                            read("checks", checkId, (err, checkData) => {
                                if (!err && checkData) {
                                    checkData[checkProps] = checkVal;
                                    update("checks", checkId, checkData, (err) => {
                                        if (!err) {
                                            callback(200, { message: `check ${checkId} was updated!!!`, newCheck: checkData });
                                        }
                                        else {
                                            callback(400, { message: "there was a problem updating the check " + checkId });
                                        }
                                    })
                                }
                            })

                        }
                        else {
                            callback(409, { message: "invalid check id" });
                        }
                    }
                    else {
                        callback("404", { message: "User not found" });
                    }
                })

            }
            else {
                callback(404, { message: "token not found or expired" });
            }

        })
    }
    else {
        callback(409, { message: "bad request" });
    }




}

handler.deleteCheck = (info, callback) => {

}

handler.methods = {
    GET: handler.getCheck,
    POST: handler.createCheck,
    PUT: handler.updateCheck,
    DELETE: handler.deleteCheck
}

handler.checkRouteHandler = (info, callback) => {

    const requested_method = info.method;
    const accepted_methods = ["GET", "POST", "PUT", "DELETE"];
    if (accepted_methods.indexOf(requested_method) > -1) {
        const handler_method = handler.methods[requested_method];

        handler_method(info, callback);

    }
    else {
        callback(404, { message: "Invalid Request" });
    }

}



module.exports = handler;
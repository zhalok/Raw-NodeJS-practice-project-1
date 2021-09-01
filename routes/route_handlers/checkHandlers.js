const { type } = require("os");


const handler = {};

handler.createCheck = (info, callback) => {

    const protocol = (typeof info.body.protocol === "string" && ["http", "https"].indexOf(info.body.protocol) > -1) ? info.body.protocol : false;
    const url = (typeof info.body.url === "string" && info.body.url.length > 0) ? info.body.url : false;
    const method = (typeof info.body.method === "string" && ["GET", "POST", "PUT", "DELETE"].indexOf(info.body.method) > -1) ? info.body.method : false;
    const successCodes = (typeof info.body.successCodes == "object" && info.body.successCodes instanceof Array) ? info.body.successCodes : false;
    const timeout = (typeof info.body.timeout === "number" && info.body.timeout >= 1 && info.body.timeout <= 5 && info.body.timeout % 1 === 0) ? info.body.timeout : false;

    if (protocol && url && method && successCodes && timeout) {


    }
    else {
        callback(400, { Message: "bad request" });
    }


}

handler.getCheck = (info, callback) => {

}

handler.updateCheck = (info, callback) => {

}

handler.deleteCheck = (info, callback) => {

}



module.exports = handler;
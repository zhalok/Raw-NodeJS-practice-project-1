const crypto = require('crypto');
const environments = require("./enviroments");
const util = {};

util.parseJSON = (jsonString) => {
    let parsedJSON;
    try {
        parsedJSON = JSON.parse(jsonString);

    } catch (err) {
        parsedJSON = {}
    }

    return parsedJSON;
}

util.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {

        const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
        return hash;
    }
    return false;
};

util.phoneValidity = (number) => {
    const digits = "0123456789";

    if (number.length === 11) {
        for (let i = 0; i < 11; i++) {
            if (!digits[number[i]]) {
                return false;
            }
        }


        return true;
    }


    return false;
}





util.checkBodyInfo = (body, checkInfo) => {
    for (let i = 0; i < checkInfo.length; i++) {
        if (!body[checkInfo[i]])

            return false;

    }

    if (!util.phoneValidity(body.username)) return false;


    if (body.firstname.trim().length == 0) return false;

    if (body.lastname.trim().length == 0) return false;

    if (body.password.trim().length < 8) return false;

    const data = {
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,
        password: util.hash(body.password)
    }

    return data;




}




module.exports = util;
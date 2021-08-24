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

module.exports = util;
const util = {};

util.parseJSON = (jsonString) => {
    let parsedJSON;
    try {
        parsedJSON = JSON.parse(jsonString);

    } catch {
        parsedJSON = {}
    }

    return parsedJSON;
}

module.exports = util;
const checker = {};
checker.checkBodyInfo = (body, checkInfo) => {
    for (let i = 0; i < checkInfo.length; i++)
        if (!body[checkInfo[i]])
            return false;
    return true;
}

module.exports = checker;
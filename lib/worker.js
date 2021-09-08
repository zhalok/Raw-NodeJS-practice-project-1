const Url = require("url");
const http = require("http");
const https = require("https");

const { readAll, readDir, read, update } = require("./data_helper");
const { check } = require("../routes/route");

const worker = {}

worker.getAllChecks = (callback) => {
    readDir("checks", (err, filenames) => {
        if (!err && filenames) {

            const checks = [];

            filenames.forEach(e => {
                checks.push(e.trim().replace(".json", ""));
            })



            callback(null, checks);
        }
        else {
            callback(err);
        }
    })
}

worker.work = () => {

    worker.getAllChecks((err, checks) => {
        if (!err && checks) {

            if (checks.length == 0) {
                console.log("No checking to do");
                return;
            }

            checks.forEach(e => {

                read("checks", e, (err, checkData) => {


                    const url = checkData.url;
                    const protocol = checkData.protocol;
                    const parsedUrl = Url.parse(`${protocol}://${url}`, true);


                    const requestProperties = {
                        protocol: parsedUrl.protocol,
                        host: parsedUrl.host,
                        path: parsedUrl.path
                    }

                    worker.makeRequest(requestProperties, (err, statusCOde) => {
                        if (!err && statusCOde) {

                            worker.updateCheck(checkData.checkId, statusCOde, (err, msg) => {
                                if (!err && msg) {
                                    console.log(msg);
                                }
                                else if (err) {
                                    console.log(err);
                                }
                            })


                        } else {
                            console.log(err);
                        }
                    })


                })
            })

        }
        else {
            console.log("problm");
        }
    })

}

worker.makeRequest = (requestProperties, callback) => {

    const protocolToUse = (requestProperties.protocol == "https:") ? https : http;


    const req = protocolToUse.request(requestProperties, (res) => {
        callback(false, res.statusCode)
    })

    req.on("error", (e) => {
        callback(e);
    })

    req.on("timeout", () => {
        callback("timeout");
    })

    req.end();

}

worker.updateCheck = (checkId, statusCode, callback) => {
    read("checks", checkId, (err, checkData) => {
        if (!err) {
            const prev_status = (checkData.status) ? checkData.status : "down";
            const new_status = (checkData.successCodes.indexOf(statusCode) > -1) ? "up" : "down";
            checkData.status = new_status;
            checkData.lastChecked = Date().toLocaleString();
            let msg;
            if (prev_status != new_status)
                msg = `status of check ${checkId} of user ${checkData.user} is changed from ${prev_status} to ${new_status} :: last checked at ${checkData.lastChecked}`;
            else msg = `status of ${checkId} by user ${checkData.user} is unchanged as ${checkData.status} :: last checked at ${checkData.lastChecked}`;

            update("checks", checkId, checkData, (err) => {
                if (err)
                    callback(err);
                else callback(false, msg);
            })

        }
        else {
            callback(err);
        }
    })
}



worker.duty = () => {
    setInterval(() => {
        worker.work();
    }, 1000)
}

module.exports = worker;
const { check } = require("prettier");
const Url = require("url");
const http = require("http");
const https = require("https");

const { readAll, readDir, read } = require("./data_helper");

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

worker.work = (callback) => {
    worker.getAllChecks((err, checks) => {
        if (!err && checks) {
            checks.forEach(e => {
                read("checks", e, (err, checkData) => {
                    if (!err && checkData) {
                        worker.test(checkData, (err, res) => {
                            if (!err) {
                                callback(false, res);
                            }
                            else {
                                callback(err);
                            }

                        })
                    }
                    else {
                        callback(err);
                    }
                })
            })
        }
        else {
            callback(err)
        }

    })
}

worker.test = (checkData, callback) => {
    const user = checkData.user;
    const protocol = checkData.protocol;
    const url = checkData.url;

    const parsedUrl = Url.parse(`${protocol}://${url}`, true);


}

module.exports = worker;
const Url = require("url");
const http = require("http");
const https = require("https");

const { readAll, readDir, read } = require("./data_helper");
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

worker.work = (info, callback) => {

    worker.getAllChecks((err, checks) => {
        if (!err && checks) {

            checks.forEach(e => {
                read("checks", e, (err, checkData) => {
                    const protocol = checkData.protocol;
                    const url = URL.parse(checkData.url);
                    const hostname = url.hostname;


                })
            })

        }
        else {
            callback(500, err);
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
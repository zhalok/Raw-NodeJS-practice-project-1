const fs = require("fs");
const path = require("path");
const basedir = path.join(__dirname + "/../.data/");

const data_helper = {};

data_helper.create = (dir, filename, callback) => {
    // console.log(basedir + dir + "/" + filename + ".json");

    fs.open(basedir + dir + "/" + filename + ".json", "wx", (err, fileinfo) => {
        if (!err && data) {
            callback();


        } else {
            console.log("error");
        }
    })
}

data_helper.writeData = (dir, filename, data, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    fs.open(filepath, "w", (err, res) => {
        if (err) {
            console.log("Problem opening the file to write");
            return;
        }

        const jsondata = JSON.stringify(data);

        fs.writeFile(res, jsondata, (err, res) => {
            if (err) {
                console.log("Problem writing the file");
                return;
            }
            callback();
        })
    })
}

data_helper.writeData("userdata", "userdata", { name: "zhalok" }, () => {
    console.log("data written successfully");
})



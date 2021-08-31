/*

// some importatnt docs 

 fs.open( filename, flags, mode, callback )   
 fs.writeFile( file, data, options, callback )   


*/

const fs = require("fs");
const path = require("path");
const basedir = path.join(__dirname + "/../.data/");
const { StringDecoder } = require("string_decoder");

const decoder = new StringDecoder("utf-8");

const data_helper = {};

data_helper.create = (dir, filename, data, callback) => {

    fs.open(basedir + dir + "/" + filename + ".json", "wx", (err, fileInfoID) => {
        if (err) {
            callback(409);
            return;
        }
        const jsondata = JSON.stringify(data);
        fs.writeFile(fileInfoID, jsondata, (err) => {
            if (err) {
                callback(500);
                return;
            }
            callback(200);
        })

    })

}



data_helper.read = (dir, filename, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    fs.readFile(filepath, (err, res) => {
        if (err) {

            callback(err);
            return;
        }
        const info = JSON.parse(decoder.write(res));
        callback(null, info);
    })
}

data_helper.update = (dir, filename, data, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    const jsondata = JSON.stringify(data);
    fs.writeFile(filepath, jsondata, (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    })
}

data_helper.delete = (dir, filename, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    fs.unlink(filepath, (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    })
}

module.exports = data_helper;






/*  .........................testing........................ */

// data_helper.create("userdata", "userdata", { name: "zhalok", age: 23 }, (message) => {
//     console.log(message);
// })

// data_helper.update("userdata", "userdata", { name: "zhalok" }, (message) => {
//     console.log(message);
// })

// data_helper.read("userdata", "userdata", (message) => {
//     console.log(message);
// })

// data_helper.delete("userdata", "userdata", (message) => {
//     console.log(message);
// })


/*  .........................testing........................ */






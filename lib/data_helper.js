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

data_helper.create = (dir, filename, callback) => {


    fs.open(basedir + dir + "/" + filename + ".json", "wx", (err, fileInfoID) => {
        if (!err && fileinfo) {
            callback("Successfully created a new file named as " + filename);

            fs.close(fileInfoID, (err) => {
                callback("File closed successfully");
            })


        } else {
            callback("error");
        }
    })

}

data_helper.writeData = (dir, filename, data, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    const jsondata = JSON.stringify(data);
    fs.open(filepath, "r", (err, openedFileID) => {
        if (err) {
            callback("File wasnt found to write. You should create it in the given directory first");
            return;
        }

        fs.writeFile(filepath, jsondata, (err) => {
            if (err) {
                callback("There was a problem writing the data")
                return;
            }
            callback("Successfully written data");

            fs.close(openedFileID, (err) => {
                if (err) {
                    callback("There was a problem closing the file");
                    return;
                }
                callback("Flie closed successfully")
            })
        })
    })

}

data_helper.readData = (dir, filename, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    fs.readFile(filepath, (err, res) => {
        if (err) {
            callback("There was a problem finding the file");
            return;
        }

        callback(decoder.write(res));
    })
}




/*  .........................testing........................ */

// data_helper.create("userdata", "userdata", (message) => {
//     console.log(message);
// })

// data_helper.writeData("userdata", "userdata", { name: "zhalok" }, (message) => {
//     console.log(message);
// })

// data_helper.readData("userdata", "userdata", (message) => {
//     console.log(message);
// })


/*  .........................testing........................ */






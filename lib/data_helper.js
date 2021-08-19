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
            callback("There was a problem creating the file probably the file already exists");
            return;
        }

        const jsondata = JSON.stringify(data);

        fs.writeFile(fileInfoID, jsondata, (err) => {
            if (err) {
                callback("There was a problem writing the data");
                return;
            }

            callback("File created and data is writen");
        })

    })

}



data_helper.read = (dir, filename, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    fs.readFile(filepath, (err, res) => {
        if (err) {
            callback("There was a problem finding the file");
            return;
        }

        callback(JSON.parse(decoder.write(res)));
    })
}

data_helper.update = (dir, filename, data, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    fs.open(filepath, "r", (err, fileInfoID) => {
        if (err) {
            callback("File not found to update");
            return;
        }
        const jsondata = JSON.stringify(data);
        fs.writeFile(filepath, jsondata, (err) => {
            if (err) {
                callback("There was a problem updating file");
                return;
            }
            callback("File updated successfully");
        })
    })

}

data_helper.delete = (dir, filename, callback) => {
    const filepath = basedir + dir + "/" + filename + ".json";
    fs.unlink(filepath, (err) => {
        if (err) {
            callback("There was a problem deleting the file");
            return;
        }
        callback("File deleted successfully");
    })
}






/*  .........................testing........................ */

// data_helper.create("userdata", "userdata", { name: "zhalok", age: 23 }, (message) => {
//     console.log(message);
// })

// data_helper.update("userdata", "userdata", { name: "zhalok" }, (message) => {
//     console.log(message);
// })

data_helper.read("userdata", "userdata", (message) => {
    console.log(message);
})

// data_helper.delete("userdata", "userdata", (message) => {
//     console.log(message);
// })


/*  .........................testing........................ */






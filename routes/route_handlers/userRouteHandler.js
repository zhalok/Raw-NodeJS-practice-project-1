const data_helper = require("../../lib/data_helper");
const checker = require("../../helpers/checker").checkBodyInfo;
const util = require("../../helpers/util");
const readData = data_helper.read;
const createData = data_helper.create;
const updateData = data_helper.update;
const deleteData = data_helper.delete;

const handler = {};

// first name last name phone number password 


handler.createUser = (info, callback) => {



    const data = util.checkBodyInfo(info.body, ["firstname", "lastname", "username", "password"])

    if (typeof data == "object") {
        createData("userdata", data.username, data, (err) => {
            if (!err) {
                callback(200, { message: "User created" });
            }
            else {
                callback(400, { message: "There was a problem creating user" });
            }

        });
    }
    else {
        callback(status, { message: "Invalid information" });
    }

}

handler.getUser = (info, callback) => {

    const username = info.query.id;
    readData("userdata", username, (err, data) => {
        if (err) {
            callback(404, { message: "User not found" });
        }
        else {
            const userData = { ...data };
            delete userData.password;
            callback(200, { message: "User found", user: userData });
        }
    })
}

handler.updateUser = (info, callback) => {

    const username = info.query.id;
    const props = info.body.props;
    const value = info.body.value;



    readData("userdata", username, (err, fileinfo) => {

        if (!err) {


            if (props != "username") {


                fileinfo[props] = value;
                updateData("userdata", username, fileinfo, (err) => {
                    if (!err) {
                        callback(status, { message: "User updated", updatedInfo: fileinfo });
                    }
                    else {
                        callback(stat, { message: "There was a problem updating" });
                    }

                });


            }
            else {



                if (!util.phoneValidity(value)) {
                    callback(400, { message: "Invalid username" });
                }

                const newFileInfo = { ...fileinfo };
                newFileInfo[props] = value;
                createData("userdata", value, newFileInfo, (status) => {

                    if (status == 200) {
                        deleteData("userdata", fileinfo.username, (status) => {
                            if (status == 200) {
                                callback(status, { message: "User updated with new username", updatedUser: newFileInfo });
                            }
                            else {
                                callback(status, { message: "There was a problem" });
                            }
                        });



                    }
                    else {
                        callback(400, { message: "There was a problem" });
                    }

                })


            }



        }
        else {
            callback(400, { message: "requested user to updated not found" });
        }


    })







}

handler.deleteUser = (info, callback) => {

    const username = info.query.id;
    deleteData("userdata", username, (err) => {
        if (err) {
            callback(404, { message: "Requested User Not Found" });
        }
        else {
            callback(200, { message: "User " + username + " has been deleted successfully" });
        }
    })

}

handler.methods = {
    GET: handler.getUser,
    POST: handler.createUser,
    PUT: handler.updateUser,
    DELETE: handler.deleteUser
}

handler.userRouteHandler = (info, callback) => {

    const requested_method = info.method;
    const accepted_methods = ["GET", "POST", "PUT", "DELETE"];
    if (accepted_methods.indexOf(requested_method) > -1) {
        const handler_method = handler.methods[requested_method];

        handler_method(info, callback);

    }
    else {
        callback(404, { message: "Invalid Request" });
    }
    // console.log(handler.helper["GET"]);
}


module.exports = handler;












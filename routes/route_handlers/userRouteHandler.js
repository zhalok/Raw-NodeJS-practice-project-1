const data_helper = require("../../lib/data_helper");
const checker = require("../../helpers/checker").checkBodyInfo;
const util = require("../../helpers/util");
const readData = data_helper.read;
const createData = data_helper.create;
const updateData = data_helper.update;
const deleteData = data_helper.delete;

// first name last name phone number password 


createUser = (info, callback) => {



    const data = util.checkBodyInfo(info.body, ["firstname", "lastname", "username", "password"])

    if (typeof data == "object") {
        createData("userdata", data.username, data, (status, fileinfo) => {
            if (status == 200) {
                callback(200, { message: "OK data written" });
            }
            else if (status == 400) {
                callback(400, { message: "Service Error" });
            }
            else if (status == 123) {
                callback(400, { message: "User already exists" });
            }

        });
    }
    else {
        callback(200, { message: "Invalid information" });
    }

}

getUser = (info, callback) => {

    const body = info.body;
    const username = body.username.trim();
    const password = body.password.trim();
    if (typeof username === "string" && username.length > 0 && password.length >= 8) {
        const data = {
            username,
            password: util.hash(password),
        }

        readData("userdata", username, (status, fileinfo) => {
            if (status == 200) {
                if (fileinfo.username === data.username && fileinfo.password === data.password) {

                    const user = { ...fileinfo };
                    delete user.password;



                    callback(200, { message: "User found", user });

                }
                else {
                    callback(400, { message: "Credentials error" });
                }
            }
            else {
                callback(400, { message: "User not found" });
            }
        })




    }






}

updateUser = (info, callback) => {

    const username = info.body.username;
    const props = info.body.props;
    const value = info.body.value;

    let fileData;

    readData("userdata", username, (status, fileinfo) => {

        if (status == 200) {
            console

            if (props != "username") {


                fileinfo[props] = value;
                updateData("userdata", username, fileinfo, (status, fileinfo) => {
                    if (status == 200) {
                        callback(status, { message: "User updated", updatedInfo: fileinfo });
                    }
                    else {
                        callback(stat, { message: "There was a problem updating" });
                    }

                });


            }
            else {

                // callback(400, { message: "Sorry Username Cant be CHanged" });

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

deleteUser = (info, callback) => {

    const username = info.body.username;


    const password = util.hash(info.body.password);
    readData("userdata", username, (status, data) => {
        if (status == 200) {

            if (data.username == username && data.password == password) {
                deleteData("userdata", username, (status) => {
                    if (status == 200) {
                        callback(status, { message: "successfully deleted user " + username });
                    }
                    else {
                        callback(status, { message: "Unable to delete" });
                    }
                })
            }
            else {
                callback(400, { message: "Credentials didnt match" });
            }

        }
        else {
            callback(400, { message: "Requested User not found" });
        }
    })


}

const helper = {
    GET: getUser,
    POST: createUser,
    PUT: updateUser,
    DELETE: deleteUser
}

userRouteHandler = (info, callback) => {

    const requested_method = info.method;
    const accepted_methods = ["GET", "POST", "PUT", "DELETE"];
    if (accepted_methods.indexOf(requested_method) > -1) {
        const handler_method = helper[requested_method];
        handler_method(info, callback);

    }
    else {
        callback(404, { message: "Invalid Request" });
    }
}

module.exports = userRouteHandler;












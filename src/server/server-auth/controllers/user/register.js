//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PACKAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const mongoose = require("mongoose");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SETUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const User = mongoose.model("User");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ USER CONTROLLER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const registrerUser = function (req, res){
    if(!req.body.name && !req.body.password){
        res.send({
            status: "error",
            message: "Name and Password of the user are both required",
        });
    }
    if(!req.body.name){
        res.send({
            status: "error",
            message: "Name of the user is required"
        });
    }
    if(!req.body.password){
        res.send({
            status: "error",
            message: "Password of the user is required",
        });
    }

    const {name, password} = req.body;
    const user = new User({name , password});
    let result = {};

    user.save(function(err, user){
        if(!err){
            result.result = user;
        } else {
            result.error = err;
        }
        res.send(result);
    });

};

module.exports = {
    registrerUser,
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PACKAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PACKAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const { signUser } = require('./../auth/jwt')
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SETUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const User = mongoose.model("User");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ USER CONTROLLER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const loginLocalUser = async function (req, res){
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
    //  Now find the user by their email address
    const user = await User.findOne({ name });
    const validPassword = await bcrypt.compare(password, user.password);
    // User doesn't exists
    if (!user || !validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    // Create JWT token
    const token = await signUser('local', user);

    res.send(token);
};

module.exports = {
    loginLocalUser,
};
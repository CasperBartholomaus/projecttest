//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PACKAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const mongoose = require("mongoose");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SETUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const dbURL = "mongodb://localhost/projecttest";
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CONNECTION EVENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//When succesfully connected
mongoose.connection.on("connected", function() {
    console.log(`Mongoose default connection open to ${dbURL}`);
});

//If the connection throws an error
mongoose.connection.on("err", function (err) {
   console.log(`Mongoose default connection error: ${err}`);
});

//When the connection is disconnected
mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
});

//If the Node process ends, close the Mongoose connection
process.on("SIGINT", function() {
   mongoose.connection.close(function () {
      console.log("Mongoose default connection disconnected through app termination");
      process.exit(0);
   });
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REGISTER SCHEMA ~~~~~~~~~~~~~~~~~~~~~~~~~~~//
require("./../server-auth/models/users");
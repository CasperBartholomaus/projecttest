//NODEJS NATIVE MODULES
const fs = require('fs');
const path = require('path');
//NPM MODULES
const express = require('express');
const session = require('express-session');
const https = require('https');

//~~~~~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
global.__basedir = path.join(__dirname, '..', '..', '..');

//~~~~~~~~~~~~~~~~~~~~~~~~~ VARIABLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const serverName = 'server-auth';
const app = express();
const { Logger } = require("../logger/Logger");
const { serverStartupMsg } = require('../logger/utils/utils-logger');
const log = Logger.getLogger(serverName);
const passport = require('passport');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ROUTES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Set up Passport
app.use(session({
  secret: 'Hallo', 
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600000, // see below
    secure: true },
  
}));
app.use(passport.initialize());
app.use(passport.session());

require("./router")(app, log);
//~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER CONFIGURATION~~~~~~~~~~~~~~~~~~~~~//
const port = 3001;
const options = {
    key: fs.readFileSync(path.join(__basedir, 'config', 'private.pem')),
    cert: fs.readFileSync(path.join(__basedir, 'config' , 'public.pem')),
  };  
const server = https.createServer(options, app);

server.listen(port, 'localhost', () => {
  try {
    serverStartupMsg(serverName, log);
    console.log(`Server auth is running on port: ${port}`);
  } catch (err) {
    log.error(err);
  }
});
//NODEJS NATIVE MODULES
const fs = require('fs');
const path = require('path');
//NPM MODULES
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')
global.__basedir = path.join(__dirname, '..', '..', '..');
const serverName = 'server-auth';
//Set database
require("./../database/config");
const { Logger } = require("../logger/Logger");
const { serverStartupMsg } = require('../logger/utils/utils-logger');
const log = Logger.getLogger(serverName);

//~~~~~~~~~~~~~~~~~~~~~~~~~ ENVIRONMENT VARIABLES ~~~~~~~~~~~~~~~~~~~~~//
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: `.env.auth` });
}
//~~~~~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
global.__log = log;
//~~~~~~~~~~~~~~~~~~~~~~~~~ VARIABLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ROUTES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
require("./router")(app, log);
//~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER CONFIGURATION~~~~~~~~~~~~~~~~~~~~~//
const port = process.env.PORT;
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
//NODEJS NATIVE MODULES
const fs = require('fs');
const path = require('path');
//NPM MODULES
const express = require('express');
const https = require('https');

//~~~~~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
global.__basedir = path.join(__dirname, '..', '..', '..');

//~~~~~~~~~~~~~~~~~~~~~~~~~ VARIABLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const serverName = 'server-proxy';
const app = express();
const { Logger } = require("./../logger/Logger");
const { serverStartupMsg } = require('./../logger/utils/utils-logger');
const log = Logger.getLogger(serverName);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ROUTES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("./router")(app, log);
require('dotenv').config({ path: `.env.proxy` });
//~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER CONFIGURATION~~~~~~~~~~~~~~~~~~~~~//
const port = 3002;
const options = {
    key: fs.readFileSync(path.join(__basedir, 'config', 'private.pem')),
    cert: fs.readFileSync(path.join(__basedir, 'config' , 'public.pem')),
  };  
const server = https.createServer(options, app);

server.listen(port, 'localhost', () => {
  try {
    serverStartupMsg(serverName, log);
    console.log(`Server proxy is running on port: ${port}`);
  } catch (err) {
    log.error(err);
  }
});
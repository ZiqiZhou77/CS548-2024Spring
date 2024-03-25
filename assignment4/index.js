require('dotenv').config();

const express = require('express')
const https = require('https')
const fs = require('fs')
const settings = require('./routes/settings');
const app = express();
const { getLoggerInstance } = require('./logger');
const logger = getLoggerInstance();
const {IP2LOCATION_API_KEY} = require('./settings');

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}

const server = https.createServer(httpsOptions, app)
app.use(express.json())
app.use('/', settings)

console.log(IP2LOCATION_API_KEY)

server.listen(8081, ()=>{
    logger.info("Server is up")
})
// localhost:8080/hello

const express = require('express')
const https = require('https')
const fs = require('fs')
const students = require('./routes/students');
const app = express();

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}

const server = https.createServer(httpsOptions, app)
app.use(express.json())
app.use('/', students)

server.listen(8081, ()=>{
    console. log("Server is up")
})
// localhost:8080/hello


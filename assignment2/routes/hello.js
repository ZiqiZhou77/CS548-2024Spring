const express = require('express');

const hello = express.Router()

hello.get('/hello',(req, res) => {
    res.send(`My name is Ziqi. Nice to meet you`)
})

hello.post('/feedback', (req, res) => {
    const name = req.body.name;
    console.log(`Here is ${name}`);
  
    res.status(200).json({ message: 'POST request successful', data: requestData });
  });

module.exports = hello
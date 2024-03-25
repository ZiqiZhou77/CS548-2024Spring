const express = require('express');
const settings = express.Router();
const axios = require('axios');
const {getLoggerInstance} = require('../logger');
const logger = getLoggerInstance();

//Get / all the student-info
settings.get('/', async (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.headers['User-agent'];
    try{
        const response = await axios.get('https://raw.githubusercontent.com/ZiqiZhou77/github_settings/main/github_settings.json');
        const data = response.data;
        logger.info('Received data: timezone=' + data.timezone);
        res.json({data: data, IP: userIp, deviceType: userDevice});
    } catch(error){
        logger.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

settings.post('/', async (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.headers['User-agent'];
    try{
        const response = await axios.get('https://raw.githubusercontent.com/ZiqiZhou77/github_settings/main/github_settings.json');
        const data = response.data;

        logger.info('Received data: operatingStatus =' + data.ecomStore.operatingStatus);
        const filteredData = { 
            "operatingStatus": data.ecomStore.operatingStatus
        };

        res.json({ filteredData: filteredData, IP: userIp, deviceType: userDevice });
    }catch(error){
        logger.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = settings;
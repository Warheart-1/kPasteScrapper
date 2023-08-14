const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

const sendPassword = require('./src/sendPassword');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define a custom log stream to write logs to a JSON file
const logStream = fs.createWriteStream(path.join(__dirname, 'logs.json'), { flags: 'a' });

// Use the morgan middleware with custom format
app.use(morgan((tokens, req, res) => {
  const logData = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: tokens['response-time'](req, res),
    userAgent: tokens['user-agent'](req, res),
    remoteAddress: tokens['remote-addr'](req, res),
    timestamp: new Date().toISOString()
  };

  return JSON.stringify(logData);
}, { stream: logStream }));

app.post('/sendPassword', async (req, res) => {
    const password = req.body.password;
    if(!password) {
        res.send('Error : please fill all required fields').status(400);
    }
    const url = await sendPassword(password);
    if(!url) {
        res.send('Error').status(500);
    }

    res.send(url).status(200);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});


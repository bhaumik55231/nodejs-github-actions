const express = require('express');
const config = require('./server/config');
const app = express();
const fs = require('fs');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (next) {
        next();
    }
});

app.get('/', (req, res) => {
    const concept = new Date().getTime();
    fs.appendFileSync(`output/${concept}.json`, JSON.stringify({concept}), (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
    res.status(200).json({message: 'Success!'});
});

app.listen(config.port, () => {
	console.log('listening on port :' + config.port);
});

const express = require('express');
const folderName = require('./folderName');
const app = express();

app.use('/files', express.static(folderName));

module.exports = app;
'use strict';

const express = require('express');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'src')));
app.use(express.static(path.join(__dirname, '..', 'uploads')));
app.use(cookie());

// // Обработка всех остальных запросов
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});

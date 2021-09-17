var functions = require('firebase-functions');
var admin = require('firebase-admin');
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors({ origin: true }));
app.get('/hello-world', function (req, res) {
    return res.status(200).send('Hello World!');
});
exports.app = functions.https.onRequest(app);

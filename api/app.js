var express = require('express');
var app = express();
var port = 3000; 
var stringify = require('json-stringify-safe');
var csv = require('fast-csv');
var path = require('path');
var fs = require('fs');
//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://lachgar:azerty00@menacis.9cneb.mongodb.net/menacis?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true }
)
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = new mongoose.Schema({
    position: String,
    nom: String,
    _id: String,
    phone: String,
    country: String,
    address: String,
    zip: String,
    university: String
});

var member = mongoose.model('member', Schema);
export default function handler(req, res) {
    res.statusCode = 200;
    new member(req.query).save(function (err, doc) {
        if (err) res.json(err);
        else res.send('succes');
    });
}

//app.get('/app', function (req, res) {
//    console.log(stringify(req.query));
//    var rows = [req.query];
//    var fs = require('fs');
//    var csvFile = fs.createWriteStream("file.csv", {flags: 'a'});
//    csvFile.write('\n');
//    csv.writeToStream(csvFile, rows, {headers: false});
//    res.send(req.query);
//});
////
////app.listen(port, function () {
////    console.log('Example app listening at http://localhost:${' + port + '}');
////});
//

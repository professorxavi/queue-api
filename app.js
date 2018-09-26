const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}, bodyParser.urlencoded({ extended: true}));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
    require('./app/routes')(app, database);

    app.listen(port, () => {
      console.log('We in here');
    });
});

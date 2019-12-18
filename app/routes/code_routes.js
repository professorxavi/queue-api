const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/codes', (req, res) => {
    db.collection('codes').findOne({}, {sort: {time: -1 }}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });


  app.post('/codes', (req, res) => {
    const user = { code: req.body.code, time: req.body.time};
    db.collection('codes').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};

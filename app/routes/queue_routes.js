const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/queue', (req, res) => {
    db.collection('queue').find().limit(5).toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.get('/queue/all', (req, res) => {
    db.collection('queue').find().toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.get('/queue/:name', (req, res) => {
    const name = { 'name': req.params.name };
    db.collection('queue').find().toArray(name, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/queue', (req, res) => {
    db.collection('queue').deleteOne({}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Name ' + item + ' deleted');
      }
    });
  });

  app.delete('/queue/all', (req, res) => {
    db.collection('queue').deleteMany( { }, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Name ' + item + ' deleted');
      }
    });
  });

  app.post('/queue', (req, res) => {
    const d = new Date();
    const user = { name: req.body.name, ign: req.body.ign, fc: req.body.fc, time: d.getTime()};
    db.collection('queue').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};

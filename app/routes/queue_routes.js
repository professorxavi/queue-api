const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/queue', (req, res) => {
    db.collection('queue').find().limit(3).toArray((err, item) => {
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

  app.get('/queue/check/:name', (req, res) => {
    const username = { 'name': req.params.name };
    db.collection('queue').find({name: username.name}).toArray( (err, item) => {
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
    db.collection('queue').deleteMany( {}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Name ' + item + ' deleted');
      }
    });
  });

  app.delete('/queue/specific/:name', (req, res) => {
    db.collection('queue').deleteMany( {name: req.params.name}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('User deleted');
      }
    });
  });

  app.post('/queue', (req, res) => {
    const d = new Date();
    const user = { name: req.body.name, ign: req.body.ign, time: d.getTime()};
    db.collection('queue').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};

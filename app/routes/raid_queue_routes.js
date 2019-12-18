const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/raidQueue', (req, res) => {
    db.collection('raidQueue').find().limit(3).toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.get('/raidQueue/next', (req, res) => {
    db.collection('raidQueue').find().limit(1).toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.get('/raidQueue/all', (req, res) => {
    db.collection('raidQueue').find().toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.get('/raidQueue/check/:name', (req, res) => {
    const username = { 'name': req.params.name };
    db.collection('raidQueue').find({name: username.name}).toArray( (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  // app.delete('/queue/all', (req, res) => {
  //   db.collection('queue').deleteMany( {}, (err, item) => {
  //     if (err) {
  //       res.send({'error':'An error has occurred'});
  //     } else {
  //       res.send('Name ' + item + ' deleted');
  //     }
  //   });
  // });
  //
  app.delete('/raidQueue/specific/:name', (req, res) => {
    db.collection('raidQueue').deleteMany( {name: req.params.name}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('User deleted');
      }
    });
  });

  app.delete('/raidQueue/wave', (req, res) => {
    db.collection('raidQueue').find().limit(3).forEach(doc => {
      db.collection('raidQueue').remove({_id:doc._id});
    });
  });

  app.post('/raidQueue', (req, res) => {
    const user = { name: req.body.name, time: req.body.time};
    db.collection('raidQueue').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};

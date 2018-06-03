const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/challenger/:name', (req, res) => {
    const name = { 'name': req.params.name };
    db.collection('challengers').findOne(name, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/challenger/:name', (req, res) => {
    const name = { 'name': req.params.name };
    db.collection('challengers').remove(name, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Name ' + name + ' deleted');
      }
    });
  });

  app.post('/challenger', (req, res) => {
    const user = { name: req.body.name, ign: req.body.ign, fc: req.body.fc };
    db.collection('challengers').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/challenger/:name', (req, res) => {
    const name = { 'name': req.params.name };
    const user = { name: req.body.name, ign: req.body.ign, fc: req.body.fc };
    db.collection('challengers').update(name, user, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(user);
      }
    });
  });
};

const queueRoutes = require('./queue_routes');
const challengerRoutes = require('./challenger_routes');

module.exports = (app, db) => {
  challengerRoutes(app, db);
  queueRoutes(app, db);
};

const queueRoutes = require('./queue_routes');
const raidQueueRoutes = require('./raid_queue_routes');
const challengerRoutes = require('./challenger_routes');
const codeRoutes = require('./code_routes');

module.exports = (app, db) => {
  challengerRoutes(app, db);
  queueRoutes(app, db);
  raidQueueRoutes(app, db);
  codeRoutes(app, db);
};

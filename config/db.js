const config = require('./config.json');
const dbUrl = 'mongodb://' + config.user + ':' + config.pw + '@' + config.address + '/' + config.db;

module.exports = {
  url: dbUrl
};

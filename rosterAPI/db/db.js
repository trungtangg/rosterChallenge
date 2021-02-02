/**
 * Database configurations and setup
 */
const Helper = require('../helpers/helper');
const mongoose = require('mongoose');
var _db;

/* Initializes the connection to the Database */
const initDb = (callback) => {
  let options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.CONNECTION_URI, options);
  const _connection = mongoose.connection;
  _connection.on('error', (err) => {
    Helper.logStamp(`Connection error`);
    return callback(err);
  });
  _connection.once('open', () => {
    Helper.logStamp('Database initialized');
    return callback(null);
  });
  _db = _connection.useDb(process.env.DB_NAME);
};

/* Retrieve database connection */
const getDb = () => {
  return _db;
};

module.exports = {
  getDb,
  initDb
};

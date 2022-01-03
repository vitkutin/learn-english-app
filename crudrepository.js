const mysql = require("mysql");
require("dotenv").config();

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

//?
let connectionFunctions = {
  connect: () => {
    connection.connect();
  },

  //?
  close: (callback) => {
    connection.end();
  },

  save: (voc, callback) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query("INSERT INTO locations SET ?", voc, (err, success) => {
        if (err) {
          callback(err, null);
        } else {
          callback(console.log("Success"));
        }
        connection.release();
      });
    });
  },

  findAll: (callback) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query("SELECT * FROM vocabulary", (err, voc) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, voc);
        }
        connection.release();
      });
    });
  },

  deleteById: (id, callback) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        "DELETE FROM vocabulary WHERE id = " + id,
        (err, voc) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, voc);
          }
          connection.release();
        }
      );
    });
  },

  findById: (id, callback) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        "SELECT * FROM vocabulary WHERE id = " + id,
        (err, voc) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, voc);
          }
          connection.release();
        }
      );
    });
  },
};

module.exports = connectionFunctions;

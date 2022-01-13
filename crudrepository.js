const mysql = require("mysql");
require("dotenv").config();

let config = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
};

var pool = mysql.createPool(config);

let connectionFunctions = {
  //Connect to database
  connect: (err) => {
    if (err) {
      console.log(err);
    } else {
      pool.connect();
    }
  },

  //Close connection to database
  close: (err) => {
    if (err) {
      console.log(err);
    } else {
      pool.end();
    }
  },

  //Show all items in database
  findAll: () =>
    new Promise((resolve, reject) => {
      pool.query("SELECT * FROM vocabulary", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),

  //Find an item from database by id
  findById: (id) =>
    new Promise((resolve, reject) => {
      pool.query("SELECT * FROM vocabulary WHERE id = " + id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),

  //Delete an item from database by id
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      pool.query("DELETE FROM vocabulary WHERE id = " + id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),

  //Save new item into database
  save: (newItem) =>
    new Promise((resolve, reject) => {
      pool.query("INSERT INTO vocabulary SET ?", newItem, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),

  findIds: () =>
    new Promise((resolve, reject) => {
      pool.query("SELECT id FROM vocabulary", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),
};

module.exports = connectionFunctions;

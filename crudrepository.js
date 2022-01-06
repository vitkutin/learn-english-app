const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  //Connect to database
  connect: (err) => {
    if (err) {
      console.log(err);
    } else {
      connection.connect();
    }
  },

  //Close connection to database
  close: (err) => {
    if (err) {
      console.log(err);
    } else {
      connection.end();
    }
  },

  //Show all items in database
  findAll: () =>
    new Promise((resolve, reject) => {
      connection.query("SELECT * FROM vocabulary", (err, result) => {
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
      connection.query(
        "SELECT * FROM vocabulary WHERE id = " + id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),

  //Delete an item from database by id
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM vocabulary WHERE id = " + id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),

  //Save new item into database
  save: (newItem) =>
    new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO vocabulary SET ?",
        newItem,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),

  findIds: () =>
    new Promise((resolve, reject) => {
      connection.query("SELECT id FROM vocabulary", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),
};

module.exports = connectionFunctions;

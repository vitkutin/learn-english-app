const express = require("express");
const app = express();
var cors = require("cors");
const connection = require("./crudrepository.js");
const server = app.listen(8080, () => {
  console.log(`Listening in port ${server.address().port}`);
});

app.use(express.static("frontend/build"));

app.use(cors());

app.use(express.json());

//Serve static content in directory "public"
app.use(express.static("public"));

//Fetch all items from database
app.get("/vocabulary", async (req, res) => {
  try {
    let result = await connection.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//Fetch all id's from database and send a random id as response
app.get("/vocabulary/ids", async (req, res) => {
  try {
    let idList = await connection.findIds();
    let randomId = idList[Math.floor(Math.random() * idList.length)];
    res.send(randomId);
  } catch (err) {
    console.log(err);
  }
});

//Fetch an item from database by id
app.get("/vocabulary/:id([0-9]+)", async (req, res) => {
  try {
    let result = await connection.findById(req.params.id);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//Delete an item from database by id
app.delete("/vocabulary/:id([0-9]+)", async (req, res) => {
  try {
    connection.deleteById(req.params.id);
    res.send(`Item deleted`);
  } catch (err) {
    console.log(err);
  }
});

//Save new item into database
app.post("/vocabulary", async (req, res) => {
  try {
    await connection.save(req.body);
    res.send(`Item added to the database`);
  } catch (err) {
    console.log(err);
  }
});

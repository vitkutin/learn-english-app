const express = require("express");
const app = express();
const connection = require("./crudrepository.js");

const server = app.listen(8080, () => {
  console.log(`Listening in port ${server.address().port}`);
});

app.use(express.static("frontend/build"));

//Header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Serve static content in directory "public"
app.use(express.static("public"));

//Get all
app.get("/vocabulary", (req, res) => {
  connection.findAll((err, voc) => {
    if (err) throw err;
    res.send(voc);
  });
});

//Find by id
app.get("/vocabulary/:id([0-9]+)", (req, res) => {
  connection.findById(req.params.id, (err, voc) => {
    if (err) throw err;
    res.send(voc);
  });
});

//Delete by id
app.delete("/vocabulary/:id([0-9]+)", (req, res) => {
  connection.deleteById(req.params.id, (err, success) => {
    if (err) throw err;
    res.send("Deleted succesfully");
  });
});

//Save new
app.use(express.json());

app.post("/vocabulary/", (req, res) => {
  connection.save(req.body, (err, success) => {
    if (err) throw err;
    res.send(req.body);
  });
});

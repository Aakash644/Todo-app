const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/student", {
  UseNewUrlParser: true,
});

const todoschema = new mongoose.Schema({ name: String });
const todo = mongoose.model("todolist", todoschema);

app.get("/", async function (req, res) {
  try {
    var items = await todo.find();
  } catch (err) {
    console.log(err);
  }
  res.render("index", { items: items });
});

app.post("/", async function (req, res) {
  //post
  const item = req.body.newitem;
  if (item != "") {
    todo({ name: item }).save();
  }
  res.redirect("/");
});
//delete route

app.post("/del", async function (req, res) {
  var item2 = req.body.item;
  const query = await todo.findByIdAndRemove(item2);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("listening on port 3000.");
});

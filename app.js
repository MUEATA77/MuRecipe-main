const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()

async function dbconnect(dblink) {
  try {
    await mongoose.connect(dblink)
    console.log("Database is connected")
  } catch (error) {
    console.log(error, "Not connected")
  }
}

dbconnect("mongodb+srv://amenalsoufi:Je0CWCTjjUuflRVc@cluster0.l6jc2gp.mongodb.net/")




const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));





const myCollection = mongoose.connection.collection("foods");

app.get("/", async function (req, res) {
  let homeData = await myCollection.find({}).toArray();
  res.render("home", { HomeData: homeData });
});

app.get("/one-recipe/:result", async function (req, res) {
  let recipeType = req.params.result
  let data1 = await myCollection.findOne({
    $text: {
      $search: "\"" + recipeType + "\""
    }
  });
  const more_recipe = await myCollection.find({}).toArray();
  res.render("one-recipe", {
    Data1: data1,
    more_recipe:more_recipe
  });
});



app.get("/recipes", async function (req, res) {
  let data = await myCollection.find({}).toArray();
  res.render("recipes", { SearchData: data });
});


app.post("/search", async function (req, res) {
  const get_key = req.body.recipe
  const search_recipe = await myCollection.find({ $text: { $search: get_key } }).toArray()
  console.log(search_recipe)
  res.render("result", { result: search_recipe });
});



app.listen("2500", function () {
  console.log("server is working");
});

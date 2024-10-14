const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const studentProfileRoutes = require("./src/routes/studentProfileRoutes");

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://admin:nextgenscholars@nextgen-scholars.u2uev.mongodb.net/NextGen-Scholars?retryWrites=true&w=majority&appName=NextGen-Scholars';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
// Automatically looks in "views" folder
app.set("view engine", "ejs");
app.set("views", "src/views");

// middleware and static files
app.use(express.static('public'));
app.use(morgan("dev"));

// How to add a document to a collection
/*
const newUser = new Student({
  name: "Test",
  age: 26
});

newUser.save()
  .then(result => console.log("New document added!"))
  .catch(err => console.log(err));
*/

// Render pages
app.use(studentProfileRoutes);

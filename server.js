const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const LoginRoute = require("./routes/LoginRoute");

const dbUrl =
  "mongodb+srv://dark:523159@epathshala.xnemv.mongodb.net/epathshala?retryWrites=true&w=majority";

//making database connection

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});

app.use("/auth", LoginRoute);

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Database connected !!");

    app.listen(3159, () => {
      console.log("server is stared on 3159 !!!");
    });
  }
);

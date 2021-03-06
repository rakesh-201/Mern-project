const express = require("express");
const dotenv = require("dotenv");

require("./db/conn");

const app = express();

app.use(express.json());

app.use(require("./routers/auth"));

dotenv.config({ path: "./config.env" });

// const PATH = process.env.PATH;

const middleware = (req, res, next) => {
  console.log("You are logged out!");
  next();
};

app.get("/about", (req, res) => {
  res.send("Welcome to about page!!!");
});

app.get("/contact", (req, res) => {
  res.send("Welcome to contact page!!!");
});

app.get("/signup", (req, res) => {
  res.send("Welcome to signup page!!!");
});

app.get("/signin", (req, res) => {
  res.send("Welcome to signin page!!!");
});

app.get("/logout", middleware, (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`App running at port ${3000}...`);
});

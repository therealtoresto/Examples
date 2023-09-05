const express = require("express");
const path = require("path");
const sgMail = require("@sendgrid/mail");
require('dotenv').config();
const app = express();

const { ADDRESSEE, MY_EMAIL, SG_KEY } = process.env;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/", async (req, res, next) => {
  const { email, name, text } = req.body;

  sgMail.setApiKey(process.env.SG_KEY);
  const msg = {
    to: email,
    from: MY_EMAIL,
    subject: `Sending email from ${name}`,
    text
  };
  try {
    await sgMail.send(msg);
    res.render("done");
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || "3002";
app.listen(port, () => {
  console.log("Server started");
});

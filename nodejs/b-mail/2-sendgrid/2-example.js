const express = require("express");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/", async (req, res, next) => {
  const { email, name, text } = req.body;

  sgMail.setApiKey('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');
  const msg = {
    to: email,
    from: "therealtoresto@gmail.com",
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

app.use(function(req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || "3002";
app.listen(port, () => {
  console.log("Server start");
});

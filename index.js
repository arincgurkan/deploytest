const express = require("express");
var app = express();
const bodyparser = require("body-parser");

const Email = require("./utils/email");
const contactEmail = require("./utils/contactEmail");
const catchAsync = require("./utils/catchAsync");

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post(
  "/submitform",
  catchAsync(async (req, res, next) => {
    console.log(req.body);

    await new Email(
      req.body["driverinfo"] == 1 ? "Mit Fahrer" : "Ohne Fahrer",
      req.body["vorname"],
      req.body["nachname"],
      req.body["phone"],
      req.body["custemail"],
      req.body["adresse"],
      req.body["datum"],
      req.body["von"],
      req.body["bis"]
    ).sendInfos();
  })
);

app.use(express.static(__dirname + "/public"));

app.listen(3000, () =>
  console.log("Express server is running at port number 3000.")
);

app.get("/contacts", (req, res) => {
  res.sendFile(`${__dirname}/contacts.html`);
});

app.post(
  "/sendMessage",
  catchAsync(async (req, res, next) => {
    console.log(req.body);

    await new contactEmail(
      req.body["name"],
      req.body["email"],
      req.body["phone"],
      req.body["text"]
    ).sendMessage();
  })
);

app.get("/mobellift", (req, res) => {
  res.sendFile(`${__dirname}/möbellift.html`);
});

app.get("/offerte", (req, res) => {
  res.sendFile(`${__dirname}/offerte.html`);
});

app.get("/uberuns", (req, res) => {
  res.sendFile(`${__dirname}/uberuns.html`);
});

app.get("/agb", (req, res) => {
  res.sendFile(`${__dirname}/agb.html`);
});

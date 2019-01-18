const express = require("express");
const nodemailer = require("nodemailer");
const validator = require("validator");
const xssFilters = require("xss-filters");

const app = express();

app.use(express.json());

app.get("/", function(req, res) {
  res.status(405).json({ error: "sorry!" });
});

app.post("/", function(req, res) {
  const attributes = ["name", "email", "msg", "phone"];
  // const sanitizedAttributes = attributes.map(n =>
  //   validateAndSanitize(n, req.body[n])
  // );
  // const someInvalid = sanitizedAttributes.some(r => !r);

  // if (someInvalid) {
  //   return res.status(422).json({ error: "Ugh.. That looks unprocessable!" });
  // }

  sendMail(...attributes);
  res.status(200).json({ message: "success" });
});

module.exports = {
  path: "/api/contact",
  handler: app
};

const validateAndSanitize = (key, value) => {
  const rejectFunctions = {
    name: v => v.length < 4,
    email: v => !validator.isEmail(v),
    msg: v => validator.isEmpty(v) || v.length < 0
  };

  // If object has key and function returns false, return sanitized input. Else, return false
  return (
    rejectFunctions.hasOwnProperty(key) &&
    !rejectFunctions[key](value) &&
    xssFilters.inHTMLData(value)
  );
};

const sendMail = (name, email, msg, phone) => {
  console.log("sending mail");
  let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail"
  });
  transporter.sendMail({
    from: email,
    to: "m.mosholder@aspenware.com",
    subject: "New website contact form message",
    text: msg + " " + phone + ". From " + name
  });
};
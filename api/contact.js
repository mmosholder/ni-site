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
  const sanitizedAttributes = attributes.map(n =>
    validateAndSanitize(n, req.body[n])
  );
  const someInvalid = sanitizedAttributes.some(r => !r);

  if (someInvalid) {
    return res.status(422).json({ error: "Ugh.. That looks unprocessable!" });
  }

  sendMail(...sanitizedAttributes);
  res.status(200).json({ message: "success" });
});

module.exports = {
  path: "/api/contact",
  handler: app
};

const validateAndSanitize = (key, value) => {
  const rejectFunctions = {
    name: v => v.length < 1,
    email: v => !validator.isEmail(v),
    msg: v => validator.isEmpty(v) || v.length < 0,
    phone: v => validator.isEmpty(v) || v.length < 0
  };

  // If object has key and function returns false, return sanitized input. Else, return false
  return (
    rejectFunctions.hasOwnProperty(key) &&
    !rejectFunctions[key](value) &&
    xssFilters.inHTMLData(value)
  );
};

const sendMail = (name, email, msg, phone) => {
  var api_key = "87acdc8afadff24679d8537a0d1bb1ed-3939b93a-a8653a9e";
  var domain = "sandbox6e3380ed9f7d46cfaf5161c890a4f0a9.mailgun.org";
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  var data = {
    from: name + " <" + email + ">",
    replyTo: email,
    to: 'gavin@nibrewing.com',
    subject: 'Contact from the website',
    text: msg + ". Phone: " + phone
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
};

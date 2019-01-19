const express = require("express");
const validator = require("validator");
const xssFilters = require("xss-filters");

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.status(405).json({ error: "sorry!" });
});

app.post("/", function (req, res) {
  const attributes = ["name", "email", "msg", "phone", "location"];
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
  path: "/api/sales",
  handler: app
};

const validateAndSanitize = (key, value) => {
  const rejectFunctions = {
    name: v => v.length < 1,
    email: v => !validator.isEmail(v),
    msg: v => validator.isEmpty(v) || v.length < 0,
    phone: v => validator.isEmpty(v) || v.length < 0,
    location: v => validator.isEmpty(v) || v.length < 0,
  };

  // If object has key and function returns false, return sanitized input. Else, return false
  return (
    rejectFunctions.hasOwnProperty(key) &&
    !rejectFunctions[key](value) &&
    xssFilters.inHTMLData(value)
  );
};

const sendMail = (name, email, msg, phone, location) => {
  var api_key = process.env.MAILGUN_API_KEY;
  var domain = process.env.MAILGUN_DOMAIN;
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  var data = {
    from: name + " <" + email + ">",
    replyTo: email,
    to: process.env.SALES_EMAIL,
    subject: 'Sales contact from the website',
    text: msg + ". Phone: " + phone + ". Location Type: " + location
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
};

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/list/bb55b8afa1";

  const options = {
    method: "POST",
    auth: "pritish2:db4ff3cb1cd6af108a9d6fb38742e7c1-us8",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/faliure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/faliure", function (req, res) {
  res.redirect("/");
});

if (1 >= 0) {
  app.listen(3000, function () {
    console.log("serverr running on port 3000");
  });
}

//api key : db4ff3cb1cd6af108a9d6fb38742e7c1-us8
//aud id : bb55b8afa1

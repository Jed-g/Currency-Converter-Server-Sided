const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/styles.css", express.static(__dirname + "/styles.css"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
  var source_cur = req.body.crypto;
  var target_cur = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: source_cur,
      to: target_cur,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    console.log(response);
  });
});

app.listen(3000, function() {
  console.log("listening on port 3000");
});

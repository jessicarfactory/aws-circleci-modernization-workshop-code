var express = require('express');
var app = express();
var exports = module.exports = {};
const LaunchDarkly = require('launchdarkly-node-server-sdk');

client = LaunchDarkly.init(".gitignore");

function welcomeMessage(){
    var message = "Welcome to CI/CD 101 using CircleCI!";
    return message;
}

// set the view engine to ejs
app.set('view engine', 'ejs');

client.once("ready", () => {
    client.variation("your.flag.key", {"key": "user@test.com"}, false,
      (err, showFeature) => {
        if (showFeature) {app.get('/', function (req, res) {
    var message = "Hello World";
    res.render("index", {message: welcomeMessage()});
});} else {
    // the code to run if the feature is off
    app.get('/', function (req, res) {
        var message = "Goodbye World";
        res.render("index", {message: welcomeMessage()});
    });
  }
});
});


var server = app.listen(5000, function () {
    console.log("Node server running...");
});

module.exports = server;
module.exports.welcomeMessage = welcomeMessage;
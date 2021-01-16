var express = require("express");
var app = express();
var http = require("http").createServer(app);
var path = require("path");
var public = path.join(__dirname, "public");
const url = require("url");


app.get("/", function (req, res) {
    res.sendFile(path.join(public, "index.html"));
});




// Serve static files in the public directory
app.use(express.static("public"));





// Listen for Heroku port, otherwise just use 3000
var port = 3000;
http.listen(port, function () {
    console.log("http://localhost:" + port);
});
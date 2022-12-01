var express = require("express"); //Import the express dependency
var http = require("http");
var path = require("path");

var port = process.env.PORT || 5000; //Save the port number where your server will be listening

var app = express(); //Instantiate an express app, the main work horse of this server
app.set("title", "OpenFin App");
app.use(express.static(path.join(__dirname, "src")));

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("src/index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

http.createServer(app).listen(port, function () {
  console.log("Now listening on port " + port);
});

// app.listen(port, () => {
//   //server starts listening for any attempts from a client to connect at port: {port}
//   console.log(`Now listening on port ${port}`);
// });

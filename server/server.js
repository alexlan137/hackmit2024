const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const bodyParser = require("body-parser"); // allow node to automatically parse POST body requests as JSON
const session = require("express-session"); // library that stores info about each connected user
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app); //new http server

//connect to mongoDB
const mongoConnectionURI = process.env.MONGO_SRV;
const databaseName = "Database";
mongoose
  .connect(mongoConnectionURI, {
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
// set up bodyParser, which allows us to process POST requests
//this parses the body of every POST request into JSON; so in /api, we can directly treat req.body as an object, with each field their correct type
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up a session, which will persist login data across requests
const session_secret = process.env.SESSION_SECRET;
app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
  })
);

//mount API router on "/api" path
const api = require("./api.js");
app.use("/api", api);

//serve static files when a GET request is made to client/dist
//note: because webpack bundles all the front-end JS/CSS files into bundle.js (which is in client/dist), all static files served to the client are in client/dist
const client_dir = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(client_dir));
//now: express treats client_dir as the root for static files!
//so when the site requests a static file from filepath, server interprets that as client_dir/filepath
//so for getting assets: do /assets/name rather than /client/dist/assets/name.

// for get requests to any other route, just send index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(client_dir, "index.html"));
});

//handle errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

//listen on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

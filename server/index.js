const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json);
app.use(cors());

const prisma = new PrismaClient();
const port = process.env.PORT || 8080;
// Logging Middleware
app.use(morgan("dev"));

// Middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log out the body to the console
// Get rid of when deploying. Useful when developing
app.use((req, res, next) => {
  console.log("<___BODY LOGGER START___>");
  console.log(req.body);
  console.log("<___BODY LOGGER END___>");
  next();
});

// Home route. Will serve the front end
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api", require("./api"));

// app.use("/", express.static(__dirname + "../client/dist"))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

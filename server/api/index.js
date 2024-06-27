const express = require("express");
const apiRouter = express.Router();
// api
apiRouter.get("/", (req, res, next) => {
  res.send("Api route /api");
});

// apiRouter.use("/users", require("./users"));
apiRouter.use("/teams", require("./teams"));

module.exports = apiRouter;

const express = require("express");
const apiRouter = express.Router();
// api
apiRouter.get("/", (req, res, next) => {
  res.send("Api route /api");
});

apiRouter.use("/users", require("./users"));
apiRouter.use("/teams", require("./teams"));
apiRouter.use("/pokemon", require("./pokemon"));
apiRouter.use("/nature", require("./nature"));

module.exports = apiRouter;

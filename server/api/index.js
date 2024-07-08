const express = require("express");
const apiRouter = express.Router();
// api
apiRouter.get("/", (req, res, next) => {
  res.send("Api route /api");
});

apiRouter.use("/users", require("./users"));
apiRouter.use("/teams", require("./teams"));
apiRouter.use("/pokemon", require("./pokemon"));
apiRouter.use("/natures", require("./nature"));
apiRouter.use("/items", require("./items"));
apiRouter.use("/auth", require("../auth/auth"));
apiRouter.use("/moves", require("./moves"));
apiRouter.use("/machines", require("./machines"));
apiRouter.use("/abilities", require("./abilities"));
apiRouter.use("/favorites", require("./favorites"));
apiRouter.use("/pokedex", require("./pokedex"));

module.exports = apiRouter;

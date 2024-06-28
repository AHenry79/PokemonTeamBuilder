const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const express = require("express");
const natureRouter = express.Router();

// get pokemon natures
natureRouter.get("/", async (req, res, next) => {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/nature/?limit=25"
  );
  res.send(response.data.results);
});

module.exports = natureRouter;

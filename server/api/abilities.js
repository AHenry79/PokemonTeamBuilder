const express = require("express");
const abilityRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

abilityRouter.get("/:id", async (req, res, next) => {
  try {
    const abilities = await prisma.abilities.findMany({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(abilities);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
abilityRouter.get("/", async (req, res, next) => {
  try {
    const abilities = await prisma.abilities.findMany();
    res.send(abilities);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = abilityRouter;

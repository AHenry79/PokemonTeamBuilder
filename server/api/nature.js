const { PrismaClient } = require("@prisma/client");
const express = require("express");
const natureRouter = express.Router();
const prisma = new PrismaClient();

// get pokemon natures
natureRouter.get("/", async (req, res, next) => {
  try {
    const natures = await prisma.nature.findMany();
    res.send(natures);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
natureRouter.get("/:id", async (req, res, next) => {
  try {
    const singleNature = await prisma.nature.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(singleNature);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = natureRouter;

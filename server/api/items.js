const { PrismaClient } = require("@prisma/client");
const express = require("express");
const itemRouter = express.Router();
const prisma = new PrismaClient();

// get held items
itemRouter.get("/", async (req, res, next) => {
  try {
    const items = await prisma.heldItems.findMany();
    res.send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = itemRouter;

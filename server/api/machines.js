const { PrismaClient } = require("@prisma/client");
const express = require("express");
const machineRouter = express.Router();
const prisma = new PrismaClient();

// grab machines
machineRouter.get("/", async (req, res, next) => {
  try {
    const machines = await prisma.machine.findMany();
    res.send(machines);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// grab machines by id
machineRouter.get("/:id", async (req, res, next) => {
  try {
    const singleMachine = await prisma.machine.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(singleMachine);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = machineRouter;

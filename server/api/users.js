const express = require("express");
const usersRouter = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// GET /api/user and associated teams
usersRouter.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        teams: true,
      },
    });
    console.log(users);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = usersRouter;

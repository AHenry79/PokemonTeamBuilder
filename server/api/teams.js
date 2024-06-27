const express = require("express");
const teamsRouter = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// GET /api/teams and the associated users
teamsRouter.get("/", async (req, res) => {
  const teams = await prisma.teams.findMany({
    include: {
      user: true,
    },
  });
  console.log(teams);
  res.send(teams);
});

module.exports = teamsRouter;

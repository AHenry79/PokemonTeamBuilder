const express = require("express");
const teamsRouter = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// GET /api/teams and the associated users
teamsRouter.get("/", async (req, res, next) => {
  try {
    const teams = await prisma.teams.findMany({
      include: {
        user: true,
      },
    });
    res.send(teams);
  } catch (err) {
    next(err);
  }
});

teamsRouter.get("/:id", async (req, res, next) => {
  try {
    const team = await prisma.teams.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.send(team);
  } catch (err) {
    next(err);
  }
});

teamsRouter.get("/users/:id", async (req, res, next) => {
  try {
    const team = await prisma.teams.findMany({
      where: { user_id: parseInt(req.params.id) },
    });
    res.send(team);
  } catch (err) {
    next(err);
  }
});

teamsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedTeam = await prisma.teams.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.send(deletedTeam);
  } catch (err) {
    next(err);
  }
});

teamsRouter.post("/", async (req, res, next) => {
  try {
    const { user_id, team_name } = req.body;
    const addTeam = await prisma.teams.create({
      data: { user_id, team_name },
    });
    res.send(addTeam);
  } catch (err) {
    next(err);
  }
});

teamsRouter.put("/:id", async (req, res, next) => {
  try {
    const { user_id, team_name } = req.body;
    const updatedTeam = await prisma.teams.update({
      where: { id: parseInt(req.params.id) },
      data: { user_id, team_name },
    });
    res.send(updatedTeam);
  } catch (err) {
    next(err);
  }
});

module.exports = teamsRouter;

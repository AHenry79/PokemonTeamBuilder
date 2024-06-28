const express = require("express");
const teamsRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// GET /api/teams and the associated users

teamsRouter.get("/", async (req, res, next) => {
  try {
    const teams = await prisma.teams.findMany({
      include: { user: true },
    });
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
    next(err);
  }
});

teamsRouter.get("/:id", async (req, res, next) => {
  try {
    const team = await prisma.teams.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ error: "Team not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team" });
    next(err);
  }
});

teamsRouter.get("/users/:id", async (req, res, next) => {
  try {
    const team = await prisma.teams.findUnique({
      where: { user_id: parseInt(req.params.id) },
    });
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ error: "Team not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team" });
    next(err);
  }
});
teamsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedTeam = await prisma.teams.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json(deletedTeam);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete team" });
    next(err);
  }
});
teamsRouter.post("/", async (req, res, next) => {
  try {
    const { user_id, team_name  } = req.body;
    const newTeam = await prisma.teams.create({
      data: { user_id, team_name  },
    });
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ error: "Failed to create team" });
    next(err);
  }
});


teamsRouter.put("/:id", async (req, res, next) => {
  try {
    const { user_id, team_name } = req.body;
    const updatedTeam = await prisma.teams.update({
      where: { id: parseInt(req.params.id) },
      data: { user_id, team_name},
    });
    res.status(200).json(updatedTeam);
  } catch (err) {
    res.status(500).json({ error: "Failed to update team" });
    next(err);
  }
});

module.exports = teamsRouter;

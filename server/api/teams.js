const express = require("express");
const teamsRouter = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// GET /api/teams and the associated users

teamsRouter.get("/", async (req, res, next) => {
  try {
    const teams = await prisma.teams.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
    next(err);
  }
});

// GET /api/teams/:id
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

// GET /api/teams/users/:id
teamsRouter.get("/users/:id", async (req, res, next) => {
  try {
    const team = await prisma.teams.findMany({
      where: { user_id: parseInt(req.params.id) },
    });
    if (team.length > 0) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ error: "Team not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team" });
    next(err);
  }
});
// DELETE /api/teams/:id
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

// POST /api/teams
teamsRouter.post("/", async (req, res, next) => {
  try {
    const { user_id, team_name } = req.body;
    const newTeam = await prisma.teams.create({
      data: { user_id, team_name },
    });
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ error: "Failed to create team" });
    next(err);
  }
});

// Post team member info from user selection
teamsRouter.post("/pokemon", async (req, res, next) => {
  try {
    const {
      teams_id,
      pokemon_id,
      move1,
      move2,
      move3,
      move4,
      held_item_id,
      nature_id,
    } = req.body;
    const teamMembers = await prisma.teamPokemon.create({
      data: {
        teams: { connect: { id: teams_id } },
        pokemon: { connect: { id: pokemon_id } },
        move1,
        move2,
        move3,
        move4,
        held_item_id,
        nature_id,
      },
    });
    res.status(201).json(teamMembers);
  } catch (err) {
    res.status(500).json({ error: "Failed to create individual team members" });
    next(err);
  }
});

// PUT /api/teams/:id
teamsRouter.put("/:id", async (req, res, next) => {
  try {
    const { user_id, team_name } = req.body;
    const updatedTeam = await prisma.teams.update({
      where: { id: parseInt(req.params.id) },
      data: { user_id, team_name },
    });
    res.status(200).json(updatedTeam);
  } catch (err) {
    res.status(500).json({ error: "Failed to update team" });
    next(err);
  }
});

teamsRouter.get("/pokemon/:id", async (req, res, next) => {
  try {
    const team = await prisma.teamPokemon.findMany({
      where: { teams_id: parseInt(req.params.id) },
      include: { pokemon: true },
    });
    if (team.length > 0) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ error: "Team not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team" });
    next(err);
  }
});

teamsRouter.delete("/pokemon/:id", async (req, res, next) => {
  try {
    const teamId = parseInt(req.params.id);

    if (isNaN(teamId)) {
      return res.status(400).json({ error: "Invalid team ID" });
    }
    const deletedTeamPokemon = await prisma.teamPokemon.deleteMany({
      where: { teams_id: teamId },
    });

    if (!deletedTeamPokemon || deletedTeamPokemon.count === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    const deletedTeam = await prisma.teams.delete({
      where: { id: teamId },
    });

    if (!deletedTeam || deletedTeam.count === 0) {
      return res
        .status(404)
        .json({ error: "Team not found or deletion failed" });
    }

    res.status(200).json(deletedTeam);
  } catch (err) {
    console.error("Failed to delete team:", err);
    res.status(500).json({ error: "Failed to delete team" });
    next(err);
  }
});

module.exports = teamsRouter;

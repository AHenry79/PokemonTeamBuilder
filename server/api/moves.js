const { PrismaClient } = require("@prisma/client");
const express = require("express");
const movesRouter = express.Router();
const prisma = new PrismaClient();

// get all moves
movesRouter.get("/", async (req, res, next) => {
  try {
    const moves = await prisma.moves.findMany({
      include: {
        pokemon: true,
        machine: true,
        prevMoves: true,
      },
    });
    res.send(moves);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get single move by id
movesRouter.get("/:id", async (req, res, next) => {
  try {
    const singleMove = await prisma.moves.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        pokemon: true,
        machine: true,
        prevMoves: true,
      },
    });
    res.send(singleMove);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = movesRouter;

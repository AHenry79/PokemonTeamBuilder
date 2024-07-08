const { PrismaClient } = require("@prisma/client");
const express = require("express");
const pokedexRouter = express.Router();
const prisma = new PrismaClient();

// grab pokedex with all pokemon information
pokedexRouter.get("/pokemonlist/:id", async (req, res, next) => {
  try {
    const pokedex = await prisma.pokedexPokemon.findMany({
      where: {
        pokdex_id: parseInt(req.params.id),
      },
      include: {
        pokemon: true,
        pokemon: {
          include: {
            moves: true,
            abilities: true,
          },
        },
      },
    });
    res.send(pokedex);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
pokedexRouter.get("/:id", async (req, res, next) => {
  try {
    const pokedex = await prisma.pokedex.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(pokedex);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = pokedexRouter;

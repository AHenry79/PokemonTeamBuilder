const { PrismaClient } = require("@prisma/client");
const express = require("express");
const pokemonRouter = express.Router();
const prisma = new PrismaClient();

// grab all pokemon
pokemonRouter.get("/", async (req, res, next) => {
  try {
    const pokemon = await prisma.pokemon.findMany({
      include: {
        moves: true,
        abilities: true,
      },
    });
    res.send(pokemon);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// grab pokemon by name
// pokemonRouter.get("/:name", async (req, res, next) => {
//   try {
//     const singlePokemonById = await prisma.pokemon.findUnique({
//       where: {
//         name: req.params.name,
//       },
//       include: {
//         moves: true,
//         abilities: true,
//       },
//     });
//     res.send(singlePokemonById);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// grab pokemon by id
pokemonRouter.get("/:id", async (req, res, next) => {
  try {
    const singlePokemonById = await prisma.pokemon.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        moves: true,
        abilities: true,
      },
    });
    res.send(singlePokemonById);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = pokemonRouter;

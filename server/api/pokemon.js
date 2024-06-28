const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const express = require("express");
const pokemonRouter = express.Router();

//kanto
pokemonRouter.get("/gen1", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/2");

  res.send(response.data.pokemon_entries);
});

//johto
pokemonRouter.get("/gen2", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/3");

  res.send(response.data.pokemon_entries);
});

//hoenn
pokemonRouter.get("/gen3", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/4");

  res.send(response.data.pokemon_entries);
});

//sinnoh
pokemonRouter.get("/gen4", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/5");

  res.send(response.data.pokemon_entries);
});

//unova
pokemonRouter.get("/gen5", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/8");

  res.send(response.data.pokemon_entries);
});

//kalos-central
pokemonRouter.get("/gen6a", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/12");

  res.send(response.data.pokemon_entries);
});

//kalos-coastal
pokemonRouter.get("/gen6b", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/13");

  res.send(response.data.pokemon_entries);
});

//kalos-mountain
pokemonRouter.get("/gen6c", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/14");

  res.send(response.data.pokemon_entries);
});

//alola
pokemonRouter.get("/gen7", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/16");

  res.send(response.data.pokemon_entries);
});

//galar
pokemonRouter.get("/gen8", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/27");

  res.send(response.data.pokemon_entries);
});

//galar isle of armor
pokemonRouter.get("/gen8a", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/28");

  res.send(response.data.pokemon_entries);
});

//galar crown tundra
pokemonRouter.get("/gen8b", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/29");

  res.send(response.data.pokemon_entries);
});

//paldea
pokemonRouter.get("/gen9", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/31");

  res.send(response.data.pokemon_entries);
});

//kitakami
pokemonRouter.get("/gen9a", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/32");

  res.send(response.data.pokemon_entries);
});

//blueberry academy
pokemonRouter.get("/gen9b", async (req, res, next) => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokedex/33");

  res.send(response.data.pokemon_entries);
});

//   get pokemon by id
pokemonRouter.get("/:id", async (req, res, next) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
  );

  res.send(response.data);
});
// get pokemon species by id
pokemonRouter.get("/species/:id", async (req, res, next) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${req.params.id}`
  );

  res.send(response.data);
});
// get pokemon evolution chain
pokemonRouter.get("/evolution/:id", async (req, res, next) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/evolution-chain/${req.params.id}`
  );

  res.send(response.data);
});

module.exports = pokemonRouter;

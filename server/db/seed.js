const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database");
  console.log("Creating Users...");
  try {
    await prisma.user.create({
      data: {
        email: "test@gmail.com",
        password: await bcrypt.hash("password", saltRounds),
        username: "test",
      },
    });
  } catch (err) {
    throw err;
  }
  try {
    await prisma.user.create({
      data: {
        email: "jerry@gmail.com",
        password: await bcrypt.hash("password", saltRounds),
        username: "jerry123",
      },
    });
  } catch (err) {
    throw err;
  }
  try {
    await prisma.user.create({
      data: {
        email: "dantheman@gmail.com",
        password: await bcrypt.hash("password", saltRounds),
        username: "dantheman",
      },
    });
  } catch (err) {
    throw err;
  }
  console.log("Users successfully created!");
  console.log("Creating pokemon...");
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
    await prisma.pokemon.create({
      data: {
        name: response.data.name,
        type1: response.data.types[0].type.name,
        type2: response.data.types[1].type.name,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        special_atk: response.data.stats[3].base_stat,
        special_def: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
      },
    });
  } catch (err) {
    throw err;
  }
  console.log("Pokemon successfully created!");
  console.log("Creating teams...");
  try {
    await prisma.teams.create({
      data: {
        user_id: 1,
        team_name: "test team",
      },
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created teams!");
  console.log("Creating Pokemon Teams...");
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
    const response_held = await axios.get("https://pokeapi.co/api/v2/berry");
    const response_nature = await axios.get("https://pokeapi.co/api/v2/nature");
    await prisma.pokemonTeams.create({
      data: {
        teams_id: 1,
        pokemon_id: response.data.id,
        move1: response.data.moves[6].move.name,
        move2: response.data.moves[13].move.name,
        move3: response.data.moves[41].move.name,
        move4: response.data.moves[62].move.name,
        held_item: response_held.data.results[0].name,
        nature: response_nature.data.results[0].name,
        ability: response.data.abilities[0].ability.name,
      },
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created Pokemon Teams!");
  console.log("Creating favorites...");
  try {
    await prisma.favorites.create({
      data: {
        user_id: 3,
        teams_id: 1,
      },
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created favorites!");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

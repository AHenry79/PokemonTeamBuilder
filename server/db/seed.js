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
  console.log("Creating held items...");
  try {
    const response_item = await axios.get(
      "https://pokeapi.co/api/v2/item/?limit=2169"
    );
    response_item.data.results.forEach(async (item) => {
      const itemDetails = await axios.get(item.url);
      if (
        (itemDetails.data.attributes &&
          itemDetails.data.attributes.find(
            (attr) => attr.name === "holdable-active"
          )) ||
        (itemDetails.data.category &&
          itemDetails.data.category.name === "held-items")
      ) {
        await prisma.heldItems.create({
          data: {
            id: itemDetails.data.id,
            item_name: itemDetails.data.name,
            effects: itemDetails.data.effect_entries
              .map((entry) => entry.effect)
              .join(", "),
            game_indices: itemDetails.data.game_indices
              .map((index) => index.generation.name)
              .join(", "),
          },
        });
      }
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created items!");
  console.log("Creating natures...");
  try {
    const response_nature = await axios.get(
      "https://pokeapi.co/api/v2/nature/?limit=25"
    );
    response_nature.data.results.forEach(async (item) => {
      const natureDetails = await axios.get(item.url);
      if (natureDetails.data.decreased_stat) {
        await prisma.nature.create({
          data: {
            name: natureDetails.data.name,
            decreased_stat: natureDetails.data.decreased_stat.name,
            increased_stat: natureDetails.data.increased_stat.name,
          },
        });
      } else {
        await prisma.nature.create({
          data: {
            name: natureDetails.data.name,
            decreased_stat: natureDetails.data.decreased_stat,
            increased_stat: natureDetails.data.increased_stat,
          },
        });
      }
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created natures!");
  console.log("Creating pokemon...");
  try {
    const halfPokemon = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=651"
    );
    halfPokemon.data.results.forEach(async (item) => {
      const pokemonDetails = await axios.get(item.url);
      const species = await axios.get(pokemonDetails.data.species.url);
      await prisma.pokemon.create({
        data: {
          id: pokemonDetails.data.id,
          name: pokemonDetails.data.name,
          type1: pokemonDetails.data.types[0].type.name,
          type2: pokemonDetails.data.types[1]
            ? pokemonDetails.data.types[1].type.name
            : null,
          sprite: pokemonDetails.data.sprites.front_default,
          shiny: pokemonDetails.data.sprites.front_shiny,
          base_exp: pokemonDetails.data.base_experience,
          growth_rate: species.data.growth_rate.name,
          catch_rate: species.data.capture_rate,
          hp: pokemonDetails.data.stats[0].base_stat,
          atk: pokemonDetails.data.stats[1].base_stat,
          def: pokemonDetails.data.stats[2].base_stat,
          sp_atk: pokemonDetails.data.stats[3].base_stat,
          sp_def: pokemonDetails.data.stats[4].base_stat,
          speed: pokemonDetails.data.stats[5].base_stat,
        },
      });
    });
    const secondHalfPokemon = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=651&limit=651"
    );
    secondHalfPokemon.data.results.forEach(async (item) => {
      const pokemonDetails = await axios.get(item.url);
      const species = await axios.get(pokemonDetails.data.species.url);
      await prisma.pokemon.create({
        data: {
          id: pokemonDetails.data.id,
          name: pokemonDetails.data.name,
          type1: pokemonDetails.data.types[0].type.name,
          type2: pokemonDetails.data.types[1]
            ? pokemonDetails.data.types[1].type.name
            : null,
          sprite: pokemonDetails.data.sprites.front_default,
          shiny: pokemonDetails.data.sprites.front_shiny,
          base_exp: pokemonDetails.data.base_experience,
          growth_rate: species.data.growth_rate.name,
          catch_rate: species.data.capture_rate,
          hp: pokemonDetails.data.stats[0].base_stat,
          atk: pokemonDetails.data.stats[1].base_stat,
          def: pokemonDetails.data.stats[2].base_stat,
          sp_atk: pokemonDetails.data.stats[3].base_stat,
          sp_def: pokemonDetails.data.stats[4].base_stat,
          speed: pokemonDetails.data.stats[5].base_stat,
        },
      });
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created pokemon!");
  console.log("Creating moves...");
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/move/?limit=937"
    );
    response.data.results.forEach(async (i) => {
      const moves = await axios.get(i.url);
      await prisma.moves.create({
        data: {
          id: moves.data.id,
          name: moves.data.name,
          accuracy: moves.data.accuracy,
          damage_class: moves.data.damage_class.name,
          gens: moves.data.generation.name,
          power: moves.data.power,
          pp: moves.data.pp,
          type: moves.data.type.name,
          priority: moves.data.priority,
        },
      });
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created moves!");
  console.log("Creating machines...");
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/move/?limit=937"
    );
    response.data.results.forEach(async (item) => {
      const machineDetails = await axios.get(item.url);
      if (machineDetails.data.machines) {
        machineDetails.data.machines.forEach(async (i) => {
          const machine = await axios.get(i.machine.url);
          await prisma.machine.create({
            data: {
              move_id: machineDetails.data.id,
              item_name: machine.data.item.name,
              move_name: machine.data.move.name,
              gen: machine.data.version_group.name,
            },
          });
        });
      }
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created machines!");
  console.log("Creating previous move information...");
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/move/?limit=937"
    );
    response.data.results.forEach(async (item) => {
      const prevMoveDetails = await axios.get(item.url);
      if (
        prevMoveDetails.data.past_values &&
        prevMoveDetails.data.past_values.length > 0
      ) {
        prevMoveDetails.data.past_values.forEach(async (i) => {
          await prisma.prevMoves.create({
            data: {
              move_id: prevMoveDetails.data.id,
              accuracy: i.accuracy,
              power: i.power,
              pp: i.pp,
              type: i.type ? i.type.name : null,
              gen: i.version_group ? i.version_group.name : null,
            },
          });
        });
      }
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created previous move information!");
  console.log("Creating Abilities...");
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/ability/?limit=367"
    );
    response.data.results.forEach(async (i) => {
      const ability = await axios.get(i.url);
      const enEntry = ability.data.effect_entries.find(
        (entry) => entry.language.name === "en"
      );
      const flEnEntry = ability.data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      if (enEntry || flEnEntry) {
        await prisma.abilities.create({
          data: {
            id: ability.data.id,
            name: ability.data.name,
            effect: enEntry ? enEntry.effect : flEnEntry.flavor_text,
            gen: ability.data.generation.name,
          },
        });
      }
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created abilities!");
  console.log("Creating abilities on pokemon...");
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=1302"
    );
    response.data.results.forEach(async (i) => {
      const pokemon = await axios.get(i.url);
      pokemon.data.abilities.forEach(async (item) => {
        const getAbility = await axios.get(item.ability.url);
        await prisma.abilitiesOnPokemon.create({
          data: {
            name: getAbility.data.name,
            ability_id: getAbility.data.id,
            pokemon_id: pokemon.data.id,
            is_hidden: item.is_hidden,
          },
        });
      });
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created abilities on pokemon!");
  console.log("Creating Pokemon Teams...");
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
    await prisma.teamPokemon.create({
      data: {
        teams_id: 1,
        pokemon_id: 1,
        move1: response.data.moves[6].move.name,
        move2: response.data.moves[13].move.name,
        move3: response.data.moves[41].move.name,
        move4: response.data.moves[62].move.name,
        held_item_id: 205,
        nature_id: 9,
      },
    });
  } catch (err) {
    throw err;
  }
  console.log("Successfully created Pokemon Teams!");
  console.log("Creating Pokedex...");
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokedex/?limit=32"
    );
    const pokedex = response.data.results;
    for (const dex of pokedex) {
      const pokedexData = dex.url.split("/")[6];
      const region = dex.name;
      await prisma.pokedex.create({
        data: {
          id: Number(pokedexData),
          region: region,
        },
      });
    }
  } catch (err) {
    throw err;
  }
  console.log("Pokedex successfully created!");
  console.log("Creating pokedex pokemon...");
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokedex/?limit=32"
    );
    const pokedex = response.data.results;
    for (const dex of pokedex) {
      const pokedexId = dex.url.split("/")[6];
      const pokedexData = await axios.get(dex.url);
      for (const i of pokedexData.data.pokemon_entries) {
        const pokemonList = i.pokemon_species.url.split("/")[6];
        await prisma.pokedexPokemon.create({
          data: {
            pokedex: {
              connect: {
                id: Number(pokedexId),
              },
            },
            pokemon: {
              connect: {
                id: Number(pokemonList),
              },
            },
          },
        });
      }
    }
  } catch (err) {
    throw err;
  }
  console.log("Pokedex pokemon successfully created!");
  console.log("Creating moves on pokemon...");
  try {
    const pokemonResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=1302",
      {
        timeout: 10000000,
      }
    );

    for (const pokemon of pokemonResponse.data.results) {
      const pokemonData = await axios.get(pokemon.url, { timeout: 10000000 });
      const pokemonId = pokemonData.data.id;

      const desiredMoveIds = pokemonData.data.moves.map(
        (move) => move.move.url
      );

      for (const moveUrl of desiredMoveIds) {
        const moveData = await axios.get(moveUrl, { timeout: 10000000 });
        const moveId = moveData.data.id;

        await prisma.moveOnPokemon.create({
          data: {
            name: moveData.data.name,
            pokemon_id: pokemonId,
            move_id: moveId,
          },
        });
      }
    }
  } catch (err) {
    throw err;
  }
  console.log("Moves on pokemon successfully created!");
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

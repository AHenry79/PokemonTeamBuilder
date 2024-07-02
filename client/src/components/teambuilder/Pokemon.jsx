import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function Pokemon({ addToTeam }) {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const url = window.location.href;
  const gen = url.split("/").pop();
  let id;
  if (gen === "gen1") {
    id = 2;
  } else if (gen === "gen2") {
    id = 3;
  } else if (gen === "gen3") {
    id = 4;
  } else if (gen === "gen4") {
    id = 5;
  } else if (gen === "gen5") {
    id = 8;
  }

  useEffect(() => {
    async function fetchPokemonInfo() {
      const pokemonNamesMap = {
        deoxys: "deoxys-normal",
        wormadam: "wormadam-plant",
        basculin: "basculin-blue-striped",
        darmanitan: "darmanitan-zen",
        tornadus: "tornadus-incarnate",
        thundurus: "thundurus-incarnate",
        landorus: "landorus-incarnate",
        keldeo: "keldeo-ordinary",
        meloetta: "meloetta-aria",
      };
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon...");
        }
        const dataName = await response.json();

        const pokemonData = [];
        for (const spec of dataName.pokemon_entries) {
          let names = spec.pokemon_species.name;
          console.log(names);
          if (pokemonNamesMap[names]) {
            names = pokemonNamesMap[names];
          }
          const response2 = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${names}`
          );
          if (!response2.ok) {
            throw new Error("Failed to fetch pokemon...");
          }
          const dataOther = await response2.json();
          pokemonData.push({
            name: dataOther.name,
            id: dataOther.id,
            sprite: dataOther.sprites.front_default,
            shiny: dataOther.sprites.front_shiny,
            type1: dataOther.types[0].type.name,
            type2: dataOther.types[1] ? dataOther.types[1].type.name : null,
            abilities: dataOther.abilities,
          });
        }
        setPokemon(pokemonData);
      } catch (err) {
        setError(err);
      }
    }
    fetchPokemonInfo();
  }, []);

  const handleAddToTeam = (pokemonData) => {
    addToTeam(pokemonData);
  };

  return (
    <>
      <div className="search">
        <SearchIcon className="icon" />
        <input
          type="text"
          placeholder="Search for pokemon..."
          onChange={(e) => setSearch(e.target.value)}
          className="searchbar"
        />
      </div>
      <div className="pokemon-wrapper">
        {pokemon
          .filter(
            (i) =>
              i.name.toLowerCase().includes(search.toLowerCase()) ||
              i.type1.toLowerCase().includes(search.toLowerCase()) ||
              (i.type2 && i.type2.toLowerCase().includes(search.toLowerCase()))
          )
          .map((pokemon) => (
            <div key={pokemon.id} className="pokemon">
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="sprites"
              />
              <p className="name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </p>
              <p className={`type ${pokemon.type1}`}>
                {pokemon.type1.charAt(0).toUpperCase() + pokemon.type1.slice(1)}
              </p>
              {pokemon.type2 && (
                <p className={`type ${pokemon.type2}`}>
                  {pokemon.type2.charAt(0).toUpperCase() +
                    pokemon.type2.slice(1)}
                </p>
              )}
              <button
                className="add-button"
                onClick={() =>
                  handleAddToTeam({
                    name: pokemon.name,
                    sprite: pokemon.sprite,
                    shiny: pokemon.shiny,
                    type1: pokemon.type1,
                    type2: pokemon.type2,
                    abilities: pokemon.abilities,
                  })
                }
              >
                Add To Team
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Pokemon;

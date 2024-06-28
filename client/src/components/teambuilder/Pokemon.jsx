import { useEffect, useState } from "react";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonInfo() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokedex/2`);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon...");
        }
        const dataName = await response.json();

        const pokemonData = [];
        for (const entry of dataName.pokemon_entries) {
          const id = entry.entry_number;
          console.log(id);
          const response2 = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          if (!response2.ok) {
            throw new Error("Failed to fetch pokemon...");
          }
          const dataOther = await response2.json();
          pokemonData.push({
            name: dataOther.name,
            id: dataOther.id,
            sprite: dataOther.sprites.front_default,
            type1: dataOther.types[0].type.name,
            type2: dataOther.types[1] ? dataOther.types[1].type.name : null,
          });
        }
        setPokemon(pokemonData);
      } catch (err) {
        setError(err);
      }
    }
    fetchPokemonInfo();
  }, []);

  return (
    <div className="pokemon-wrapper">
      {pokemon.map((pokemon) => (
        <div key={pokemon.id} className="pokemon">
          <img src={pokemon.sprite} alt={pokemon.name} className="sprites" />
          <p className="name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </p>
          <p className="type">
            {pokemon.type1.charAt(0).toUpperCase() + pokemon.type1.slice(1)}
          </p>
          {pokemon.type2 && (
            <p className="type">
              {pokemon.type2.charAt(0).toUpperCase() + pokemon.type2.slice(1)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Pokemon;

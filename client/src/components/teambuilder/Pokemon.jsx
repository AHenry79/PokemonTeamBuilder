import { useEffect, useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function Pokemon({ addToTeam }) {
  const [pokemon, setPokemon] = useState([]);
  const [pokemon2, setPokemon2] = useState([]);
  const [pokemon3, setPokemon3] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  const handleSearchIconClick = () => {
    inputRef.current.focus();
  };
  const params = useParams();
  const gen = params.genId;
  let id;
  let id2;
  let id3;
  if (gen === "1") {
    id = 2;
  } else if (gen === "2") {
    id = 3;
  } else if (gen === "3") {
    id = 4;
  } else if (gen === "4") {
    id = 5;
  } else if (gen === "5") {
    id = 8;
  } else if (gen === "6") {
    id = 12;
    id2 = 13;
    id3 = 14;
  } else if (gen === "7") {
    id = 16;
  } else if (gen === "8") {
    id = 27;
  } else if (gen === "9") {
    id = 31;
  }

  useEffect(() => {
    async function fetchPokemonInfo() {
      try {
        setLoading(true);
        setProgress(Math.floor(Math.random() * 26));
        const response = await fetch(`/api/pokedex/pokemonlist/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon...");
        }
        const data = await response.json();
        setProgress(Math.floor(Math.random() * 26) + 25);
        const pokemonData = [];
        for (const poke of data) {
          if (gen !== "6") {
            setProgress(75);
          } else {
            setProgress(35);
          }
          pokemonData.push({
            name: poke.pokemon.name,
            id: poke.pokemon_id,
            sprite: poke.pokemon.sprite,
            shiny: poke.pokemon.shiny,
            type1: poke.pokemon.type1,
            type2: poke.pokemon.type2 ? poke.pokemon.type2 : null,
            abilities: poke.pokemon.abilities,
          });
        }
        setPokemon(pokemonData);
        if (gen !== "6") {
          setProgress(100);
          setLoading(false);
        }
      } catch (err) {
        setProgress(0);
        setLoading(false);
        setError(err);
        return err;
      }
    }
    async function fetchGen6Coastal() {
      try {
        const response = await fetch(`/api/pokedex/pokemonlist/${id2}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon...");
        }
        const data = await response.json();
        const pokemonData = [];
        for (const poke of data) {
          setProgress(50);
          pokemonData.push({
            name: poke.pokemon.name,
            id: poke.pokemon_id,
            sprite: poke.pokemon.sprite,
            shiny: poke.pokemon.shiny,
            type1: poke.pokemon.type1,
            type2: poke.pokemon.type2 ? poke.pokemon.type2 : null,
            abilities: poke.pokemon.abilities,
          });
        }
        setPokemon2(pokemonData);
        setProgress(75);
      } catch (err) {
        setProgress(0);
        setLoading(false);
        setError(err);
        return err;
      }
    }
    async function fetchGen6Mountain() {
      try {
        const response = await fetch(`/api/pokedex/pokemonlist/${id3}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon...");
        }
        const data = await response.json();
        const pokemonData = [];
        for (const poke of data) {
          setProgress(75);
          pokemonData.push({
            name: poke.pokemon.name,
            id: poke.pokemon_id,
            sprite: poke.pokemon.sprite,
            shiny: poke.pokemon.shiny,
            type1: poke.pokemon.type1,
            type2: poke.pokemon.type2 ? poke.pokemon.type2 : null,
            abilities: poke.pokemon.abilities,
          });
        }
        setPokemon3(pokemonData);
        setProgress(100);
        setLoading(false);
      } catch (err) {
        setProgress(0);
        setLoading(false);
        setError(err);
        return err;
      }
    }
    const fetchSequentially = async () => {
      if (gen === "6") {
        try {
          await fetchPokemonInfo();
          await fetchGen6Coastal();
          await fetchGen6Mountain();
        } catch (err) {
          console.error(err);
        }
      } else {
        fetchPokemonInfo();
      }
    };
    fetchSequentially();
  }, [gen]);

  const handleAddToTeam = (pokemonData) => {
    addToTeam(pokemonData);
  };

  return (
    <>
      <div className="search">
        <SearchIcon className="icon" onClick={handleSearchIconClick} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for pokemon..."
          onChange={(e) => setSearch(e.target.value)}
          className="searchbar"
          value={search}
        />
        {search && (
          <ClearIcon className="clear" onClick={(e) => setSearch("")} />
        )}
      </div>
      {loading ? (
        <>
          <h1 className="loading">Loading Pokemon...</h1>
          <div className="load-wrapper">
            <progress value={progress} max="100" className="progress" />
            <img
              src="https://media.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif"
              alt="Pikachu running"
              className="loading-gif"
              style={{ left: `${progress - 3}%` }}
            />
          </div>
        </>
      ) : (
        <div className={"pokemon-wrapper"}>
          {gen === "6" && <h1 className="six">Kalos Central</h1>}
          {pokemon
            .filter(
              (i) =>
                i.name.toLowerCase().includes(search.toLowerCase()) ||
                i.type1.toLowerCase().includes(search.toLowerCase()) ||
                (i.type2 &&
                  i.type2.toLowerCase().includes(search.toLowerCase()))
            )
            .map((pokemon) => (
              <div key={pokemon.id} className="pokemon">
                <Link to={`/gen/${gen}/${pokemon.id}`}>
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="sprites"
                  />
                  <p className="name">
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </p>
                  <p className={`type ${pokemon.type1}`}>
                    {pokemon.type1.charAt(0).toUpperCase() +
                      pokemon.type1.slice(1)}
                  </p>
                  {pokemon.type2 && (
                    <p className={`type ${pokemon.type2}`}>
                      {pokemon.type2.charAt(0).toUpperCase() +
                        pokemon.type2.slice(1)}
                    </p>
                  )}
                </Link>
                <button
                  className="add-button"
                  onClick={() =>
                    handleAddToTeam({
                      name: pokemon.name,
                      id: pokemon.id,
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
          {gen === "6" && <h1 className="six">Kalos Coastal</h1>}
          {gen === "6" &&
            pokemon2
              .filter(
                (i) =>
                  i.name.toLowerCase().includes(search.toLowerCase()) ||
                  i.type1.toLowerCase().includes(search.toLowerCase()) ||
                  (i.type2 &&
                    i.type2.toLowerCase().includes(search.toLowerCase()))
              )
              .map((pokemon) => (
                <div key={pokemon.id} className="pokemon">
                  <Link to={`/gen/${gen}/${pokemon.id}`}>
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      className="sprites"
                    />
                    <p className="name">
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </p>
                    <p className={`type ${pokemon.type1}`}>
                      {pokemon.type1.charAt(0).toUpperCase() +
                        pokemon.type1.slice(1)}
                    </p>
                    {pokemon.type2 && (
                      <p className={`type ${pokemon.type2}`}>
                        {pokemon.type2.charAt(0).toUpperCase() +
                          pokemon.type2.slice(1)}
                      </p>
                    )}
                  </Link>
                  <button
                    className="add-button"
                    onClick={() =>
                      handleAddToTeam({
                        name: pokemon.name,
                        id: pokemon.id,
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
          {gen === "6" && <h1 className="six">Kalos Mountain</h1>}
          {gen === "6" &&
            pokemon3
              .filter(
                (i) =>
                  i.name.toLowerCase().includes(search.toLowerCase()) ||
                  i.type1.toLowerCase().includes(search.toLowerCase()) ||
                  (i.type2 &&
                    i.type2.toLowerCase().includes(search.toLowerCase()))
              )
              .map((pokemon) => (
                <div key={pokemon.id} className="pokemon">
                  <Link to={`/gen/${gen}/${pokemon.id}`}>
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      className="sprites"
                    />
                    <p className="name">
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </p>
                    <p className={`type ${pokemon.type1}`}>
                      {pokemon.type1.charAt(0).toUpperCase() +
                        pokemon.type1.slice(1)}
                    </p>
                    {pokemon.type2 && (
                      <p className={`type ${pokemon.type2}`}>
                        {pokemon.type2.charAt(0).toUpperCase() +
                          pokemon.type2.slice(1)}
                      </p>
                    )}
                  </Link>
                  <button
                    className="add-button"
                    onClick={() =>
                      handleAddToTeam({
                        name: pokemon.name,
                        id: pokemon.id,
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
      )}
    </>
  );
}

export default Pokemon;

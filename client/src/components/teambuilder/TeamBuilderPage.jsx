import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

function TeamBuilder() {
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [top, setTop] = useState(false);
  const [team, setTeam] = useState({
    pokemon1: {
      sprite: "",
      name: null,
      type1: null,
      type2: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    },
    pokemon2: {
      sprite: "",
      name: null,
      type1: null,
      type2: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    },
    pokemon3: {
      sprite: "",
      name: null,
      type1: null,
      type2: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    },
    pokemon4: {
      sprite: "",
      name: null,
      type1: null,
      type2: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    },
    pokemon5: {
      name: null,
      sprite: "",
      type1: null,
      type2: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    },
    pokemon6: {
      name: null,
      sprite: "",
      type1: null,
      type2: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    },
  });
  const handleReset = () => {
    setTeam({
      pokemon1: {
        sprite: "",
        name: null,
        type1: null,
        type2: null,
        move1: null,
        move2: null,
        move3: null,
        move4: null,
      },
      pokemon2: {
        sprite: "",
        name: null,
        type1: null,
        type2: null,
        move1: null,
        move2: null,
        move3: null,
        move4: null,
      },
      pokemon3: {
        sprite: "",
        name: null,
        type1: null,
        type2: null,
        move1: null,
        move2: null,
        move3: null,
        move4: null,
      },
      pokemon4: {
        sprite: "",
        name: null,
        type1: null,
        type2: null,
        move1: null,
        move2: null,
        move3: null,
        move4: null,
      },
      pokemon5: {
        name: null,
        sprite: "",
        type1: null,
        type2: null,
        move1: null,
        move2: null,
        move3: null,
        move4: null,
      },
      pokemon6: {
        name: null,
        sprite: "",
        type1: null,
        type2: null,
        move1: null,
        move2: null,
        move3: null,
        move4: null,
      },
    });
  };
  const teamArray = Object.values(team);
  const addToTeam = (pokemonData) => {
    if (Object.values(team).some((pokemon) => !pokemon.name)) {
      const emptyPokemonIndex = Object.values(team).findIndex(
        (pokemon) => !pokemon.name
      );
      setTeam({
        ...team,
        [`pokemon${emptyPokemonIndex + 1}`]: {
          ...team[`pokemon${emptyPokemonIndex + 1}`],
          ...pokemonData,
        },
      });
      setMessage(true);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setMessage(false);
          setFadeOut(false);
        }, 500);
      }, 1000);
    } else {
      setWarning(true); // Show warning if team is full
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setWarning(false);
          setFadeOut(false);
        }, 500);
      }, 3000);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setTop(true);
      } else {
        setTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setWarning(false);
          setFadeOut(false);
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setMessage(false);
          setFadeOut(false);
        }, 500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <>
      {teamArray.map((pokemon, index) => (
        <div key={index} className="selected-pokemon-cont">
          <img
            src={
              pokemon.sprite
                ? pokemon.sprite
                : "https://i.imgur.com/Q4GbDpd.png"
            }
            alt={pokemon.sprite ? pokemon.name : "pokemon egg"}
            className={!pokemon.sprite ? "egg-sprites" : "selected-sprites"}
          />
          <button className="shiny">Shiny</button>
          <h2 className="pokemon-name">
            {pokemon.name
              ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              : "???"}
          </h2>
          <p className={pokemon.type1 ? `type ${pokemon.type1}` : ""}>
            {pokemon.type1
              ? pokemon.type1.charAt(0).toUpperCase() + pokemon.type1.slice(1)
              : ""}
          </p>
          <p className={pokemon.type2 ? `type ${pokemon.type2}` : ""}>
            {pokemon.type2
              ? pokemon.type2.charAt(0).toUpperCase() + pokemon.type2.slice(1)
              : ""}
          </p>
          <button className="edit-pokemon-button">Edit Pokemon</button>
        </div>
      ))}
      <button className="team-analysis-button">Show Team Analysis</button>
      <button className="reset-team-button" onClick={handleReset}>
        Reset Team
      </button>
      <div id="line"></div>
      <div id="filter">{/* filter check box goes here */}</div>

      <div id="pokemonlist">
        <Pokemon addToTeam={addToTeam} />
      </div>
      {warning && (
        <div className={`warning-popup ${fadeOut ? "hide" : "show"}`}>
          Team is already full! Delete a pokemon to make room.
        </div>
      )}
      {message && (
        <div className={`warning-popup ${fadeOut ? "hide" : "show"}`}>
          Pokemon added to team!
        </div>
      )}
      {top && (
        <div className="top" onClick={() => window.scrollTo(0, 0)}>
          <KeyboardDoubleArrowUpIcon className="arrow" />
        </div>
      )}
    </>
  );
}
export default TeamBuilder;

import { useState } from "react";
import Pokemon from "./Pokemon";

function TeamBuilder() {
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

  const teamArray = Object.values(team);
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
            className="selected-sprites"
          />
          <button className="shiny">Shiny</button>
          <h2>{pokemon.name ? pokemon.name : "???"}</h2>
          <h2>
            {pokemon.type1 ? pokemon.type1 : pokemon.type2 ? pokemon.type2 : ""}
          </h2>
          <button className="edit-pokemon-button">Edit Pokemon</button>
        </div>
      ))}
      <button className="team-analysis-button">Show Team Analysis</button>
      {/* make some sort of break here */}
      <div id="line"></div>
      <div id="filter">{/* filter check box goes here */}</div>
      <div id="searchbar">{/* <input type="text" /> searchbar */}</div>
      <div id="pokemonlist">
        <Pokemon />
      </div>
    </>
  );
}
export default TeamBuilder;

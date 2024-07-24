import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import teams from "../utils/recTeams";
import { useNavigate } from "react-router";

const RecommendedTeamsPage = () => {
  const [selectedRecTeam, setSelectedRecTeam] = useState(null);
  const [showPokeInfo, setShowPokeInfo] = useState(true);
  const navigate = useNavigate();

  const handleTeamClick = (generation) => {
    setSelectedRecTeam(generation);
    setShowPokeInfo(generation !== "1");
  };

  const getTeamFromLocalStorage = () => {
    const teamData = window.localStorage.getItem(`team${selectedRecTeam}`);
    if (teamData) {
      try {
        return JSON.parse(teamData);
      } catch (err) {
        console.error("Error parsing team data: ", err);
        window.localStorage.removeItem(`team${selectedRecTeam}`);
      }
    }
    return {
      pokemon1: {},
      pokemon2: {},
      pokemon3: {},
      pokemon4: {},
      pokemon5: {},
      pokemon6: {},
    };
  };

  const [team, setTeam] = useState(getTeamFromLocalStorage());

  useEffect(() => {
    const updatedTeam = getTeamFromLocalStorage();
    setTeam(updatedTeam);
  }, [selectedRecTeam]);

  useEffect(() => {
    console.log(team);
  }, [team]);

  const clearSelectedRecTeam = () => {
    setSelectedRecTeam(null);
  };

  const addToTeam = async (pokemonData, index) => {
    try {
      const updatedTeam = JSON.parse(
        window.localStorage.getItem(`team${selectedRecTeam}`)
      ) || {
        pokemon1: {},
        pokemon2: {},
        pokemon3: {},
        pokemon4: {},
        pokemon5: {},
        pokemon6: {},
      };
      const teamCopy = { ...updatedTeam };
      teamCopy[`pokemon${index + 1}`] = {
        ...teamCopy[`pokemon${index + 1}`],
        ...pokemonData,
      };
      window.localStorage.setItem(
        `team${selectedRecTeam}`,
        JSON.stringify(teamCopy)
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="teams-container">
      <h1>Recommended Pokémon Teams</h1>
      <div className="teams">
        <div className="team-selection">
          {Object.keys(teams).map((generation, index) => (
            <div key={index} className="team-card">
              <h3>Generation {index + 1}</h3>
              <img
                src={teams[generation].teamImage}
                alt={`Generation ${index + 1} Pokémon Team`}
                onClick={() => handleTeamClick(generation)}
                className="team-image"
              />
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={selectedRecTeam ? true : false}
        onClose={clearSelectedRecTeam}
        aria-labelledby="team-modal-title"
        aria-describedby="team-modal-description"
        className="Rec-modal"
      >
        <div className="modal-content">
          {selectedRecTeam && (
            <>
              <div className="ModalButtons1st">
                <button
                  className="createTeamButton"
                  onClick={async () => {
                    const promises = teams[selectedRecTeam].pokemonList.map(
                      async (i, index) => {
                        const response = await fetch(`/api/pokemon/${i.id}`);
                        const ability = await response.json();
                        return addToTeam(
                          {
                            name: i.name,
                            id: i.id,
                            sprite: i.sprite,
                            shiny: i.shiny,
                            type1: i.type1.toLowerCase(),
                            type2: i.type2 ? i.type2.toLowerCase() : null,
                            move1: i.moveset[0],
                            move2: i.moveset[1],
                            move3: i.moveset[2],
                            move4: i.moveset[3],
                            held_item: i.item
                              ? {
                                  id: i.item_id,
                                  item_name: i.item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-"),
                                }
                              : null,
                            nature: i.nature
                              ? {
                                  id: i.nature_id,
                                  name: i.nature.toLowerCase(),
                                }
                              : null,
                            abilities: ability.abilities,
                          },
                          index
                        );
                      }
                    );

                    await Promise.all(promises);
                    navigate(`/teambuilder/gen/${selectedRecTeam}`);
                  }}
                >
                  Create Team
                </button>
                <button onClick={clearSelectedRecTeam} className="close-button">
                  Close
                </button>
              </div>
              <div className="pokemon-list">
                {teams[selectedRecTeam].pokemonList.map(
                  (pokemon, pokemonIndex) => (
                    <div key={pokemonIndex} className="pokemon-details">
                      <img src={pokemon.sprite_rec} />
                      <p>{pokemon.name}</p>
                      <div className="pokemon-type">
                        <p
                          className={
                            pokemon.type1
                              ? `type ${
                                  pokemon.type1.charAt(0).toLowerCase() +
                                  pokemon.type1.slice(1)
                                }`
                              : ""
                          }
                        >
                          {pokemon.type1}{" "}
                        </p>
                        <p
                          className={
                            pokemon.type2
                              ? `type ${
                                  pokemon.type2.charAt(0).toLowerCase() +
                                  pokemon.type2.slice(1)
                                }`
                              : ""
                          }
                        >
                          {pokemon.type2}{" "}
                        </p>
                      </div>
                      {showPokeInfo && (
                        <div className="Poke-info">
                          {pokemon.ability && <p>Ability: {pokemon.ability}</p>}
                          {pokemon.nature && <p>Nature: {pokemon.nature}</p>}
                          {pokemon.item && <p>Held item: {pokemon.item}</p>}
                          {pokemon.Evs && <p>Evs: {pokemon.Evs}</p>}
                        </div>
                      )}
                      <div className="moveset">
                        <div className="left-moves">
                          <p>{pokemon.moveset[0]}</p>
                          <p>{pokemon.moveset[1]}</p>
                        </div>
                        <div className="right-moves">
                          <p>{pokemon.moveset[2]}</p>
                          <p>{pokemon.moveset[3]}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
          <div className="media-center">
            <button onClick={clearSelectedRecTeam} className="Return-button">
              Return
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecommendedTeamsPage;

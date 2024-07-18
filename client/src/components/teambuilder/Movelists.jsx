import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Movelists({ info, gen }) {
  const [movelist, setMovelist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moveGenCheck, setMoveGenCheck] = useState([]);
  const [warning, setWarning] = useState(false);
  const [warning2, setWarning2] = useState(false);
  const [message, setMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const movesToAdd = [];

  const getTeamFromLocalStorage = () => {
    const teamData = window.localStorage.getItem(`team${gen}`);
    if (teamData) {
      try {
        return JSON.parse(teamData);
      } catch (err) {
        console.error("Error parsing team data: ", err);
        window.localStorage.removeItem(`team${gen}`);
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

  const team = getTeamFromLocalStorage();

  useEffect(() => {
    setLoading(true);
    if (info) {
      const fetchMoves = async () => {
        try {
          let ids = info.id;
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${ids}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch moves...");
          }
          const moves = await response.json();

          const generations = [
            "generation-i",
            "generation-ii",
            "generation-iii",
            "generation-iv",
            "generation-v",
            "generation-vi",
            "generation-vii",
            "generation-viii",
            "generation-ix",
          ];

          const moveGen = generations.slice(0, parseInt(gen));

          if (info.id <= 151) {
            setMoveGenCheck([
              "generation-i",
              "generation-ii",
              "generation-iii",
              "generation-iv",
              "generation-v",
              "generation-vi",
              "generation-vii",
              "generation-viii",
              "generation-ix",
            ]);
          } else if (info.id > 151 && info.id <= 251) {
            setMoveGenCheck([
              "generation-ii",
              "generation-iii",
              "generation-iv",
              "generation-v",
              "generation-vi",
              "generation-vii",
              "generation-viii",
              "generation-ix",
            ]);
          } else if (info.id > 251 && info.id <= 386) {
            setMoveGenCheck([
              "generation-iii",
              "generation-iv",
              "generation-v",
              "generation-vi",
              "generation-vii",
              "generation-viii",
              "generation-ix",
            ]);
          } else if (info.id > 386 && info.id <= 493) {
            setMoveGenCheck([
              "generation-iv",
              "generation-v",
              "generation-vi",
              "generation-vii",
              "generation-viii",
              "generation-ix",
            ]);
          } else if (info.id > 493 && info.id <= 649) {
            setMoveGenCheck([
              "generation-v",
              "generation-vi",
              "generation-vii",
              "generation-viii",
              "generation-ix",
            ]);
          } else if (info.id > 649 && info.id <= 721) {
            setMoveGenCheck([
              "generation-vi",
              "generation-vii",
              "generation-viii",
              "generation-ix",
            ]);
          } else if (info.id > 721 && info.id <= 809) {
            setMoveGenCheck([
              "generation-vii",
              "generation-viii",
              "generation-ix",
            ]);
          } else if (info.id > 809 && info.id <= 905) {
            setMoveGenCheck(["generation-viii", "generation-ix"]);
          } else if (info.id > 905 && info.id <= 1025) {
            setMoveGenCheck(["generation-ix"]);
          }

          const generationGames = {
            1: ["red-blue", "yellow"],
            2: ["gold-silver", "crystal"],
            3: ["ruby-sapphire", "emerald"],
            4: ["diamond-pearl", "platinum"],
            5: ["black-white", "black-2-white-2"],
            6: ["x-y"],
            7: ["sun-moon", "ultra-sun-ultra-moon"],
            8: ["sword-shield"],
            9: ["scarlet-violet"],
          };

          let moveGen2 = generationGames[gen];

          for (const i of moves.moves) {
            const fetchMoveDet = await fetch(i.move.url);
            if (!fetchMoveDet.ok) {
              throw new Error("Failed to fetch move details");
            }
            const moveDet = await fetchMoveDet.json();
            const findGenIndex = i.version_group_details.findIndex((det) =>
              moveGen2.includes(det.version_group.name)
            );

            const existingMoveIndex = movesToAdd.findIndex(
              (move) => move.name === moveDet.name
            );

            if (
              moveGen.includes(moveDet.generation.name.toLowerCase()) &&
              findGenIndex !== -1 &&
              existingMoveIndex === -1
            ) {
              const findGen = i.version_group_details[findGenIndex];
              movesToAdd.push({
                name: moveDet.name,
                move_learn_method: findGen.move_learn_method.name,
                level_learned: findGen.level_learned_at,
                accuracy: moveDet.accuracy,
                damage_class: moveDet.damage_class.name,
                power: moveDet.power,
                pp: moveDet.pp,
                type: moveDet.type.name,
                priority: moveDet.priority,
                effect: moveDet.effect_entries.map((entry) =>
                  Array.isArray(entry.effect)
                    ? entry.effect.join(", ")
                    : entry.effect
                ),
              });
            }
          }
          const uniqueMoves = [...new Set(movesToAdd)];
          const uniqueMovesArray = Array.from(uniqueMoves);
          setMovelist(uniqueMovesArray);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      fetchMoves();
    }
  }, [info, gen]);

  const addMoves = (moveData) => {
    if (Object.values(team).some((pokemon) => pokemon.name)) {
      const pokemonIndex = Object.values(team).findIndex(
        (pokemon) => pokemon.name === info.name
      );

      if (!team[`pokemon${pokemonIndex + 1}`].move1) {
        const updatedTeam = {
          ...team,
          [`pokemon${pokemonIndex + 1}`]: {
            ...team[`pokemon${pokemonIndex + 1}`],
            move1: moveData,
          },
        };
        window.localStorage.setItem(`team${gen}`, JSON.stringify(updatedTeam));
        setMessage(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setMessage(false);
            setFadeOut(false);
          }, 500);
        }, 1000);
      } else if (!team[`pokemon${pokemonIndex + 1}`].move2) {
        const updatedTeam = {
          ...team,
          [`pokemon${pokemonIndex + 1}`]: {
            ...team[`pokemon${pokemonIndex + 1}`],
            move2: moveData,
          },
        };
        window.localStorage.setItem(`team${gen}`, JSON.stringify(updatedTeam));
        setMessage(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setMessage(false);
            setFadeOut(false);
          }, 500);
        }, 1000);
      } else if (!team[`pokemon${pokemonIndex + 1}`].move3) {
        const updatedTeam = {
          ...team,
          [`pokemon${pokemonIndex + 1}`]: {
            ...team[`pokemon${pokemonIndex + 1}`],
            move3: moveData,
          },
        };
        window.localStorage.setItem(`team${gen}`, JSON.stringify(updatedTeam));
        setMessage(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setMessage(false);
            setFadeOut(false);
          }, 500);
        }, 1000);
      } else if (!team[`pokemon${pokemonIndex + 1}`].move4) {
        const updatedTeam = {
          ...team,
          [`pokemon${pokemonIndex + 1}`]: {
            ...team[`pokemon${pokemonIndex + 1}`],
            move4: moveData,
          },
        };
        window.localStorage.setItem(`team${gen}`, JSON.stringify(updatedTeam));
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
    }
    if (!Object.values(team).some((pokemon) => pokemon.name)) {
      setWarning2(true); // Show warning that pokemon is not on team
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setWarning2(false);
          setFadeOut(false);
        }, 500);
      }, 3000);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading-circle">
          <CircularProgress />
        </div>
      ) : movelist.length === 0 ? (
        <h2 className="no-pokemon">
          Pokemon does not exist in this generation!
        </h2>
      ) : (
        <>
          <div className="other-gens">
            <strong>Other generations: </strong>
            <ul className="list-of-gens">
              {moveGenCheck.includes("generation-i") && (
                <Link to={`/gen/1/${info.id}`} className="link">
                  <li className={gen === "1" ? "gen-list bold" : "gen-list"}>
                    1
                  </li>
                </Link>
              )}
              {moveGenCheck.includes("generation-ii") && (
                <Link to={`/gen/2/${info.id}`} className="link">
                  <li className={gen === "2" ? "gen-list bold" : "gen-list"}>
                    2
                  </li>
                </Link>
              )}
              {moveGenCheck.includes("generation-iii") && (
                <Link to={`/gen/3/${info.id}`} className="link">
                  <li className={gen === "3" ? "gen-list bold" : "gen-list"}>
                    3
                  </li>
                </Link>
              )}
              {moveGenCheck.includes("generation-iv") && (
                <Link to={`/gen/4/${info.id}`} className="link">
                  <li className={gen === "4" ? "gen-list bold" : "gen-list"}>
                    4
                  </li>
                </Link>
              )}
              {moveGenCheck.includes("generation-v") && (
                <Link to={`/gen/5/${info.id}`} className="link">
                  <li className={gen === "5" ? "gen-list bold" : "gen-list"}>
                    5
                  </li>
                </Link>
              )}
              {moveGenCheck.includes("generation-vi") && (
                <Link to={`/gen/6/${info.id}`} className="link">
                  <li className={gen === "6" ? "gen-list bold" : "gen-list"}>
                    6
                  </li>
                </Link>
              )}
              {moveGenCheck.includes("generation-vii") && (
                <Link to={`/gen/7/${info.id}`} className="link">
                  <li className={gen === "7" ? "gen-list bold" : "gen-list"}>
                    7
                  </li>
                </Link>
              )}
              {moveGenCheck.includes("generation-viii") && (
                <Link to={`/gen/8/${info.id}`} className="link">
                  <li className={gen === "8" ? "gen-list bold" : "gen-list"}>
                    8
                  </li>
                </Link>
              )}
              {moveGenCheck.includes("generation-ix") && (
                <Link to={`/gen/9/${info.id}`} className="link">
                  <li className={gen === "9" ? "gen-list bold" : "gen-list"}>
                    9
                  </li>
                </Link>
              )}
            </ul>
          </div>

          <div className="moves">
            <div className="left-side">
              <div className="level-up-moves">
                <h3 className="move-table-title">Moves Learnt By Level Up</h3>
                <table className="move-table">
                  <thead>
                    <tr>
                      <th>Lv.</th>
                      <th>Move</th>
                      <th>Type</th>
                      <th>Cat.</th>
                      <th>Power</th>
                      <th>Acc.</th>
                      <th>Add/Rem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movelist &&
                      movelist
                        .filter((i) => i.move_learn_method === "level-up")
                        .sort((a, b) => a.level_learned - b.level_learned)
                        .map((i, index) => (
                          <tr key={index}>
                            <td>{i.level_learned}</td>
                            <td>{i.name}</td>
                            <td>
                              <p className={`type ${i.type}`}>
                                {i.type.charAt(0).toUpperCase() +
                                  i.type.slice(1)}
                              </p>
                            </td>
                            <td>
                              {i.damage_class === "status" ? (
                                <img
                                  src="https://img.pokemondb.net/images/icons/move-status.png"
                                  alt="status"
                                  title="Status"
                                />
                              ) : i.damage_class === "physical" ? (
                                <img
                                  src="https://img.pokemondb.net/images/icons/move-physical.png"
                                  alt="physical"
                                  title="Physical"
                                />
                              ) : (
                                <img
                                  src="https://img.pokemondb.net/images/icons/move-special.png"
                                  alt="special"
                                  title="Special"
                                />
                              )}
                            </td>
                            <td>{i.power ? i.power : "-"}</td>
                            <td>{i.accuracy ? i.accuracy : "-"}</td>
                            <td>
                              <button onClick={() => addMoves(i.name)}>
                                Add
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
              <div className="tutor-moves">
                {movelist &&
                  movelist.some((i) => i.move_learn_method === "tutor") && (
                    <>
                      <h3 className="move-table-title">Tutor Moves</h3>
                      <table className="move-table">
                        <thead>
                          <tr>
                            <th>Move</th>
                            <th>Type</th>
                            <th>Cat.</th>
                            <th>Power</th>
                            <th>Acc.</th>
                            <th>Add/Rem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {movelist &&
                            movelist
                              .filter((i) => i.move_learn_method === "tutor")
                              .map((i, index) => (
                                <tr key={index}>
                                  <td>{i.name}</td>
                                  <td>
                                    <p className={`type ${i.type}`}>
                                      {i.type.charAt(0).toUpperCase() +
                                        i.type.slice(1)}
                                    </p>
                                  </td>
                                  <td>
                                    {i.damage_class === "status" ? (
                                      <img
                                        src="https://img.pokemondb.net/images/icons/move-status.png"
                                        alt="status"
                                        title="Status"
                                      />
                                    ) : i.damage_class === "physical" ? (
                                      <img
                                        src="https://img.pokemondb.net/images/icons/move-physical.png"
                                        alt="physical"
                                        title="Physical"
                                      />
                                    ) : (
                                      <img
                                        src="https://img.pokemondb.net/images/icons/move-special.png"
                                        alt="special"
                                        title="Special"
                                      />
                                    )}
                                  </td>
                                  <td>{i.power ? i.power : "-"}</td>
                                  <td>{i.accuracy ? i.accuracy : "-"}</td>
                                  <td>
                                    <button onClick={() => addMoves(i.name)}>
                                      Add
                                    </button>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </>
                  )}
              </div>
            </div>
            <div className="right-side">
              <div className="tm-moves">
                <h3 className="move-table-title">Moves Learnt By TM/HM</h3>
                <table className="move-table">
                  <thead>
                    <tr>
                      <th>Move</th>
                      <th>Type</th>
                      <th>Cat.</th>
                      <th>Power</th>
                      <th>Acc.</th>
                      <th>Add/Rem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movelist &&
                      movelist
                        .filter((i) => i.move_learn_method === "machine")
                        .map((i, index) => (
                          <tr key={index}>
                            <td>{i.name}</td>
                            <td>
                              <p className={`type ${i.type}`}>
                                {i.type.charAt(0).toUpperCase() +
                                  i.type.slice(1)}
                              </p>
                            </td>
                            <td>
                              {i.damage_class === "status" ? (
                                <img
                                  src="https://img.pokemondb.net/images/icons/move-status.png"
                                  alt="status"
                                  title="Status"
                                />
                              ) : i.damage_class === "physical" ? (
                                <img
                                  src="https://img.pokemondb.net/images/icons/move-physical.png"
                                  alt="physical"
                                  title="Physical"
                                />
                              ) : (
                                <img
                                  src="https://img.pokemondb.net/images/icons/move-special.png"
                                  alt="special"
                                  title="Special"
                                />
                              )}
                            </td>
                            <td>{i.power ? i.power : "-"}</td>
                            <td>{i.accuracy ? i.accuracy : "-"}</td>
                            <td>
                              <button onClick={() => addMoves(i.name)}>
                                Add
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      {warning && (
        <div className={`warning-popup ${fadeOut ? "hide" : "show"}`}>
          Movelist full! Go to teambuilder page to delete moves!
        </div>
      )}
      {warning2 && (
        <div className={`warning-popup ${fadeOut ? "hide" : "show"}`}>
          Pokemon not on team!
        </div>
      )}
      {message && (
        <div className={`warning-popup ${fadeOut ? "hide" : "show"}`}>
          Move added!
        </div>
      )}
    </>
  );
}
export default Movelists;

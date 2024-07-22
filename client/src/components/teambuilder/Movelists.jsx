import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";

function Movelists({ info, gen }) {
  const [movelist, setMovelist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moveGenCheck, setMoveGenCheck] = useState([]);
  const [warning, setWarning] = useState(false);
  const [warning2, setWarning2] = useState(false);
  const [message, setMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [openMove, setOpenMove] = useState(false);
  const [selectedMove, setSelectedMove] = useState(null);
  const generations = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"];
  const moveTypes = ["level-up", "egg", "tutor"];
  const romanToNumber = {
    i: 1,
    ii: 2,
    iii: 3,
    iv: 4,
    v: 5,
    vi: 6,
    vii: 7,
    viii: 8,
    ix: 9,
  };

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
          const response = await fetch(`/api/pokemon/${ids}`);
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
            3: ["ruby-sapphire", "emerald", "firered-leafgreen"],
            4: ["diamond-pearl", "platinum", "heartgold-soulsilver"],
            5: ["black-white", "black-2-white-2"],
            6: ["x-y", "omega-ruby-alpha-sapphire"],
            7: ["sun-moon", "ultra-sun-ultra-moon"],
            8: ["sword-shield"],
            9: ["scarlet-violet"],
          };

          let moveGen2 = generationGames[gen];

          for (const i of moves.moves) {
            const findGenIndex = i.version_details.findIndex((det) =>
              moveGen2.includes(det.gen)
            );
            const findGenIndexMachine = i.move.machine.findIndex((det) =>
              moveGen2.includes(det.gen)
            );

            const existingMoveIndex = movesToAdd.findIndex(
              (move) => move.name === i.name
            );

            if (
              moveGen.includes(i.move.gens) &&
              findGenIndex !== -1 &&
              existingMoveIndex === -1
            ) {
              const findGen = i.version_details[findGenIndex];
              const findTmGen =
                i.move.machine && i.move.machine[findGenIndexMachine];
              i.move.short_effect;
              movesToAdd.push({
                name: i.name,
                move_learn_method: findGen.learn_method,
                level_learned: findGen.level_learned,
                accuracy: i.move.accuracy,
                damage_class: i.move.damage_class,
                power: i.move.power,
                pp: i.move.pp,
                type: i.move.type,
                priority: i.move.priority,
                effect: i.move.effect,
                short_effect: i.move.short_effect,
                target: i.move.target,
                machine: findTmGen && findTmGen.item_name,
                prev: i.move.prevMoves && i.move.prevMoves,
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

      const addMoveToTeam = (moveNum) => {
        const updatedTeam = {
          ...team,
          [`pokemon${pokemonIndex + 1}`]: {
            ...team[`pokemon${pokemonIndex + 1}`],
            [`move${moveNum}`]: (
              moveData.charAt(0).toUpperCase() + moveData.slice(1)
            )
              .replace(/-/g, " ")
              .replace(/(\s\w)|(-\w)/g, (match) => match.toUpperCase()),
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
      };

      for (let i = 1; i <= 4; i++) {
        if (!team[`pokemon${pokemonIndex + 1}`][`move${i}`]) {
          addMoveToTeam(i);
          return;
        }
      }

      setWarning(true); // Show warning if team is full
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setWarning(false);
          setFadeOut(false);
        }, 500);
      }, 3000);
    } else {
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

  const handleOpen = (move) => {
    setSelectedMove(move);
    setOpenMove(true);
  };
  const handleClose = () => {
    setSelectedMove(null);
    setOpenMove(false);
  };

  // useEffect(() => {
  //   console.log(movelist);
  // }, [movelist]);

  return (
    <>
      <div className="other-gens">
        <strong>Other generations: </strong>
        <ul className="list-of-gens">
          {generations.map((generation, index) => {
            const generationNumber = romanToNumber[generation];
            return (
              moveGenCheck.includes(`generation-${generation}`) && (
                <Link
                  to={`/gen/${generationNumber}/${info.id}`}
                  className="link"
                  key={index}
                >
                  <li
                    className={
                      gen === generationNumber.toString()
                        ? "gen-list bold"
                        : "gen-list"
                    }
                  >
                    {generationNumber}
                  </li>
                </Link>
              )
            );
          })}
        </ul>
      </div>
      {loading ? (
        <div className="loading-circle">
          <CircularProgress />
        </div>
      ) : movelist.length === 0 ? (
        <h2 className="no-pokemon">
          Pokemon is unavailable in this generation
        </h2>
      ) : (
        <div className="moves">
          <div className="moves-map">
            {moveTypes.map((moveType) => (
              <div className="left-side" key={moveType}>
                <div className="left-tables">
                  <h3 className="move-table-title">
                    {moveType === "level-up"
                      ? "Moves Learnt By Level Up"
                      : moveType === "egg"
                      ? "Egg Moves"
                      : moveType === "tutor" && "Tutor Moves"}
                  </h3>
                  <table className="move-table">
                    <thead>
                      <tr>
                        {moveType === "level-up" && <th>Lv.</th>}
                        <th>Move</th>
                        <th>Type</th>
                        <th>Cat.</th>
                        <th>Power</th>
                        <th>Acc.</th>
                        <th>Add</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movelist &&
                        movelist
                          .filter((i) => i.move_learn_method === moveType)
                          .sort((a, b) => {
                            return moveType === "level-up"
                              ? a.level_learned - b.level_learned
                              : moveType === "machine"
                              ? (() => {
                                  const typeA = a.machine.slice(0, 2);
                                  const numA = parseInt(a.machine.slice(2));
                                  const typeB = b.machine.slice(0, 2);
                                  const numB = parseInt(b.machine.slice(2));
                                  if (typeA !== typeB) {
                                    return typeA === "hm" ? -1 : 1;
                                  } else {
                                    return numA - numB;
                                  }
                                })()
                              : null;
                          })
                          .map((i, index) => (
                            <tr key={index}>
                              {moveType === "level-up" &&
                              i.level_learned === 0 ? (
                                <td>On Evo</td>
                              ) : moveType === "level-up" ? (
                                <td>{i.level_learned}</td>
                              ) : (
                                <td
                                  title={i.short_effect}
                                  onClick={() => handleOpen(i)}
                                  className="move-hover"
                                >
                                  {(
                                    i.name.charAt(0).toUpperCase() +
                                    i.name.slice(1)
                                  )
                                    .replace(/-/g, " ")
                                    .replace(/(\s\w)|(-\w)/g, (match) =>
                                      match.toUpperCase()
                                    )}
                                </td>
                              )}
                              {moveType === "level-up" ? (
                                <td
                                  title={i.short_effect}
                                  onClick={() => handleOpen(i)}
                                  className="move-hover"
                                >
                                  {(
                                    i.name.charAt(0).toUpperCase() +
                                    i.name.slice(1)
                                  )
                                    .replace(/-/g, " ")
                                    .replace(/(\s\w)|(-\w)/g, (match) =>
                                      match.toUpperCase()
                                    )}
                                </td>
                              ) : (
                                <td>
                                  <p className={`type ${i.type}`}>
                                    {i.type.charAt(0).toUpperCase() +
                                      i.type.slice(1)}
                                  </p>
                                </td>
                              )}
                              {moveType === "level-up" ? (
                                <td>
                                  <p className={`type ${i.type}`}>
                                    {i.type.charAt(0).toUpperCase() +
                                      i.type.slice(1)}
                                  </p>
                                </td>
                              ) : (
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
                              )}
                              {moveType === "level-up" ? (
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
                              ) : (
                                <td>{i.power ? i.power : "-"}</td>
                              )}
                              {moveType === "level-up" ? (
                                <td>{i.power ? i.power : "-"}</td>
                              ) : (
                                <td>{i.accuracy ? i.accuracy : "-"}</td>
                              )}
                              {moveType === "level-up" ? (
                                <td>{i.accuracy ? i.accuracy : "-"}</td>
                              ) : (
                                <td>
                                  <button
                                    className="add-button"
                                    onClick={() => addMoves(i.name)}
                                  >
                                    Add
                                  </button>
                                </td>
                              )}
                              {moveType === "level-up" && (
                                <td>
                                  <button
                                    className="add-button"
                                    onClick={() => addMoves(i.name)}
                                  >
                                    Add
                                  </button>
                                </td>
                              )}
                              {selectedMove === i && (
                                <Modal
                                  open={openMove}
                                  onClose={handleClose}
                                  className="move-box-modal"
                                >
                                  <div className="move-box">
                                    <h1 className="moves-header">
                                      {(
                                        i.name.charAt(0).toUpperCase() +
                                        i.name.slice(1)
                                      )
                                        .replace(/-/g, " ")
                                        .replace(/(\s\w)|(-\w)/g, (match) =>
                                          match.toUpperCase()
                                        )}
                                      :
                                    </h1>
                                    <div className="effect-box">
                                      <div className="effect-box-left">
                                        <h3 className="move-details">
                                          Effect: {i.effect}
                                        </h3>
                                        <h3 className="move-details">
                                          Type:{" "}
                                          {i.type.charAt(0).toUpperCase() +
                                            i.type.slice(1)}
                                        </h3>
                                        <h3 className="move-details">
                                          Category:{" "}
                                          {i.damage_class
                                            .charAt(0)
                                            .toUpperCase() +
                                            i.damage_class.slice(1)}
                                        </h3>
                                        <h3 className="move-details">
                                          Power: {i.power}
                                        </h3>
                                        <h3 className="move-details">
                                          Accuracy: {i.accuracy}
                                        </h3>
                                        <h3 className="move-details">
                                          PP: {i.pp}
                                        </h3>
                                        <h3 className="move-details">
                                          Priority:{" "}
                                          {i.priority === 0 ? "No" : "Yes"}
                                        </h3>
                                        <h3 className="move-details">
                                          Target:{" "}
                                          {(
                                            i.target.charAt(0).toUpperCase() +
                                            i.target.slice(1)
                                          )
                                            .replace(/-/g, " ")
                                            .replace(/(\s\w)|(-\w)/g, (match) =>
                                              match.toUpperCase()
                                            )}
                                        </h3>
                                      </div>
                                      <div className="effect-box-right">
                                        <h3 className="move-details changes">
                                          Changes:{" "}
                                          {i.prev && i.prev.length > 0
                                            ? i.prev.map((p, index) => (
                                                <div
                                                  className="hori"
                                                  key={p.id}
                                                >
                                                  <span
                                                    key={index}
                                                    className="span"
                                                  >
                                                    Until {p.gen}:{" "}
                                                    <p className="span-p">
                                                      {p.power &&
                                                        `Power: ${p.power}`}
                                                      {p.accuracy &&
                                                        ` Accuracy: ${p.accuracy}`}
                                                      {p.pp && ` PP: ${p.pp}`}
                                                      {p.type &&
                                                        ` Type: ${
                                                          p.type
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                          p.type.slice(1)
                                                        }`}
                                                      {p.effect_chance &&
                                                        ` Effect Chance: ${p.effect_chance}`}
                                                      {!p.power &&
                                                        !p.accuracy &&
                                                        !p.pp &&
                                                        !p.type &&
                                                        !p.effect_chance &&
                                                        `Information unavailable`}
                                                    </p>
                                                  </span>
                                                </div>
                                              ))
                                            : "None"}
                                        </h3>
                                      </div>
                                    </div>
                                    <button
                                      className="remove-button close"
                                      onClick={() => handleClose()}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </Modal>
                              )}
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <div className="machines">
            <div className="right-side">
              <div>
                <h3 className="move-table-title">Moves Learnt By TM/HM</h3>
                <table className="move-table">
                  <thead>
                    <tr>
                      <th>TM/HM</th>
                      <th>Move</th>
                      <th>Type</th>
                      <th>Cat.</th>
                      <th>Power</th>
                      <th>Acc.</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movelist &&
                      movelist
                        .filter((i) => i.move_learn_method === "machine")
                        .sort((a, b) => {
                          const typeA = a.machine.slice(0, 2);
                          const numA = parseInt(a.machine.slice(2));
                          const typeB = b.machine.slice(0, 2);
                          const numB = parseInt(b.machine.slice(2));
                          if (typeA !== typeB) {
                            return typeA === "hm" ? -1 : 1;
                          } else {
                            return numA - numB;
                          }
                        })
                        .map((i, index) => (
                          <tr key={index}>
                            <td>{i.machine.toUpperCase()}</td>
                            <td
                              title={i.short_effect}
                              onClick={() => handleOpen(i)}
                              className="move-hover"
                            >
                              {(
                                i.name.charAt(0).toUpperCase() + i.name.slice(1)
                              )
                                .replace(/-/g, " ")
                                .replace(/(\s\w)|(-\w)/g, (match) =>
                                  match.toUpperCase()
                                )}
                            </td>
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
                              <button
                                className="add-button"
                                onClick={() => addMoves(i.name)}
                              >
                                Add
                              </button>
                            </td>
                            {selectedMove === i && (
                              <Modal
                                open={openMove}
                                onClose={handleClose}
                                className="move-box-modal"
                              >
                                <div className="move-box">
                                  <h1 className="moves-header">
                                    {(
                                      i.name.charAt(0).toUpperCase() +
                                      i.name.slice(1)
                                    )
                                      .replace(/-/g, " ")
                                      .replace(/(\s\w)|(-\w)/g, (match) =>
                                        match.toUpperCase()
                                      )}
                                    :
                                  </h1>
                                  <div className="effect-box">
                                    <div className="effect-box-left">
                                      <h3 className="move-details">
                                        Effect: {i.effect}
                                      </h3>
                                      <h3 className="move-details">
                                        Type:{" "}
                                        {i.type.charAt(0).toUpperCase() +
                                          i.type.slice(1)}
                                      </h3>
                                      <h3 className="move-details">
                                        Category:{" "}
                                        {i.damage_class
                                          .charAt(0)
                                          .toUpperCase() +
                                          i.damage_class.slice(1)}
                                      </h3>
                                      <h3 className="move-details">
                                        Power: {i.power}
                                      </h3>
                                      <h3 className="move-details">
                                        Accuracy: {i.accuracy}
                                      </h3>
                                      <h3 className="move-details">
                                        PP: {i.pp}
                                      </h3>
                                      <h3 className="move-details">
                                        Priority:{" "}
                                        {i.priority === 0 ? "No" : "Yes"}
                                      </h3>
                                      <h3 className="move-details">
                                        Target:{" "}
                                        {(
                                          i.target.charAt(0).toUpperCase() +
                                          i.target.slice(1)
                                        )
                                          .replace(/-/g, " ")
                                          .replace(/(\s\w)|(-\w)/g, (match) =>
                                            match.toUpperCase()
                                          )}
                                      </h3>
                                    </div>
                                    <div className="effect-box-right">
                                      <h3 className="move-details changes">
                                        Changes:{" "}
                                        {i.prev && i.prev.length > 0
                                          ? i.prev.map((p, index) => (
                                              <div className="hori" key={p.id}>
                                                <span
                                                  key={index}
                                                  className="span"
                                                >
                                                  Until {p.gen}:{" "}
                                                  <p className="span-p">
                                                    {p.power &&
                                                      `Power: ${p.power}`}
                                                    {p.accuracy &&
                                                      ` Accuracy: ${p.accuracy}`}
                                                    {p.pp && ` PP: ${p.pp}`}
                                                    {p.type &&
                                                      ` Type: ${
                                                        p.type
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                        p.type.slice(1)
                                                      }`}
                                                    {p.effect_chance &&
                                                      ` Effect Chance: ${p.effect_chance}`}
                                                    {!p.power &&
                                                      !p.accuracy &&
                                                      !p.pp &&
                                                      !p.type &&
                                                      !p.effect_chance &&
                                                      `Information unavailable`}
                                                  </p>
                                                </span>
                                              </div>
                                            ))
                                          : "None"}
                                      </h3>
                                    </div>
                                  </div>
                                  <button
                                    className="remove-button close"
                                    onClick={() => handleClose()}
                                  >
                                    Close
                                  </button>
                                </div>
                              </Modal>
                            )}
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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

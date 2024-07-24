import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Evolutions from "./Evolutions";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Movelists from "./Movelists";
import { Modal } from "@mui/material";

function SinglePokemon() {
  const params = useParams();
  const [info, setInfo] = useState(null);
  const [art, setArt] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [message, setMessage] = useState(false);
  const [warning, setWarning] = useState(false);
  const [open, setOpen] = useState(false);
  const [abilities, setAbilities] = useState({
    ability1: {},
    ability2: {},
    ability3: {},
  });

  const gen = params.genId;

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
    async function fetchPokemonInfo() {
      setLoading(true);
      const fetchPokemonData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon data...");
        }
        return response.json();
      };
      const fetchPokemonArt = async (url) => {
        const response2 = await fetch(url);
        if (!response2.ok) {
          throw new Error("Failed to fetch pokemon data...");
        }
        return response2.json();
      };
      try {
        const pokemonData = await fetchPokemonData(`/api/pokemon/${params.id}`);
        setInfo(pokemonData);
        const pokemonArt = await fetchPokemonArt(
          `https://pokeapi.co/api/v2/pokemon/${params.id}`
        );
        setArt(pokemonArt.sprites.other["official-artwork"].front_default);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonInfo();
  }, [params.id]);

  useEffect(() => {
    const fetchAbilityData = async () => {
      try {
        if (info && info.abilities) {
          const promises = info.abilities.map(async (i, index) => {
            const ability_response = await fetch(
              `/api/abilities/${i.ability_id}`
            );
            const abilityData = await ability_response.json();
            return { [`ability${index + 1}`]: abilityData };
          });

          const abilitiesData = await Promise.all(promises);
          const combinedAbilities = Object.assign({}, ...abilitiesData);
          setAbilities(combinedAbilities);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAbilityData();
  }, [info]);

  useEffect(() => {
    if (!loading && info) {
      setTotal(
        info.hp + info.atk + info.def + info.sp_atk + info.sp_def + info.speed
      );
    }
  }, [loading, info, abilities]);

  const addToTeam = (pokemonData) => {
    if (Object.values(team).some((pokemon) => !pokemon.name)) {
      const emptyPokemonIndex = Object.values(team).findIndex(
        (pokemon) => !pokemon.name
      );
      const updatedTeam = {
        ...team,
        [`pokemon${emptyPokemonIndex + 1}`]: {
          ...team[`pokemon${emptyPokemonIndex + 1}`],
          ...pokemonData,
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
  };

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
  }, [warning, message]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className="loading-circle">
          <CircularProgress />
        </div>
      ) : (
        info &&
        total && (
          <>
            <Modal open={open} onClose={handleClose}>
              {!loading && abilities.ability1[0] ? (
                <div className="ability-box">
                  <h1 className="ability-header">Abilities:</h1>
                  <h3 className="ability-effect">
                    {abilities.ability1[0].name.charAt(0).toUpperCase() +
                      abilities.ability1[0].name.slice(1)}
                    : {abilities.ability1[0].effect}
                  </h3>
                  {abilities.ability2 && abilities.ability2[0] && (
                    <h3
                      className={
                        abilities.ability3
                          ? "ability-effect"
                          : "ability-effect last-effect"
                      }
                    >
                      {abilities.ability2[0].name.charAt(0).toUpperCase() +
                        abilities.ability2[0].name.slice(1)}
                      : {abilities.ability2[0].effect}
                    </h3>
                  )}
                  {abilities.ability3 && abilities.ability3[0] && (
                    <h3 className="ability-effect last-effect">
                      {abilities.ability3[0].name.charAt(0).toUpperCase() +
                        abilities.ability3[0].name.slice(1)}
                      : {abilities.ability3[0].effect}
                    </h3>
                  )}
                  <button className="remove-button close" onClick={handleClose}>
                    Close
                  </button>
                </div>
              ) : (
                <p>Loading abilities...</p>
              )}
            </Modal>
            <div className="single-container">
              <div className="single-sprite">
                <div className="image-container">
                  <img
                    src="https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-png-images-4.png"
                    alt="pokeball"
                    className="pokeball"
                  />
                  <img src={art} alt={info.name} className="single-sprt" />
                </div>
                <div className="type-container">
                  <p
                    className={
                      !info.type2
                        ? `type-single ${info.type1}`
                        : `type ${info.type1}`
                    }
                  >
                    {info.type1.charAt(0).toUpperCase() + info.type1.slice(1)}
                  </p>
                  {info.type2 && (
                    <p className={`type ${info.type2}`}>
                      {info.type2.charAt(0).toUpperCase() + info.type2.slice(1)}
                    </p>
                  )}
                </div>
                <button
                  className="add-button-single"
                  onClick={() =>
                    addToTeam({
                      name: info.name,
                      id: info.id,
                      sprite: info.sprite,
                      shiny: info.shiny,
                      type1: info.type1,
                      type2: info.type2,
                      abilities: info.abilities,
                    })
                  }
                >
                  Add To Team
                </button>
              </div>
              <div className="single-info">
                <h1 className="sel-name">
                  {info.name.charAt(0).toUpperCase() + info.name.slice(1)}
                </h1>
                <h3 className="info">Pokemon ID: {info.id}</h3>
                <h3 className="info-abilities" onClick={() => handleOpen()}>
                  Abilities:{" "}
                  {info.abilities[0].name +
                    (info.abilities[0].is_hidden ? " (hidden)" : "")}
                  {info.abilities[1] &&
                    ", " +
                      info.abilities[1].name +
                      (info.abilities[1].is_hidden ? " (hidden)" : "")}
                  {info.abilities[2] &&
                    ", " +
                      info.abilities[2].name +
                      (info.abilities[2].is_hidden ? " (hidden)" : "")}
                </h3>
                <h3 className="info">Base Experience: {info.base_exp}</h3>
                <h3 className="info">Growth Rate: {info.growth_rate}</h3>
                <h3 className="info catch">Catch Rate: {info.catch_rate}</h3>
              </div>
              <div className="single-stats">
                <Link to={`/teambuilder/gen/${params.genId}`} className="link">
                  <button className="back-button">Back to Pokemon List</button>
                </Link>
                <h2>Base Stats</h2>
                <table className="stat-table">
                  <tbody>
                    <tr>
                      <th>HP</th>
                      <td>{info.hp}</td>
                      <td>
                        <div
                          className={
                            info.hp < 30
                              ? "bar-chart rank1"
                              : info.hp < 60
                              ? "bar-chart rank2"
                              : info.hp < 90
                              ? "bar-chart rank3"
                              : info.hp < 120
                              ? "bar-chart rank4"
                              : info.hp < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.hp * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Attack</th>
                      <td>{info.atk}</td>
                      <td>
                        <div
                          className={
                            info.atk < 30
                              ? "bar-chart rank1"
                              : info.atk < 60
                              ? "bar-chart rank2"
                              : info.atk < 90
                              ? "bar-chart rank3"
                              : info.atk < 120
                              ? "bar-chart rank4"
                              : info.atk < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.atk * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Defense</th>
                      <td>{info.def}</td>
                      <td>
                        <div
                          className={
                            info.def < 30
                              ? "bar-chart rank1"
                              : info.def < 60
                              ? "bar-chart rank2"
                              : info.def < 90
                              ? "bar-chart rank3"
                              : info.def < 120
                              ? "bar-chart rank4"
                              : info.def < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.def * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Sp. Atk</th>
                      <td>{info.sp_atk}</td>
                      <td>
                        <div
                          className={
                            info.sp_atk < 30
                              ? "bar-chart rank1"
                              : info.sp_atk < 60
                              ? "bar-chart rank2"
                              : info.sp_atk < 90
                              ? "bar-chart rank3"
                              : info.sp_atk < 120
                              ? "bar-chart rank4"
                              : info.sp_atk < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.sp_atk * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Sp. Def</th>
                      <td>{info.sp_def}</td>
                      <td>
                        <div
                          className={
                            info.sp_def < 30
                              ? "bar-chart rank1"
                              : info.sp_def < 60
                              ? "bar-chart rank2"
                              : info.sp_def < 90
                              ? "bar-chart rank3"
                              : info.sp_def < 120
                              ? "bar-chart rank4"
                              : info.sp_def < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.sp_def * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Speed</th>
                      <td>{info.speed}</td>
                      <td>
                        <div
                          className={
                            info.speed < 30
                              ? "bar-chart rank1"
                              : info.speed < 60
                              ? "bar-chart rank2"
                              : info.speed < 90
                              ? "bar-chart rank3"
                              : info.speed < 120
                              ? "bar-chart rank4"
                              : info.speed < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.speed * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <td>{total}</td>
                      <td>
                        <div
                          className={
                            total < 125
                              ? "bar-chart rank1"
                              : total < 250
                              ? "bar-chart rank2"
                              : total < 375
                              ? "bar-chart rank3"
                              : total < 500
                              ? "bar-chart rank4"
                              : total < 625
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${total / 2}px` }}
                        ></div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <Evolutions />
            <Movelists info={info} gen={gen} />
            {warning && (
              <div className={`warning-popup ${fadeOut ? "hide" : "show"}`}>
                Team is already full! Delete a pokemon to make room.
              </div>
            )}
            {message && (
              <div className={`warning-popup ${fadeOut ? "hide" : "show"}`}>
                Pokemon added to generation {gen} team!
              </div>
            )}
          </>
        )
      )}
    </>
  );
}
export default SinglePokemon;

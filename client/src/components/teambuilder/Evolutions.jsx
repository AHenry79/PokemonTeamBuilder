import EastIcon from "@mui/icons-material/East";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import NorthIcon from "@mui/icons-material/North";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import SouthIcon from "@mui/icons-material/South";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import wurmp from "../utils/wurmp";
import burm from "../utils/burm";

function Evolutions() {
  const params = useParams();
  const [sprites1, setSprites1] = useState("");
  const [loading, setLoading] = useState(true);
  const [sprites2, setSprites2] = useState({
    P1: null,
    P2: null,
    P3: null,
    P4: null,
    P5: null,
    P6: null,
    P7: null,
    P8: null,
  });
  const [sprites3, setSprites3] = useState({
    P1: null,
    P2: null,
    P3: null,
  });
  const [names1, setNames1] = useState("");
  const [names2, setNames2] = useState({
    P1: null,
    P2: null,
    P3: null,
    P4: null,
    P5: null,
    P6: null,
    P7: null,
    P8: null,
  });
  const [names3, setNames3] = useState({
    P1: null,
    P2: null,
    P3: null,
  });
  const [ids1, setIds1] = useState("");
  const [ids2, setIds2] = useState({
    P1: null,
    P2: null,
    P3: null,
    P4: null,
    P5: null,
    P6: null,
    P7: null,
    P8: null,
  });
  const [ids3, setIds3] = useState({
    P1: null,
    P2: null,
    P3: null,
  });
  const [methodString1, setMethodString1] = useState({
    P1: null,
    P2: null,
    P3: null,
    P4: null,
    P5: null,
    P6: null,
    P7: null,
    P8: null,
  });
  const [methodString2, setMethodString2] = useState({
    P1: null,
    P2: null,
    P3: null,
  });

  useEffect(() => {
    async function fetchPokemonInfo() {
      setLoading(true);
      try {
        const speciesData = await fetchPokemonData(
          `https://pokeapi.co/api/v2/pokemon-species/${params.id}`
        );
        const evos = await fetchPokemonData(speciesData.evolution_chain.url);

        setNames1(evos.chain.species.name);
        const firstEvo = await fetchPokemonData(
          `/api/pokemon/single/${evos.chain.species.name}`
        );
        setIds1(firstEvo.id);
        setSprites1(firstEvo.sprite);

        if (evos.chain.evolves_to) {
          await Promise.all(
            evos.chain.evolves_to.map(async (evolution, index) => {
              const pokemonData2 = await fetchPokemonData(
                `/api/pokemon/single/${evolution.species.name}`
              );
              setSprites2((prevState) => ({
                ...prevState,
                [`P${index + 1}`]: pokemonData2.sprite,
              }));

              setIds2((prevState) => ({
                ...prevState,
                [`P${index + 1}`]: pokemonData2.id,
              }));

              setNames2((prevState) => ({
                ...prevState,
                [`P${index + 1}`]: pokemonData2.name,
              }));

              const getEvolutionMethod = (pokemonData, n) => {
                if (pokemonData.name === "hitmonlee") {
                  return `Level 20, Attack > Defense`;
                } else if (pokemonData.name === "hitmonchan") {
                  return `Level 20, Attack < Defense`;
                } else if (pokemonData.name === "hitmontop") {
                  return `Level 20, Attack = Defense`;
                } else if (n.min_level) {
                  if (n.gender === 1) {
                    return `Level ${n.min_level}, Female`;
                  } else if (n.gender === 2) {
                    return `Level ${n.min_level}, Female`;
                  } else {
                    return `Level ${n.min_level}`;
                  }
                } else if (pokemonData.name === "glaceon") {
                  return `Use Ice Stone or level up near an Icy Rock`;
                } else if (pokemonData.name === "leafeon") {
                  return `Use Leaf Stone or level up near an Mossy Rock`;
                } else if (n.knownmove) {
                  return `After ${n.knownmove.name} learned`;
                } else if (n.location) {
                  return `Level up in ${n.location.name}`;
                } else if (n.min_happiness && n.time_of_day === "day") {
                  return `High friendship, Daytime`;
                } else if (n.time_of_day === "night" && n.min_happiness) {
                  return `High friendship, Nighttime`;
                } else if (n.time_of_day === "night" && n.min_level) {
                  return `Level ${n.min_level}, Nighttime`;
                } else if (n.held_item && n.time_of_day === "night") {
                  return `Hold ${n.held_item.name}, Nighttime`;
                } else if (n.held_item && n.time_of_day === "day") {
                  return `Hold ${n.held_item.name}, Daytime`;
                } else if (n.held_item && n.trigger.name === "trade") {
                  return `Trade holding ${n.held_item.name}`;
                } else if (
                  pokemonData.name === "rellor" ||
                  pokemonData.name === "rabsca"
                ) {
                  return `Walk 1,000 steps in Let's Go mode`;
                } else if (n.known_move_type && n.min_affection) {
                  return `After ${n.known_move_type.name}-type move learned and high affection`;
                } else if (n.known_move_type && n.min_happiness) {
                  return `After ${n.known_move_type.name}-type move learned and high happiness`;
                } else if (n.party_species) {
                  return `with ${n.party_species.name} in party`;
                } else if (n.min_beauty) {
                  return `Level up with max beauty or trade while holding prisma scale`;
                } else if (n.trigger && n.trigger.name === "shed") {
                  return `If empty slot in party when evolves`;
                } else if (n.party_type && n.min_level) {
                  return `Level ${n.min_level}, ${n.party_type.name}-type Pokemon in party`;
                } else if (n.turn_upside_down && n.min_level) {
                  return `Level ${n.min_level}, holding console upside down`;
                } else if (n.min_level && n.needs_overworld_rain) {
                  return `Level ${n.min_level}, during rain`;
                } else if (pokemonData2.name === "finizen") {
                  return `Level 38, while in multiplayer`;
                } else if (pokemonData2.name === "bisharp") {
                  return `Defeat 3 Bisharp that hold Leader's Crest`;
                } else if (pokemonData2.name === "gimmighoul") {
                  return `Level up with 999 coins`;
                } else if (n.relative_physical_stats === 1 && n.min_level) {
                  return `Level ${n.min_level}, Attack > Defense`;
                } else if (n.relative_physical_stats === -1 && n.min_level) {
                  return `Level ${n.min_level}, Attack < Defense`;
                } else if (n.relative_physical_stats === 0 && n.min_level) {
                  return `Level ${n.min_level}, Attack = Defense`;
                } else if (n.item) {
                  return `Use ${n.item.name}`;
                } else if (n.gender === 1 && n.item) {
                  return `Use ${n.item.name}, Female`;
                } else if (n.gender === 2 && n.item) {
                  return `Use ${n.item.name}, Male`;
                } else if (n.trigger.name === "trade") {
                  return `Trade`;
                } else if (
                  pokemonData2.name === "accelgor" ||
                  pokemonData2.name === "shelmet"
                ) {
                  return `Trade with Karrablast`;
                } else if (
                  pokemonData2.name === "karrablast" ||
                  pokemonData2.name === "escavalier"
                ) {
                  return `Trade with shelmet`;
                } else if (
                  pokemonData2.name === "farfetch'd" ||
                  pokemonData2.name === "sirfetch'd"
                ) {
                  return `Land 3 critical hits in one battle`;
                } else if (pokemonData2.name === "runerigus") {
                  return `Take damage near Dusty Bowl`;
                } else if (pokemonData2.name === "alcremie") {
                  return `Spin around holding sweet`;
                } else if (
                  pokemonData2.name === "urshifu" &&
                  n.trigger.name === "tower-of-darkness"
                ) {
                  return `use Scroll Of Darkness, or in Tower of Darkness in Galar`;
                } else if (
                  pokemonData2.name === "urshifu" &&
                  n.trigger.name === "tower-of-waters"
                ) {
                  return `use Scroll Of Waters, or in Tower of Waters in Galar`;
                } else if (pokemonData2.name === "basculin") {
                  return `Received 294 recoil damage in battle`;
                } else if (pokemonData2.name === "annihilape") {
                  return `Use Rage Fist 20 times`;
                } else if (n.min_happiness) {
                  return `High friendship`;
                } else {
                  return null;
                }
              };

              function checkNotNull(evo_det) {
                return new Promise((resolve) => {
                  const filterNested = (obj) => {
                    if (Array.isArray(obj)) {
                      return obj.filter(
                        (item) => item !== false && item !== "" && item !== null
                      );
                    } else if (obj && typeof obj === "object") {
                      const filteredObj = Object.fromEntries(
                        Object.entries(obj)
                          .filter(
                            ([key, value]) =>
                              value !== false && value !== "" && value !== null
                          )
                          .map(([key, value]) => [key, filterNested(value)])
                      );
                      return filteredObj;
                    } else {
                      return obj;
                    }
                  };
                  const notNullAttr = filterNested(evo_det);
                  resolve(notNullAttr);
                });
              }

              checkNotNull(evolution.evolution_details[0]).then((result) => {
                const evo_method = (n) => {
                  setMethodString1((prevState) => ({
                    ...prevState,
                    [`P${index + 1}`]: getEvolutionMethod(pokemonData2, n),
                  }));
                };
                evo_method(result);
              });
              if (evolution.evolves_to) {
                await Promise.all(
                  evolution.evolves_to.map(async (evo, index2) => {
                    const pokemonData3 = await fetchPokemonData(
                      `/api/pokemon/single/${evo.species.name}`
                    );
                    console.log(evolution.evolves_to);
                    setSprites3((prevState) => ({
                      ...prevState,
                      [`P${index2 + 1}`]: pokemonData3.sprite,
                    }));

                    setIds3((prevState) => ({
                      ...prevState,
                      [`P${index2 + 1}`]: pokemonData3.id,
                    }));

                    setNames3((prevState) => ({
                      ...prevState,
                      [`P${index2 + 1}`]: pokemonData3.name,
                    }));

                    function checkNotNull(evo_det2) {
                      return new Promise((resolve) => {
                        const filterNested = (obj) => {
                          if (Array.isArray(obj)) {
                            return obj.filter(
                              (item) =>
                                item !== false && item !== "" && item !== null
                            );
                          } else if (obj && typeof obj === "object") {
                            const filteredObj = Object.fromEntries(
                              Object.entries(obj)
                                .filter(
                                  ([key, value]) =>
                                    value !== false &&
                                    value !== "" &&
                                    value !== null
                                )
                                .map(([key, value]) => [
                                  key,
                                  filterNested(value),
                                ])
                            );
                            return filteredObj;
                          } else {
                            return obj;
                          }
                        };
                        const notNullAttr = filterNested(evo_det2);
                        resolve(notNullAttr);
                      });
                    }

                    checkNotNull(evo.evolution_details[0]).then((result) => {
                      const evo_method = (n) => {
                        setMethodString2((prevState) => ({
                          ...prevState,
                          [`P${index2 + 1}`]: getEvolutionMethod(
                            pokemonData3,
                            n
                          ),
                        }));
                      };
                      evo_method(result);
                    });
                  })
                );
              }
            })
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    const fetchPokemonData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch pokemon data...");
      }
      return response.json();
    };

    fetchPokemonInfo();
  }, [params.id]);

  useEffect(() => {
    console.log(methodString1);
    console.log(methodString2);
    console.log(sprites2);
    console.log(sprites3);
    console.log(params.id);
  }, [methodString1, methodString2, sprites2, sprites3, params.id]);

  function isString(obj) {
    return typeof obj === "string";
  }

  return (
    <>
      {loading ? (
        <div className="loading-circle">
          <CircularProgress />
        </div>
      ) : (
        <div className="evos">
          {(params.id === "412" ||
            params.id === "413" ||
            params.id === "414") && (
            <div className="multi-evos">
              <div className="evo-container">
                <div className="stack">
                  <div className="burmy">
                    <Link to={`/gen/4/${burm.burmy_plant.id}`} className="link">
                      <div className="ind">
                        <img
                          src={burm.burmy_plant.sprite}
                          alt={burm.burmy_plant.name}
                          className="evo-sprite"
                        />
                        <p>
                          {burm.burmy_plant.name.charAt(0).toUpperCase() +
                            burm.burmy_plant.name.slice(1)}
                        </p>
                      </div>
                    </Link>
                    <div className="direction-container">
                      <EastIcon className="evo-icon" />
                      <p className="method">Level 20, Male</p>
                    </div>
                    <Link to={`/gen/4/${burm.mothim.id}`} className="link">
                      <div className="ind">
                        <img
                          src={burm.mothim.sprite}
                          alt={burm.mothim.name}
                          className="evo-sprite"
                        />
                        <p>
                          {burm.mothim.name.charAt(0).toUpperCase() +
                            burm.mothim.name.slice(1)}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="burmy">
                    <Link to={`/${burm.burmy_plant.id}`} className="link">
                      <div className="ind">
                        <img
                          src={burm.burmy_plant.sprite}
                          alt={burm.burmy_plant.name}
                          className="evo-sprite"
                        />
                        <p>
                          {burm.burmy_plant.name.charAt(0).toUpperCase() +
                            burm.burmy_plant.name.slice(1)}
                        </p>
                      </div>
                    </Link>
                    <div className="direction-container">
                      <EastIcon className="evo-icon" />
                      <p className="method">Level 20, Female, in grass</p>
                    </div>
                    <Link
                      to={`/gen/4/${burm.wormadam_plant.id}`}
                      className="link"
                    >
                      <div className="ind">
                        <img
                          src={burm.wormadam_plant.sprite}
                          alt={burm.wormadam_plant.name}
                          className="evo-sprite"
                        />
                        <p>
                          {burm.wormadam_plant.name.charAt(0).toUpperCase() +
                            burm.wormadam_plant.name.slice(1)}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="burmy">
                    <Link to={`/${burm.burmy_plant.id}`} className="link">
                      <div className="ind">
                        <img
                          src={burm.burmy_sand.sprite}
                          alt={burm.burmy_sand.name}
                          className="evo-sprite"
                        />
                        <p>
                          {burm.burmy_sand.name.charAt(0).toUpperCase() +
                            burm.burmy_sand.name.slice(1)}
                        </p>
                      </div>
                    </Link>
                    <div className="direction-container">
                      <EastIcon className="evo-icon" />
                      <p className="method">Level 20, Female, in caves</p>
                    </div>
                    <Link
                      to={`/gen/4/${burm.wormadam_plant.id}`}
                      className="link"
                    >
                      <div className="ind">
                        <img
                          src={burm.wormadam_sand.sprite}
                          alt={burm.wormadam_sand.name}
                          className="evo-sprite"
                        />
                        <p>
                          {burm.wormadam_sand.name.charAt(0).toUpperCase() +
                            burm.wormadam_sand.name.slice(1)}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="burmy">
                    <Link to={`/gen/4/${burm.burmy_plant.id}`} className="link">
                      <div className="ind">
                        <img
                          src={burm.burmy_trash.sprite}
                          alt={burm.burmy_trash.name}
                          className="evo-sprite"
                        />
                        <p>
                          {burm.burmy_trash.name.charAt(0).toUpperCase() +
                            burm.burmy_trash.name.slice(1)}
                        </p>
                      </div>
                    </Link>
                    <div className="direction-container">
                      <EastIcon className="evo-icon" />
                      <p className="method">Level 20, Female, in buildings</p>
                    </div>
                    <Link
                      to={`/gen/4/${burm.wormadam_plant.id}`}
                      className="link"
                    >
                      <div className="ind">
                        <img
                          src={burm.wormadam_trash.sprite}
                          alt={burm.wormadam_trash.name}
                          className="evo-sprite"
                        />
                        <p>
                          {burm.wormadam_trash.name.charAt(0).toUpperCase() +
                            burm.wormadam_trash.name.slice(1)}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!sprites2.P2 && names2.P1 && !sprites3.P2 && (
            <div className="multi-evos">
              <div className="evo-container">
                <div className="normal-evo">
                  <Link to={`/gen/${params.genId}/${ids1}`} className="link">
                    <div className="ind">
                      <img src={sprites1} alt={names1} className="evo-sprite" />
                      <p>{names1.charAt(0).toUpperCase() + names1.slice(1)}</p>
                    </div>
                  </Link>
                  <div className="direction-container">
                    <EastIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P1) && methodString1.P1}
                    </p>
                  </div>
                  <Link to={`/gen/${params.genId}/${ids2.P1}`} className="link">
                    <div className="ind">
                      <img
                        src={sprites2.P1}
                        alt={names2.P1}
                        className="evo-sprite"
                      />
                      <p>
                        {names2.P1.charAt(0).toUpperCase() + names2.P1.slice(1)}
                      </p>
                    </div>
                  </Link>
                  {sprites3.P1 && (
                    <>
                      <div className="direction-container">
                        <EastIcon className="evo-icon" />
                        <p className="method">
                          {isString(methodString2.P1) && methodString2.P1}
                        </p>
                      </div>
                      <Link
                        to={`/gen/${params.genId}/${ids3.P1}`}
                        className="link"
                      >
                        <div className="ind">
                          <img
                            src={sprites3.P1}
                            alt={names3.P1}
                            className="evo-sprite"
                          />
                          <p>
                            {names3.P1.charAt(0).toUpperCase() +
                              names3.P1.slice(1)}
                          </p>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {!sprites3.P1 && sprites2.P4 && (
            <div className="multi-evos">
              <div className="evo-container">
                <div className="first-evo">
                  <Link to={`/gen/${params.genId}/${ids2.P5}`} className="link">
                    <div className="ind">
                      <img src={sprites2.P5} alt={sprites2.P5} />
                      <p>
                        {names2.P5.charAt(0).toUpperCase() + names2.P5.slice(1)}
                      </p>
                    </div>
                  </Link>
                  <Link to={`/gen/${params.genId}/${ids2.P7}`} className="link">
                    <div className="ind">
                      <img src={sprites2.P7} alt={names2.P7} />
                      <p>
                        {names2.P7.charAt(0).toUpperCase() + names2.P7.slice(1)}
                      </p>
                    </div>
                  </Link>
                  <Link to={`/gen/${params.genId}/${ids2.P6}`} className="link">
                    <div className="ind">
                      {sprites2.P6 && <img src={sprites2.P6} alt={names2.P6} />}
                      <p>
                        {names2.P6.charAt(0).toUpperCase() + names2.P6.slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="left-arrows">
                  <div className="direction-container">
                    <NorthWestIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P5) && methodString1.P5}
                    </p>
                  </div>
                  <div className="direction-container">
                    <WestIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P7) && methodString1.P7}
                    </p>
                  </div>
                  <div className="direction-container">
                    <SouthWestIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P6) && methodString1.P6}
                    </p>
                  </div>
                </div>
                <div className="second-evo">
                  <Link to={`/gen/${params.genId}/${ids2.P4}`} className="link">
                    <div className="ind">
                      {sprites2.P4 && <img src={sprites2.P4} alt={names2.P4} />}
                      <p>
                        {names2.P4.charAt(0).toUpperCase() + names2.P4.slice(1)}
                      </p>
                    </div>
                  </Link>
                  <div className="direction-container">
                    <NorthIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P4) && methodString1.P4}
                    </p>
                  </div>
                  <Link to={`/gen/${params.genId}/${ids1}`} className="link">
                    <div className="ind">
                      <img src={sprites1} alt={names1} />
                      <p>{names1.charAt(0).toUpperCase() + names1.slice(1)}</p>
                    </div>
                  </Link>
                  <div className="direction-container">
                    <SouthIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P8) && methodString1.P8}
                    </p>
                  </div>
                  <Link to={`/gen/${params.genId}/${ids2.P8}`} className="link">
                    <div className="ind">
                      <img src={sprites2.P8} alt={names2.P8} />
                      <p>
                        {names2.P8.charAt(0).toUpperCase() + names2.P8.slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="right-arrows">
                  <div className="direction-container">
                    <NorthEastIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P3) && methodString1.P3}
                    </p>
                  </div>
                  <div className="direction-container">
                    <EastIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P1) && methodString1.P1}
                    </p>
                  </div>
                  <div className="direction-container">
                    <SouthEastIcon className="evo-icon" />
                    <p className="method">
                      {isString(methodString1.P2) && methodString1.P2}
                    </p>
                  </div>
                </div>
                <div className="third-evo">
                  <Link to={`/gen/${params.genId}/${ids2.P3}`} className="link">
                    <div className="ind">
                      <img src={sprites2.P3} alt={sprites2.P3} />
                      <p>
                        {names2.P3.charAt(0).toUpperCase() + names2.P3.slice(1)}
                      </p>
                    </div>
                  </Link>
                  <Link to={`/gen/${params.genId}/${ids2.P1}`} className="link">
                    <div className="ind">
                      <img src={sprites2.P1} alt={names2.P1} />
                      <p>
                        {names2.P1.charAt(0).toUpperCase() + names2.P1.slice(1)}
                      </p>
                    </div>
                  </Link>
                  <Link to={`/gen/${params.genId}/${ids2.P2}`} className="link">
                    <div className="ind">
                      {sprites2.P2 && <img src={sprites2.P2} alt={names2.P2} />}
                      <p>
                        {names2.P2.charAt(0).toUpperCase() + names2.P2.slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {(params.id === "265" ||
            params.id === "266" ||
            params.id === "267" ||
            params.id === "268" ||
            params.id === "269") && (
            <div className="multi-evos">
              <div className="evo-container">
                <div className="split-second">
                  <Link to={`/gen/3/${wurmp.wurmple.id}`} className="link">
                    <div className="ind one">
                      <img
                        src={wurmp.wurmple.sprite}
                        alt={wurmp.wurmple.name}
                      />
                      <p>
                        {wurmp.wurmple.name.charAt(0).toUpperCase() +
                          wurmp.wurmple.name.slice(1)}
                      </p>
                    </div>
                  </Link>
                  <div className="right-arrows">
                    <NorthEastIcon className="evo-icon" />
                    <p className="method">Level 7</p>
                    <SouthEastIcon className="evo-icon" />
                    <p className="method">Level 7</p>
                  </div>
                  <div className="chain-container">
                    <div className="chain">
                      <Link to={`/gen/3/${wurmp.silcoon.id}`} className="link">
                        <div className="ind">
                          <img
                            src={wurmp.silcoon.sprite}
                            alt={wurmp.silcoon.name}
                            className="evo-sprite"
                          />
                          <p>
                            {wurmp.silcoon.name.charAt(0).toUpperCase() +
                              wurmp.silcoon.name.slice(1)}
                          </p>
                        </div>
                      </Link>
                      <div className="direction-container">
                        <EastIcon className="evo-icon" />
                        <p className="method">Level 10</p>
                      </div>
                      <Link
                        to={`/gen/3/${wurmp.beautifly.id}`}
                        className="link"
                      >
                        <div className="ind">
                          <img
                            src={wurmp.beautifly.sprite}
                            alt={wurmp.beautifly.name}
                            className="evo-sprite"
                          />
                          <p>
                            {wurmp.beautifly.name.charAt(0).toUpperCase() +
                              wurmp.beautifly.name.slice(1)}
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="chain">
                      <Link to={`/gen/3/${wurmp.cascoon.id}`} className="link">
                        <div className="ind">
                          <img
                            src={wurmp.cascoon.sprite}
                            alt={wurmp.cascoon.name}
                            className="evo-sprite"
                          />
                          <p>
                            {wurmp.cascoon.name.charAt(0).toUpperCase() +
                              wurmp.cascoon.name.slice(1)}
                          </p>
                        </div>
                      </Link>
                      <div className="direction-container">
                        <EastIcon className="evo-icon" />
                        <p className="method">Level 10</p>
                      </div>
                      <Link to={`/gen/3/${wurmp.dustox.id}`} className="link">
                        <div className="ind">
                          <img
                            src={wurmp.dustox.sprite}
                            alt={wurmp.dustox.name}
                            className="evo-sprite"
                          />
                          <p>
                            {wurmp.dustox.name.charAt(0).toUpperCase() +
                              wurmp.dustox.name.slice(1)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {sprites2.P1 &&
            sprites3.P1 &&
            sprites3.P2 &&
            sprites3.P2 !== sprites3.P1 &&
            !sprites2.P2 && (
              <div className="multi-evos">
                <div className="evo-container">
                  <div className="split-third">
                    <Link to={`/gen/${params.genId}/${ids1}`} className="link">
                      <div className="ind">
                        <img
                          src={sprites1}
                          alt={names1}
                          className="evo-sprite"
                        />
                        <p>
                          {names1.charAt(0).toUpperCase() + names1.slice(1)}
                        </p>
                      </div>
                    </Link>
                    <div className="direction-container">
                      <EastIcon className="evo-icon" />
                      <p className="method">
                        {isString(methodString1.P1) && methodString1.P1}
                      </p>
                    </div>
                    <Link
                      to={`/gen/${params.genId}/${ids2.P1}`}
                      className="link"
                    >
                      <div className="ind">
                        <img
                          src={sprites2.P1}
                          alt={names2.P1}
                          className="evo-sprite"
                        />
                        <p>
                          {names2.P1.charAt(0).toUpperCase() +
                            names2.P1.slice(1)}
                        </p>
                      </div>
                    </Link>
                    <div className="right-arrows">
                      <NorthEastIcon className="evo-icon sep" />
                      <p className="method splt">
                        {isString(methodString2.P1) && methodString2.P1}
                      </p>
                      <SouthEastIcon className="evo-icon sep" />
                      <p className="method splt">
                        {isString(methodString2.P2) && methodString2.P2}
                      </p>
                    </div>
                    <div className="double">
                      <Link
                        to={`/gen/${params.genId}/${ids3.P1}`}
                        className="link"
                      >
                        <div className="ind">
                          <img
                            src={sprites3.P1}
                            alt={names3.P1}
                            className="evo-sprite"
                          />
                          <p>
                            {names3.P1.charAt(0).toUpperCase() +
                              names3.P1.slice(1)}
                          </p>
                        </div>
                      </Link>
                      <Link
                        to={`/gen/${params.genId}/${ids3.P2}`}
                        className="link"
                      >
                        <div className="ind">
                          <img
                            src={sprites3.P2}
                            alt={names3.P2}
                            className="evo-sprite"
                          />
                          <p>
                            {names3.P2.charAt(0).toUpperCase() +
                              names3.P2.slice(1)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {sprites2.P3 &&
            !sprites3.P1 &&
            params.id !== "133" &&
            params.id !== "134" &&
            params.id !== "135" &&
            params.id !== "136" &&
            params.id !== "196" &&
            params.id !== "197" &&
            params.id !== "471" &&
            params.id !== "470" &&
            params.id !== "700" && (
              <div className="multi-evos">
                <div className="evo-container">
                  <div className="one-evo">
                    <Link to={`/gen/${params.genId}/${ids1}`} className="link">
                      <div className="ind one">
                        <img src={sprites1} alt={names1} />
                        <p>
                          {names1.charAt(0).toUpperCase() + names1.slice(1)}
                        </p>
                      </div>
                    </Link>
                    <div className="right-arrows">
                      <NorthEastIcon className="evo-icon" />
                      <p className="method">
                        {isString(methodString1.P1) && methodString1.P1}
                      </p>
                      <EastIcon className="evo-icon" />
                      <p className="method">
                        {isString(methodString1.P3) && methodString1.P3}
                      </p>
                      <SouthEastIcon className="evo-icon" />
                      <p className="method">
                        {isString(methodString1.P2) && methodString1.P2}
                      </p>
                    </div>
                    <div className="three-evo">
                      <Link
                        to={`/gen/${params.genId}/${ids2.P1}`}
                        className="link"
                      >
                        <div className="ind">
                          <img src={sprites2.P1} alt={names2.P1} />
                          <p>
                            {names2.P1.charAt(0).toUpperCase() +
                              names2.P1.slice(1)}
                          </p>
                        </div>
                      </Link>
                      <Link
                        to={`/gen/${params.genId}/${ids2.P3}`}
                        className="link"
                      >
                        <div className="ind">
                          <img src={sprites2.P3} alt={names2.P3} />
                          <p>
                            {names2.P3.charAt(0).toUpperCase() +
                              names2.P3.slice(1)}
                          </p>
                        </div>
                      </Link>
                      <Link
                        to={`/gen/${params.genId}/${ids2.P2}`}
                        className="link"
                      >
                        <div className="ind">
                          <img src={sprites2.P2} alt={names2.P2} />
                          <p>
                            {names2.P2.charAt(0).toUpperCase() +
                              names2.P2.slice(1)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {sprites2.P2 &&
            !sprites3.P1 &&
            params.id !== "412" &&
            params.id !== "413" &&
            params.id !== "414" &&
            params.id !== "133" &&
            params.id !== "134" &&
            params.id !== "135" &&
            params.id !== "136" &&
            params.id !== "196" &&
            params.id !== "197" &&
            params.id !== "471" &&
            params.id !== "470" &&
            params.id !== "700" && (
              <div className="multi-evos">
                <div className="evo-container">
                  <div className="one-evo">
                    <Link to={`/gen/${params.genId}/${ids1}`} className="link">
                      <div className="ind one">
                        <img
                          src={sprites1}
                          alt={names1}
                          className="evo-sprite"
                        />
                        <p>
                          {names1.charAt(0).toUpperCase() + names1.slice(1)}
                        </p>
                      </div>
                    </Link>
                    <div className="right-arrows direction-container">
                      <NorthEastIcon className="evo-icon" />
                      <p className="method">
                        {isString(methodString1.P1) && methodString1.P1}, and{" "}
                        {isString(methodString1.P2) && methodString1.P2}
                      </p>
                      <SouthEastIcon className="evo-icon" />
                      <p className="method">
                        {isString(methodString1.P1) && methodString1.P1}
                      </p>
                    </div>
                    <div className="split-two">
                      {names2.P1 && names2.P2 && (
                        <>
                          <div className="evo-plus">
                            <Link
                              to={`/gen/${params.genId}/${ids2.P1}`}
                              className="link"
                            >
                              <div className="ind">
                                <img
                                  src={sprites2.P1}
                                  alt={names2.P1}
                                  className="evo-sprite"
                                />
                                <p>
                                  {names2.P1.charAt(0).toUpperCase() +
                                    names2.P1.slice(1)}
                                </p>
                              </div>
                            </Link>
                            <AddIcon className="evo-icon" />
                            <Link
                              to={`/gen/${params.genId}/${ids2.P2}`}
                              className="link"
                            >
                              <div className="ind">
                                <img
                                  src={sprites2.P2}
                                  alt={names2.P2}
                                  className="evo-sprite"
                                />
                                <p>
                                  {names2.P2.charAt(0).toUpperCase() +
                                    names2.P2.slice(1)}
                                </p>
                              </div>
                            </Link>
                          </div>
                          <div className="evo-no-plus">
                            <Link
                              to={`/gen/${params.genId}/${ids2.P1}`}
                              className="link"
                            >
                              <div className="ind">
                                <img
                                  src={sprites2.P1}
                                  alt={names2.P1}
                                  className="evo-sprite"
                                />
                                <p>
                                  {names2.P1.charAt(0).toUpperCase() +
                                    names2.P1.slice(1)}
                                </p>
                              </div>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
}

export default Evolutions;

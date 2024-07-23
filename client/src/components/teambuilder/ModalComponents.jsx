import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ModalComponents({ selectedPoke, open, setOpen, shinyStates }) {
  const [gen3Items, setGen3Items] = useState([]);
  const [gen4Items, setGen4Items] = useState([]);
  const [gen5Items, setGen5Items] = useState([]);
  const [gen6Items, setGen6Items] = useState([]);
  const [gen7Items, setGen7Items] = useState([]);
  const [gen8Items, setGen8Items] = useState([]);
  const [gen9Items, setGen9Items] = useState([]);
  const [ability_effect, setAbilityEffect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nature, setNature] = useState([]);
  const [options, setOptions] = useState([]);
  const [openBars, setOpenBars] = useState({
    openBar1: false,
    openBar2: false,
    openBar3: false,
    openBar4: false,
    openBar5: false,
    openBar6: false,
    openBar7: false,
  });

  const params = useParams();
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

  const handleOpenBar = (barNumber, value) => {
    setOpenBars((prevState) => ({
      ...prevState,
      [`openBar${barNumber}`]: value,
    }));
  };

  let movelist = [];
  useEffect(() => {
    if (selectedPoke) {
      const fetchMoves = async () => {
        try {
          let ids = selectedPoke.id;
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${ids}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch moves...");
          }
          const moves = await response.json();

          let moveGen;
          if (gen === "1") {
            moveGen = "red-blue" || "yellow";
          } else if (gen === "2") {
            moveGen = "gold-silver" || "crystal";
          } else if (gen === "3") {
            moveGen = "emerald" || "ruby-sapphire";
          } else if (gen === "4") {
            moveGen = "diamond-pearl" || "platinum";
          } else if (gen === "5") {
            moveGen = "black-white" || "black-2-white-2";
          } else if (gen === "6") {
            moveGen = "x-y";
          } else if (gen === "7") {
            moveGen = "sun-moon" || "ultra-sun-ultra-moon";
          } else if (gen === "8") {
            moveGen = "sword-shield";
          } else if (gen === "9") {
            moveGen = "scarlet-violet";
          }

          moves.moves.forEach((i) => {
            const findGen = i.version_group_details.find(
              (det) => det.version_group.name === moveGen
            );
            if (findGen) {
              movelist.push({
                name: i.move.name,
              });
            }
          });

          const movesArray = movelist.map((move) =>
            (move.name.charAt(0).toUpperCase() + move.name.slice(1))
              .replace(/-/g, " ")
              .replace(/(\s\w)|(-\w)/g, (match) => match.toUpperCase())
          );
          setOptions(movesArray);
        } catch (err) {
          console.log(err);
        }
      };
      fetchMoves();
    }
  }, [selectedPoke]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/items/?limit=141`);
      if (!response.ok) {
        throw new Error("Failed to fetch moves...");
      }
      const items = await response.json();
      const gen3Items = items.filter((item) =>
        checkGeneration(item, "generation-iii")
      );
      setGen3Items(gen3Items);

      const gen4Items = items.filter((item) =>
        checkGeneration(item, "generation-iv")
      );
      setGen4Items(gen4Items);

      const gen5Items = items.filter((item) =>
        checkGeneration(item, "generation-v")
      );
      setGen5Items(gen5Items);

      const gen6Items = items.filter((item) =>
        checkGeneration(item, "generation-vi")
      );
      setGen6Items(gen6Items);
      const gen7Items = items.filter((item) =>
        checkGeneration(item, "generation-vii")
      );
      setGen7Items(gen7Items);
      const gen8Items = items.filter((item) =>
        checkGeneration(item, "generation-viii")
      );
      setGen8Items(gen8Items);
      const gen9Items = items.filter((item) =>
        checkGeneration(item, "generation-ix")
      );
      setGen9Items(gen9Items);
    };

    const checkGeneration = (item, generation) => {
      if (item.game_indices) {
        const generations = item.game_indices
          .split(",")
          .map((gen) => gen.trim());
        return generations.includes(generation);
      }
      return false;
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchNatures = async () => {
      const response = await fetch(`/api/natures`);
      if (!response.ok) {
        throw new Error("Failed to fetch natures...");
      }
      const natures = await response.json();
      setNature(natures);
    };
    fetchNatures();
  }, []);

  let pokemonIndex;
  if (selectedPoke) {
    pokemonIndex = Object.values(team).findIndex(
      (pokemon) => pokemon.name === selectedPoke.name
    );
  }
  useEffect(() => {
    if (selectedPoke) {
      const fetchAbilityEffects = async () => {
        try {
          let ability = selectedPoke.abilities;
          const effects = await Promise.all(
            ability.map(async (i) => {
              const response = await fetch(
                `https://pokeapi.co/api/v2/ability/${i.name}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch moves...");
              }
              const effect = await response.json();
              return effect.effect_entries.find(
                (entry) => entry.language.name === "en"
              ).short_effect;
            })
          );
          setAbilityEffect(effects);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAbilityEffects();
    }
  }, [selectedPoke]);

  const handleClose = () => setOpen(false);

  const handleRemoveSingle = () => {
    const updatedTeam = { ...team };
    updatedTeam[`pokemon${pokemonIndex + 1}`] = {};

    window.localStorage.setItem(`team${gen}`, JSON.stringify(updatedTeam));
    setOpen(false);
  };

  let findHeldItem;
  if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].held_item &&
    gen === "2"
  ) {
    findHeldItem = gen3Items.find(
      (i) =>
        i.item_name === team[`pokemon${pokemonIndex + 1}`].held_item.item_name
    );
  } else if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].held_item &&
    gen === "3"
  ) {
    findHeldItem = gen3Items.find(
      (i) =>
        i.item_name === team[`pokemon${pokemonIndex + 1}`].held_item.item_name
    );
  } else if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].held_item &&
    gen === "4"
  ) {
    findHeldItem = gen4Items.find(
      (i) =>
        i.item_name === team[`pokemon${pokemonIndex + 1}`].held_item.item_name
    );
  } else if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].held_item &&
    gen === "5"
  ) {
    findHeldItem = gen5Items.find(
      (i) =>
        i.item_name === team[`pokemon${pokemonIndex + 1}`].held_item.item_name
    );
  } else if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].held_item &&
    gen === "6"
  ) {
    findHeldItem = gen6Items.find(
      (i) =>
        i.item_name === team[`pokemon${pokemonIndex + 1}`].held_item.item_name
    );
  } else if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].held_item &&
    gen === "7"
  ) {
    findHeldItem = gen7Items.find(
      (i) =>
        i.item_name === team[`pokemon${pokemonIndex + 1}`].held_item.item_name
    );
  } else if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].held_item &&
    gen === "8"
  ) {
    findHeldItem = gen8Items.find(
      (i) =>
        i.item_name === team[`pokemon${pokemonIndex + 1}`].held_item.item_name
    );
  } else if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].held_item &&
    gen === "9"
  ) {
    findHeldItem = gen9Items.find(
      (i) =>
        i.item_name === team[`pokemon${pokemonIndex + 1}`].held_item.item_name
    );
  }

  let findNature;
  if (
    team &&
    team[`pokemon${pokemonIndex + 1}`] &&
    team[`pokemon${pokemonIndex + 1}`].nature
  ) {
    findNature = nature.find(
      (i) => i.name === team[`pokemon${pokemonIndex + 1}`].nature.name
    );
  }

  return (
    <>
      {open && (
        <div>
          <Modal open={open} onClose={handleClose}>
            <div className="box">
              <h1 className="pokemon-name-modal">
                {selectedPoke.name.charAt(0).toUpperCase() +
                  selectedPoke.name.slice(1)}
              </h1>
              <img
                src={
                  !shinyStates[pokemonIndex]
                    ? selectedPoke.sprite
                    : selectedPoke.shiny
                }
                alt={selectedPoke.name}
                className="selected-sprites-modal"
              />
              <div className="center">
                <div
                  className={selectedPoke.type2 ? "modal-types" : "modal-type"}
                >
                  <p
                    className={
                      selectedPoke.type1 && !selectedPoke.type2
                        ? `${selectedPoke.type1} modal`
                        : selectedPoke.type1 && selectedPoke.type2
                        ? `${selectedPoke.type1} modal-two`
                        : ""
                    }
                  >
                    {selectedPoke.type1.charAt(0).toUpperCase() +
                      selectedPoke.type1.slice(1)}
                  </p>
                  {selectedPoke.type2 && (
                    <p
                      className={
                        selectedPoke.type2
                          ? `${selectedPoke.type2} modal-two`
                          : ""
                      }
                    >
                      {selectedPoke.type2.charAt(0).toUpperCase() +
                        selectedPoke.type2.slice(1)}
                    </p>
                  )}
                </div>
              </div>
              <div className="bars1">
                <Autocomplete
                  className="bar"
                  sx={{
                    width: 300,
                  }}
                  variant="outlined"
                  open={openBars["openBar1"]}
                  onOpen={() => {
                    handleOpenBar(1, true);
                  }}
                  onClose={() => {
                    handleOpenBar(1, false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={options.label}
                  options={options}
                  value={team[`pokemon${pokemonIndex + 1}`].move1}
                  onChange={(e, value) => {
                    const updatedTeam = {
                      ...team,
                      [`pokemon${pokemonIndex + 1}`]: {
                        ...team[`pokemon${pokemonIndex + 1}`],
                        move1: value,
                      },
                    };
                    window.localStorage.setItem(
                      `team${gen}`,
                      JSON.stringify(updatedTeam)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Move 1"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
                <Autocomplete
                  className="bar"
                  sx={{ width: 300 }}
                  open={openBars["openBar2"]}
                  onOpen={() => {
                    handleOpenBar(2, true);
                  }}
                  onClose={() => {
                    handleOpenBar(2, false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={options.label}
                  options={options}
                  value={team[`pokemon${pokemonIndex + 1}`].move2}
                  onChange={(e, value) => {
                    const updatedTeam = {
                      ...team,
                      [`pokemon${pokemonIndex + 1}`]: {
                        ...team[`pokemon${pokemonIndex + 1}`],
                        move2: value,
                      },
                    };
                    window.localStorage.setItem(
                      `team${gen}`,
                      JSON.stringify(updatedTeam)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Move 2"
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
              </div>
              <div className="bars2">
                <Autocomplete
                  className="bar"
                  sx={{ width: 300 }}
                  open={openBars["openBar3"]}
                  onOpen={() => {
                    handleOpenBar(3, true);
                  }}
                  onClose={() => {
                    handleOpenBar(3, false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={options.label}
                  options={options}
                  value={team[`pokemon${pokemonIndex + 1}`].move3}
                  onChange={(e, value) => {
                    const updatedTeam = {
                      ...team,
                      [`pokemon${pokemonIndex + 1}`]: {
                        ...team[`pokemon${pokemonIndex + 1}`],
                        move3: value,
                      },
                    };
                    window.localStorage.setItem(
                      `team${gen}`,
                      JSON.stringify(updatedTeam)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Move 3"
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
                <Autocomplete
                  className="bar"
                  sx={{ width: 300 }}
                  open={openBars["openBar4"]}
                  onOpen={() => {
                    handleOpenBar(4, true);
                  }}
                  onClose={() => {
                    handleOpenBar(4, false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={options.label}
                  options={options}
                  value={team[`pokemon${pokemonIndex + 1}`].move4}
                  onChange={(e, value) => {
                    const updatedTeam = {
                      ...team,
                      [`pokemon${pokemonIndex + 1}`]: {
                        ...team[`pokemon${pokemonIndex + 1}`],
                        move4: value,
                      },
                    };
                    window.localStorage.setItem(
                      `team${gen}`,
                      JSON.stringify(updatedTeam)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Move 4"
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
              </div>
              <div className="line"></div>
              <div className={gen === "2" ? "extras-gen2" : "extras"}>
                {gen === "2" ? (
                  <div className="extras-column">
                    <Autocomplete
                      className="bar-extra-gen2"
                      sx={{ width: 300 }}
                      open={openBars["openBar5"]}
                      onOpen={() => {
                        handleOpenBar(5, true);
                      }}
                      onClose={() => {
                        handleOpenBar(5, false);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.item_name === value.item_name
                      }
                      getOptionLabel={(option) => option.item_name}
                      options={gen3Items}
                      value={team[`pokemon${pokemonIndex + 1}`].held_item}
                      onChange={(e, value) => {
                        const updatedTeam = {
                          ...team,
                          [`pokemon${pokemonIndex + 1}`]: {
                            ...team[`pokemon${pokemonIndex + 1}`],
                            held_item: value,
                          },
                        };
                        window.localStorage.setItem(
                          `team${gen}`,
                          JSON.stringify(updatedTeam)
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Held Item"
                          InputProps={{
                            ...params.InputProps,
                          }}
                        />
                      )}
                    />
                    <div className={gen === "2" ? "gen2" : "effect"}>
                      {findHeldItem ? (
                        <p>{findHeldItem.effects}</p>
                      ) : (
                        <p>No held item selected</p>
                      )}
                    </div>
                  </div>
                ) : gen !== "1" ? (
                  <>
                    <div className="extras-column">
                      <Autocomplete
                        className="bar-extra"
                        sx={{ width: 300 }}
                        open={openBars["openBar5"]}
                        onOpen={() => {
                          handleOpenBar(5, true);
                        }}
                        onClose={() => {
                          handleOpenBar(5, false);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.item_name === value.item_name
                        }
                        getOptionLabel={(option) => option.item_name}
                        options={
                          gen === "3"
                            ? gen3Items
                            : gen === "4"
                            ? gen4Items
                            : gen === "5"
                            ? gen5Items
                            : gen === "6"
                            ? gen6Items
                            : gen === "7"
                            ? gen7Items
                            : gen8Items
                        }
                        value={team[`pokemon${pokemonIndex + 1}`].held_item}
                        onChange={(e, value) => {
                          const updatedTeam = {
                            ...team,
                            [`pokemon${pokemonIndex + 1}`]: {
                              ...team[`pokemon${pokemonIndex + 1}`],
                              held_item: value,
                            },
                          };
                          window.localStorage.setItem(
                            `team${gen}`,
                            JSON.stringify(updatedTeam)
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Held Item"
                            InputProps={{
                              ...params.InputProps,
                            }}
                          />
                        )}
                      />
                      <div className={gen === "2" ? "gen2" : "effect"}>
                        {findHeldItem ? (
                          <p>{findHeldItem.effects}</p>
                        ) : (
                          <p>No held item selected</p>
                        )}
                      </div>
                    </div>
                    <div className="extras-column">
                      <Autocomplete
                        className="bar-extra"
                        sx={{ width: 300 }}
                        open={openBars["openBar6"]}
                        onOpen={() => {
                          handleOpenBar(6, true);
                        }}
                        onClose={() => {
                          handleOpenBar(6, false);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        getOptionLabel={(option) => option.name}
                        options={nature}
                        value={team[`pokemon${pokemonIndex + 1}`].nature}
                        onChange={(e, value) => {
                          const updatedTeam = {
                            ...team,
                            [`pokemon${pokemonIndex + 1}`]: {
                              ...team[`pokemon${pokemonIndex + 1}`],
                              nature: value,
                            },
                          };
                          window.localStorage.setItem(
                            `team${gen}`,
                            JSON.stringify(updatedTeam)
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nature"
                            InputProps={{
                              ...params.InputProps,
                            }}
                          />
                        )}
                      />
                      <div className={gen === "2" ? "hidden" : "nature"}>
                        {findNature && findNature.increased_stat ? (
                          <>
                            <p>+{findNature.increased_stat}</p>
                            <p>-{findNature.decreased_stat}</p>
                          </>
                        ) : !findNature && gen !== "2" ? (
                          <p>No nature selected</p>
                        ) : (
                          findNature && <p>No stat changes</p>
                        )}
                      </div>
                    </div>
                    <div className="extras-column">
                      <div className="ability-bar">
                        <p className="ability">
                          Abilities: {selectedPoke.abilities[0].name}
                          {selectedPoke.abilities[1] &&
                            (selectedPoke.abilities[1].is_hidden
                              ? ", " +
                                selectedPoke.abilities[1].name +
                                "(hidden)"
                              : ", " + selectedPoke.abilities[1].name)}
                          {selectedPoke.abilities[2] &&
                          selectedPoke.abilities[2].is_hidden
                            ? ", " + selectedPoke.abilities[2].name + "(hidden)"
                            : selectedPoke.abilities[2] &&
                              selectedPoke.abilities[2].name}
                        </p>
                      </div>
                      <div className={gen === "1" ? "hidden-box" : "container"}>
                        <div
                          className={
                            gen === "2" ? "hidden" : "abilities-effect"
                          }
                        >
                          {loading ? (
                            <p>Loading...</p>
                          ) : (
                            gen !== "2" && (
                              <>
                                <p>
                                  {selectedPoke.abilities[0].name +
                                    ": " +
                                    ability_effect[0]}
                                </p>
                                {selectedPoke.abilities[1] && (
                                  <p>
                                    {selectedPoke.abilities[1].is_hidden
                                      ? selectedPoke.abilities[1].name +
                                        "(hidden): " +
                                        ability_effect[1]
                                      : selectedPoke.abilities[1].name +
                                        ": " +
                                        ability_effect[1]}
                                  </p>
                                )}
                                <p>
                                  {selectedPoke.abilities[2] &&
                                  selectedPoke.abilities[2].is_hidden
                                    ? selectedPoke.abilities[2].name +
                                      "(hidden): " +
                                      ability_effect[2]
                                    : selectedPoke.abilities[2] &&
                                      selectedPoke.abilities[2].name +
                                        ": " +
                                        ability_effect[2]}
                                </p>
                              </>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                <button
                  className="remove-button"
                  onClick={() => handleRemoveSingle()}
                >
                  Remove From Team
                </button>
                <button
                  className="remove-button close"
                  onClick={() => handleClose()}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}
export default ModalComponents;

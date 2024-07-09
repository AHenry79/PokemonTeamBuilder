import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function TeamBuilder() {
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedPoke, setSelectedPoke] = useState(null);
  const [ability_effect, setAbilityEffect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);
  const [openBars, setOpenBars] = useState({
    openBar1: false,
    openBar2: false,
    openBar3: false,
    openBar4: false,
    openBar5: false,
    openBar6: false,
    openBar7: false,
  });
  const [pokemonMoves, setPokemonMoves] = useState({
    P1: { move1: "", move2: "", move3: "", move4: "" },
    P2: { move1: "", move2: "", move3: "", move4: "" },
    P3: { move1: "", move2: "", move3: "", move4: "" },
    P4: { move1: "", move2: "", move3: "", move4: "" },
    P5: { move1: "", move2: "", move3: "", move4: "" },
    P6: { move1: "", move2: "", move3: "", move4: "" },
  });
  const [options, setOptions] = useState([]);
  const [gen3Items, setGen3Items] = useState([]);
  const [gen4Items, setGen4Items] = useState([]);
  const [gen5Items, setGen5Items] = useState([]);
  const [gen6Items, setGen6Items] = useState([]);
  const [gen7Items, setGen7Items] = useState([]);
  const [gen8Items, setGen8Items] = useState([]);
  const [heldItems, setHeldItems] = useState({
    P1: { value: null },
    P2: { value: null },
    P3: { value: null },
    P4: { value: null },
    P5: { value: null },
    P6: { value: null },
  });
  const [natures, setNatures] = useState({
    P1: { nature: null },
    P2: { nature: null },
    P3: { nature: null },
    P4: { nature: null },
    P5: { nature: null },
    P6: { nature: null },
  });
  const [nature, setNature] = useState([]);
  const url = window.location.href;
  const gen = url.split("/").pop();

  let pokemonTemplate = {
    name: null,
    id: null,
    sprite: "",
    shiny: "",
    type1: null,
    type2: null,
    move1: null,
    move2: null,
    move3: null,
    move4: null,
  };

  if (gen === "gen2") {
    pokemonTemplate = {
      name: null,
      id: null,
      sprite: "",
      shiny: "",
      type1: null,
      type2: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
      held_item: null,
    };
  } else {
    pokemonTemplate = {
      name: null,
      id: null,
      sprite: "",
      shiny: "",
      type1: null,
      type2: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
      held_item: null,
      nature: null,
      abilities: null,
    };
  }

  const [team, setTeam] = useState({
    pokemon1: { ...pokemonTemplate },
    pokemon2: { ...pokemonTemplate },
    pokemon3: { ...pokemonTemplate },
    pokemon4: { ...pokemonTemplate },
    pokemon5: { ...pokemonTemplate },
    pokemon6: { ...pokemonTemplate },
  });
  const handleReset = () => {
    setTeam({
      pokemon1: { ...pokemonTemplate },
      pokemon2: { ...pokemonTemplate },
      pokemon3: { ...pokemonTemplate },
      pokemon4: { ...pokemonTemplate },
      pokemon5: { ...pokemonTemplate },
      pokemon6: { ...pokemonTemplate },
    });
    setPokemonMoves({
      P1: { move1: "", move2: "", move3: "", move4: "" },
      P2: { move1: "", move2: "", move3: "", move4: "" },
      P3: { move1: "", move2: "", move3: "", move4: "" },
      P4: { move1: "", move2: "", move3: "", move4: "" },
      P5: { move1: "", move2: "", move3: "", move4: "" },
      P6: { move1: "", move2: "", move3: "", move4: "" },
    });
    setHeldItems({
      P1: { value: null },
      P2: { value: null },
      P3: { value: null },
      P4: { value: null },
      P5: { value: null },
      P6: { value: null },
    });
    setNatures({
      P1: { nature: null },
      P2: { nature: null },
      P3: { nature: null },
      P4: { nature: null },
      P5: { nature: null },
      P6: { nature: null },
    });
  };

  const teamArray = Object.values(team);

  const [shinyStates, setShinyStates] = useState(
    Array(teamArray.length).fill(false)
  );

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

  const handleOpenBar = (barNumber, value) => {
    setOpenBars((prevState) => ({
      ...prevState,
      [`openBar${barNumber}`]: value,
    }));
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

  let movelist = [];
  useEffect(() => {
    if (selectedPoke) {
      const fetchMoves = async () => {
        const pokemonNamesMap = {
          deoxys: "deoxys-normal",
          wormadam: "wormadam-plant",
          basculin: "basculin-blue-striped",
          darmanitan: "darmanitan-zen",
          tornadus: "tornadus-incarnate",
          thundurus: "thundurus-incarnate",
          landorus: "landorus-incarnate",
          keldeo: "keldeo-ordinary",
          meloetta: "meloetta-aria",
          meowstic: "meowstic-male",
          aegislash: "aegislash-shield",
          pumpkaboo: "pumpkaboo-average",
          gourgeist: "gourgeist-average",
          zygarde: "zygarde-50",
          oricorio: "oricorio-baile",
          lycanroc: "lycanroc-midday",
          wishiwashi: "wishiwashi-solo",
          minior: "minior-red-meteor",
          mimikyu: "mimikyu-disguised",
          toxtricity: "toxtricity-amped",
          indeedee: "indeedee-male",
          morpeko: "morpeko-full-belly",
          eiscue: "eiscue-ice",
        };
        if (gen === "gen7") {
          pokemonNamesMap.rattata = "rattata-alola";
          pokemonNamesMap.raticate = "raticate-alola";
          pokemonNamesMap.raichu = "raichu-alola";
          pokemonNamesMap.sandshrew = "sandshrew-alola";
          pokemonNamesMap.sandslash = "sandslash-alola";
          pokemonNamesMap.vulpix = "vulpix-alola";
          pokemonNamesMap.ninetails = "ninetails-alola";
          pokemonNamesMap.diglett = "diglett-alola";
          pokemonNamesMap.dugtrio = "dugtrio-alola";
          pokemonNamesMap.meowth = "meowth-alola";
          pokemonNamesMap.persian = "persian-alola";
          pokemonNamesMap.geodude = "geodude-alola";
          pokemonNamesMap.graveler = "graveler-alola";
          pokemonNamesMap.golem = "golem-alola";
          pokemonNamesMap.grimer = "grimer-alola";
          pokemonNamesMap.muk = "muk-alola";
          pokemonNamesMap.exeggutor = "exeggutor-alola";
          pokemonNamesMap.marowak = "marowak-alola";
        }
        try {
          let names = selectedPoke.name;
          if (pokemonNamesMap[names]) {
            names = pokemonNamesMap[names];
          }
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${names}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch moves...");
          }
          const moves = await response.json();
          let moveGen;
          if (gen === "gen1") {
            moveGen = "red-blue" || "yellow";
          } else if (gen === "gen2") {
            moveGen = "gold-silver" || "crystal";
          } else if (gen === "gen3") {
            moveGen = "emerald" || "ruby-sapphire";
          } else if (gen === "gen4") {
            moveGen = "diamond-pearl" || "platinum";
          } else if (gen === "gen5") {
            moveGen = "black-white" || "black-2-white-2";
          } else if (gen === "gen6") {
            moveGen = "x-y";
          } else if (gen === "gen7") {
            moveGen = "sun-moon" || "ultra-sun-ultra-moon";
          } else if (gen === "gen8") {
            moveGen = "sword-shield";
          } else if (gen === "gen9") {
            moveGen = "scarlet-violet";
          }

          moves.moves.forEach((i) => {
            const learnMethod = i.version_group_details.find(
              (det) => det.version_group.name === moveGen
            )?.move_learn_method.name;
            if (learnMethod) {
              movelist.push({
                name: i.move.name,
                learnMethod: learnMethod,
              });
            }
          });
          const pokemonMovelist = {
            "level-up": { label: "level-up", moves: [] },
            machine: { label: "machine", moves: [] },
            tutor: { label: "tutor", moves: [] },
            egg: { label: "egg", moves: [] },
          };
          movelist.forEach((i) => {
            if (i.learnMethod === "level-up") {
              pokemonMovelist["level-up"].moves.push(i.name);
            } else if (i.learnMethod === "machine") {
              pokemonMovelist.machine.moves.push(i.name);
            } else if (i.learnMethod === "tutor") {
              pokemonMovelist.tutor.moves.push(i.name);
            } else if (i.learnMethod === "egg") {
              pokemonMovelist.egg.moves.push(i.name);
            }
          });
          const moveNames = movelist.map((i) => i.name);
          setOptions(moveNames);
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
        throw new Error("Failed to fetch moves...");
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
  console.log(selectedPoke);
  const handleOpen = (i) => {
    const selected = team[`pokemon${i + 1}`];
    setSelectedPoke(selected);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("Team state has changed: ", team);
  }, [team]);

  const handleRemoveSingle = () => {
    const updatedTeam = { ...team };
    updatedTeam[`pokemon${pokemonIndex + 1}`] = { ...pokemonTemplate };

    setTeam(updatedTeam);

    const updatedMoves = { ...pokemonMoves };
    updatedMoves[`P${pokemonIndex + 1}`] = {
      move1: "",
      move2: "",
      move3: "",
      move4: "",
    };
    setPokemonMoves(updatedMoves);

    const updatedHeldItems = { ...heldItems };
    updatedHeldItems[`P${pokemonIndex + 1}`] = { value: null };
    setHeldItems(updatedHeldItems);

    const updatedNature = { ...natures };
    updatedNature[`P${pokemonIndex + 1}`] = { nature: null };
    setNatures(updatedNature);
    setOpen(false);
  };

  let findHeldItem;
  if (
    heldItems &&
    heldItems[`P${pokemonIndex + 1}`] &&
    heldItems[`P${pokemonIndex + 1}`].value &&
    gen === "gen2"
  ) {
    findHeldItem = gen3Items.find(
      (i) => i.item_name === heldItems[`P${pokemonIndex + 1}`].value.item_name
    );
  } else if (
    heldItems &&
    heldItems[`P${pokemonIndex + 1}`] &&
    heldItems[`P${pokemonIndex + 1}`].value &&
    gen === "gen3"
  ) {
    findHeldItem = gen3Items.find(
      (i) => i.item_name === heldItems[`P${pokemonIndex + 1}`].value.item_name
    );
  } else if (
    heldItems &&
    heldItems[`P${pokemonIndex + 1}`] &&
    heldItems[`P${pokemonIndex + 1}`].value &&
    gen === "gen4"
  ) {
    findHeldItem = gen4Items.find(
      (i) => i.item_name === heldItems[`P${pokemonIndex + 1}`].value.item_name
    );
  } else if (
    heldItems &&
    heldItems[`P${pokemonIndex + 1}`] &&
    heldItems[`P${pokemonIndex + 1}`].value &&
    gen === "gen5"
  ) {
    findHeldItem = gen5Items.find(
      (i) => i.item_name === heldItems[`P${pokemonIndex + 1}`].value.item_name
    );
  } else if (
    heldItems &&
    heldItems[`P${pokemonIndex + 1}`] &&
    heldItems[`P${pokemonIndex + 1}`].value &&
    gen === "gen6"
  ) {
    findHeldItem = gen6Items.find(
      (i) => i.item_name === heldItems[`P${pokemonIndex + 1}`].value.item_name
    );
  } else if (
    heldItems &&
    heldItems[`P${pokemonIndex + 1}`] &&
    heldItems[`P${pokemonIndex + 1}`].value &&
    gen === "gen7"
  ) {
    findHeldItem = gen7Items.find(
      (i) => i.item_name === heldItems[`P${pokemonIndex + 1}`].value.item_name
    );
  } else if (
    heldItems &&
    heldItems[`P${pokemonIndex + 1}`] &&
    heldItems[`P${pokemonIndex + 1}`].value &&
    gen === "gen8"
  ) {
    findHeldItem = gen8Items.find(
      (i) => i.item_name === heldItems[`P${pokemonIndex + 1}`].value.item_name
    );
  } else if (
    heldItems &&
    heldItems[`P${pokemonIndex + 1}`] &&
    heldItems[`P${pokemonIndex + 1}`].value &&
    gen === "gen9"
  ) {
    findHeldItem = gen8Items.find(
      (i) => i.item_name === heldItems[`P${pokemonIndex + 1}`].value.item_name
    );
  }

  let findNature;
  if (
    natures &&
    natures[`P${pokemonIndex + 1}`] &&
    natures[`P${pokemonIndex + 1}`].nature
  ) {
    findNature = nature.find(
      (i) => i.name === natures[`P${pokemonIndex + 1}`].nature.name
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
                  value={pokemonMoves[`P${pokemonIndex + 1}`].move1}
                  onChange={(e, value) => {
                    setPokemonMoves((prevMoves) => ({
                      ...prevMoves,
                      [`P${pokemonIndex + 1}`]: {
                        ...prevMoves[`P${pokemonIndex + 1}`],
                        move1: value,
                      },
                    }));
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
                  value={pokemonMoves[`P${pokemonIndex + 1}`].move2}
                  onChange={(e, value) => {
                    setPokemonMoves((prevMoves) => ({
                      ...prevMoves,
                      [`P${pokemonIndex + 1}`]: {
                        ...prevMoves[`P${pokemonIndex + 1}`],
                        move2: value,
                      },
                    }));
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
                  value={pokemonMoves[`P${pokemonIndex + 1}`].move3}
                  onChange={(e, value) => {
                    setPokemonMoves((prevMoves) => ({
                      ...prevMoves,
                      [`P${pokemonIndex + 1}`]: {
                        ...prevMoves[`P${pokemonIndex + 1}`],
                        move3: value,
                      },
                    }));
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
                  value={pokemonMoves[`P${pokemonIndex + 1}`].move4}
                  onChange={(e, value) => {
                    setPokemonMoves((prevMoves) => ({
                      ...prevMoves,
                      [`P${pokemonIndex + 1}`]: {
                        ...prevMoves[`P${pokemonIndex + 1}`],
                        move4: value,
                      },
                    }));
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
              <div className={gen === "gen2" ? "extras-gen2" : "extras"}>
                {gen === "gen2" ? (
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
                      value={heldItems[`P${pokemonIndex + 1}`].value}
                      onChange={(e, value) => {
                        setHeldItems((prevItems) => ({
                          ...prevItems,
                          [`P${pokemonIndex + 1}`]: {
                            ...prevItems[`P${pokemonIndex + 1}`],
                            value: value,
                          },
                        }));
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
                    <div className={gen === "gen2" ? "gen2" : "effect"}>
                      {findHeldItem ? (
                        <p>{findHeldItem.effects}</p>
                      ) : (
                        <p>No held item selected</p>
                      )}
                    </div>
                  </div>
                ) : gen !== "gen1" ? (
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
                          gen === "gen3"
                            ? gen3Items
                            : gen === "gen4"
                            ? gen4Items
                            : gen === "gen5"
                            ? gen5Items
                            : gen === "gen6"
                            ? gen6Items
                            : gen === "gen7"
                            ? gen7Items
                            : gen8Items
                        }
                        value={heldItems[`P${pokemonIndex + 1}`].value}
                        onChange={(e, value) => {
                          setHeldItems((prevItems) => ({
                            ...prevItems,
                            [`P${pokemonIndex + 1}`]: {
                              ...prevItems[`P${pokemonIndex + 1}`],
                              value: value,
                            },
                          }));
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
                      <div className={gen === "gen2" ? "gen2" : "effect"}>
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
                        value={natures[`P${pokemonIndex + 1}`].nature}
                        onChange={(e, value) => {
                          setNatures((prevNatures) => ({
                            ...prevNatures,
                            [`P${pokemonIndex + 1}`]: {
                              ...prevNatures[`P${pokemonIndex + 1}`],
                              nature: value,
                            },
                          }));
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
                      <div className={gen === "gen2" ? "hidden" : "nature"}>
                        {findNature && findNature.increased_stat ? (
                          <>
                            <p>+{findNature.increased_stat}</p>
                            <p>-{findNature.decreased_stat}</p>
                          </>
                        ) : !findNature && gen !== "gen2" ? (
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
                      <div
                        className={gen === "gen1" ? "hidden-box" : "container"}
                      >
                        <div
                          className={
                            gen === "gen2" ? "hidden" : "abilities-effect"
                          }
                        >
                          {loading ? (
                            <p>Loading...</p>
                          ) : (
                            gen !== "gen2" && (
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
              </div>
            </div>
          </Modal>
        </div>
      )}
      {teamArray.map((pokemon, index) => (
        <div key={index} className="selected-pokemon-cont">
          <img
            src={
              pokemon.sprite && !shinyStates[index]
                ? pokemon.sprite
                : pokemon.sprite && shinyStates[index]
                ? pokemon.shiny
                : "https://projectpokemon.org/images/sprites-models/homeimg/poke_capture_0000_000_uk_n_00000000_f_n.png"
            }
            alt={pokemon.sprite ? pokemon.name : "pokemon egg"}
            className={"selected-sprites"}
          />
          <button
            className={pokemon.name ? "shiny" : "shiny-dis"}
            {...(pokemon.name === null && "disabled")}
            onClick={() => {
              const updatedShinyStates = [...shinyStates];
              updatedShinyStates[index] = !updatedShinyStates[index];
              setShinyStates(updatedShinyStates);
            }}
          >
            Shiny
          </button>
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
          {pokemon.name && (
            <button
              className="edit-pokemon-button"
              onClick={() => handleOpen(index)}
            >
              Edit Pokemon
            </button>
          )}
        </div>
      ))}
      <button className="team-button" onClick={handleReset}>
        Reset Team
      </button>
      {window.sessionStorage.getItem("token") && (
        <button className="team-button" onClick={handleReset}>
          Save Team
        </button>
      )}
      <div className="line"></div>

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

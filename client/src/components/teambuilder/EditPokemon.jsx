import { useState } from "react";

function Edit() {
  const [openBar1, setOpenBar1] = useState(false);
  const [openBar2, setOpenBar2] = useState(false);
  const [openBar3, setOpenBar3] = useState(false);
  const [openBar4, setOpenBar4] = useState(false);
  const [P1Move1, setP1Move1] = useState("");
  const [P1Move2, setP1Move2] = useState("");
  const [P1Move3, setP1Move3] = useState("");
  const [P1Move4, setP1Move4] = useState("");
  const [P2Move1, setP2Move1] = useState("");
  const [P2Move2, setP2Move2] = useState("");
  const [P2Move3, setP2Move3] = useState("");
  const [P2Move4, setP2Move4] = useState("");
  const [P3Move1, setP3Move1] = useState("");
  const [P3Move2, setP3Move2] = useState("");
  const [P3Move3, setP3Move3] = useState("");
  const [P3Move4, setP3Move4] = useState("");
  const [P4Move1, setP4Move1] = useState("");
  const [P4Move2, setP4Move2] = useState("");
  const [P4Move3, setP4Move3] = useState("");
  const [P4Move4, setP4Move4] = useState("");
  const [P5Move1, setP5Move1] = useState("");
  const [P5Move2, setP5Move2] = useState("");
  const [P5Move3, setP5Move3] = useState("");
  const [P5Move4, setP5Move4] = useState("");
  const [P6Move1, setP6Move1] = useState("");
  const [P6Move2, setP6Move2] = useState("");
  const [P6Move3, setP6Move3] = useState("");
  const [P6Move4, setP6Move4] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedPoke, setSelectedPoke] = useState(null);
  const [open, setOpen] = useState(false);

  const url = window.location.href;
  const gen = url.split("/").pop();

  let movelist = [];
  useEffect(() => {
    if (selectedPoke) {
      async function fetchMoves() {
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
        };
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
          console.log(moveNames);
          setOptions(moveNames);
        } catch (err) {
          console.log(err);
        }
      }
      fetchMoves();
    }
  }, [selectedPoke]);
  const handleOpen = (i) => {
    const selected = team[`pokemon${i + 1}`];
    setSelectedPoke(selected);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("Team state has changed: ", team);
  }, [team]);

  let pokemonIndex;
  if (selectedPoke) {
    pokemonIndex = Object.values(team).findIndex(
      (pokemon) => pokemon.name === selectedPoke.name
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
                src={selectedPoke.sprite}
                alt={selectedPoke.name}
                className="selected-sprites-modal"
              />
              <div className="modal-types">
                <p
                  className={
                    selectedPoke.type1 ? `type ${selectedPoke.type1} modal` : ""
                  }
                >
                  {selectedPoke.type1.charAt(0).toUpperCase() +
                    selectedPoke.type1.slice(1)}
                </p>
                {selectedPoke.type2 && (
                  <p
                    className={
                      selectedPoke.type2
                        ? `type ${selectedPoke.type2} modal`
                        : ""
                    }
                  >
                    {selectedPoke.type2.charAt(0).toUpperCase() +
                      selectedPoke.type2.slice(1)}
                  </p>
                )}
              </div>
              <div className="bars1">
                <Autocomplete
                  className="bar"
                  sx={{
                    width: 300,
                  }}
                  variant="outlined"
                  open={openBar1}
                  onOpen={() => {
                    setOpenBar1(true);
                  }}
                  onClose={() => {
                    setOpenBar1(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={options.label}
                  options={options}
                  value={
                    pokemonIndex === 0
                      ? P1Move1
                      : pokemonIndex === 1
                      ? P2Move1
                      : pokemonIndex === 2
                      ? P3Move1
                      : pokemonIndex === 3
                      ? P4Move1
                      : pokemonIndex === 4
                      ? P5Move1
                      : P6Move1
                  }
                  onChange={(e, value) => {
                    pokemonIndex === 0
                      ? setP1Move1(value)
                      : pokemonIndex === 1
                      ? setP2Move1(value)
                      : pokemonIndex === 2
                      ? setP3Move1(value)
                      : pokemonIndex === 3
                      ? setP4Move1(value)
                      : pokemonIndex === 4
                      ? setP5Move1(value)
                      : setP6Move1(value);
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
                  open={openBar2}
                  onOpen={() => {
                    setOpenBar2(true);
                  }}
                  onClose={() => {
                    setOpenBar2(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={options.label}
                  options={options}
                  value={
                    pokemonIndex === 0
                      ? P1Move2
                      : pokemonIndex === 1
                      ? P2Move2
                      : pokemonIndex === 2
                      ? P3Move2
                      : pokemonIndex === 3
                      ? P4Move2
                      : pokemonIndex === 4
                      ? P5Move2
                      : P6Move2
                  }
                  onChange={(e, value) => {
                    pokemonIndex === 0
                      ? setP1Move2(value)
                      : pokemonIndex === 1
                      ? setP2Move2(value)
                      : pokemonIndex === 2
                      ? setP3Move2(value)
                      : pokemonIndex === 3
                      ? setP4Move2(value)
                      : pokemonIndex === 4
                      ? setP5Move2(value)
                      : setP6Move2(value);
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
                  open={openBar3}
                  onOpen={() => {
                    setOpenBar3(true);
                  }}
                  onClose={() => {
                    setOpenBar3(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={options.label}
                  options={options}
                  value={
                    pokemonIndex === 0
                      ? P1Move3
                      : pokemonIndex === 1
                      ? P2Move3
                      : pokemonIndex === 2
                      ? P3Move3
                      : pokemonIndex === 3
                      ? P4Move3
                      : pokemonIndex === 4
                      ? P5Move3
                      : P6Move3
                  }
                  onChange={(e, value) => {
                    pokemonIndex === 0
                      ? setP1Move3(value)
                      : pokemonIndex === 1
                      ? setP2Move3(value)
                      : pokemonIndex === 2
                      ? setP3Move3(value)
                      : pokemonIndex === 3
                      ? setP4Move3(value)
                      : pokemonIndex === 4
                      ? setP5Move3(value)
                      : setP6Move3(value);
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
                  open={openBar4}
                  onOpen={() => {
                    setOpenBar4(true);
                  }}
                  onClose={() => {
                    setOpenBar4(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={options.label}
                  options={options}
                  value={
                    pokemonIndex === 0
                      ? P1Move4
                      : pokemonIndex === 1
                      ? P2Move4
                      : pokemonIndex === 2
                      ? P3Move4
                      : pokemonIndex === 3
                      ? P4Move4
                      : pokemonIndex === 4
                      ? P5Move4
                      : P6Move4
                  }
                  onChange={(e, value) => {
                    pokemonIndex === 0
                      ? setP1Move4(value)
                      : pokemonIndex === 1
                      ? setP2Move4(value)
                      : pokemonIndex === 2
                      ? setP3Move4(value)
                      : pokemonIndex === 3
                      ? setP4Move4(value)
                      : pokemonIndex === 4
                      ? setP5Move4(value)
                      : setP6Move4(value);
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
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}
export default Edit;

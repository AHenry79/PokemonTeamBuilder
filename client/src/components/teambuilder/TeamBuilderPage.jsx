import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ModalComponents from "./ModalComponents";
import { useParams } from "react-router";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

function TeamBuilder() {
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedPoke, setSelectedPoke] = useState(null);
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  const token = window.sessionStorage.getItem("token");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

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

  const handleReset = () => {
    try {
      const resetTeam = {
        pokemon1: {},
        pokemon2: {},
        pokemon3: {},
        pokemon4: {},
        pokemon5: {},
        pokemon6: {},
      };
      window.localStorage.setItem(`team${gen}`, JSON.stringify(resetTeam));
      setResetCounter((prevCounter) => prevCounter + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const teamArray = Object.values(team);

  const [shinyStates, setShinyStates] = useState(
    Array(teamArray.length).fill(false)
  );

  useEffect(() => {
    console.log(teamArray);
  }, [teamArray]);

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

  const handleOpen = (i) => {
    const selected = team[`pokemon${i + 1}`];
    setSelectedPoke(selected);
    setOpen(true);
  };

  const handleOpenSave = () => {
    setOpenSave(true);
  };

  const handleClose = () => {
    setOpenSave(false);
    setSuccessMessage("");
  };

  const handleSaveTeam = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch account information");
      }
      const userData = await response.json();
      const userId = userData.id;
      const response2 = await fetch("/api/teams", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, team_name: teamName }),
      });
      const teams = await response2.json();
      const teamId = teams.id;
      const promises = teamArray.map(async (i) => {
        if (i.id) {
          return await fetch("/api/teams/pokemon", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              teams_id: teamId,
              pokemon_id: i.id,
              move1: i.move1,
              move2: i.move2,
              move3: i.move3,
              move4: i.move4,
              held_item_id: i.held_item && i.held_item.id,
              nature_id: i.nature && i.nature.id,
            }),
          })
            .then((response) => {
              if (response.ok) {
                setSuccessMessage("Team Successfully saved!");
              } else {
                setError(`Error saving pokemon ${i.name}`);
              }
            })
            .catch((err) => {
              console.error("Error: ", err);
            });
        }
      });
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Team state has changed: ", team);
  }, [team]);

  return (
    <>
      <ModalComponents
        selectedPoke={selectedPoke}
        open={open}
        setOpen={setOpen}
        shinyStates={shinyStates}
      />
      <Modal open={openSave} onClose={handleClose}>
        <div className="save-box">
          <h1>Team Name:</h1>
          {!teamName && <h5 className="warn">Must input a team name!</h5>}
          <input
            type="text"
            className="form-control"
            placeholder="Team name..."
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <button
            onClick={handleSaveTeam}
            className="save-button"
            disabled={!teamName}
          >
            Save Team
          </button>
          {successMessage ? (
            <h5>{successMessage}</h5>
          ) : (
            error && <h5 className="warn">{error}</h5>
          )}
        </div>
      </Modal>
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
        <button className="team-button" onClick={handleOpenSave}>
          {loading ? <CircularProgress /> : "Save Team"}
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

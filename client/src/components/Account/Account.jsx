import { useState, useEffect } from "react";
import { Modal } from "@mui/material";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [teams_id, setTeamsId] = useState(null);
  const [favoritedTeams, setFavoritedTeams] = useState(null);
  const token = window.sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
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
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  const fetchUserTeams = async (teams_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/teams/pokemon/${teams_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user's teams");
      }

      const userTeamsData = await response.json();
      console.log("User Teams Information:", userTeamsData);
      setTeamDetails(userTeamsData); // Set team details
    } catch (error) {
      console.error("Error fetching user teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async () => {
    if (selectedTeam !== null) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/teams/pokemon/${selectedTeam}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete team");
        }

        console.log("Team deleted successfully");

        const updatedUserTeams = user.teams.filter(
          (team) => team.id !== selectedTeam
        );
        setUser((prevUser) => ({
          ...prevUser,
          teams: updatedUserTeams,
        }));
        clearSelectedTeam();
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    } else {
      console.error("No team selected to delete");
    }
  };

  const showTeam = async (teams_id) => {
    if (teams_id !== null) {
      setTeamsId(teams_id);
      setSelectedTeam(teams_id);
      await fetchUserTeams(teams_id);
    } else {
      console.error("teams_id is null. Cannot fetch user teams.");
    }
  };

  const clearSelectedTeam = () => {
    setSelectedTeam(null);
    setTeamDetails(null);
  };

  return user ? (
    <div className="user-page">
      <div className="user-info">
        <h2>Account Information:</h2>
        <img
          src={user.profile_pic || "default-profile-picture-url"}
          alt={`${user.username}'s profile`}
        />
        <div className="usernameAndEmail">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>

      <br />
      <div className="userTeamsFavs">
        <h3>Created Teams</h3>
        <div className="user-teams">
          <img src="https://www.giantbomb.com/a/uploads/square_small/12/120992/2257701-firered_leafgreen_red.png"></img>

          <div className="mapped-teams">
            {user.teams.map((team) => (
              <div key={team.id}>
                <div className="team-names">
                  {team.team_name}
                  <button onClick={() => showTeam(team.id)}>
                    Show team info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          open={selectedTeam !== null}
          onClose={clearSelectedTeam}
          aria-labelledby="team-modal-title"
          aria-describedby="team-modal-description"
          className="Rec-modal"
        >
          <div className="modal-content-teams">
            <button onClick={clearSelectedTeam} className="close-button">
              Close
            </button>
            <h2>Team Details:</h2>
            {teamDetails && (
              <div className="teams-container">
                <div className="pokemon-list">
                  {teamDetails.map((team) => (
                    <div key={team.id} className="team-details">
                      <div className="TeamPokemon-details">
                        {team.pokemon.sprite && (
                          <img
                            src={team.pokemon.sprite}
                            alt={team.pokemon.name}
                          />
                        )}
                        <div className="pokemon-name">
                          {team.pokemon.name.charAt(0).toUpperCase() +
                            team.pokemon.name.slice(1)}
                        </div>
                        <div className="types">
                          <p
                            className={
                              team.pokemon.type1
                                ? `type ${team.pokemon.type1}`
                                : ""
                            }
                          >
                            {team.pokemon.type1 &&
                              team.pokemon.type1.charAt(0).toUpperCase() +
                                team.pokemon.type1.slice(1)}
                          </p>
                          <p
                            className={
                              team.pokemon.type2
                                ? `type ${team.pokemon.type2}`
                                : ""
                            }
                          >
                            {team.pokemon.type2 &&
                              team.pokemon.type2.charAt(0).toUpperCase() +
                                team.pokemon.type2.slice(1)}
                          </p>
                          {team.held_item && <p>{team.held_item}</p>}
                        </div>

                        <div className="TeamPokemon-moveset">
                          <div className="TeamPokemonleft-moves">
                            {team.move1 && (
                              <p>
                                {team.move1.charAt(0).toUpperCase() +
                                  team.move1.slice(1)}
                              </p>
                            )}
                            {team.move2 && (
                              <p>
                                {team.move2.charAt(0).toUpperCase() +
                                  team.move2.slice(1)}
                              </p>
                            )}
                          </div>
                          <div className="Teampokemonright-moves">
                            {team.move3 && (
                              <p>
                                {team.move3.charAt(0).toUpperCase() +
                                  team.move3.slice(1)}
                              </p>
                            )}
                            {team.move4 && (
                              <p>
                                {team.move4.charAt(0).toUpperCase() +
                                  team.move4.slice(1)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={clearSelectedTeam} className="Return-button">
                    Return
                  </button>
                </div>

                <div className="side-picture right-picture"></div>

                <button onClick={() => deleteTeam()} className="delete-button">
                  Delete Team
                </button>
              </div>
            )}
          </div>
        </Modal>

        <br />
      </div>
    </div>
  ) : (
    <div>
      Error fetching user's data - Please login if you have an account or
      register!
    </div>
  );
};

export default AccountPage;

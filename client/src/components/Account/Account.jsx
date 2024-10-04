import { useState, useEffect } from "react";
import { CircularProgress, Modal } from "@mui/material";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [teams_id, setTeamsId] = useState(null);
  const token = window.sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [loadingMod, setLoadingMod] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
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
  }, []);

  const fetchUserTeams = async (teams_id) => {
    setLoadingMod(true);
    try {
      const response = await fetch(`/api/teams/pokemon/${teams_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user's teams");
      }
      const userTeamsData = await response.json();
      const teamsWithDetails = await Promise.all(
        userTeamsData.map(async (team) => {
          const natureInfo = team.nature_id
            ? await getNature(team.nature_id)
            : null;
          const itemInfo = team.held_item_id
            ? await getItemName(team.held_item_id)
            : null;

          return {
            ...team,
            nature: natureInfo,
            item_name: itemInfo,
          };
        })
      );

      setTeamDetails(teamsWithDetails);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    } finally {
      setLoadingMod(false);
    }
  };

  const getItemName = async (held_item_id) => {
    try {
      const response = await fetch(`/api/items/${held_item_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch item");
      }

      const itemInfo = await response.json();
      return itemInfo;
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const getNature = async (nature_id) => {
    try {
      const response = await fetch(`/api/natures/${nature_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch item");
      }

      const natureInfo = await response.json();
      return natureInfo;
    } catch (error) {
      console.error("Error fetching nature:", error);
    }
  };
  const deleteTeam = async () => {
    setLoadingDel(true);
    if (selectedTeam !== null) {
      try {
        const response = await fetch(`/api/teams/pokemon/${selectedTeam}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete team");
        }

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
      } finally {
        setLoadingDel(false);
      }
    } else {
      console.error("No team selected to delete");
    }
  };

  const showTeam = async (teams_id) => {
    if (teams_id) {
      setTeamsId(teams_id);
      setSelectedTeam(teams_id);
      await fetchUserTeams(teams_id);
    }
  };
  const clearSelectedTeam = () => {
    setSelectedTeam(null);
    setTeamDetails(null);
  };

  return loading ? (
    <div className="account-load">
      <CircularProgress />
    </div>
  ) : !loading && user ? (
    <div className="user-page">
      <div className="user-info-container">
        <h2 className="account-info">Account Information:</h2>
        <div className="user-info">
          <div className="user-info-every">
            <img
              className="pfp"
              src={user.profile_pic || "default-profile-picture-url"}
              alt={`${user.username}'s profile picture`}
              title={`${user.username}'s profile picture`}
            />
            <div></div>
            <div className="usernameAndEmail">
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
          <div className="gym-badges">
            <img
              src="https://pokemaniacal.com/wp-content/uploads/2020/10/kanto-badges-1.png"
              alt="kanto gym badges"
              className="badges-kanto"
            />
          </div>
          <img
            src="https://www.giantbomb.com/a/uploads/square_small/12/120992/2257701-firered_leafgreen_red.png"
            alt="red"
            className="red-image"
          />
        </div>
      </div>
      <br />
      <div className="line"></div>
      <div className="userTeamsFavs">
        <div className="user-teams">
          <div className="teamsss">
            <h3>Created Teams:</h3>
            <div className="mapped-teams">
              {user.teams.length > 0 ? (
                user.teams.map((team) => (
                  <div key={team.id}>
                    <div className="team-names">
                      {team.team_name}
                      <button
                        className="account-team-button"
                        onClick={() => showTeam(team.id)}
                      >
                        Show Team
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Saved Teams...</p>
              )}
            </div>
          </div>
        </div>
        <Modal
          open={selectedTeam && true}
          onClose={clearSelectedTeam}
          aria-labelledby="team-modal-title"
          aria-describedby="team-modal-description"
          className="acc-modal"
        >
          <div className="modal-content-teams">
            <h2 className="mod-team-details">Team Details:</h2>

            {loadingMod ? (
              <div className="account-load">
                <CircularProgress />
              </div>
            ) : !teamDetails ? (
              <div>
                <h3>Failed to Fetch Team...</h3>
                <button onClick={clearSelectedTeam} className="Return-button">
                  Return
                </button>
              </div>
            ) : (
              teamDetails && (
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
                            <div className="item-nature">
                              {team.item_name ? (
                                <p>{`Item: ${team.item_name.item_name}`}</p>
                              ) : (
                                <p>No item</p>
                              )}
                              {team.nature ? (
                                <p>{`Nature: ${team.nature.name}`}</p>
                              ) : (
                                <p>No nature</p>
                              )}
                            </div>
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
                            <div className="TeamPokemonright-moves">
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
                  </div>
                  <button onClick={clearSelectedTeam} className="Return-button">
                    Return
                  </button>
                  <div className="side-picture right-picture"></div>
                  <button
                    onClick={() => deleteTeam()}
                    className="delete-button"
                    disabled={loadingDel}
                  >
                    {loadingDel ? <CircularProgress /> : "Delete Team"}
                  </button>
                </div>
              )
            )}
          </div>
        </Modal>
        <br />
      </div>
    </div>
  ) : (
    !user && (
      <div className="account-error">
        Error fetching user's data - Please login if you have an account or
        register!
      </div>
    )
  );
};

export default AccountPage;

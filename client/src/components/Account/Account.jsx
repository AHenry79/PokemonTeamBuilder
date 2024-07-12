import React, { useState, useEffect } from "react";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(null);
  const [favoritedTeams, setFavoritedTeams] = useState(null);
  const token = window.sessionStorage.getItem("token");
  // console.log("Token:", token);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
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
        console.log("User Information:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    user ?
      <div className="user-page">
        
        <div className="user-info">
          <h2>Account Information:</h2>
          <img src={user.profile_pic || 'default-profile-picture-url'} alt={`${user.username}'s profile`} />
          <div className="usernameAndEmail">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          </div>
        </div>
  
        <br></br>
        <div className="userTeamsFavs">
        <h3>Created Teams</h3>
        <div className="user-teams">
          
          {user.teams.map((team) => (
            <div key={team.id}>{team.team_name}</div>
           
          ))}
          </div>

          <br></br>
          <h3>Favorited Teams</h3>
          <div className="user-favorites">
          
          {user.favorites.map((team) => (
            <div key={team.id}>{team.team_name}</div>
          ))}
          </div>
        </div>
        </div>
      :
      <div>
        Error fetching user's data - Please login if you have an account or register! 
      </div>
  );
};

export default AccountPage;

// useEffect(() => {
//   console.log(user)
// }, [user])


// useEffect(() => {
//   if (user) {
//     const fetchUserTeams = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/users/${user.id}/teams`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch created teams");
//         }

//         const teamsData = await response.json();
//         console.log("teams:", teamsData);
//         setTeams(teamsData);
//       } catch (error) {
//         console.error("Error fetching created teams:", error);
//       }
//     };
//     fetchUserTeams();
//   }
// }, [user]);

// const fetchUserFavoritedTeams = async () => {
//   try {
//     const response = await fetch(
//       `http://localhost:8080/api/users/${user.id}/favorites`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch favorited teams");
//     }

//     const favteamsData = await response.json();
//     console.log("favteams:", favteamsData);
//     setFavoritedTeams(favteamsData);
//   } catch (error) {
//     console.error("Error fetching favorited teams:", error);
//   }
// };
// fetchUserFavoritedTeams();

// if (!user) {
//   return (
//     <div>
//       Error fetching user's data - Please login if you have an account or
//       register!
//     </div>
//   );
// }



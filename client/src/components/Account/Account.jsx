import React, { useState, useEffect } from 'react';

const token = localStorage.getItem('token');

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [teams, setTeams] = useState(null);
    const [favoritedTeams, setFavoritedTeams] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5173/auth/me', {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    },
                  });
                  if (!response.ok) {
                    throw new Error('Failed to fetch account information');
                  };


                const userData = await response.json();
                console.log('User Information:', userData);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };


    fetchUserData();
}, []);


useEffect(() => {
    if (user) {
      const fetchUserTeams = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5173/api/users/${user.id}/teams`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
   
          if (!response.ok) {
            throw new Error('Failed to fetch created teams');
          }
   
          const teamsData = await response.json();
          console.log('teams:', teamsData);
          setTeams(teamsData);
        } catch (error) {
          console.error('Error fetching created teams:', error);
        }
      };
      fetchUserTeams();
    }
  }, [user]);


  const fetchUserFavoritedTeams = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5173/api/users/${user.id}/favorites`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });


      if (!response.ok) {
        throw new Error('Failed to fetch favorited teams');
      }


      const favteamsData = await response.json();
      console.log('favteams:', favteamsData);
      setFavoritedTeams(favteamsData);
    } catch (error) {
      console.error('Error fetching favorited teams:', error);
    }
  };
  fetchUserFavoritedTeams();


if (!user) {
    return <div>Error fetching user's data - Please login if you have an account or register!</div>;
}


return (
<div className="user-page">
    <div className="user-info">
        <img src={user.profilePicture} alt={`${user.username}'s profile`} />
        <h2>Username: {user.username}</h2>
        <p>Email: {user.email}</p>
    </div>
    <div className="teams">
        <h3>Created Teams</h3>
        {user.teams.map((team) => (
          <div key={team.id}>{team.team_name}</div>
        ))}
        <h3>Favorited Teams</h3>
        {user.favorites.map((team) => (
          <div key={team.id}>{team.team_name}</div>
        ))}
      </div>
    </div>
  );
};


export default AccountPage;
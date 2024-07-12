import React from 'react';
import { useState } from 'react';
import { Modal } from '@mui/material';
import teams from '../utils/recTeams';
import { Link } from 'react-router-dom';

const RecommendedTeamsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showPokeInfo, setShowPokeInfo] = useState(true);
  
  const handleTeamClick = (generation) => {
    setSelectedTeam(generation);
    setShowPokeInfo(generation !== 'gen1');
};
 
const clearSelectedTeam = () => {
    setSelectedTeam(null);
};


return (
<div className="teams-container">
    <h1>Recommended Pokémon Teams</h1>
    <div className='teams'>
    <div className="team-selection">
        {Object.keys(teams).map((generation, index) => (
            <div key={index} className="team-card">
                <h3>Generation {index + 1}</h3>
                <img
                src={teams[generation].teamImage}
                alt={`Generation ${index + 1} Pokémon Team`}
                onClick={() => handleTeamClick(generation)}
                className="team-image"
                />
            </div>
          ))}
    </div>
    </div>
 
        <Modal
          open={selectedTeam}  
          onClose={clearSelectedTeam}  
          aria-labelledby="team-modal-title"  
          aria-describedby="team-modal-description"  
          className="Rec-modal"
        >
          <div className="modal-content">
            {selectedTeam && (
              <>
              <div className="ModalButtons1st">
                <Link to={`/teambuilder/${selectedTeam}`}>
                <button>Create Team</button>
                </Link>
                <button onClick={clearSelectedTeam}>X</button>
                </div>
                <div className="pokemon-list">
                  {teams[selectedTeam].pokemonList.map((pokemon, pokemonIndex) => (
                    <div key={pokemonIndex} className="pokemon-details">
                    <img src={pokemon.sprite}/>
                      <p>{pokemon.name}</p>
                      <div className="pokemon-type">
                        <p className={pokemon.type1 ? `type ${pokemon.type1.charAt(0).toLowerCase()+pokemon.type1.slice(1)}` : ""}>{pokemon.type1} </p>
                        <p className={pokemon.type2 ? `type ${pokemon.type2.charAt(0).toLowerCase()+pokemon.type2.slice(1)}` : ""}>{pokemon.type2} </p>
                </div>
                {showPokeInfo && (
                <div className='Poke-info'>
                {pokemon.ability && <p>Ability: {pokemon.ability}</p>}
                  {pokemon.nature && <p>Nature: {pokemon.nature}</p>}
                  {pokemon.item && <p>Held item: {pokemon.item}</p>}
                  {pokemon.Evs && <p>Evs: {pokemon.Evs}</p>}
                  </div>
                )}
                  <div className='moveset'>
                <div className="left-moves">
                  <p>{pokemon.moveset[0]}</p>
                  <p>{pokemon.moveset[1]}</p>
                  </div>
                  <div className="right-moves">
                  <p>{pokemon.moveset[2]}</p>
                    <p>{pokemon.moveset[3]}</p>
                    </div>
                </div>
                     
                    </div>
                  ))}
                </div>
              </>
            )}
            <button onClick={clearSelectedTeam}>Return</button>
          </div>
        </Modal>
      </div>
    );
  };
 
  export default RecommendedTeamsPage;

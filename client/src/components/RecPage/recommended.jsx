import React from 'react';


// Sample data for recommended teams (placeholder)
const teams = {
  gen_1: {
    teamImage:'https://i.ibb.co/WpJ2J8t/gen1.png',
    pokemonList:[
    { name: 'Venusaur', type: 'Grass/Poison' },
    { name: 'Nidoking', type: 'Poison/Ground' },
    { name: 'Arcanine', type: 'Fire' },
    { name: 'Slowbro', type: 'Water/Psychic' },
    { name: 'Jolteon', type: 'Electric' },
    { name: 'Dodrio', type: 'Normal/Flying' }
  ]
},
  gen_2: {
    teamImage:'https://i.ibb.co/7C8R9RC/gen2.png',
    pokemonList:[
    { name: 'Typhlosion', type: 'Fire' },
    { name: 'Ampharos', type: 'Electric' },
    { name: 'Quagsire', type: 'Water/Ground' },
    { name: 'Crobat', type: 'Poison/Flying' },
    { name: 'Espeon', type: 'Psychic' },
    { name: 'Jynx', type: 'Ice/Psychic' }
  ]
},
  gen_3: {
    teamImage:'https://i.ibb.co/BLwkkrW/gen3.png',
    pokemonList:[
    { name: 'Swampert', type: 'Water/Ground' },
    { name: 'Swellow', type: 'Normal/Flying' },
    { name: 'Gardevoir', type: 'Psychic' },
    { name: 'Aggron', type: 'Rock/Steel' },
    { name: 'Salamence', type: 'Flying/Dragon' },
    { name: 'Metagross', type: 'Psychic/Steel' }
  ]
},
  gen_4: {
    teamImage:'https://i.ibb.co/GFs77Cd/gen4.png',
    pokemonList:[
    { name: 'Infernape', type: 'Fire/Fighting' },
    { name: 'Staraptor', type: 'Normal/Flying' },
    { name: 'Luxray', type: 'Electric' },
    { name: 'Garchomp', type: 'Dragon/Ground' },
    { name: 'Gastrodon', type: 'Water/Ground' },
    { name: 'Lucario', type: 'Fighting/Steel' }
  ]
},
  gen_5: {
    teamImage:'https://i.ibb.co/wQCxzrw/gen5.png',
    pokemonList:[
    { name: 'Emboar', type: 'Fire/Fighting' },
    { name: 'Seismitoad', type: 'Water/Ground' },
    { name: 'Lilligant', type: 'Grass' },
    { name: 'Galvantula', type: 'Bug/Electric' },
    { name: 'Vanilluxe', type: 'Ice' },
    { name: 'Haxorus', type: 'Dragon' }
  ]
},
  gen_6: {
    teamImage:'https://i.ibb.co/89cghKc/gen6.png',
    pokemonList:[
    { name: 'Greninja', type: 'Water/Dark' },
    { name: 'Talonflame', type: 'Fire/Flying' },
    { name: 'Hawlucha', type: 'Fighting/Flying' },
    { name: 'Aegislash', type: 'Steel/Ghost' },
    { name: 'Gardevoir', type: 'Psychic/Fairy' },
    { name: 'Tyrantrum', type: 'Rock/Dragon' }
  ]
},
  gen_7: {
    teamImage:'https://i.ibb.co/zGZKV1N/gen7.png',
    pokemonList:[
    { name: 'Primarina', type: 'Water/Fairy' },
    { name: 'Lycanroc', type: 'Rock' },
    { name: 'Alolan Raichu', type: 'Electric/Psychic' },
    { name: 'Salazzle', type: 'Poison/Fire' },
    { name: 'Palossand', type: 'Ghost/Ground' },
    { name: 'Bewear', type: 'Normal/Fighting' }
  ]
},
  gen_8: {
    teamImage:'https://i.ibb.co/hcmy1gj/gen8.png',
    pokemonList:[
    { name: 'Cinderace', type: 'Fire' },
    { name: 'Corviknight', type: 'Flying/Steel' },
    { name: 'Boltund', type: 'Electric' },
    { name: 'Flapple', type: 'Grass/Dragon' },
    { name: 'Grimmsnarl', type: 'Dark/Fairy' },
    { name: 'Sirfetch\'d', type: 'Fighting' }
  ]
},
  gen_9: {
    teamImage:'https://i.ibb.co/JcBHShw/gen9.png',
    pokemonList:[
    { name: 'Skeledirge', type: 'Fire/Ghost' },
    { name: 'Pawmot', type: 'Electric/Fighting' },
    { name: 'Clodsire', type: 'Poison/Ground' },
    { name: 'Tinkaton', type: 'Fairy/Steel' },
    { name: 'Farigiraf', type: 'Normal/Psychic' },
    { name: 'Baxcalibur', type: 'Dragon/Ice' }
  ]
},
};

function RecommendedTeamsPage() {
  const renderGenerationTeams = () => {
    const generations = Object.keys(teams);

    return generations.map((generation, index) => (
      <div key={index} className={`gen-container gen_${index + 1}`}>
        
        <div className={`gen_${index + 1} team-container`}>
        <h2>Generation {index + 1}</h2>
          <img src={teams[generation].teamImage} alt={`Generation ${index + 1} Pokémon Team`} />
          <div className={`gen_${index + 1} pokemon-list`}>
            {teams[generation].pokemonList.map((pokemon, pokemonIndex) => (
              <div key={pokemonIndex} className={`pokemon-details`}>
                <p>{pokemon.name}</p>
                <p>{pokemon.type}</p>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="teams-container">
      <h1>Recommended Pokémon Teams</h1>
      {renderGenerationTeams()}
    </div>
  );
}

export default RecommendedTeamsPage;
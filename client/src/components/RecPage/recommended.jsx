import React from 'react';
import { useState } from 'react';
import { Modal } from '@mui/material';




const teams = {
    gen_1: {
      teamImage:'https://i.ibb.co/WpJ2J8t/gen1.png',
      pokemonList:[
      { name: 'Venusaur', type1: 'Grass', type2:'Poison', moveset:['Sleep Powder','Swords Dance','Razor Leaf','Hyper Beam'], sprite:'https://www.pokencyclopedia.info/sprites/gen1/spr_green_gb/spr_green-gb_003.png'},
      { name: 'Nidoking', type1: 'Poison', type2:'Ground', moveset:['Earthquake','Thunderbolt','Blizzard','Rock Slide'], sprite:'https://www.pokencyclopedia.info/sprites/gen1/spr_red-blue_gb/spr_rb-gb_034.png' },
      { name: 'Arcanine', type1: 'Fire',  moveset:['Fire Blast','Body Slam','Hyper Beam', 'Reflect'], sprite:'https://www.pokencyclopedia.info/sprites/gen1/spr_red-blue_gb/spr_rb-gb_059.png'},
      { name: 'Slowbro', type1: 'Water',type2:'Psychic', moveset:['Amnesia','Surf','Psychic','Rest'], sprite:'https://www.pokencyclopedia.info/sprites/gen1/spr_green_gb/spr_green-gb_080.png' },
      { name: 'Jolteon', type1: 'Electric', moveset:['Thunder Wave','Thunderbolt','Double Kick','Pin Missile'], sprite:'https://www.pokencyclopedia.info/sprites/gen1/spr_green_gb/spr_green-gb_135.png' },
      { name: 'Dodrio', type1: 'Normal',type2:'Flying', moveset:['Body Slam','Drill Peck','Hyper Beam','Agility'], sprite:'https://www.pokencyclopedia.info/sprites/gen1/spr_red-blue_gb/spr_rb-gb_085.png' }
    ]
  },
    gen_2: {
      teamImage:'https://i.ibb.co/7C8R9RC/gen2.png',
      pokemonList:[
      { name: 'Typhlosion', type1: 'Fire', moveset:['Fire Blast','Dynamic Punch','Earthquake','Thunder Punch'], item:'Leftovers',  sprite:'https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_157.png' },
      { name: 'Ampharos', type1: 'Electric', moveset:['Thunderbolt','Hidden Power Ice','Rest','Sleeptalk'], item:'Leftovers', sprite:'https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_181.png' },
      { name: 'Quagsire', type1: 'Water', type2:'Ground', moveset:['Earthquake','Sludge Bomb','Hidden Power Rock','Belly Drum'], item:'Leftovers/Miracle Berry', sprite:'https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_195.png' },
      { name: 'Crobat', type1: 'Poison', type2:'Flying', moveset:['Wing Attack','Confuse Ray','Thief','Haze'], item:'Leftovers', sprite:'https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_169.png' },
      { name: 'Espeon', type1: 'Psychic', moveset:['Psychic','Hidden Power Water/Fire','Morning Sun','Growth'], item:'Leftovers', sprite:'https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_196.png' },
      { name: 'Jynx', type1: 'Ice', type2:'Psychic', moveset:['Lovely Kiss','Ice Beam','Psychic','Nightmare'], item:'Leftovers', sprite:'https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_124.png' }
    ]
  },
    gen_3: {
      teamImage:'https://i.ibb.co/BLwkkrW/gen3.png',
      pokemonList:[
      { name: 'Swampert', type1: 'Water', type2:'Ground', ability:'Torrent', nature: 'Relaxed', item:'Leftovers', Evs:'248 HP/ 216 Def/ 44 SpD', moveset:['Earthquake','Ice Beam','Hydro Pump','Protect'], sprite:'https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_260.gif' },
      { name: 'Swellow', type1: 'Normal', type2:'Flying', ability:'Guts', nature: 'Jolly', item:'Choice Band', Evs:'4 HP/ 252 Atk/ 252 Spe', moveset:['Aerial Ace','Return','Hidden Power Ground/Fighting','Facade'], sprite:'https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_277.gif' },
      { name: 'Gardevoir', type1: 'Psychic', ability:'Trace', nature: 'Timid', item:'Leftovers', Evs:'56 HP/ 252 SpA/ 200 Spe', moveset:['Calm Mind','Psychic','Thunderbolt','Destiny Bond/Will-O-Wisp'], sprite:'https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_282.gif' },
      { name: 'Aggron', type1: 'Rock', type2:'Steel', ability:'Sturdy', nature: 'Brave', item: 'Leftovers',Evs: '228 HP/ 252 Atk/ 28 SpA', moveset:['Rock Slide','Ice Beam','Focus Punch','Substitute'], sprite:'https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_306.gif'},
      { name: 'Salamence', type1: 'Dragon', type2:'Flying', ability:'Intimidate', nature: 'Rash/Naive', item: 'Leftovers',Evs: '4 Atk/ 252 SpA/ 252 Spe', moveset:['Dragon Claw','Brick Break','Hidden Power Grass','Fire Blast'], sprite:'https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_373.gif'},
      { name: 'Metagross', type1: 'Steel', type2:'Psychic', ability:'Clear Body', nature: 'Adamant', item: 'Choice Band',Evs: '128 HP/ 252 Atk/ 128 Spe', moveset:['Meteor Mash','Hidden Power Bug','Earthquake','Rock Slide'], sprite:'https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_376.gif'}
    ]
  },
    gen_4: {
      teamImage:'https://i.ibb.co/GFs77Cd/gen4.png',
      pokemonList:[
      { name: 'Infernape', type1: 'Fire', type2:'Fighting', ability:'Blaze', nature: 'Naive/Rash', item:'Expert Belt/Life Orb', Evs: '64 Atk/ 252 SpA/ 192 Spe', moveset:['Fire Blast','Close Combat','U-turn','Mach Punch'], sprite:'https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_392_1.png' },
      { name: 'Staraptor', type1: 'Normal', type2:'Flying', ability:'Intimidate', nature: 'Adamant/Jolly', item:'Choice Band', Evs:'252 Atk/ 4 Def/ 252 Spe', moveset:['Brave Bird','Return','Close Combat','Quick Attack'], sprite:'https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_398_m-1.png' },
      { name: 'Luxray', type1: 'Electric', ability:'Intimidate', nature: 'Naughty', item:'Life Orb', Evs:'204 Atk/ 156 SpA/ 148 Spe', moveset:['Thunderbolt','Crunch','Superpower','Hidden Power Grass/Ice Fang'], sprite:'https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_405_m-2.png' },
      { name: 'Garchomp', type1: 'Dragon', type2:'Ground', ability:'Sand Veil', nature: 'Jolly', item: 'Choice Scarf', Evs:'4 HP/ 252 Atk/ 252 Spe', moveset:['Outrage','Earthquake','Dragon Claw','Sleep Talk'], sprite:'https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_445_m-1.png' },
      { name: 'Gastrodon', type1: 'Water', type2:'Ground', ability:'Sticky Hold', nature: 'Careful', item:'Leftovers', Evs:'252 HP/ 16 Def/ 240 SpD', moveset:['Curse','Waterfall','Earthquake','Recover'], sprite:'https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_423-west_1.png' },
      { name: 'Lucario', type1: 'Fighting', type2:'Steel', ability:'Inner Focus', nature: 'Adamant/Jolly', item:'Life Orb', Evs:'252 Atk/ 4 SpD/ 252 Spe', moveset:['Swords Dance','Close Combat','Extreme Speed','Bullet Punch/Ice Punch/Crunch'], sprite:'https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_448_1.png' }
    ]
  },
    gen_5: {
      teamImage:'https://i.ibb.co/wQCxzrw/gen5.png',
      pokemonList:[
      { name: 'Emboar', type1: 'Fire', type2:'Fighting', ability:'Blaze', nature: 'Rash', item:'Expert Belt/Life Orb', Evs:'72 Atk/ 252 SpA/ 184 Spe', moveset:['Fire Blast','Superpower','Grass Knot','Wild Charge/Sleep Talk'], sprite:'https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_500.gif' },
      { name: 'Seismitoad', type1: 'Water', type2:'Ground', ability:'Water Absorb', nature: 'Relaxed', item:'Leftovers', Evs:'200 HP/ 252 Def/ 56 SpD', moveset:['Toxic','Scald','Knock Off','Earth Power'], sprite:'https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_537.gif' },
      { name: 'Lilligant', type1: 'Grass', ability:'Chlorophyll', nature: 'Timid', item:'Life Orb/Lum Berry', Evs:'4 HP/ 252 SpA/ 252 Spe', moveset:['Quiver Dance','Sleep Powder','Giga Drain','Hidden Power Rock/Hidden Power Fire'], sprite:'https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_549.gif' },
      { name: 'Galvantula', type1: 'Bug', type2:'Electric', ability:'Compound Eyes', nature: 'Timid', item:'Life Orb/Choice Specs', Evs:'252 SpA/ 4 SpD/ 252 Spe', moveset:['Thunder','Bug Buzz','Giga Drain','Volt Switch'], sprite:'https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_596.gif' },
      { name: 'Vanilluxe', type1: 'Ice', ability:'Ice Body', nature: 'Modest', item:'Life Orb/Icicle Plate', Evs:'78 HP/ 252 SpA/ 180 Spe', moveset:['Autotomize','Ice Beam','Hidden Power Ground','Flash Cannon'], sprite:'https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_584.gif' },
      { name: 'Haxorus', type1: 'Dragon', ability:'Mold Breaker', nature: 'Jolly', item:'Lum Berry/Yache Berry', Evs:'252 Atk/ 4 Def/ 252 Spe', moveset:['Dragon Dance','Outrage','Superpower','Dual Chop'], sprite:'https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_612.gif' }
    ]
  },
    gen_6: {
      teamImage:'https://i.ibb.co/89cghKc/gen6.png',
      pokemonList:[
      { name: 'Greninja', type1: 'Water', type2:'Dark', ability:'Protean', nature: 'Timid/Naive', item:'Life Orb', Evs:'20 Atk/ 236 SpA/ 252 Spe', moveset:['Ice Beam','Dark Pulse','Gunk Shot','Water Shuriken'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_658__xy.gif' },
      { name: 'Talonflame', type1: 'Fire', type2:'Flying', ability:'Gale Wings', nature: 'Adamant', item:'Leftovers/No item', Evs:'248 HP/ 252 ATK/ 8 Def', moveset:['Brave Bird','Acrobatics','Swords Dance','Roost'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_663__xy.gif' },
      { name: 'Hawlucha', type1: 'Fighting', type2:'Flying', ability:'Unburder', nature: 'Jolly', item:'Sitrus Berry', Evs:'12 HP/ 244 Atk/ 252 Spe', moveset:['Substitute','Swords Dance','Acrobatics','High Jump Kick'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_701__xy.gif' },
      { name: 'Aegislash', type1: 'Steel', type2:'Ghost', ability:'',nature: 'Sassy', item:'Leftovers', Evs:'252 HP/ 4 Def/ 252 SpA', moveset:['Kings Shield','Shadow Ball','Flash Cannon','Protect'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_681-shield__xy.gif' },
      { name: 'Mega Gardevoir', type1: 'Psychic', type2:'Fairy', ability:'Trace', nature: 'Timid/Modest', item:"Gardevoirite", Evs:'16 HP/ 8 Def/ 232 SpA/ 252 Spe', moveset:['Moonblast','Hyper Voice','Shadow Ball','Calm Mind'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_282-mega__xy.gif' },
      { name: 'Tyrantrum', type1: 'Rock', type2:'Dragon', ability:'Rock Head',nature: 'Adamant/Jolly', item:'Choice Band', Evs:'252 Atk/ 4 Def/ 252 Spe', moveset:['Head Smash','Outrage','Earthquake','Superpower'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_697__xy.gif' }
    ]
  },
    gen_7: {
      teamImage:'https://i.ibb.co/zGZKV1N/gen7.png',
      pokemonList:[
      { name: 'Primarina', type1: 'Water', type2:'Fairy', ability:'Torrent', nature: 'Modest', item:'Choice Specs', Evs:'40 HP/ 252 SpA/ 216 Spe', moveset:['Hydro Pump','Moonblast','Psychic','Sparkling Aria'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_7/3ani__730__sm.gif' },
      { name: 'Lycanroc', type1: 'Rock', ability:'Steadfast', nature:'Jolly', item:'Lycanium Z', Evs:'252 Atk/ 4 Def/ 252 Spe', moveset:['Swords Dance','Stone Edge','Fire Fang','Accelerock'], sprite:'https://www.serebii.net/Shiny/SM/745.png' },
      { name: 'Alolan Raichu', type1: 'Electric', type2:'Psychic', ability:'Surge Surfer', nature: 'Timid', item:'Aloraichium Z', Evs:'4 Def/ 252 SpA/ 252 Spe', moveset:['Nasty Plot','Thunderbolt','Psychic','Focus Blast'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_7_shiny/3ani_-S_026-alola__sm.gif' },
      { name: 'Salazzle', type1: 'Poison', type2:'Fire', ability:'Oblivious', nature: 'Timid', item:'Poisonium Z', Evs:'8 HP/ 248 SpA/ 252 Spe', moveset:['Nasty Plot','Sludge Wave','Fire Blast','Hidden Power Ice/Hidden Power Grass'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_7_shiny/3ani_-S_758__sm.gif' },
      { name: 'Palossand', type1: 'Ghost', type2:'Ground', ability:'Water Compaction', nature: 'Bold', item:'Colbur Berry', Evs:'252 HP/ 252 Def/ 4 SpD', moveset:['Stealth Rock','Earth Power','Shore Up','Shadow Ball'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_7/3ani__770__sm.gif' },
      { name: 'Bewear', type1: 'Normal', type2:'Fighting', ability:'Fluffy', nature: 'Adamant', item:'Silk Scarf', Evs:'242 Atk/ 4 Def/ 252 Spe', moveset:['Swords Dance','Double-Edge','Superpower','Shadow Claw'], sprite:'https://www.pokencyclopedia.info/sprites/3ds/ani_7_shiny/3ani_-S_760__sm.gif' }
    ]
  },
    gen_8: {
      teamImage:'https://i.ibb.co/hcmy1gj/gen8.png',
      pokemonList:[
      { name: 'Cinderace', type1: 'Fire', ability:'Libero', nature: 'Jolly', item:'Heavy-Duty Boots', Evs:'80 HP/ 164 Atk/ 48 SpD/ 216 Spe', moveset:['Pyro Ball','U-Turn','Court Change','Gunk Shot'], sprite:'https://www.serebii.net/swordshield/pokemon/815.png' },
      { name: 'Corviknight', type1: 'Flying', type2:'Steel', ability:'Pressure', nature: 'Impish', item:'Leftover/ Rocky Helmet', Evs:'248 HP/ 136 Def/ 124 SpD', moveset:['Brave Bird','U-Turn','Roost','Defog'], sprite:'https://www.serebii.net/swordshield/pokemon/823.png' },
      { name: 'Boltund', type1: 'Electric', ability:'Strong Jaw', nature: 'Jolly', item:'Life Orb', Evs:'252 Atk/ 4 SpD/ 252 Spe', moveset:['Thunder Fang','Volt Switch','Fire Fang','Crunch'], sprite:'https://www.serebii.net/swordshield/pokemon/836.png' },
      { name: 'GMax-Flapple', type1: 'Grass', type2:'Dragon', ability:'Hustle', nature: 'Naive/Jolly', item:'Life Orb/Choice Band', Evs:'252 Atk/ 4 SpD/ 252 Spe', moveset:['Grav Apple','Outrage/Draco Meteor','Sucker Punch/Grassy Glide','U-Turn'], sprite:'https://www.serebii.net/swordshield/pokemon/841-gi.png' },
      { name: 'Grimmsnarl', type1: 'Dark', type2:'Fairy', ability:'Pranskter', nature: 'Impish', item:'Light Clay', Evs:'252 HP/ 252 Def/ 4 SpD', moveset:['Reflect','Light Screen','Taunt','PPlay Rough'], sprite:'https://www.serebii.net/Shiny/SWSH/861.png' },
      { name: 'Sirfetch\'d', type1: 'Fighting', ability:'Scrappy', nature: 'Jolly/Adamant', item:'Life Orb', Evs:'252 Atk/ 4 Def/ 252 Spe', moveset:['Swords Dance','Brave Bird','Leaf Blade','Knock Off'], sprite:'https://www.serebii.net/swordshield/pokemon/865.png' }
    ]
  },
    gen_9: {
      teamImage:'https://i.ibb.co/JcBHShw/gen9.png',
      pokemonList:[
      { name: 'Skeledirge', type1: 'Fire', type2:'Ghost', ability:'Unaware', nature: 'Calm', item:'Heave-Duty Boots', Evs:'252 HP/ 4 Def/ 252 SpD', moveset:['Torch Song','Will-O-Wisp','Hex','Slack Off'], sprite:'https://www.serebii.net/scarletviolet/pokemon/new/911.png' },
      { name: 'Pawmot', type1: 'Electric', type2:'Fighting', ability:'Iron Fist', nature: 'Jolly', item:'Life Orb', Evs:'252 Atk, 4 Def/ 252 Spe', moveset:['Double Shock','Close Combat','Ice Punch','Volt Switch'], sprite:'https://www.serebii.net/Shiny/SV/new/923.png' },
      { name: 'Clodsire', type1: 'Poison', type2:'Ground', ability:'Unaware', nature: 'Careful', item:'Heavy-Duty Boots', Evs:'248 HP/ 8 Def/ 252 SpD', moveset:['Earthquake/Bulldoze','Recover','Toxic','Amnesia'], sprite:'https://www.serebii.net/scarletviolet/pokemon/new/980.png' },
      { name: 'Tinkaton', type1: 'Fairy', type2:'Steel', ability:'PickPocket', nature: 'Careful', item:'Air Balloon/Leftovers', Evs:'252 HP/ 12 Atk/ 180 Def/ 64 SpD', moveset:['Thunder Wave','Gigaton Hammer','Knock Off','Encore'], sprite:'https://www.serebii.net/scarletviolet/pokemon/new/959.png' },
      { name: 'Farigiraf', type1: 'Normal', type2:'Psychic', ability:'Armor Tail', nature: 'Timid', item:'Grassy Seed', Evs:'252 SpA/ 4 SpD/ 252 Spe', moveset:['Agility','Nasty Plot','Stored Power','Tera Blast'], sprite:'https://www.serebii.net/Shiny/SV/new/981.png' },
      { name: 'Baxcalibur', type1: 'Dragon', type2:'Ice', ability:'Thermal Exchange', nature: 'Adamant', item:'Loaded Dice', Evs:'252 Atk/ 4 SpD/ 252 Spe', moveset:['Icicle Spear','Glaive Rush','Earthquake','Dragon Dance'], sprite:'https://www.serebii.net/scarletviolet/pokemon/new/998.png' }
    ]
  },
  };


  const RecommendedTeamsPage = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showPokeInfo, setShowPokeInfo] = useState(true);
   
        const handleTeamClick = (generation) => {
            setSelectedTeam(generation);
            setShowPokeInfo(generation !== 'gen_1');
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
          open={!!selectedTeam}  
          onClose={clearSelectedTeam}  
          aria-labelledby="team-modal-title"  
          aria-describedby="team-modal-description"  
          className="Rec-modal"
        >
          <div className="modal-content">
            {selectedTeam && (
              <>
                <h2>Generation: {selectedTeam}</h2>
               
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
            <button onClick={clearSelectedTeam}>Close Modal</button>
          </div>
        </Modal>
      </div>
    );
  };
 
  export default RecommendedTeamsPage;
const teams = {
  1: {
    teamImage: "https://i.ibb.co/CzgvJ1W/gen-1.png",
    pokemonList: [
      {
        name: "Venusaur",
        id: 3,
        type1: "Grass",
        type2: "Poison",
        moveset: ["Sleep Powder", "Swords Dance", "Razor Leaf", "Hyper Beam"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen1/spr_green_gb/spr_green-gb_003.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png",
      },
      {
        name: "Nidoking",
        id: 34,
        type1: "Poison",
        type2: "Ground",
        moveset: ["Earthquake", "Thunderbolt", "Blizzard", "Rock Slide"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen1/spr_red-blue_gb/spr_rb-gb_034.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/34.png",
      },
      {
        name: "Arcanine",
        id: 59,
        type1: "Fire",
        moveset: ["Fire Blast", "Body Slam", "Hyper Beam", "Reflect"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen1/spr_red-blue_gb/spr_rb-gb_059.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/59.png",
      },
      {
        name: "Slowbro",
        id: 80,
        type1: "Water",
        type2: "Psychic",
        moveset: ["Amnesia", "Surf", "Psychic", "Rest"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen1/spr_green_gb/spr_green-gb_080.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/80.png",
      },
      {
        name: "Jolteon",
        id: 135,
        type1: "Electric",
        moveset: ["Thunder Wave", "Thunderbolt", "Double Kick", "Pin Missile"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen1/spr_green_gb/spr_green-gb_135.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/135.png",
      },
      {
        name: "Dodrio",
        id: 85,
        type1: "Normal",
        type2: "Flying",
        moveset: ["Body Slam", "Drill Peck", "Hyper Beam", "Agility"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen1/spr_red-blue_gb/spr_rb-gb_085.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/85.png",
      },
    ],
  },
  2: {
    teamImage: "https://i.ibb.co/c6P7Ygr/gen-2.png",
    pokemonList: [
      {
        name: "Typhlosion",
        id: 157,
        type1: "Fire",
        moveset: ["Fire Blast", "Dynamic Punch", "Earthquake", "Thunder Punch"],
        item: "Leftovers",
        item_id: 211,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/157.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_157.png",
      },
      {
        name: "Ampharos",
        id: 181,
        type1: "Electric",
        moveset: ["Thunderbolt", "Hidden Power Ice", "Rest", "Sleeptalk"],
        item: "Leftovers",
        item_id: 211,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/181.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/181.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_181.png",
      },
      {
        name: "Quagsire",
        id: 195,
        type1: "Water",
        type2: "Ground",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/195.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/195.png",
        moveset: [
          "Earthquake",
          "Sludge Bomb",
          "Hidden Power Rock",
          "Belly Drum",
        ],
        item: "Leftovers",
        item_id: 211,
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_195.png",
      },
      {
        name: "Crobat",
        id: 169,
        type1: "Poison",
        type2: "Flying",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/169.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/169.png",
        moveset: ["Wing Attack", "Confuse Ray", "Thief", "Haze"],
        item: "Leftovers",
        item_id: 211,
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_169.png",
      },
      {
        name: "Espeon",
        id: 196,
        type1: "Psychic",
        moveset: ["Psychic", "Hidden Power Water", "Morning Sun", "Growth"],
        item: "Leftovers",
        item_id: 211,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/196.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_196.png",
      },
      {
        name: "Jynx",
        id: 124,
        type1: "Ice",
        type2: "Psychic",
        moveset: ["Lovely Kiss", "Ice Beam", "Psychic", "Nightmare"],
        item: "Leftovers",
        item_id: 211,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/124.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen2/spr_gold/spr_g_124.png",
      },
    ],
  },
  3: {
    teamImage: "https://i.ibb.co/xM7Zt8z/gen-3.png",
    pokemonList: [
      {
        name: "Swampert",
        id: 260,
        type1: "Water",
        type2: "Ground",
        ability: "Torrent",
        nature: "Relaxed",
        nature_id: 22,
        item: "Leftovers",
        item_id: 211,
        Evs: "248 HP/ 216 Def/ 44 SpD",
        moveset: ["Earthquake", "Ice Beam", "Hydro Pump", "Protect"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/260.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/260.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_260.gif",
      },
      {
        name: "Swellow",
        id: 277,
        type1: "Normal",
        type2: "Flying",
        ability: "Guts",
        nature: "Jolly",
        nature_id: 21,
        item: "Choice Band",
        item_id: 197,
        Evs: "4 HP/ 252 Atk/ 252 Spe",
        moveset: ["Aerial Ace", "Return", "Hidden Power Fighting", "Facade"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/277.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/277.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_277.gif",
      },
      {
        name: "Gardevoir",
        id: 282,
        type1: "Psychic",
        ability: "Trace",
        nature: "Timid",
        nature_id: 6,
        item: "Leftovers",
        item_id: 211,
        Evs: "56 HP/ 252 SpA/ 200 Spe",
        moveset: ["Calm Mind", "Psychic", "Thunderbolt", "Will-O-Wisp"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/282.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_282.gif",
      },
      {
        name: "Aggron",
        id: 306,
        type1: "Rock",
        type2: "Steel",
        ability: "Sturdy",
        nature: "Brave",
        nature_id: 17,
        item: "Leftovers",
        item_id: 211,
        Evs: "228 HP/ 252 Atk/ 28 SpA",
        moveset: ["Rock Slide", "Ice Beam", "Focus Punch", "Substitute"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/306.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/306.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_306.gif",
      },
      {
        name: "Salamence",
        id: 373,
        type1: "Dragon",
        type2: "Flying",
        ability: "Intimidate",
        nature: "Rash",
        nature_id: 13,
        item: "Leftovers",
        item_id: 211,
        Evs: "4 Atk/ 252 SpA/ 252 Spe",
        moveset: [
          "Dragon Claw",
          "Brick Break",
          "Hidden Power Grass",
          "Fire Blast",
        ],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/373.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/373.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_373.gif",
      },
      {
        name: "Metagross",
        id: 376,
        type1: "Steel",
        type2: "Psychic",
        ability: "Clear Body",
        nature: "Adamant",
        nature_id: 8,
        item: "Choice Band",
        item_id: 197,
        Evs: "128 HP/ 252 Atk/ 128 Spe",
        moveset: [
          "Meteor Mash",
          "Hidden Power Bug",
          "Earthquake",
          "Rock Slide",
        ],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/376.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen3/ani_emerald/ani_e_376.gif",
      },
    ],
  },
  4: {
    teamImage: "https://i.ibb.co/yfC02SG/gen-4.png",
    pokemonList: [
      {
        name: "Infernape",
        id: 392,
        type1: "Fire",
        type2: "Fighting",
        ability: "Blaze",
        nature: "Rash",
        nature_id: 13,
        item: "Expert Belt",
        item_id: 245,
        Evs: "64 Atk/ 252 SpA/ 192 Spe",
        moveset: ["Fire Blast", "Close Combat", "U-turn", "Mach Punch"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/392.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/392.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_392_1.png",
      },
      {
        name: "Staraptor",
        id: 398,
        type1: "Normal",
        type2: "Flying",
        ability: "Intimidate",
        nature: "Adamant",
        nature_id: 8,
        item: "Choice Band",
        item_id: 197,
        Evs: "252 Atk/ 4 Def/ 252 Spe",
        moveset: ["Brave Bird", "Return", "Close Combat", "Quick Attack"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/398.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/398.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_398_m-1.png",
      },
      {
        name: "Luxray",
        id: 405,
        type1: "Electric",
        ability: "Intimidate",
        nature: "Naughty",
        nature_id: 14,
        item: "Life Orb",
        item_id: 247,
        Evs: "204 Atk/ 156 SpA/ 148 Spe",
        moveset: ["Thunderbolt", "Crunch", "Superpower", "Ice Fang"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/405.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/405.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_405_m-2.png",
      },
      {
        name: "Garchomp",
        id: 445,
        type1: "Dragon",
        type2: "Ground",
        ability: "Sand Veil",
        nature: "Jolly",
        nature_id: 21,
        item: "Choice Scarf",
        Evs: "4 HP/ 252 Atk/ 252 Spe",
        moveset: ["Outrage", "Earthquake", "Dragon Claw", "Sleep Talk"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/445.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_445_m-1.png",
      },
      {
        name: "Gastrodon",
        id: 423,
        type1: "Water",
        type2: "Ground",
        ability: "Sticky Hold",
        nature: "Careful",
        nature_id: 11,
        item: "Leftovers",
        item_id: 211,
        Evs: "252 HP/ 16 Def/ 240 SpD",
        moveset: ["Curse", "Waterfall", "Earthquake", "Recover"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/423.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/423.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_423-west_1.png",
      },
      {
        name: "Lucario",
        id: 448,
        type1: "Fighting",
        type2: "Steel",
        ability: "Inner Focus",
        nature: "Adamant",
        nature_id: 8,
        item: "Life Orb",
        item_id: 247,
        Evs: "252 Atk/ 4 SpD/ 252 Spe",
        moveset: ["Swords Dance", "Close Combat", "Extreme Speed", "Ice Punch"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/448.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen4/spr_diamond-pearl/spr_dp_448_1.png",
      },
    ],
  },
  5: {
    teamImage: "https://i.ibb.co/0hVwzxP/23583c3a83d9b896466a7d6fc6ba7a95.png",
    pokemonList: [
      {
        name: "Emboar",
        id: 500,
        type1: "Fire",
        type2: "Fighting",
        ability: "Blaze",
        nature: "Rash",
        nature_id: 13,
        item: "Expert Belt",
        item_id: 245,
        Evs: "72 Atk/ 252 SpA/ 184 Spe",
        moveset: ["Fire Blast", "Superpower", "Grass Knot", "Wild Charge"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/500.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/500.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_500.gif",
      },
      {
        name: "Seismitoad",
        id: 537,
        type1: "Water",
        type2: "Ground",
        ability: "Water Absorb",
        nature: "Relaxed",
        nature_id: 22,
        item: "Leftovers",
        item_id: 211,
        Evs: "200 HP/ 252 Def/ 56 SpD",
        moveset: ["Toxic", "Scald", "Knock Off", "Earth Power"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/537.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/537.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_537.gif",
      },
      {
        name: "Lilligant",
        id: 549,
        type1: "Grass",
        ability: "Chlorophyll",
        nature: "Timid",
        nature_id: 6,
        item: "Lum Berry",
        item_id: 134,
        Evs: "4 HP/ 252 SpA/ 252 Spe",
        moveset: [
          "Quiver Dance",
          "Sleep Powder",
          "Giga Drain",
          "Hidden Power Fire",
        ],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/549.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/549.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_549.gif",
      },
      {
        name: "Galvantula",
        id: 596,
        type1: "Bug",
        type2: "Electric",
        ability: "Compound Eyes",
        nature: "Timid",
        nature_id: 6,
        item: "Choice Specs",
        item_id: 274,
        Evs: "252 SpA/ 4 SpD/ 252 Spe",
        moveset: ["Thunder", "Bug Buzz", "Giga Drain", "Volt Switch"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/596.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/596.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_596.gif",
      },
      {
        name: "Vanilluxe",
        id: 584,
        type1: "Ice",
        ability: "Ice Body",
        nature: "Modest",
        nature_id: 5,
        item: "Icicle Plate",
        item_id: 279,
        Evs: "78 HP/ 252 SpA/ 180 Spe",
        moveset: [
          "Autotomize",
          "Ice Beam",
          "Hidden Power Ground",
          "Flash Cannon",
        ],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/584.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/584.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_584.gif",
      },
      {
        name: "Haxorus",
        id: 612,
        type1: "Dragon",
        ability: "Mold Breaker",
        nature: "Jolly",
        nature_id: 21,
        item: "Yache Berry",
        item_id: 165,
        Evs: "252 Atk/ 4 Def/ 252 Spe",
        moveset: ["Dragon Dance", "Outrage", "Superpower", "Dual Chop"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/612.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/612.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/gen5/ani_black-white/ani_bw_612.gif",
      },
    ],
  },
  6: {
    teamImage: "https://i.ibb.co/dLYjssX/gen-6.png",
    pokemonList: [
      {
        name: "Greninja",
        id: 658,
        type1: "Water",
        type2: "Dark",
        ability: "Protean",
        nature: "Timid",
        nature_id: 6,
        item: "Life Orb",
        item_id: 247,
        Evs: "20 Atk/ 236 SpA/ 252 Spe",
        moveset: ["Ice Beam", "Dark Pulse", "Gunk Shot", "Water Shuriken"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/658.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_658__xy.gif",
      },
      {
        name: "Talonflame",
        id: 663,
        type1: "Fire",
        type2: "Flying",
        ability: "Gale Wings",
        nature: "Adamant",
        nature_id: 8,
        item: "Leftovers",
        item_id: 211,
        Evs: "248 HP/ 252 ATK/ 8 Def",
        moveset: ["Brave Bird", "Acrobatics", "Swords Dance", "Roost"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/663.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/663.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_663__xy.gif",
      },
      {
        name: "Hawlucha",
        id: 701,
        type1: "Fighting",
        type2: "Flying",
        ability: "Unburder",
        nature: "Jolly",
        nature_id: 21,
        item: "Sitrus Berry",
        item_id: 135,
        Evs: "12 HP/ 244 Atk/ 252 Spe",
        moveset: ["Substitute", "Swords Dance", "Acrobatics", "High Jump Kick"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/701.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/701.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_701__xy.gif",
      },
      {
        name: "Aegislash",
        id: 681,
        type1: "Steel",
        type2: "Ghost",
        ability: "",
        nature: "Sassy",
        nature_id: 16,
        item: "Leftovers",
        item_id: 211,
        Evs: "252 HP/ 4 Def/ 252 SpA",
        moveset: ["Kings Shield", "Shadow Ball", "Flash Cannon", "Protect"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/681.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/681.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_681-shield__xy.gif",
      },
      {
        name: "Mega Gardevoir",
        id: 282,
        type1: "Psychic",
        type2: "Fairy",
        ability: "Trace",
        nature: "Modest",
        nature_id: 5,
        item: "Gardevoirite",
        Evs: "16 HP/ 8 Def/ 232 SpA/ 252 Spe",
        moveset: ["Moonblast", "Hyper Voice", "Shadow Ball", "Calm Mind"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/282.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_282-mega__xy.gif",
      },
      {
        name: "Tyrantrum",
        id: 697,
        type1: "Rock",
        type2: "Dragon",
        ability: "Rock Head",
        nature: "Jolly",
        nature_id: 21,
        item: "Choice Band",
        item_id: 197,
        Evs: "252 Atk/ 4 Def/ 252 Spe",
        moveset: ["Head Smash", "Outrage", "Earthquake", "Superpower"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/697.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/697.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_697__xy.gif",
      },
    ],
  },
  7: {
    teamImage: "https://i.ibb.co/sKVWMs3/gen-7.png",
    pokemonList: [
      {
        name: "Primarina",
        id: 730,
        type1: "Water",
        type2: "Fairy",
        ability: "Torrent",
        nature: "Modest",
        nature_id: 5,
        item: "Choice Specs",
        item_id: 274,
        Evs: "40 HP/ 252 SpA/ 216 Spe",
        moveset: ["Hydro Pump", "Moonblast", "Psychic", "Sparkling Aria"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/730.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/730.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_7/3ani__730__sm.gif",
      },
      {
        name: "Lycanroc",
        id: 745,
        type1: "Rock",
        ability: "Steadfast",
        nature: "Jolly",
        nature_id: 21,
        item: "Lycanium Z",
        Evs: "252 Atk/ 4 Def/ 252 Spe",
        moveset: ["Swords Dance", "Stone Edge", "Fire Fang", "Accelerock"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/745.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/745.png",
        sprite_rec: "https://www.serebii.net/Shiny/SM/745.png",
      },
      {
        name: "Alolan Raichu",
        id: 26,
        type1: "Electric",
        type2: "Psychic",
        ability: "Surge Surfer",
        nature: "Timid",
        nature_id: 6,
        item: "Aloraichium Z",
        Evs: "4 Def/ 252 SpA/ 252 Spe",
        moveset: ["Nasty Plot", "Thunderbolt", "Psychic", "Focus Blast"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/26.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_7_shiny/3ani_-S_026-alola__sm.gif",
      },
      {
        name: "Salazzle",
        id: 758,
        type1: "Poison",
        type2: "Fire",
        ability: "Oblivious",
        nature: "Timid",
        nature_id: 6,
        item: "Poisonium Z",
        Evs: "8 HP/ 248 SpA/ 252 Spe",
        moveset: [
          "Nasty Plot",
          "Sludge Wave",
          "Fire Blast",
          "Hidden Power Ice",
        ],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/758.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/758.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_7_shiny/3ani_-S_758__sm.gif",
      },
      {
        name: "Palossand",
        id: 770,
        type1: "Ghost",
        type2: "Ground",
        ability: "Water Compaction",
        nature: "Bold",
        nature_id: 25,
        item: "Colbur Berry",
        item_id: 175,
        Evs: "252 HP/ 252 Def/ 4 SpD",
        moveset: ["Stealth Rock", "Earth Power", "Shore Up", "Shadow Ball"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/770.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/770.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_7/3ani__770__sm.gif",
      },
      {
        name: "Bewear",
        id: 760,
        type1: "Normal",
        type2: "Fighting",
        ability: "Fluffy",
        nature: "Adamant",
        nature_id: 8,
        item: "Silk Scarf",
        item_id: 228,
        Evs: "242 Atk/ 4 Def/ 252 Spe",
        moveset: ["Swords Dance", "Double-Edge", "Superpower", "Shadow Claw"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/760.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/760.png",
        sprite_rec:
          "https://www.pokencyclopedia.info/sprites/3ds/ani_7_shiny/3ani_-S_760__sm.gif",
      },
    ],
  },
  8: {
    teamImage: "https://i.ibb.co/tXyfDJs/gen-8.png",
    pokemonList: [
      {
        name: "Cinderace",
        id: 815,
        type1: "Fire",
        ability: "Libero",
        nature: "Jolly",
        nature_id: 21,
        item: "Heavy-Duty Boots",
        item_id: 1178,
        Evs: "80 HP/ 164 Atk/ 48 SpD/ 216 Spe",
        moveset: ["Pyro Ball", "U-Turn", "Court Change", "Gunk Shot"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/815.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/815.png",
        sprite_rec: "https://www.serebii.net/swordshield/pokemon/815.png",
      },
      {
        name: "Corviknight",
        id: 823,
        type1: "Flying",
        type2: "Steel",
        ability: "Pressure",
        nature: "Impish",
        nature_id: 7,
        item: "Rocky Helmet",
        item_id: 583,
        Evs: "248 HP/ 136 Def/ 124 SpD",
        moveset: ["Brave Bird", "U-Turn", "Roost", "Defog"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/823.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/823.png",
        sprite_rec: "https://www.serebii.net/swordshield/pokemon/823.png",
      },
      {
        name: "Boltund",
        id: 836,
        type1: "Electric",
        ability: "Strong Jaw",
        nature: "Jolly",
        nature_id: 21,
        item: "Life Orb",
        item_id: 247,
        Evs: "252 Atk/ 4 SpD/ 252 Spe",
        moveset: ["Thunder Fang", "Volt Switch", "Fire Fang", "Crunch"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/836.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/836.png",
        sprite_rec: "https://www.serebii.net/swordshield/pokemon/836.png",
      },
      {
        name: "GMax-Flapple",
        id: 841,
        type1: "Grass",
        type2: "Dragon",
        ability: "Hustle",
        nature: "Naive",
        nature_id: 12,
        item: "Choice Band",
        item_id: 197,
        Evs: "252 Atk/ 4 SpD/ 252 Spe",
        moveset: [
          "Grav Apple",
          "Outrage/Draco Meteor",
          "Sucker Punch/Grassy Glide",
          "U-Turn",
        ],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/841.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/841.png",
        sprite_rec: "https://www.serebii.net/swordshield/pokemon/841-gi.png",
      },
      {
        name: "Grimmsnarl",
        id: 861,
        type1: "Dark",
        type2: "Fairy",
        ability: "Pranskter",
        nature: "Impish",
        nature_id: 7,
        item: "Light Clay",
        item_id: 246,
        Evs: "252 HP/ 252 Def/ 4 SpD",
        moveset: ["Reflect", "Light Screen", "Taunt", "Play Rough"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/861.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/861.png",
        sprite_rec: "https://www.serebii.net/Shiny/SWSH/861.png",
      },
      {
        name: "Sirfetch'd",
        id: 865,
        type1: "Fighting",
        ability: "Scrappy",
        nature: "Adamant",
        nature_id: 8,
        item: "Life Orb",
        item_id: 247,
        Evs: "252 Atk/ 4 Def/ 252 Spe",
        moveset: ["Swords Dance", "Brave Bird", "Leaf Blade", "Knock Off"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/865.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/865.png",
        sprite_rec: "https://www.serebii.net/swordshield/pokemon/865.png",
      },
    ],
  },
  9: {
    teamImage: "https://i.ibb.co/bJhSLRm/gen-9.png",
    pokemonList: [
      {
        name: "Skeledirge",
        id: 911,
        type1: "Fire",
        type2: "Ghost",
        ability: "Unaware",
        nature: "Calm",
        nature_id: 1,
        item: "Heavy-Duty Boots",
        item_id: 1178,
        Evs: "252 HP/ 4 Def/ 252 SpD",
        moveset: ["Torch Song", "Will-O-Wisp", "Hex", "Slack Off"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/911.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/911.png",
        sprite_rec: "https://www.serebii.net/scarletviolet/pokemon/new/911.png",
      },
      {
        name: "Pawmot",
        id: 923,
        type1: "Electric",
        type2: "Fighting",
        ability: "Iron Fist",
        nature: "Jolly",
        nature_id: 21,
        item: "Life Orb",
        item_id: 247,
        Evs: "252 Atk, 4 Def/ 252 Spe",
        moveset: ["Double Shock", "Close Combat", "Ice Punch", "Volt Switch"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/923.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/923.png",
        sprite_rec: "https://www.serebii.net/Shiny/SV/new/923.png",
      },
      {
        name: "Clodsire",
        id: 980,
        type1: "Poison",
        type2: "Ground",
        ability: "Unaware",
        nature: "Careful",
        nature_id: 11,
        item: "Heavy-Duty Boots",
        item_id: 1178,
        Evs: "248 HP/ 8 Def/ 252 SpD",
        moveset: ["Earthquake", "Recover", "Toxic", "Amnesia"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/980.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/980.png",
        sprite_rec: "https://www.serebii.net/scarletviolet/pokemon/new/980.png",
      },
      {
        name: "Tinkaton",
        id: 959,
        type1: "Fairy",
        type2: "Steel",
        ability: "PickPocket",
        nature: "Careful",
        nature_id: 11,
        item: "Air Balloon",
        item_id: 584,
        Evs: "252 HP/ 12 Atk/ 180 Def/ 64 SpD",
        moveset: ["Thunder Wave", "Gigaton Hammer", "Knock Off", "Encore"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/959.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/959.png",
        sprite_rec: "https://www.serebii.net/scarletviolet/pokemon/new/959.png",
      },
      {
        name: "Farigiraf",
        id: 981,
        type1: "Normal",
        type2: "Psychic",
        ability: "Armor Tail",
        nature: "Timid",
        nature_id: 6,
        item: "Grassy Seed",
        item_id: 901,
        Evs: "252 SpA/ 4 SpD/ 252 Spe",
        moveset: ["Agility", "Nasty Plot", "Stored Power", "Tera Blast"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/981.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/981.png",
        sprite_rec: "https://www.serebii.net/Shiny/SV/new/981.png",
      },
      {
        name: "Baxcalibur",
        id: 998,
        type1: "Dragon",
        type2: "Ice",
        ability: "Thermal Exchange",
        nature: "Adamant",
        nature_id: 8,
        item: "Loaded Dice",
        item_id: 1702,
        Evs: "252 Atk/ 4 SpD/ 252 Spe",
        moveset: ["Icicle Spear", "Glaive Rush", "Earthquake", "Dragon Dance"],
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/998.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/998.png",
        sprite_rec: "https://www.serebii.net/scarletviolet/pokemon/new/998.png",
      },
    ],
  },
};

export default teams;

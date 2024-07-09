import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const pokemonTemplate = {
  name: null,
  id: null,
  sprite: "",
  shiny: "",
  type1: null,
  type2: null,
  move1: null,
  move2: null,
  move3: null,
  move4: null,
  held_item: null,
  nature: null,
  abilities: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState: {
    pokemon1: { ...pokemonTemplate },
    pokemon2: { ...pokemonTemplate },
    pokemon3: { ...pokemonTemplate },
    pokemon4: { ...pokemonTemplate },
    pokemon5: { ...pokemonTemplate },
    pokemon6: { ...pokemonTemplate },
  },
  reducers: {
    resetTeam: (state) => {
      state.pokemon1 = { ...pokemonTemplate };
      state.pokemon2 = { ...pokemonTemplate };
      state.pokemon3 = { ...pokemonTemplate };
      state.pokemon4 = { ...pokemonTemplate };
      state.pokemon5 = { ...pokemonTemplate };
      state.pokemon6 = { ...pokemonTemplate };
    },
    addToTeam: (state, { payload }) => {
      const { slot, pokemonData } = payload;

      // Filter out the old state based on the slot
      const filteredState = Object.keys(state).reduce((acc, key) => {
        if (key !== `pokemon${slot}`) {
          acc[key] = state[key];
        }
        return acc;
      }, {});

      // Add the new Pokemon data to the filtered state
      filteredState[`pokemon${slot}`] = pokemonData;

      return filteredState;
    },
    editPokemon: (state, { payload }) => {
      const { pokemonId, updatedPokemonData } = payload;
      state[pokemonId] = { ...state[pokemonId], ...updatedPokemonData };
    },
    removeFromTeam: (state, { payload }) => {
      const { slot } = payload;
      state[`pokemon${slot}`] = { ...pokemonTemplate };
    },
  },
  // extraReducers: (build)=>{
  //     build.addMatcher
  // }
});
export const { resetTeam, addToTeam, removeFromTeam } = teamSlice.actions;

export default teamSlice.reducer;

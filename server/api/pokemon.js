const { useState, useEffect } = React;
const axios = require("axios");

function KantoMons() {

 const response = axios.get("https://pokeapi.co/api/v2/pokedex/2/");

 
 useEffect(() => {
    response.then((res) => {
      const kantoMons = res.data.pokemon_entries;
      
    });
 }, []);


}


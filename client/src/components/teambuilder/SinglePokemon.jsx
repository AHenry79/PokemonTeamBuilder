import { useEffect, useState } from "react";

function SinglePokemon() {
  const url = window.location.href;
  const idString = url.split("/").pop();
  const id = Number(idString);
  const [info, setInfo] = useState(null);
  const [evos, setEvos] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sprites1, setSprites1] = useState({
    P1: null,
    P2: null,
    P3: null,
    P4: null,
    P5: null,
    P6: null,
    P7: null,
    P8: null,
    P9: null,
  });
  const [sprites2, setSprites2] = useState({
    P1: null,
    P2: null,
    P3: null,
  });
  useEffect(() => {
    async function fetchPokemonInfo() {
      setLoading(true);
      try {
        const response = await fetch(`/api/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon data...");
        }
        const data = await response.json();
        setInfo(data);
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const evo = await response.json();
        const evo_url = evo.evolution_chain.url;
        const response2 = await fetch(evo_url);
        const evos = await response2.json();
        if (evos.chain.evolves_to) {
          evos.chain.evolves_to.forEach(async (i, idx) => {
            if (idx === 0) {
              const pokemon1 = await fetch(
                `/api/pokemon/single/${evos.chain.species.name}`
              );
              const pokemon2 = await fetch(
                `/api/pokemon/single/${i.species.name}`
              );
              const pokemonData1 = await pokemon1.json();
              const pokemonData2 = await pokemon2.json();
              const sprites1 = pokemonData1.sprite;
              const sprites2 = pokemonData2.sprite;
              setSprites1((prevState) => ({
                ...prevState,
                [`P${idx + 1}`]: sprites1,
                [`P${idx + 2}`]: sprites2,
              }));
            } else if (idx === 1) {
              const pokemon3 = await fetch(
                `/api/pokemon/single/${i.species.name}`
              );
              const pokemonData3 = await pokemon3.json();
              const sprites3 = pokemonData3.sprite;
              setSprites1((prevState) => ({
                ...prevState,
                [`P${idx + 2}`]: sprites3,
              }));
            } else if (idx === 2) {
              const pokemon4 = await fetch(
                `/api/pokemon/single/${i.species.name}`
              );
              const pokemonData4 = await pokemon4.json();
              const sprites4 = pokemonData4.sprite;
              setSprites1((prevState) => ({
                ...prevState,
                [`P${idx + 2}`]: sprites4,
              }));
            } else if (idx === 3) {
              const pokemon5 = await fetch(
                `/api/pokemon/single/${i.species.name}`
              );
              const pokemonData5 = await pokemon5.json();
              const sprites5 = pokemonData5.sprite;
              setSprites1((prevState) => ({
                ...prevState,
                [`P${idx + 2}`]: sprites5,
              }));
            } else if (idx === 4) {
              const pokemon6 = await fetch(`/pokemon/single/${i.species.name}`);
              const pokemonData6 = await pokemon6.json();
              const sprites6 = pokemonData6.sprite;
              setSprites1((prevState) => ({
                ...prevState,
                [`P${idx + 2}`]: sprites6,
              }));
            } else if (idx === 5) {
              const pokemon7 = await fetch(
                `/api/pokemon/single/${i.species.name}`
              );
              const pokemonData7 = await pokemon7.json();
              const sprites7 = pokemonData7.sprite;
              setSprites1((prevState) => ({
                ...prevState,
                [`P${idx + 2}`]: sprites7,
              }));
            } else if (idx === 6) {
              const pokemon8 = await fetch(
                `/api/pokemon/single/${i.species.name}`
              );
              const pokemonData8 = await pokemon8.json();
              const sprites8 = pokemonData8.sprite;
              setSprites1((prevState) => ({
                ...prevState,
                [`P${idx + 2}`]: sprites8,
              }));
            } else {
              const pokemon9 = await fetch(
                `/api/pokemon/single/${i.species.name}`
              );
              const pokemonData9 = await pokemon9.json();
              const sprites9 = pokemonData9.sprite;
              setSprites1((prevState) => ({
                ...prevState,
                [`P${idx + 2}`]: sprites9,
              }));
            }
            if (i.evolves_to) {
              i.evolves_to.forEach(async (iTwo, idxTwo) => {
                if (idx && idxTwo === 0) {
                  const pokemon = await fetch(
                    `/api/pokemon/single/${iTwo.species.name}`
                  );
                  const pokemonData = await pokemon.json();
                  const sprites = pokemonData.sprite;
                  setSprites2((prevState) => ({
                    ...prevState,
                    [`P${idxTwo + 1}`]: sprites,
                  }));
                } else if (idx === 1 && idxTwo === 0) {
                  const pokemon2 = await fetch(
                    `/api/pokemon/single/${iTwo.species.name}`
                  );
                  const pokemonData2 = await pokemon2.json();
                  const sprites2 = pokemonData2.sprite;
                  setSprites2((prevState) => ({
                    ...prevState,
                    [`P${idx + 1}`]: sprites2,
                  }));
                } else {
                  const pokemon3 = await fetch(
                    `/api/pokemon/single/${iTwo.species.name}`
                  );
                  const pokemonData3 = await pokemon3.json();
                  const sprites3 = pokemonData3.sprite;
                  setSprites2((prevState) => ({
                    ...prevState,
                    [`P${idxTwo + 1}`]: sprites3,
                  }));
                }
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonInfo();
  }, [id]);

  useEffect(() => {
    console.log(sprites1);
    console.log(sprites2);
  }, [sprites1, sprites2]);

  useEffect(() => {
    if (!loading && info) {
      setTotal(
        info.hp + info.atk + info.def + info.sp_atk + info.sp_def + info.speed
      );
    }
  }, [loading, info]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        info &&
        total && (
          <>
            <div className="single-container">
              <div className="single-sprite">
                <div className="image-container">
                  <img
                    src="https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-png-images-4.png"
                    alt="pokeball"
                    className="pokeball"
                  />
                  <img
                    src={info.sprite}
                    alt={info.name}
                    className="single-sprt"
                  />
                </div>
                <div className="type-container">
                  <p
                    className={
                      !info.type2
                        ? `type-single ${info.type1}`
                        : `type ${info.type1}`
                    }
                  >
                    {info.type1.charAt(0).toUpperCase() + info.type1.slice(1)}
                  </p>
                  {info.type2 && (
                    <p className={`type ${info.type2}`}>
                      {info.type2.charAt(0).toUpperCase() + info.type2.slice(1)}
                    </p>
                  )}
                </div>
                <button className="add-button-single">Add To Team</button>
              </div>
              <div className="single-info">
                <h1 className="sel-name">
                  {info.name.charAt(0).toUpperCase() + info.name.slice(1)}
                </h1>
                <h3 className="info">Pokemon ID: {info.id}</h3>
                <h3 className="info">
                  Abilities: {info.abilities[0].name}
                  {info.abilities[1] && ", " + info.abilities[1].name}
                  {info.abilities[2] && ", " + info.abilities[2].name}
                </h3>
                <h3 className="info">Base Experience: {info.base_exp}</h3>
                <h3 className="info">Growth Rate: {info.growth_rate}</h3>
                <h3 className="info catch">Catch Rate: {info.catch_rate}</h3>
              </div>
              <div className="single-stats">
                <h2>Base Stats</h2>
                <table className="stat-table">
                  <tbody>
                    <tr>
                      <th>HP</th>
                      <td>{info.hp}</td>
                      <td>
                        <div
                          className={
                            info.hp < 30
                              ? "bar-chart rank1"
                              : info.hp < 60
                              ? "bar-chart rank2"
                              : info.hp < 90
                              ? "bar-chart rank3"
                              : info.hp < 120
                              ? "bar-chart rank4"
                              : info.hp < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.hp * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Attack</th>
                      <td>{info.atk}</td>
                      <td>
                        <div
                          className={
                            info.atk < 30
                              ? "bar-chart rank1"
                              : info.atk < 60
                              ? "bar-chart rank2"
                              : info.atk < 90
                              ? "bar-chart rank3"
                              : info.atk < 120
                              ? "bar-chart rank4"
                              : info.atk < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.atk * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Defense</th>
                      <td>{info.def}</td>
                      <td>
                        <div
                          className={
                            info.def < 30
                              ? "bar-chart rank1"
                              : info.def < 60
                              ? "bar-chart rank2"
                              : info.def < 90
                              ? "bar-chart rank3"
                              : info.def < 120
                              ? "bar-chart rank4"
                              : info.def < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.def * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Sp. Atk</th>
                      <td>{info.sp_atk}</td>
                      <td>
                        <div
                          className={
                            info.sp_atk < 30
                              ? "bar-chart rank1"
                              : info.sp_atk < 60
                              ? "bar-chart rank2"
                              : info.sp_atk < 90
                              ? "bar-chart rank3"
                              : info.sp_atk < 120
                              ? "bar-chart rank4"
                              : info.sp_atk < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.sp_atk * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Sp. Def</th>
                      <td>{info.sp_def}</td>
                      <td>
                        <div
                          className={
                            info.sp_def < 30
                              ? "bar-chart rank1"
                              : info.sp_def < 60
                              ? "bar-chart rank2"
                              : info.sp_def < 90
                              ? "bar-chart rank3"
                              : info.sp_def < 120
                              ? "bar-chart rank4"
                              : info.sp_def < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.sp_def * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <th>Speed</th>
                      <td>{info.speed}</td>
                      <td>
                        <div
                          className={
                            info.speed < 30
                              ? "bar-chart rank1"
                              : info.speed < 60
                              ? "bar-chart rank2"
                              : info.speed < 90
                              ? "bar-chart rank3"
                              : info.speed < 120
                              ? "bar-chart rank4"
                              : info.speed < 150
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${info.speed * 2}px` }}
                        ></div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <td>{total}</td>
                      <td>
                        <div
                          className={
                            total < 125
                              ? "bar-chart rank1"
                              : total < 250
                              ? "bar-chart rank2"
                              : total < 375
                              ? "bar-chart rank3"
                              : total < 500
                              ? "bar-chart rank4"
                              : total < 625
                              ? "bar-chart rank5"
                              : "bar-chart rank6"
                          }
                          style={{ width: `${total / 2}px` }}
                        ></div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="evos-container">
              {!sprites1.P3 && !sprites2.P2 && (
                <div className="single-evo">
                  <img src={sprites1.P1} alt={info.name} />
                  <img src={sprites1.P2} alt={info.name} />
                  {sprites2.P1 && !sprites2.P2 && (
                    <img src={sprites2.P1} alt={info.name} />
                  )}
                </div>
              )}
              {sprites1.P3 && (
                <div className="multi-evos">
                  <div className="first-evo">
                    <img src={sprites1.P1} alt={info.name} />
                  </div>
                  <img src={sprites1.P2} alt={info.name} />
                  {sprites1.P3 && <img src={sprites1.P3} alt={info.name} />}
                  {sprites1.P4 && <img src={sprites1.P4} alt={info.name} />}
                  {sprites1.P5 && <img src={sprites1.P5} alt={info.name} />}
                  {sprites1.P6 && <img src={sprites1.P6} alt={info.name} />}
                  {sprites1.P7 && <img src={sprites1.P7} alt={info.name} />}
                  {sprites1.P8 && <img src={sprites1.P8} alt={info.name} />}
                  {sprites1.P9 && <img src={sprites1.P9} alt={info.name} />}
                </div>
              )}
              {sprites2.P2 && (
                <div className="multi-evos">
                  <div className="first-evo">
                    <img src={sprites1.P1} alt={info.name} />
                    <img src={sprites1.P2} alt={info.name} />
                  </div>
                  {sprites2.P1 && <img src={sprites2.P1} alt={info.name} />}
                  {sprites2.P2 && <img src={sprites2.P2} alt={info.name} />}
                  {sprites2.P3 && <img src={sprites2.P3} alt={info.name} />}
                </div>
              )}
            </div>
          </>
        )
      )}
    </>
  );
}
export default SinglePokemon;

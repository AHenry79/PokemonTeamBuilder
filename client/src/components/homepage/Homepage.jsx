import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="home">
      <h1 className="header">
        Welcome to Teambuilder
        <img
          id="pokeball"
          src="https://cdn.vectorstock.com/i/500p/73/91/pokemon-logo-icon-template-vector-23237391.jpg"
        />
      </h1>
      <h2 className="choose">Choose a Generation</h2>

      <div className="gens-wrapper">
        <div className="gens">
          <Link to="/teambuilder/gen/1">
            <h3 className="titles">Red/Blue/Yellow</h3>
            <img
              className="banner"
              src="https://staticg.sportskeeda.com/editor/2020/01/f30c6-15790116044193-800.jpg?w=640"
            />
          </Link>
        </div>

        <div className="gens">
          <Link to="/teambuilder/gen/2">
            <h3 className="titles">Silver/Gold/Crystal</h3>
            <img
              className="banner"
              src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/pokemon-gen-2-gen2-gold-silver-crystal-remake-switch-cover-fan-art.jpg"
            />
          </Link>
        </div>

        <div className="gens">
          <Link to="/teambuilder/gen/3">
            <h3 className="titles">Ruby/Sapphire/Emerald</h3>
            <img
              className="banner"
              src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/03/super-ancient-trio-in-pokemon-ruby-sapphire-and-emerald.jpg"
            />
          </Link>
        </div>

        <div className="gens">
          <Link to="/teambuilder/gen/4">
            <h3 className="titles">Diamond/Pearl/Platinum</h3>
            <img
              className="banner"
              src="https://wcrobinson.org/wp-content/uploads/2023/03/key-art-image-comfort-gaming.jpg"
            />
          </Link>
        </div>

        <div className="gens">
          <Link to="/teambuilder/gen/5">
            <h3 className="titles">Black/White</h3>
            <img
              className="banner"
              src="https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/video-games/pokemon_black_white/pokemon_black_white_main_169.jpg"
            />
          </Link>
        </div>
        <div className="gens">
          <Link to="/teambuilder/gen/6">
            <h3 className="titles">X/Y</h3>
            <img
              className="banner"
              src="https://www.pokemon.com/static-assets/content-assets/cms2-en-uk/img/video-games/video-games/pokemon_x_y/pokemon_x_y_main_169.jpg"
            />
          </Link>
        </div>

        <div className="gens">
          <Link to="/teambuilder/gen/7">
            <h3 className="titles">Sun/Moon</h3>
            <img
              className="banner"
              src="https://d1lss44hh2trtw.cloudfront.net/resize?type=webp&url=https%3A%2F%2Fshacknews-www.s3.amazonaws.com%2Fassets%2Farticle%2F2016%2F11%2F23%2Fpkm_1200x500.jpg&width=1032&sign=R7qUhVDF-BmTNpNybRO4AVPaN-H5Tk64mmrpJcPUYHQ"
            />
          </Link>
        </div>

        <div className="gens">
          <Link to="/teambuilder/gen/8">
            <h3 className="titles">Sword/Shield</h3>
            <img
              className="banner"
              src="https://images.nintendolife.com/5bd92ab2067b1/pokemon-sword-and-shield.large.jpg"
            />
          </Link>
        </div>

        <div className="gens">
          <Link to="/teambuilder/gen/9">
            <h3 className="titles">Scarlet/Violet</h3>
            <img
              className="banner"
              src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/pkm-km.jpg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

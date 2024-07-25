-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile_pic" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "team_name" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamPokemon" (
    "id" SERIAL NOT NULL,
    "teams_id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "move1" TEXT,
    "move2" TEXT,
    "move3" TEXT,
    "move4" TEXT,
    "held_item_id" INTEGER,
    "nature_id" INTEGER,

    CONSTRAINT "TeamPokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type1" TEXT NOT NULL,
    "type2" TEXT,
    "sprite" TEXT,
    "shiny" TEXT,
    "base_exp" INTEGER,
    "growth_rate" TEXT NOT NULL,
    "catch_rate" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "sp_atk" INTEGER NOT NULL,
    "sp_def" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "teams_id" INTEGER NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeldItems" (
    "id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "effects" TEXT,
    "game_indices" TEXT,

    CONSTRAINT "HeldItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "decreased_stat" TEXT,
    "increased_stat" TEXT,

    CONSTRAINT "Nature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveOnPokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "move_id" INTEGER NOT NULL,
    "version_details" TEXT[],

    CONSTRAINT "MoveOnPokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moves" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "accuracy" INTEGER,
    "damage_class" TEXT NOT NULL,
    "gens" TEXT NOT NULL,
    "power" INTEGER,
    "pp" INTEGER,
    "type" TEXT,
    "priority" INTEGER,
    "effect" TEXT,
    "short_effect" TEXT,
    "effect_chance" INTEGER,
    "target" TEXT NOT NULL,

    CONSTRAINT "Moves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrevMoves" (
    "id" SERIAL NOT NULL,
    "move_id" INTEGER NOT NULL,
    "accuracy" INTEGER,
    "power" INTEGER,
    "pp" INTEGER,
    "type" TEXT,
    "gen" TEXT,
    "effect_chance" INTEGER,

    CONSTRAINT "PrevMoves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" SERIAL NOT NULL,
    "move_id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "move_name" TEXT NOT NULL,
    "gen" TEXT NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbilitiesOnPokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ability_id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "is_hidden" BOOLEAN NOT NULL,

    CONSTRAINT "AbilitiesOnPokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abilities" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "gen" TEXT NOT NULL,

    CONSTRAINT "Abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokedex" (
    "id" INTEGER NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "Pokedex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokedexPokemon" (
    "id" SERIAL NOT NULL,
    "pokdex_id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,

    CONSTRAINT "PokedexPokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MoveOnPokemon_pokemon_id_move_id_key" ON "MoveOnPokemon"("pokemon_id", "move_id");

-- CreateIndex
CREATE UNIQUE INDEX "Moves_name_key" ON "Moves"("name");

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_teams_id_fkey" FOREIGN KEY ("teams_id") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_teams_id_fkey" FOREIGN KEY ("teams_id") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoveOnPokemon" ADD CONSTRAINT "MoveOnPokemon_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoveOnPokemon" ADD CONSTRAINT "MoveOnPokemon_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "Moves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrevMoves" ADD CONSTRAINT "PrevMoves_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "Moves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "Moves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbilitiesOnPokemon" ADD CONSTRAINT "AbilitiesOnPokemon_ability_id_fkey" FOREIGN KEY ("ability_id") REFERENCES "Abilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbilitiesOnPokemon" ADD CONSTRAINT "AbilitiesOnPokemon_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokedexPokemon" ADD CONSTRAINT "PokedexPokemon_pokdex_id_fkey" FOREIGN KEY ("pokdex_id") REFERENCES "Pokedex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokedexPokemon" ADD CONSTRAINT "PokedexPokemon_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

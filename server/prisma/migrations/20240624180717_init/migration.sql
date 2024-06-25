-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "team_ids" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "gen" INTEGER NOT NULL,
    "pokemon1" INTEGER NOT NULL,
    "pokemon2" INTEGER NOT NULL,
    "pokemon3" INTEGER NOT NULL,
    "pokemon4" INTEGER NOT NULL,
    "pokemon5" INTEGER NOT NULL,
    "pokemon6" INTEGER NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_team_ids_fkey" FOREIGN KEY ("team_ids") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

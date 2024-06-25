const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database");
  console.log("Creating Users...");
  let user = undefined;
  try {
    user = await prisma.user.create({
      data: {
        email: "test@gmail.com",
        password: await bcrypt.hash("password", saltRounds), //not secure, needs to be encrytped
      },
    });
  } catch (err) {
    throw err;
  }

  console.log("Creating Teams...");
  const team1 = await prisma.teams.create({
    data: {
      gen: 1,
      user_id: user.id,
      pokemon1: 3,
      pokemon2: 15,
      pokemon3: 32,
      pokemon4: 64,
      pokemon5: 81,
      pokemon6: 45,
    },
  });

  const team2 = await prisma.teams.create({
    data: {
      user_id: user.id,
      gen: 1,
      pokemon1: 3,
      pokemon2: 15,
      pokemon3: 32,
      pokemon4: 64,
      pokemon5: 81,
      pokemon6: 45,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios");

const prisma = new PrismaClient();
console.log(getPokemon.name);

async function main() {
  console.log("Seeding Database");
  console.log("Creating Users...");
  try {
    await prisma.user.create({
      data: {
        email: "test@gmail.com",
        password: await bcrypt.hash("password", saltRounds),
        username: "test",
      },
    });
  } catch (err) {
    throw err;
  }
  try {
    await prisma.user.create({
      data: {
        email: "jerry@gmail.com",
        password: await bcrypt.hash("password", saltRounds),
        username: "jerry123",
      },
    });
  } catch (err) {
    throw err;
  }
  try {
    await prisma.user.create({
      data: {
        email: "dantheman@gmail.com",
        password: await bcrypt.hash("password", saltRounds),
        username: "dantheman",
      },
    });
  } catch (err) {
    throw err;
  }
  console.log("Users successfully created!");
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

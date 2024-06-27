const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database");
  console.log("Creating Users...");
  try {
    user = await prisma.user.create({
      data: {
        email: "test@gmail.com",
        password: await bcrypt.hash("password", saltRounds),
        username: "test",
      },
    });
  } catch (err) {
    throw err;
  }
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

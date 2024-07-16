const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const JWT = "secretestring";
const prisma = new PrismaClient();

const requireUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const parseToken = async (req, res, next) => {
  console.log("parse token");
  try {
    const authHeader = req.header("Authorization");
    console.log(authHeader);
    const prefix = "Bearer ";

    if (!authHeader) {
      next();
    } else if (authHeader.startsWith(prefix)) {
      const token = authHeader.slice(prefix.length);
      console.log(token);
      const { data } = jwt.verify(token, process.env.JWT_SECRET || JWT);
      if (!data) {
        next();
      } else {
        const userId = data.id;

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            teams: true,
            favorites: true,
          },
        });
        console.log(user);
        req.user = user;
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = {
  parseToken,
  requireUser,
};

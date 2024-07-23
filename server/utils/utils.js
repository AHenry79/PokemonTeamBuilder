const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const requireUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const parseToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const prefix = "Bearer ";

    if (!authHeader) {
      next();
    } else if (authHeader.startsWith(prefix)) {
      const token = authHeader.slice(prefix.length);
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
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

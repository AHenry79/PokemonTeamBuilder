const express = require("express");
const authRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const JWT = "secretestring";
const { requireUser } = require("../utils/utils");

// /auth/
authRouter.get("/", (req, res) => {
  res.send("Auth route /auth");
});

authRouter.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      },
    });
    if (newUser) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: { id: newUser.id },
        },
        process.env.JWT_SECRET || JWT
      );
      res.send({ token: token });
      
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // check if user exists
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!foundUser) {
      res.status(401).send("Invalid Login Credentials");
    } else {
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) {
        res.status(401).send("Invalid Login Credentials");
      } else {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: { id: foundUser.id },
          },
          process.env.JWT_SECRET || JWT
        );
        console.log("Logintoken",token);
        res.send({ token: token });
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

authRouter.get("/me", requireUser, (req, res) => {
  console.log("hello")
  res.send(req.user);
});

module.exports = authRouter;

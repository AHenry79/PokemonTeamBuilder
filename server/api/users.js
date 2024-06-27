const express = require("express");
const usersRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { requireUser } = require("../utils/utils");


//Get all users
usersRouter.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany({select: {
            username: true,
            teams: true,
            favorites: true,
          }}
        )
        res.send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Get user by id
usersRouter.get("/:id", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Add user
usersRouter.post("/", async (req, res) => {
    try {
        const newUser = await prisma.user.create({
             data: req.body,
            });
            res.send(newUser);
        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }
});

//Delete user
usersRouter.delete("/:id", requireUser, async (req, res) => {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (deletedUser) {
        res.send(deletedUser);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log("Error deleting user", err);
      res.sendStatus(500);
    }
});

//edit/update user
usersRouter.put("/:id", async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
             where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });
        if (updatedUser) {
            res.send(updatedUser);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log("Error deleting user", err);
        res.sendStatus(500);
    }
});

// usersRouter.get("/users/:id", async (req, res, next) => {
//     try{
//         const user = await prisma.users.findUnique({
//         where: {
//             user_id: parseInt(req.params.id),
//         }
//     });
//     res.send(user);
//     }catch (err){
//         next(err);
//     }
// });


  module.exports = usersRouter;
const express = require("express");
const favoritesRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {requireUser} = require("../utils/utils")


//Get all favorites
favoritesRouter.get("/", async (req, res) => {
    try {
        const favorites = await prisma.favorites.findMany();
        res.send(favorites);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//Get favorites by id
favoritesRouter.get("/:id", async (req, res) => {
    try {
        const favorite = await prisma.favorites.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!favorite) {
            res.status(404).send("favorite not found");
            return;
        }
        res.send(favorite);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Add favorite
favoritesRouter.post("/", async (req, res) => {
    try {
        const newFavorite = await prisma.favorites.create({
             data: req.body,
            });
            res.send(newFavorite);
        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }
});

//Delete favorite
favoritesRouter.delete("/:id", requireUser, async (req, res) => {
    try {
      const deletedFavorite = await prisma.favorites.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (deletedFavorite) {
        res.send(deletedFavorite);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log("Error deleting favorite", err);
      res.sendStatus(500);
    }
});

//edit/update favorite
favoritesRouter.put("/:id", async (req, res) => {
    try {
        const updatedFavorite = await prisma.favorites.update({
             where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });
        if (updatedFavorite) {
            res.send(updatedFavorite);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log("Error deleting favorite", err);
        res.sendStatus(500);
    }
});





module.exports = favoritesRouter;
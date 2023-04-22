const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
    const imagePath = './images/1680566961445-39639.jpg';
    res.render('home/index', {
        page: "index",
        // imagePath,
    });
});
homeRouter.get("/login", async (req, res) => {
    // const imagePath = './images/1680566961445-39639.jpg';
    res.render('home/index', {
        page: "login",
        // imagePath,
    });
});
homeRouter.get("/register", async (req, res) => {
    res.render('home/index', {
        page: "register",
    });
});

module.exports = homeRouter;
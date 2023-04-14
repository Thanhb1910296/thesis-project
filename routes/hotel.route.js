const express = require("express");

const hotelRoute = express.Router();

const { Hotel } = require("../models/hotel");

hotelRoute.get("/api/hotels/", async(req, res) => {
    try {
        const hotels = await Hotel.find({});
        res.json(hotels);
        console.log(hotels);
    }
    catch(e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = hotelRoute;
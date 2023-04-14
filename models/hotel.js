const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    // slug: {
    //     type: String,
    //     trim: true
    // },
    star_number: {
        type: Number,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    // province: {
    //     type: String,
    //     trim: true
    // },
    images: [
        {
          type: String,
        },
    ],
    // files : [
    //     {
    //       type: String,
    //     }
    // ],
    price: {
        type: Number,
        trim: true
    },
    type: {
        type: String,
        trim: true
    }
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = { Hotel, hotelSchema };
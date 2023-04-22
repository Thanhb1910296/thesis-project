const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  star_rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

module.exports = ratingSchema;
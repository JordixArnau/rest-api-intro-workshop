const mongoose = require("mongoose");
const { Schema } = require("mongoose");
/* const { isEmail } = require("validator");
 */
const MovieSchema = Schema(
  {
    title: String,
    releaseYear: Number,
    genres: [String],
    duration: Number,
    cast: [{ personId: String, firstName: String, lastName: String }],
    crew: [String],
  },
  { timestamps: true },
);

const Movie = mongoose.model("user", UserSchema);

module.exports = {
  Movie: Movie,
};

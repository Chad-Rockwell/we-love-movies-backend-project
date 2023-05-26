// Importing the required dependencies and modules
const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// Define the reduceMovies function using the reduceProperties utility
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

// Handler function to retrieve a list of theaters with associated movies
function list() {
  return knex("theaters")
    .join("movies_theaters", "movies_theaters.theater_id", "theaters.theater_id")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .then(reduceMovies); // Calls the reduceMovies function to reduce the retrieved data
}

// Exporting the list function to be used in other parts of the application
module.exports = {
  list,
};

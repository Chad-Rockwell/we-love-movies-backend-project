// Importing the Knex connection module
const knex = require("../db/connection");

// Function to retrieve a list of all movies
function list() {
  return knex("movies").select("*"); // Selects all columns from the "movies" table using Knex
}

// Function to retrieve a list of movies currently showing
function listShowing() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "=", "movies_theaters.movie_id") // Joins the "movies" and "movies_theaters" tables on the movie ID
    .select("*") // Selects all columns from the joined tables
    .where("movies_theaters.is_showing", true) // Filters the movies to those that are currently showing
    .groupBy("movies.movie_id"); // Groups the result by movie ID to avoid duplicates
}

// Function to retrieve a specific movie by its ID
function read(movieId) {
  return knex("movies").select("*").where("movie_id", movieId).first(); // Selects all columns from the "movies" table where the movie ID matches the provided ID and returns the first result
}

// Exporting the functions to be used in other parts of the application
module.exports = {
  list,
  listShowing,
  read,
};
// Importing required dependencies and modules
const moviesService = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Handler function for listing movies
async function list(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await moviesService.listShowing(); // Calls the moviesService to retrieve a list of movies currently showing
    res.json({ data }); // Sends the retrieved movie data as a JSON response
  } else {
    const data = await moviesService.list(); // Calls the moviesService to retrieve a list of all movies
    res.json({ data }); // Sends the retrieved movie data as a JSON response
  }
}

// Handler function for retrieving a specific movie
async function read(req, res, next) {
  const { movieId } = req.params;
  const data = await moviesService.read(movieId); // Calls the moviesService to retrieve a specific movie by its ID
  if (data) {
    res.json({ data }); // Sends the retrieved movie data as a JSON response
  } else {
    next({ message: "Movie not found", status: 404 }); // Passes an error object to the next middleware with a "Movie not found" message and a status code of 404
  }
}

module.exports = {
  list: asyncErrorBoundary(list), // Exports the asyncErrorBoundary-wrapped list handler function
  read: asyncErrorBoundary(read), // Exports the asyncErrorBoundary-wrapped read handler function
};
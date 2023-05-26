// Importing the required dependencies and modules
const theatersService = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Handler function to retrieve a list of theaters for a specific movie
async function list(req, res, next) {
  const data = await theatersService.list(req.params.movieId); // Calls the theatersService to retrieve a list of theaters for the specified movie
  res.json({ data }); // Sends the theater data as a JSON response
}

// Exporting the handler function, wrapped with asyncErrorBoundary, to be used in other parts of the application
module.exports = {
  list: asyncErrorBoundary(list),
};

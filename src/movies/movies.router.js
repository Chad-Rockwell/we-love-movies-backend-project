// Importing required dependencies and routers
const router = require("express").Router();
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route for handling the root endpoint ("/")
router
  .route("/")
  .get(controller.list) // HTTP GET request handler for retrieving a list of movies
  .all(methodNotAllowed); // Handles all other HTTP methods for the root endpoint with a "Method Not Allowed" error

// Route for handling individual movie endpoints ("/:movieId")
router
  .route("/:movieId")
  .get(controller.read) // HTTP GET request handler for retrieving a specific movie
  .all(methodNotAllowed); // Handles all other HTTP methods for individual movie endpoints with a "Method Not Allowed" error

// Mounting the theaters router for handling theater-related endpoints under the movie's ID ("/:movieId/theaters")
router.use("/:movieId/theaters", theatersRouter);

// Mounting the reviews router for handling review-related endpoints under the movie's ID ("/:movieId/reviews")
router.use("/:movieId/reviews", reviewsRouter);

module.exports = router; // Exporting the router module for use in other parts of the application
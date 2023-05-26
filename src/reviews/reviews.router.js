// Importing the required dependencies and modules
const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route for handling the root endpoint ("/")
router
  .route("/")
  .get(controller.list) // HTTP GET request handler for retrieving a list of reviews
  .all(methodNotAllowed); // Handles all other HTTP methods for the root endpoint with a "Method Not Allowed" error

// Route for handling individual review endpoints ("/:reviewId")
router
  .route("/:reviewId")
  .put(controller.update) // HTTP PUT request handler for updating a specific review
  .delete(controller.destroy) // HTTP DELETE request handler for deleting a specific review
  .all(methodNotAllowed); // Handles all other HTTP methods for individual review endpoints with a "Method Not Allowed" error

module.exports = router; // Exporting the router module for use in other parts of the application

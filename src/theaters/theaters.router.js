// Importing the required dependencies and modules
const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route for handling the root endpoint ("/")
router
  .route("/")
  .get(controller.list) // HTTP GET request handler for retrieving a list of theaters
  .all(methodNotAllowed); // Handles all other HTTP methods for the root endpoint with a "Method Not Allowed" error

// Route for handling individual theater endpoints ("/:theaterId")
router
  .route("/:theaterId")
  .all(methodNotAllowed); // Handles all HTTP methods for individual theater endpoints with a "Method Not Allowed" error

module.exports = router; // Exporting the router module for use in other parts of the application

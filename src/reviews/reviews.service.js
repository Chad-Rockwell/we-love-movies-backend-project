// Importing the required dependencies and modules
const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// Utility function to reduce properties and build critics key
const reduceCritics = reduceProperties("review_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
  created_at: ["critic", null, "created_at"],
  updated_at: ["critic", null, "updated_at"],
});

// Function to retrieve a list of reviews for a specific movie
function list(movieId) {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id") // Joining the "reviews" and "critics" tables on the critic ID
    .select("*")
    .where("movie_id", movieId) // Filtering the reviews based on the movie ID
    .then(reduceCritics); // Applying the reduceCritics function to build the critics key in the result
}

// Function to delete a review by its ID
function destroy(reviewId) {
  return knex("reviews").where("review_id", reviewId).del(); // Deleting the review from the "reviews" table based on the review ID
}

// Function to update a review
function update(updatedReview) {
  return knex("reviews")
    .where("review_id", updatedReview.review_id)
    .update(updatedReview)
    .then(() => {
      // Fetching the updated review data by joining the "reviews" and "critics" tables
      return knex("reviews")
        .join("critics", "critics.critic_id", updatedReview.critic_id)
        .where("review_id", updatedReview.review_id)
        .groupBy("review_id")
        .first();
    });
}

// Function to retrieve a critic by their ID
function grabCritic(criticId) {
  return knex("critics").select("*").where("critic_id", criticId).first(); // Selecting the critic from the "critics" table based on the critic ID
}

// Function to find a review by its ID
function findReview(reviewId) {
  return knex("reviews").select("*").where("review_id", reviewId).first(); // Selecting the review from the "reviews" table based on the review ID
}

// Exporting the functions to be used in other parts of the application
module.exports = {
  list,
  grabCritic,
  findReview,
  destroy,
  update,
};

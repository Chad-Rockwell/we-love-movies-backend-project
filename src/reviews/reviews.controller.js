// Importing the required dependencies and modules
const reviewsService = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Handler function to delete a review
async function destroy(req, res, next) {
  const { reviewId } = req.params;
  const data = await reviewsService.destroy(reviewId); // Calls the reviewsService to delete the review by its ID
  if (data) {
    res.status(204).json({ data }); // Sends a JSON response with a status of 204 (No Content) if the review is successfully deleted
  } else {
    next({ message: "Review not found", status: 404 }); // Passes an error object to the next middleware with a "Review not found" message and a status code of 404 if the review is not found
  }
}

// Handler function to retrieve a list of reviews for a movie
async function list(req, res, next) {
  const { movieId } = req.params;
  const data = await reviewsService.list(movieId); // Calls the reviewsService to retrieve a list of reviews for the specified movie
  // Modifying the data to access the first element of the critic properties array
  data.map((review, indx) => {
    return (review.critic = review.critic[0]);
  });
  res.json({ data }); // Sends the modified review data as a JSON response
}

// Handler function to find a review by its ID
async function findReview(req, res, next) {
  const { reviewId } = req.params;
  const data = await reviewsService.findReview(reviewId); // Calls the reviewsService to retrieve the review by its ID
  if (data) {
    res.locals.review = data;
    next();
  } else {
    next({ message: "cannot be found", status: 404 }); // Passes an error object to the next middleware with a custom message and a status code of 404 if the review is not found
  }
}

// Handler function to update a review
async function update(req, res, next) {
  const { reviewId } = req.params;
  const criticId = res.locals.review.critic_id;
  const critic = await reviewsService.grabCritic(criticId); // Calls the reviewsService to retrieve the critic for the review
  console.log(critic);
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: reviewId,
  };
  const data = await reviewsService.update(updatedReview); // Calls the reviewsService to update the review with the provided data
  data.critic = critic;
  console.log("this is the data with critic", data);
  res.json({ data }); // Sends the updated review data, including the critic, as a JSON response
}

// Exporting the handler functions, wrapped with asyncErrorBoundary where necessary, to be used in other parts of the application
module.exports = {
  list: asyncErrorBoundary(list),
  update: [findReview, asyncErrorBoundary(update)],
  destroy: asyncErrorBoundary(destroy),
};

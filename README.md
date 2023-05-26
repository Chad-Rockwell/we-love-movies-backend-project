# Movie Theater API

This is a backend API for a Movie Theater application. It provides endpoints for managing movies, theaters, and reviews. The API allows users to retrieve information about movies, theaters, and reviews, as well as perform CRUD (Create, Read, Update, Delete) operations on reviews.


## Endpoints

### Movies

- `GET /movies`: Retrieve a list of all movies.
- `GET /movies/:movieId`: Retrieve a specific movie by ID.

### Theaters

- `GET /theaters`: Retrieve a list of all theaters.

### Reviews

- `GET /movies/:movieId/reviews`: Retrieve a list of reviews for a specific movie.
- `POST /movies/:movieId/reviews`: Create a new review for a specific movie.
- `PUT /reviews/:reviewId`: Update a specific review.
- `DELETE /reviews/:reviewId`: Delete a specific review.

## Code Structure

The code is structured as follows:

- `/db`: Contains the database connection configuration.
- `/errors`: Contains error handling middleware.
- `/movies`: Handles routes and business logic related to movies.
- `/theaters`: Handles routes and business logic related to theaters.
- `/reviews`: Handles routes and business logic related to reviews.
- `/utils`: Contains utility functions used throughout the application.



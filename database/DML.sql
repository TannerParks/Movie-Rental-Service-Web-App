--start
-- select data to populate tables
SELECT actorID, actor_name FROM Actors
SELECT genreID, genre_name FROM Genres
SELECT movieID, title, description, duration FROM Movies
	WHERE genre = (SELECT genreID FROM Genres WHERE genre_name = :genreInput
SELECT rentalID, userID, movieID, rental_date FROM Rentals
SELECT reviewID, userID, movieID, rating, num_ratings FROM Reviews
SELECT userID, password, first_name, email FROM Users

--everything below will have dynamic inputs
--select all reviews for a movie
SELECT Reviews.reviewID, Reviews.userID, Reviews.movieID, Reviews.rating, Reviews.num_ratings, Movies.title, Movies.description, Movies.duration
FROM Reviews
JOIN Movies ON Reviews.movieID = :Movies.movie_id
--select movie for review
SELECT movieID, title, description, duration FROM Movies WHERE movieID = :movie_id_selected_from_webpage

--insert new movies
INSERT INTO Movies (title, description, duration) VALUES (:title_input, :description_input, :duration_input)

--delete selected movie via id
DELETE FROM Movies WHERE movieID = :movie_id_input

--insert new genre
INSERT INTO Genres (genre_name) VALUES (:genre_name_input)

--delete a genre via id
DELETE FROM Genres WHERE (genreID) =:genre_id_input

--insert new rental
INSERT INTO Rentals (userID, movieID, rental_date) VALUES (:user_id_input, :movie_id_input, :rental_date_input)

--delete rental
DELETE FROM Rentals WHERE (rentalID) = :rental_id_input

--insert new user
INSERT INTO Users (password, first_name, email) VALUES (:password_input, :first_name_input, :email_input)

--delete user
DELETE FROM Users WHERE (userID) = :user_id_input

--insert new actor
INSERT INTO Actors (actor_name) VALUES (:actor_name_input)

--update movie
UPDATE Movies SET title = :title_input, description = :description_input, duration = :duration_input WHERE movieID = :movie_id_input

--update rental
UPDATE Rentals SET userID = :user_id_input, movieID = :movie_id_input, rental_date = :rental_date_input WHERE rentalID = :rental_id_input

--update user
UPDATE Users SET password = :password_input, first_name = :first_name_input, email = :email_input WHERE userID = :user_id_input
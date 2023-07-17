/*Kyle Werstlein and Tanner Parks*/
DROP TABLE IF EXISTS Actors_Movies;
DROP TABLE IF EXISTS Actors;
DROP TABLE IF EXISTS Genres_Movies;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Rentals;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Movies;


CREATE TABLE Movies (
  movieID INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(45),
  description LONGTEXT,
  duration INT
);
LOCK TABLES `Movies` WRITE;
INSERT INTO Movies (movieID, title, description, duration) VALUES
  (1, 'The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 142),
  (2, 'The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 175),
  (3, 'The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 152),
  (4, 'Back to the Future', 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.', 116),
  (5, 'Fight Club', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', 139),
  (6, 'The Prestige', 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.', 130);

UNLOCK TABLES;
/*USERS*/
CREATE TABLE Users (
  userID INT AUTO_INCREMENT PRIMARY KEY,
  password VARCHAR(45),
  first_name VARCHAR(45),
  email VARCHAR(45)
);
LOCK TABLES `Users` WRITE;
INSERT INTO Users (userID, password, first_name, email) VALUES
  (1, 'password1', 'John', 'john@example.com'),
  (2, 'password2', 'Jane', 'jane@example.com'),
  (3, 'BillyRockz1', 'Billy', 'BigBill@gmail.com'),
  (4, 'R3dh@wk38BlazingSun92@', 'Ethan', 'Ethan@EthanWatchesYouSleep.com'),
  (5, 'G0ldenSunset@77', 'Mia', 'mia93@yahoo.com');
UNLOCK TABLES;

CREATE TABLE Rentals (
  rentalID INT AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  movieID INT,
  rental_date DATE,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (movieID) REFERENCES Movies(movieID)
);
LOCK TABLES `Rentals` WRITE;
INSERT INTO Rentals (rentalID, userID, movieID, rental_date) VALUES
  (1, 1, 1, '2023-03-15'),
  (2, 1, 3, '2023-03-15'),
  (3, 2, 1, '2023-03-16');
 UNLOCK TABLES;

CREATE TABLE Reviews (
  reviewID INT AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  movieID INT,
  rating FLOAT,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (movieID) REFERENCES Movies(movieID)
);
LOCK TABLES `Reviews` WRITE;
INSERT INTO Reviews (reviewID, userID, movieID, rating) VALUES
  (1, 1, 1, 9.3),
  (2, 1, 2, 9.0),
  (3, 2, 3, 8.8);
UNLOCK TABLES;

CREATE TABLE Genres (
  genreID INT AUTO_INCREMENT PRIMARY KEY,
  genre_name VARCHAR(45)
);
LOCK TABLES `Genres` WRITE;
INSERT INTO Genres (genreID, genre_name) VALUES
  (1, 'Drama'),
  (2, 'Crime'),
  (3, 'Action'),
  (4, 'Romance'),
  (5, 'Comedy'),
  (6, 'SciFi');
UNLOCK TABLES;

CREATE TABLE Genres_Movies (
  genreID INT,
  movieID INT,
  PRIMARY KEY (genreID, movieID),
  FOREIGN KEY (genreID) REFERENCES Genres(genreID),
  FOREIGN KEY (movieID) REFERENCES Movies(movieID)
);
LOCK TABLES `Genres_Movies` WRITE;
INSERT INTO Genres_Movies (genreID, movieID) VALUES
  (1, 1),
  (2, 2),
  (3, 3);
UNLOCK TABLES;
  
CREATE TABLE Actors (
  actorID INT AUTO_INCREMENT PRIMARY KEY,
  actor VARCHAR(45)
);
LOCK TABLES `Actors` WRITE;
INSERT INTO Actors (actorID, actor)
VALUES (1, 'Tim Robbins'),
       (2, 'Morgan Freeman'),
       (3, 'Marlon Brando'),
       (4, 'Al Pacino'),
       (5, 'Christian Bale'),
       (6, 'Heath Ledger');
UNLOCK TABLES;

CREATE TABLE Actors_Movies (
  movieID INT,
  actorID INT,
  PRIMARY KEY (movieID, actorID),
  FOREIGN KEY (movieID) REFERENCES Movies(movieID),
  FOREIGN KEY (actorID) REFERENCES Actors(actorID)
);
LOCK TABLES `Actors_Movies` WRITE;
INSERT INTO Actors_Movies (movieID, actorID)
VALUES (1, 1),
       (1, 2),
       (2, 3),
       (2, 4),
       (3, 5),
       (3, 6);

UNLOCK TABLES;


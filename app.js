/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Port number
PORT = 55001;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Routes
app.get('/', function(req, res){
    let query1 = "SELECT * FROM Movies;"    // Define query
    
    db.pool.query(query1, function(error, rows, fields){    // Execute query
        res.render('movies', {data: rows});
    })
});


app.get('/movies', function(req, res) {
    let query1 = "SELECT * FROM Movies";
    db.pool.query(query1, function(error, rows, fields){    
        // Execute query
        res.render('movies', {data: rows});
    })
});


app.get('/genres_movies', function(req, res) {
    let query1 = "SELECT * FROM Genres_Movies";
    let query2 = "SELECT movieID, title FROM Movies";
    let query3 = "SELECT genreID, genre_name FROM Genres";

    db.pool.query(query1, function(error, results1) {
        db.pool.query(query2, function(error, results2) {
            db.pool.query(query3, function(error, results3) {

                // Map genres to a dictionary for easy access
                let genres = {};
                results3.forEach((genre) => {genres[genre.genreID] = genre.genre_name});

                // Map movies to a dictionary for easy access
                let movies = {};
                results2.forEach((movie) => {movies[movie.movieID] = movie.title});

                // Map genre names and movie titles to the Genres_Movies results
                results1 = results1.map((row) => {
                    row.genre_name = genres[row.genreID]; // Add the genre_name property to each row
                    row.title = movies[row.movieID]; // Add the movie title property to each row
                    return row;
                });

                res.render('genres_movies', {
                    data: results1,
                    movies: results2,
                    genres: results3
                });
            });
        });
    });
});


app.get('/genres', function (req, res) {
    let query = 'SELECT * FROM Genres;'; // Define query
  
    db.pool.query(query, function (error, rows, fields) {
      // Execute query
      res.render('genres', { data: rows });
    });
  });
  

app.get('/reviews', function (req, res) {
  let query1 = 'SELECT * FROM Reviews;';
  let query2 = "SELECT movieID, title FROM Movies";
  let query3 = "SELECT userID, email FROM Users";

  db.pool.query(query1, function(error, results1) {
      db.pool.query(query2, function(error, results2) {
          db.pool.query(query3, function(error, results3) {
              res.render('reviews', {
                  data: results1,
                  movies: results2,
                  users: results3
              });
          });
      });
  });
});


app.get('/rentals', function(req, res) {
    let query1 = "SELECT * FROM Rentals";
    let query2 = "SELECT movieID, title FROM Movies";
    let query3 = "SELECT userID, email FROM Users";

    db.pool.query(query1, function(error, results1) {
        db.pool.query(query2, function(error, results2) {
            db.pool.query(query3, function(error, results3) {
                res.render('rentals', {
                    data: results1,
                    movies: results2,
                    users: results3
                });
            });
        });
    });
});


app.get('/users', function (req, res) {
    let query = 'SELECT * FROM Users;';
  
    db.pool.query(query, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.render('users', { data: rows });
        }
    });
});


app.get('/actors', function (req, res) {
    let query = 'SELECT * FROM Actors;';
  
    db.pool.query(query, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.render('actors', { data: rows });
        }
    });
});


app.get('/actors_movies', function(req, res){
    // SQL query to get the movie title and actor name from their respective tables
    let query1 = `
        SELECT Actors_Movies.movieID, Actors_Movies.actorID, Movies.title, Actors.actor
        FROM Actors_Movies
        JOIN Movies ON Actors_Movies.movieID = Movies.movieID
        JOIN Actors ON Actors_Movies.actorID = Actors.actorID;`;

    let query2 = "SELECT DISTINCT title, movieID FROM Movies ORDER BY movieID";

    let query3 = "SELECT DISTINCT actor, actorID FROM Actors ORDER BY actorID";

    // Execute the query
    db.pool.query(query1, function(error, results1){
        db.pool.query(query2, function(error, results2) {
            db.pool.query(query3, function(error, results3) {
                // Check if there was an error
                if (error){
                    console.log(error);
                    res.sendStatus(400);    // Send HTTP response 400 to user
                }
                else{
                    // Send the data to the client
                    res.render('actors_movies', {
                        data: results1,
                        movies: results2,
                        actors: results3
                    });
                }
            });
        });
    });
});



/*
Add an entry into a table
*/
app.post('/add-movie-html', function(req, res){ // Adds a movie to the database

    // Grab values from add-movie-html
    let data = req.body;

    let duration = parseInt(data['duration']);

    // Added the question marks to the queries because SQL doesn't like quotes in strings and movie descriptions are full of them
    let query1 = 'INSERT INTO Movies (title, description, duration) VALUES (?, ?, ?)';

    let inserts = [data.title, data.description, duration];


    db.pool.query(query1, inserts, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/movies');
        }
    })
});


app.post('/add-genres-movies-html', function(req, res) {
    let data = req.body;
    let query1 = 'INSERT INTO Genres_Movies (genreID, movieID) VALUES (?, ?)';
    let inserts = [data.genreID, data.movieID];

    db.pool.query(query1, inserts, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/genres_movies');
        }
    })
});


app.post('/add-genre-html', function(req, res){ // Adds a genre to the database
    // Grab values from add-genre-html
    let data = req.body;

    // Added the question marks to the queries because SQL doesn't like quotes in strings and movie descriptions are full of them
    let query1 = 'INSERT INTO Genres (genre_name) VALUES (?)';

    let inserts = [data.genreName];


    db.pool.query(query1, inserts, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/genres');
        }
    })
});


app.post('/add-review-html', function(req, res){

    // Grab values from add-rental-html
    let data = req.body;
    let query1 = 'INSERT INTO Reviews (userID, movieID, rating) VALUES (?, ?, ?)';
    let inserts = [data.userID, data.movieID, data.rating];

    db.pool.query(query1, inserts, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/reviews');
        }
    })
});


app.post('/add-rental-html', function(req, res){

    // Grab values from add-rental-html
    let data = req.body;
    let query1 = 'INSERT INTO Rentals (userID, movieID, rental_date) VALUES (?, ?, ?)';
    let inserts = [data.userID, data.movieID, data.rental_date];

    db.pool.query(query1, inserts, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/rentals');
        }
    })
});


app.post('/add-user-html', function(req, res){ // Adds a user to the database

    // Grab values from add-user-html
    let data = req.body;

    let duration = parseInt(data['duration']);

    // Added the question marks to the queries because SQL doesn't like quotes in strings and movie descriptions are full of them
    let query1 = 'INSERT INTO Users (password, first_name, email) VALUES (?, ?, ?)';

    let inserts = [data.password, data.first_name, data.email];

    db.pool.query(query1, inserts, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/users');
        }
    })
});


app.post('/add-actors-movies-html', function(req, res) {
    let data = req.body;
    let query1 = 'INSERT INTO Actors_Movies (movieID, actorID) VALUES (?, ?)';
    let inserts = [data.movieID, data.actorID];

    db.pool.query(query1, inserts, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/actors_movies');
        }
    })
});


app.post('/add-actor-html', function(req, res){ // Adds an actor to the database
    // Grab values from add-actor-html
    let data = req.body;
    let query1 = 'INSERT INTO Actors (actor) VALUES (?)';

    let inserts = [data.actorName];

    db.pool.query(query1, inserts, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/actors');
        }
    })
});




/*
Delete entries from tables
*/
app.post('/delete-movie', function(req, res){ // Deletes a movie from the database
    let movieID = req.body.movieID; 

    let query1 = `DELETE FROM Movies WHERE movieID = ${movieID};`;

    db.pool.query(query1, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/movies');
        }
    })
});


app.post('/delete_genres_movies', function(req, res) {
    let genreID = req.body.genreID;
    let movieID = req.body.movieID;
  
    let query1 = `DELETE FROM Genres_Movies WHERE genreID = ? AND movieID = ?`;
  
    db.pool.query(query1, [genreID, movieID], function(error, rows, fields){
      // Check if there was an error
      if (error){
        console.log(error);
        res.sendStatus(400);    // Send HTTP response 400 to user
      }
      else{
        res.redirect('/genres_movies');
      }
    })
  });


app.post('/delete-genre', function(req, res){ // Deletes a genre from the database
    let genreID = req.body.genreID; 

    let query1 = `DELETE FROM Genres WHERE genreID = ${genreID};`;

    db.pool.query(query1, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/genres');
        }
    })
});


app.post('/delete-review', function (req, res) {
    let reviewID = req.body.reviewID;

    let query = `DELETE FROM Reviews WHERE reviewID = ${reviewID};`;
  
    db.pool.query(query, function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.redirect('/reviews');
      }
    });
});


app.post('/delete-rental', function (req, res) {
    let rentalID = req.body.rentalID;

    let query = `DELETE FROM Rentals WHERE rentalID = ${rentalID};`;
  
    db.pool.query(query, function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.redirect('/rentals');
      }
    });
});


app.post('/delete-user', function(req, res){ // Deletes a genre from the database
    let userID = req.body.userID; 

    let query1 = `DELETE FROM Users WHERE userID = ${userID};`;

    db.pool.query(query1, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/users');
        }
    })
});


app.post('/delete_actors_movies', function(req, res) {
  let movieID = req.body.movieID;
  let actorID = req.body.actorID;

  let query1 = `DELETE FROM Actors_Movies WHERE movieID = ? AND actorID = ?`;

  db.pool.query(query1, [movieID, actorID], function(error, rows, fields){
    // Check if there was an error
    if (error){
      console.log(error);
      res.sendStatus(400);    // Send HTTP response 400 to user
    }
    else{
      res.redirect('/actors_movies');
    }
  })
});


app.post('/delete-actor', function(req, res){ // Deletes a genre from the database
    let actorID = req.body.actorID; 

    let query1 = `DELETE FROM Actors WHERE actorID = ${actorID};`;

    db.pool.query(query1, function(error, rows, fields){
        // Check if there was an error
        if (error){
            console.log(error);
            res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
            res.redirect('/actors');
        }
    })
});

  
/*
Update entries in tables
*/
app.get('/movie/:id', function(req, res) {
    // Get the movie ID from the URL parameters
    let movieID = req.params.id;
  
    // Query to get the movie data
    let query = 'SELECT * FROM Movies WHERE movieID = ?';
  
    db.pool.query(query, [movieID], function(error, rows, fields) {
        // Check if there was an error
        if (error){
          console.log(error);
          res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
          // Respond with the movie data
          res.json(rows[0]);
          }
    });
});

app.post('/update-movie', function(req, res) {
    // Get the updated movie data from the request body
    let movie = req.body;

    let duration = parseInt(movie.duration);

    // Query to update the movie data
    let query = 'UPDATE Movies SET title = ?, description = ?, duration = ? WHERE movieID = ?';

    db.pool.query(query, [movie.title, movie.description, duration, movie.ID], function(error, rows, fields) {
        // Check if there was an error
        if (error){
          console.log(error);
          res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
          // Redirect to the main page
          res.redirect('/movies');
        }
    });
});


app.get('/rental/:id', function(req, res){
    let id = req.params.id;
    let query = `SELECT * FROM Rentals WHERE rentalID = ${id}`;

    db.pool.query(query, function(error, results){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }
        else{
            res.json(results[0]);
        }
    });
});


app.post('/update-rental', function(req, res) {
    // Get the updated rental data from the request body
    let rental = req.body;

    // Query to update the rental data
    let query = 'UPDATE Rentals SET userID = ?, movieID = ?, rental_date = ? WHERE rentalID = ?';

    db.pool.query(query, [rental.userID, rental.movieID, rental.rental_date, rental.ID], function(error, rows, fields) {
        // Check if there was an error
        if (error){
          console.log(error);
          res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
          // Redirect to the main page
          res.redirect('/rentals');
        }
    });
});


app.get('/user/:id', function(req, res) {
    
    // Get the user ID from the URL parameters
    let userID = req.params.id;
  
    // Query to get the movie data
    let query = 'SELECT * FROM Users WHERE userID = ?';
  
    db.pool.query(query, [userID], function(error, rows, fields) {
        // Check if there was an error
        if (error){
          console.log(error);
          res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
          // Respond with the user data
          res.json(rows[0]);
          }
    });
});


app.post('/update-user', function(req, res) {
    // Get the updated user data from the request body
    let user = req.body;

    // Query to update the user data
    let query = 'UPDATE Users SET password = ?, first_name = ?, email = ? WHERE userID = ?';

    db.pool.query(query, [user.password, user.fname, user.email, user.ID], function(error, rows, fields) {
        // Check if there was an error
        if (error){
          console.log(error);
          res.sendStatus(400);    // Send HTTP response 400 to user
        }
        else{
          // Redirect to the main page
          res.redirect('/users');
        }
    });
});


/*
Search for an entry in a table
*/
app.get('/search-movies', function(req, res){  // Displays movies based on users searched title
    let query1;

    if (req.query.searchedTitle === undefined || req.query.searchedTitle == ''){
        query1 = "SELECT * FROM Movies;";
    }
    else{
        let searchedTitle = req.query.searchedTitle;
        query1 = `SELECT * FROM Movies WHERE title LIKE '%${searchedTitle}%'`;
    }

    db.pool.query(query1, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }
        else{
            res.render('movies', {data: rows});
        }
    })
});


app.get('/search-reviews', function(req, res){  // Displays reviews of searched movie title
    let searchedTerm = req.query.searchedTerm;
    let query1;

    if (searchedTerm === undefined || searchedTerm == ''){
        query1 = "SELECT * FROM Reviews;";
    }
    else {
        query1 = `SELECT Reviews.* FROM Reviews JOIN Movies ON Reviews.movieID = Movies.movieID WHERE Movies.title LIKE '%${searchedTerm}%';`;
    }

    db.pool.query(query1, function(error, results) {
        if (error){
            console.log(error);
            res.sendStatus(400);
        }
        else{
            res.render('reviews', {data: results});
        }
    });

});


app.get('/search-users', function(req, res){  // Displays movies based on users searched title
    let query1;

    if (req.query.searchedEmail === undefined || req.query.searchedEmail == ''){
        query1 = "SELECT * FROM Users;";
    }
    else{
        let searchedEmail = req.query.searchedEmail;
        query1 = `SELECT * FROM Users WHERE email LIKE '%${searchedEmail}%'`;
    }

    db.pool.query(query1, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }
        else{
            res.render('users', {data: rows});
        }
    })
});


// LISTENER
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

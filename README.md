# Movie-Rental-Service-Web-App
**Description**:The Movie Rental Service Web App is an efficient web-based application designed specifically for database managers of a movie rental service (think Netflix when they were sending DVDs in the mail). This comprehensive application provides an interface for managing and maintaining the intricate database structure underlying a rental service. It leverages JavaScript, HTML, CSS, and utilizes SQL (MariaDB) for robust and efficient database management operations. <br><br>


**Key Features**:

- Movie Database: The web app incorporates a Movies table that stores comprehensive information about the movies available in the rental service. Database managers can add, edit, and remove movie records, including details such as movieID, title, description, and duration. Additionally, search functionality has been implemented to allow searching for movies by their title, allowing for efficient retrieval of specific movies based on queries.

- User Database: The Users table captures and manages information about the users of the rental service. Database managers can view, add, update, and remove user records, including userID, password, first name, and email. The web app also provides search functionality for this, allowing database managers to search for users based on their email addresses, simplifying the process of locating specific user records.

- Rental History: The Rentals table tracks the rental history of movies within the service. Database managers can access and manage rental records, including rentalID, userID (linked to Users table), movieID (linked to Movies table), and rental_date. This feature enables efficient monitoring and administration of rental activities.

- User Reviews: The Reviews table records user-generated reviews of movies within the service. Database managers can manage review records, including reviewID, userID (linked to Users table), movieID (linked to Movies table), and rating. This feature enables database managers to monitor and moderate user reviews and ratings. To streamline the review management process, search functionality has been incorporated to search for reviews based on movie titles, facilitating quick retrieval of reviews associated with specific movies. This can be utilized to handle "review bombing," an Internet phenomenon in which a large number of people or a few people with multiple accounts post negative reviews online in an attempt to harm the success of the film.
    
- Actor Database: The Actors table stores information about top-billed actors in movies available within the rental service. Database managers can manage actor records, including actorID and actor_name, facilitating efficient organization and searchability of actors' information.

- Movie-Actor Relationship: The Actors_Movies table establishes a relationship between movies and actors. Database managers can manage the association between movies and actors, using actorID (linked to Actors table) and movieID (linked to Movies table) allowing for simple management and retrieval of movies associated with specific actors.

- Genre Database: The Genres table contains information about movie genres offered by the rental service. Database managers can manage genre records, including genreID and genre_name. This feature facilitates effective organization and categorization of movies based on genres.

- Movie-Genre Relationship: The Genres_Movies table acts as a junction table, linking movies and genres within the rental service. Database managers can manage the association between movies and genres using movieID (linked to Movies table) and genreID (linked to Genres table). This feature enables efficient categorization and searchability of movies based on genres. <br><br>



NOTE: The server was shutdown at the end of the term so I'm including screenshots of each page.

![Movies landing page](UI_Captures/Movies.PNG)

![Movies implementation of delete functionality](UI_Captures/Movies_DELETE.PNG)

![Movies implementation of insert functionality](UI_Captures/Movies_INSERT.PNG)

![Movies implementation of update functionality](UI_Captures/Movies_UPDATE.PNG)

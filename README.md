# Movie-Rental-Service-Web-App
**Description**: 
This is my final submission for a web-based application designed specifically for database managers of a movie rental service (think Netflix when they were sending DVDs in the mail). This application provides an interface for managing and maintaining the intricate database structure underlying a rental service. It leverages JavaScript, HTML, CSS, and utilizes SQL (MariaDB) for robust and efficient database management operations.



### ***NOTE: Below the key features breakdown, I've uploaded screenshots of each page along with their corresponding create, read, update, and delete functionalities since the server was shutdown at the end of the term***
___
### Table of Contents



### Project Overview: {#overview}

SchlockBuster, a company previously disrupted by the streaming era, is now venturing into the online movie rental market. However, to effectively compete in a world where streaming reigns supreme, SchlockBuster requires a robust database management system to support their new platform. This database will serve as the backbone for organizing and storing vital information, allowing SchlockBuster to efficiently manage their movie collection, rental histories, user reviews, and genre associations. The app must provide seamless retrieval of movie information, facilitate user interactions, track rental transactions, and ensure effective content management. By establishing connections between movies, rentals, reviews, users, actors, and genres, the web app will empower SchlockBuster to deliver a comprehensive and user-friendly online movie rental experience, positioning them for success in the ever-evolving movie industry. <br><br>



**Key Features**:

- Movie Database: The web app incorporates a Movies table that stores comprehensive information about the movies available in the rental service. Database managers can add, edit, and remove movie records, including details such as movieID, title, description, and duration. Additionally, search functionality has been implemented to allow searching for movies by their title, allowing for efficient retrieval of specific movies based on queries.

- User Database: The Users table captures and manages information about the users of the rental service. Database managers can view, add, update, and remove user records, including userID, password, first name, and email. The web app also provides search functionality for this, allowing database managers to search for users based on their email addresses, simplifying the process of locating specific user records.

- Rental History: The Rentals table tracks the rental history of movies within the service. Database managers can access and manage rental records, including rentalID, userID (linked to Users table), movieID (linked to Movies table), and rental_date. This feature enables efficient monitoring and administration of rental activities.

- User Reviews: The Reviews table records user-generated reviews of movies within the service. Database managers can manage review records, including reviewID, userID (linked to Users table), movieID (linked to Movies table), and rating. This feature enables database managers to monitor and moderate user reviews and ratings without the ability to outright edit them in order to maintain review integrity. To streamline the review management process, search functionality has been incorporated to search for reviews based on movie titles, facilitating quick retrieval of reviews associated with specific movies. This can be utilized to handle "review bombing," an Internet phenomenon in which a large number of people or a few people with multiple accounts post negative reviews online in an attempt to harm the success of the film.
    
- Actor Database: The Actors table stores information about top-billed actors in movies available within the rental service. Database managers can manage actor records, including actorID and actor_name, facilitating efficient organization and searchability of actors' information.

- Movie-Actor Relationship: The Actors_Movies table establishes a relationship between the many to many relationship between the movies and actors tables. Database managers can manage the association between movies and actors, using actorID (linked to Actors table) and movieID (linked to Movies table) allowing for simple management and retrieval of movies associated with specific actors.

- Genre Database: The Genres table contains information about movie genres offered by the rental service. Database managers can manage genre records, including genreID and genre_name. This feature facilitates effective organization and categorization of movies based on genres.

- Movie-Genre Relationship: The Genres_Movies table acts as a junction table, linking movies and genres within the rental service. Database managers can manage the association between movies and genres using movieID (linked to Movies table) and genreID (linked to Genres table). This feature enables efficient categorization and searchability of movies based on genres. <br><br>


___


## Movies page {#movies}
![Movies landing page](UI_Captures/Movies.PNG)

![Movies implementation of delete functionality](UI_Captures/Movies_DELETE.PNG)

![Movies implementation of insert functionality](UI_Captures/Movies_INSERT.PNG)

![Movies implementation of update functionality](UI_Captures/Movies_UPDATE.PNG)

<br><br>
## Users Page
![Users landing page](UI_Captures/Users.PNG)

![Users implementation of delete functionality](UI_Captures/Users_DELETE.PNG)

![Users implementation of insert functionality](UI_Captures/Users_INSERT.PNG)

![Users implementation of update functionality](UI_Captures/Users_UPDATE.PNG)

<br><br>
## Rentals page
![Rentals landing page](UI_Captures/Rentals.PNG)

![Rentals implementation of delete functionality](UI_Captures/Rentals_DELETE.PNG)

![Rentals implementation of insert functionality](UI_Captures/Rentals_INSERT.PNG)

![Rentals implementation of update functionality](UI_Captures/Rentals_UPDATE.PNG)

<br><br>
## Reviews page
![Reviews landing page](UI_Captures/Reviews.PNG)

![Reviews implementation of delete functionality](UI_Captures/Reviews_DELETE.PNG)

![Reviews implementation of insert functionality](UI_Captures/Reviews_INSERT.PNG)

<br><br>
## Actors page
![Actors landing page](UI_Captures/Actors.PNG)

![Actors implementation of delete functionality](UI_Captures/Actors_DELETE.PNG)

![Actors implementation of insert functionality](UI_Captures/Actors_INSERT.PNG)

<br><br>
## Actors-Movies junction page
![ActMovs landing page](UI_Captures/ActMovs.PNG)

![ActMovs implementation of delete functionality](UI_Captures/ActMovs_DELETE.PNG)

![ActMovs implementation of insert functionality](UI_Captures/ActMovs_INSERT.PNG)

<br><br>
## Genres page
![Genres landing page](UI_Captures/Genres.PNG)

![Genres implementation of delete functionality](UI_Captures/Genres_DELETE.PNG)

![Genres implementation of insert functionality](UI_Captures/Genres_INSERT.PNG)

<br><br>
## Genres-Movies junction page
![GenMovs landing page](UI_Captures/GenMovs.PNG)

![GenMovs implementation of delete functionality](UI_Captures/GenMovs_DELETE.PNG)

![GenMovs implementation of insert functionality](UI_Captures/GenMovs_INSERT.PNG)

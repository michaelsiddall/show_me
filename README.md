Show Me!

## Description

Duration:  2 Week Sprint

For many live music fans, saving old concerts ticket stubs was a way to reconnect with the memories of a musical experience.  As technology has evolved, tickets have gone digital and so with it that direct connection or trigger to those memories.  Show Me! is an app designed for fans of live music. Whether it’s a local band in a tiny dive bar or a sold out 40,000 seat arena concert, Show Me allows users to document and organize
their live music experiences. Registered users have the ability to write reviews of their concert experiences: Who were you with? How was the sound at the venue? Did the artist play your favorite song?  Maybe something personally memorable happened that night? With the power of Spotify’s Artist Search API and SongKick’s Venue Search API, users can quickly and easily add their favorite bands and venue information and capture not only
their musical memories, but the life that was lived inside of them.


## Prerequisites

To run this app, you will need…

-Node.js
-Postgres
-Nodemon
(a full list of dependencies can be found in `package.json`)


## Install

To run this application:

-create a database in Postgress called ‘show_me’ and create a “user” table and “show” table.

CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR (80) UNIQUE NOT NULL,
"password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "show" (
    "id" SERIAL PRIMARY KEY,
    "date" DATE NOT NULL,
    "spotifyId" VARCHAR (250) NOT NULL,
    "songKickId" INTEGER  NOT NULL,
    "review" VARCHAR (5000),
    "user_id" INTEGER NOT NULL,
    "favorite" BOOLEAN
);

Start postgres if not running already by using `brew services start postgresql`
- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:

  SERVER_SESSION_SECRET=superDuperSecret
  
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

-run “npm install” from the project root directory 
-run “npm run server” to run the node server 
-run “npm run client” to connect to localhost:3000

## Usage

After registering as a new user, user brought to the “Show List” page that will display all the various concerts you have entered in.  It will list by Artist Name, Venue, and Date. Clicking on “Display Details” will bring a pop up with more details of the event.  This includes an artist image, artist’s genre of music, and the user’s review notes from the show.   

Clicking on “Add Show” will allow user to choose the date of the show they wish capture.  Hitting “Submit” will bring you to the the “Artist Search” page.  

Use the “Artist Search” input to search for your artist via Spotify’s Artist Search API.  Search will return up to 10 artists.   If you do not see your artist, refine your search.  Click on the artist result you’d like and it will submit.  User will be redirected to “Search Venue” page.  

Use the “Search Venue” input to search for your venue via SongKick’s Venue Search API.  Search will return the first 5 results of your search.  Clicking on your desired venue will submit it and user redirected to “Review” page.  

In “Review” page, user is able to enter in any information they want to include of the show and/or the days events.  Once “submit” is clicked, user is redirected to “Add Show” page.  Click submit to add the show and user is redirected back to Show List.  

In Show List, your newly added show will display based on it’s date with the list being displayed Newest to Oldest dates.  

Users are able to delete shows or  click “favorite” button to include that show in the “Favorites” page.  

## Deployement

All are welcome to experience Show Me! first hand by simply registering as a user from the URL below.

http://showmelive.herokuapp.com/

## Built With

-Node
-Javascript
-React
-React Redux
-Postgres
-Passport
-Material UI
-Spotify API
-SongKick API

## Acknowledgement

Thanks to the Tarjan Cohort (Swing, Swing) and the Prime Instruction Team of Edan Schwartz, Dev Jana, and Casie Siekman.  And to my friend Joe and my wife Mutsumi for all their support.  




 



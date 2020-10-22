
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "show"
(
    "id" SERIAL PRIMARY KEY,
    "date" DATE NOT NULL,
    "spotifyId" VARCHAR (250) NOT NULL,
    "songKickId" INTEGER NOT NULL,
    "review" VARCHAR (5000),
    "user_id" INTEGER NOT NULL,
    "favorite" BOOLEAN
);



-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- holds our beep objects
CREATE TABLE "beep" (
	"user_id" serial NOT NULL,
	"beep_id" serial PRIMARY KEY,
	"osc_type" varchar(20) NOT NULL,
	"filter_type" varchar(20) NOT NULL,
	"filter_cutoff" int NOT NULL,
	"scale" varchar(20) NOT NULL,
	"octave" varchar(20) NOT NULL,
	"root" varchar(20) NOT NULL,
	"bpm" int NOT NULL,
	"steps" varchar(1000)[] NOT NULL,
	"beep_name" varchar(80) NOT NULL,
	"user_name" varchar(80),
	"likes" int NOT NULL,
	"users_that_like" varchar (1000)[],
	"users_that_favorite" varchar (1000)[],
	"date_created" timestamp not null default CURRENT_TIMESTAMP

);

-- relational for favorites list
CREATE TABLE "favorite" (
"id" serial PRIMARY KEY,
"fav_user_id" INT REFERENCES "user",
"fav_beep_id" INT REFERENCES "beep"
);

-- if reset, drop favorites then beep
DROP TABLE "favorite";
DROP TABLE "beep";



-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL,
	"password" varchar(1000) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
);



CREATE TABLE "beep" (
	"user_id" serial NOT NULL,
	"beep_id" serial PRIMARY KEY,
	"osc_type" varchar(20) NOT NULL,
	"filter_type" varchar(20) NOT NULL,
	"filter_cutoff" int(20000) NOT NULL,
	"scale" varchar(20) NOT NULL,
	"octave" varchar(20) NOT NULL,
	"root" varchar(20) NOT NULL,
	"bpm" integer(3) NOT NULL,
	"steps" varchar(1000) NOT NULL,
);


--CHANGES--
--beeps need a date



/* Replace with your SQL commands */
-- Here you can up your tables and "up" here means that create or build  "
--  Table schema 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  userID uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  userEmail VARCHAR(100) UNIQUE,
userName VARCHAR(50) NOT NULL,
userFirstName VARCHAR(50) NOT NULL,
userLastName VARCHAR(50) NOT NULL,
userPassword VARCHAR(10) NOT NULL
)
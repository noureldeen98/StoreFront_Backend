CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    userid  uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    useremail VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    userfirstname VARCHAR(50) NOT NULL,
    userlastname VARCHAR(50) NOT NULL,
    userpassword VARCHAR(300) NOT NULL
)
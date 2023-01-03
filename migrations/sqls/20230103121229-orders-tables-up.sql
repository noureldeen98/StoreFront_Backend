/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS orders(
   orderid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   orderdate DATE NOT NULL,
   totalprice decimal NOT NULL

);
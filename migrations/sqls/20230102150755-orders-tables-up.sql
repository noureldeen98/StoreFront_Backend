/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
  orderid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   userid uuid REFERENCES users(userID),
   productid uuid REFERENCES products(productid),
  orderdate DATE NOT NULL,
   totalprice decimal NOT NULL

);


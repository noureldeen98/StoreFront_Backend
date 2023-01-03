/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products(
   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   orderid uuid REFERENCES orders(orderid),
   productid uuid REFERENCES products(productid),
   quantity INTEGER NOT NULL

);
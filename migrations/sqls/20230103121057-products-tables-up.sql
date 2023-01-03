CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
  productid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  productname VARCHAR(50) NOT NULL,
  productexpirationdate DATE NOT NULL,
  productprice DECIMAL NOT NULL
 
)
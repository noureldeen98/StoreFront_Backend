API Endpoints
 After running open your browser and write this URL 
   for users:
   http://localhost:10000/sotreFront/api/users/ then the following endpoints:
          createUser          // post request
          getAllUsers         // get request
          authenticate        // post request
          :id/editUsers       // patch request
          :id/getUser         // get request
          :id/deletetUser     // delete request

  for products:
   http://localhost:10000/sotreFront/api/products/ then the following endpoints:
          createproduct       // post request
          getAllproducts      // get request
          :id/editproducts    // patch request
          :id/getproduct      // get request
          :id/deletetproduct  // delete request

  for orders:
   http://localhost:10000/sotreFront/api/orders/ then the following endpoints:
          createorder      // post request
          getAllorders     // get request
          :id/editorders   // patch request
          :id/getorder     // get request
          :id/deletetorder // delete request

   for orderproducts:
   http://localhost:10000/sotreFront/api/theOrderProducts/ then the following endpoints:  
       :id/getOrderProduct  // get request
       getAllOrderProducts  // get request     

<!-- data base shapes -->

 Database schema with column name and type.:

 *Product:

  productid uuid DEFAULT uuid_generate_v4() PRIMARY KEY
  productname VARCHAR(50) NOT NULL,
  productexpirationdate DATE NOT NULL,
  productprice DECIMAL NOT NULL

 *users:
    
    userid uuid DEFAULT uuid_generate_v4() PRIMARY KEY
    useremail VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    userfirstname VARCHAR(50) NOT NULL,
    userlastname VARCHAR(50) NOT NULL,
    userpassword VARCHAR(300) NOT NULL

 *orders :

    orderid uuid DEFAULT uuid_generate_v4() PRIMARY KEY
    orderdate DATE NOT NULL,
    totalprice DECIMAL NOT NULL

 *order_products :

   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   orderid uuid REFERENCES orders(orderid),
   userid uuid REFERENCES users(userid),
   quantity INTEGER NOT NULL   


       

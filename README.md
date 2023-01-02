ProjectName: StoreFront backend
Project Description: It is a simple project which contains database, calling APIs and creating tokens for the authenticated users.
                     Based on node.js , using express framework and postgres
publisher:Nour-Eldeen Nasser Morad Elkatan.

How to install and run?
   Kindly, open the CMD then run the following command lines.
    first: npm i 
    second: npm run test //This for to run the suits and build the main file which is index.js and will be found in build folder.
    third:cd build
    forth: node index.js

How to Use the Project?
   After running open your browser and write this URL 
   for users:
   http://localhost:10000/sotreFront/api/users/ then the following endpoints:
          createUser
          getAllUsers
          authenticate
          :id/editUsers
          :id/getUser
          :id/deletetUser

  for products:
   http://localhost:10000/sotreFront/api/products/ then the following endpoints:
          createproduct
          getAllproducts
          :id/editproducts
          :id/getproduct
          :id/deletetproduct

  for orders:
   http://localhost:10000/sotreFront/api/orders/ then the following endpoints:
          createorder
          getAllorders
          :id/editorders
          :id/getorder
          :id/deletetorder

   Note that each :id refers to the id which saved in database       

Required Technologies

The application used the following libraries:

    Postgres for the database
    Node/Express for the application logic
    dotenv from npm for managing environment variables
    db-migrate from npm for migrations
    jsonwebtoken from npm for working with JWTs
    jasmine from npm for testing

commands will help you:
  to install all the node modules : npm i
  start to run the project : npm run start
  to get the build folder : npm run test
  to migrat up : npm run migration:run
  to migrat up : npm run migration-down

ProjectName: StoreFront backend
Project Description: It is a simple project which contains database, calling APIs and creating tokens for the authenticated users.
                     Based on node.js , using express framework and postgres
publisher:Nour-Eldeen Nasser Morad Elkatan.

# Environment variables.
The server port number is: 10000
The db port number is: 5432  
The environment variables:
PORT=10000
NODE_ENV=development  
PS_LOCATION_OF_DB
DB_NAME_DEV
DB_NAME_TEST
DB_USER
DB_PASSWORD
DB_PORT=5432
PASSWORD_BCRYPT_FOR_HASHING_PASSWORD
SALT_OF_BCRYPT
SECRET_TOKEN_FOR_JWT

# Package installation instructions
npm i to install all the modules that I used

# Setup db and server instructions.
actually use npm i 
  npm i db-migrate

How to install and run?
   Kindly, open the CMD then run the following command lines.
    first: npm i 
    second: npm run test //This for to run the suits and build the main file which is index.js and will be found in build folder.
    forth: run command >>> npm run start.  



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
  to migrat down : npm run migration-down

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
   After running open your browser and write this URL http://localhost:10000/users/ 
   it will work with you.

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

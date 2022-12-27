import dotenv from "dotenv";
import {Pool} from "pg"
import config from "../config"

// Must config the dotenv to use the process.env
dotenv.config();

// const { PS_LOCATION_OF_DB, DB_NAME, DB_USER, DB_PASSWORD } = process.env

// This pool is used to connect one or more db
// dbClientDev referes to the db which is used in development mode
const storeFrontDevDB = new Pool({
    // Data specific to the DB from config file which get the data from env
    host:config.dbLocation,
    database:config.dbName,
    user:config.dbUser,
    password:config.dbPassword,
    port:parseInt(config.portDB as string,10)
})

console.log(storeFrontDevDB);

storeFrontDevDB.on('error',(error:Error)=>{
    console.log(error);
    
})


export default storeFrontDevDB;

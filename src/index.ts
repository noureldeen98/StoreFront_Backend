import express from "express"
import bodyParser from "body-parser";
import config from "./config"
import storeFrontDevDB from "./databases/database"
import themainRoutes from "./routes/index"
import { PoolClient, QueryResult } from "pg";

console.log(config);



const myMainStoreFrontBackend = express();
myMainStoreFrontBackend.use(bodyParser.json())
// declaring port number
const myMainStoreFrontBackendPort:string | number=config.port || 10000

myMainStoreFrontBackend.use("/sotreFront/api",themainRoutes)

// listeng our project on server at port:
myMainStoreFrontBackend.listen(myMainStoreFrontBackendPort,()=>{
    console.log(`The server is running at port ${myMainStoreFrontBackendPort}`)
})


 
//Test connecting to DB
storeFrontDevDB.connect().then((client:PoolClient)=>{
    client.query('SELECT NOW()').then((response:QueryResult)=>{
        client.release()
        console.log(response.rows);
        
    })
})


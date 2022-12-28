"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
// Must config the dotenv to use the process.env
dotenv_1.default.config();
// const { PS_LOCATION_OF_DB, DB_NAME, DB_USER, DB_PASSWORD } = process.env
// This pool is used to connect one or more db
// dbClientDev referes to the db which is used in development mode
const storeFrontDevDB = new pg_1.Pool({
    // Data specific to the DB from config file which get the data from env
    host: config_1.default.dbLocation,
    database: config_1.default.dbName,
    user: config_1.default.dbUser,
    password: config_1.default.dbPassword,
    port: parseInt(config_1.default.portDB, 10)
});
console.log(storeFrontDevDB);
storeFrontDevDB.on('error', (error) => {
    console.log(error);
});
exports.default = storeFrontDevDB;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env);
const { PORT, NODE_ENV, PS_LOCATION_OF_DB, DB_NAME_DEV, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME_TEST, SALT_OF_BCRYPT, PASSWORD_BCRYPT_FOR_HASHING_PASSWORD, SECRET_TOKEN_FOR_JWT } = process.env;
exports.default = {
    port: PORT,
    dbLocation: PS_LOCATION_OF_DB,
    dbName: NODE_ENV === 'development' ? DB_NAME_DEV : DB_NAME_TEST,
    dbNameTest: DB_NAME_TEST,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    portDB: DB_PORT,
    bcryptHashing: PASSWORD_BCRYPT_FOR_HASHING_PASSWORD,
    salfBcrypt: SALT_OF_BCRYPT,
    tokenSecret: SECRET_TOKEN_FOR_JWT
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./databases/database"));
console.log(config_1.default);
const myMainStoreFrontBackend = (0, express_1.default)();
myMainStoreFrontBackend.use(body_parser_1.default.json());
// declaring port number
const myMainStoreFrontBackendPort = config_1.default.port || 10000;
// listeng our project on server at port:
myMainStoreFrontBackend.listen(myMainStoreFrontBackendPort, () => {
    console.log(`The server is running at port ${myMainStoreFrontBackendPort}`);
});
// connecting to DB
database_1.default.connect().then((client) => {
    client.query('SELECT NOW()').then((response) => {
        console.log(response);
    });
});
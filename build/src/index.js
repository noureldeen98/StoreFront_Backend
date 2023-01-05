"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myMainStoreFrontBackend = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./databases/database"));
const index_1 = __importDefault(require("./routes/index"));
console.log(config_1.default);
exports.myMainStoreFrontBackend = (0, express_1.default)();
exports.myMainStoreFrontBackend.use(body_parser_1.default.json());
// declaring port number
const myMainStoreFrontBackendPort = config_1.default.port || 10000;
exports.myMainStoreFrontBackend.use("/sotreFront/api", index_1.default);
// listeng our project on server at port:
exports.myMainStoreFrontBackend.listen(myMainStoreFrontBackendPort, () => {
    console.log(`The server is running at port ${myMainStoreFrontBackendPort}`);
});
//Test connecting to DB
database_1.default.connect().then((client) => {
    client.query('SELECT NOW()').then((response) => {
        client.release();
        console.log(response.rows);
    });
});

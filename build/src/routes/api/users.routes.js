"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const theUsersRoutes = (0, express_1.Router)();
// just for testing the api 
theUsersRoutes.get("/", (request, response) => {
    response.send("Hi ");
});
exports.default = theUsersRoutes;

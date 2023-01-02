"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./api/users.routes"));
const orderRoutes_1 = __importDefault(require("./api/orderRoutes"));
const productsRoutes_1 = __importDefault(require("./api/productsRoutes"));
const themainRoutes = (0, express_1.Router)();
themainRoutes.use("/users", users_routes_1.default);
themainRoutes.use("/orders", orderRoutes_1.default);
themainRoutes.use("/products", productsRoutes_1.default);
exports.default = themainRoutes;

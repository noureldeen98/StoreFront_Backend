"use strict";
// In this file we will handle all the http responses and requests which will call the apis of the order
// Here the controllers can integrate with models
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatingJWTByCallingServerFromController = exports.getOrderFromController = exports.DeleteOrderFromController = exports.updateOrderFromController = exports.getAllOrdersFromController = exports.createOrderFromController = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_modell_1 = __importDefault(require("../models/user.modell"));
// As the orderModel is a class represent the table we will create  an instance from this class to be a row
const theOrderModel = new orderModel_1.default();
const theUserModel = new user_modell_1.default();
// This is method which reposible for calling creating order api
const createOrderFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield theOrderModel.createOrder(request.body);
        response
            .json({
            code: 200,
            status: "success",
            data: Object.assign({}, order),
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createOrderFromController = createOrderFromController;
// the integration with get all orders
const getAllOrdersFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield theOrderModel.getAllOrders();
        response.json({
            status: "success",
            data: allOrders,
            message: "All orders are returned"
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllOrdersFromController = getAllOrdersFromController;
// the integration with update order using order_id
const updateOrderFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield theOrderModel.orderUpdating(request.body);
        response.json({
            status: "success",
            data: updatedOrder
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateOrderFromController = updateOrderFromController;
// the integration with deleting order using order_id
const DeleteOrderFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield theOrderModel.orderDeleting(request.body);
        response.json({
            status: "success",
            data: deletedOrder,
            message: `The order with id ${request.body} is deleted successfully`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.DeleteOrderFromController = DeleteOrderFromController;
// the integration with get specific order using order_id which is send in url params
const getOrderFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield theOrderModel.getTheOrder(request.params.orderID);
        response.json({
            status: "success",
            data: order,
            message: `The order with id ${request.body} is retrived successfully`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOrderFromController = getOrderFromController;
// creating the jwt
const creatingJWTByCallingServerFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderemail, orderpassword } = request.body;
        const orderAuthenticated = yield theUserModel.checkingUserAuthenticationFromModel(orderemail, orderpassword);
        console.log("from contorller");
        console.log(orderAuthenticated);
        const theJWTToken = jsonwebtoken_1.default.sign({ orderAuthenticated }, config_1.default.tokenSecret);
        console.log(theJWTToken);
        if (orderAuthenticated) {
            return response.json({
                status: "success",
                data: Object.assign(Object.assign({}, orderAuthenticated), { theJWTToken })
            });
        }
        else {
            response.json({
                status: "error",
                message: "This order is not authenticated"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.creatingJWTByCallingServerFromController = creatingJWTByCallingServerFromController;

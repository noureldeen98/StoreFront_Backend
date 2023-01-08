"use strict";
// In this file we will handle all the http responses and requests which will call the apis of the product
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
exports.creatingJWTByCallingServerFromController = exports.getProductFromController = exports.DeleteProductFromController = exports.updateProductFromController = exports.getAllProductsFromController = exports.createProductFromController = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_modell_1 = __importDefault(require("../models/user.modell"));
// As the productModel is a class represent the table we will create  an instance from this class to be a row
const theProductModel = new productModel_1.default();
const theUserModel = new user_modell_1.default();
// This is method which reposible for calling creating product api
const createProductFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield theProductModel.createProduct(request.body);
        response
            .json({
            code: 200,
            status: "success",
            data: Object.assign({}, product),
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProductFromController = createProductFromController;
// the integration with get all products
const getAllProductsFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield theProductModel.getAllProducts();
        response.json({
            status: "success",
            data: allProducts,
            message: "All products are returned"
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllProductsFromController = getAllProductsFromController;
// the integration with update product using product_id
const updateProductFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield theProductModel.productUpdating(request.body);
        response.json({
            status: "success",
            data: updatedProduct
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProductFromController = updateProductFromController;
// the integration with deleting product using product_id
const DeleteProductFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield theProductModel.productDeleting(request.params.id);
        response.json({
            status: "success",
            data: deletedProduct,
            message: `The product with id ${request.body} is deleted successfully`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.DeleteProductFromController = DeleteProductFromController;
// the integration with get specific product using product_id which is send in url params
const getProductFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield theProductModel.getTheProduct(request.params.id);
        response.json({
            status: "success",
            data: product,
            message: `The product with id ${request.body} is retrived successfully`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProductFromController = getProductFromController;
// creating the jwt
const creatingJWTByCallingServerFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productemail, productpassword } = request.body;
        const productAuthenticated = yield theUserModel.checkingUserAuthenticationFromModel(productemail, productpassword);
        console.log("from contorller");
        console.log(productAuthenticated);
        const theJWTToken = jsonwebtoken_1.default.sign({ productAuthenticated }, config_1.default.tokenSecret);
        console.log(theJWTToken);
        if (productAuthenticated) {
            return response.json({
                status: "success",
                data: Object.assign(Object.assign({}, productAuthenticated), { theJWTToken })
            });
        }
        else {
            response.json({
                status: "error",
                message: "This product is not authenticated"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.creatingJWTByCallingServerFromController = creatingJWTByCallingServerFromController;

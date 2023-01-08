"use strict";
// In this file we will handle all the http responses and requests which will call the apis of the user
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
exports.creatingJWTByCallingServerFromController = exports.getUserFromController = exports.DeleteUserFromController = exports.updateUserFromController = exports.getAllUsersFromController = exports.createUserFromController = void 0;
const user_modell_1 = __importDefault(require("../models/user.modell"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// As the userModel is a class represent the table we will create  an instance from this class to be a row
const theUserModel = new user_modell_1.default();
// This is method which reposible for calling creating user api
const createUserFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield theUserModel.createUser(request.body);
        response
            .json({
            code: 200,
            status: "success",
            data: Object.assign({}, user),
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUserFromController = createUserFromController;
// the integration with get all users
const getAllUsersFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield theUserModel.getAllUsers();
        response.json({
            status: "success",
            data: allUsers,
            message: "All users are returned"
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllUsersFromController = getAllUsersFromController;
// the integration with update user using user_id
const updateUserFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield theUserModel.userUpdating(request.body);
        response.json({
            status: "success",
            data: updatedUser
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUserFromController = updateUserFromController;
// the integration with deleting user using user_id
const DeleteUserFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield theUserModel.userDeleting(request.params.id);
        response.json({
            status: "success",
            data: deletedUser,
            message: `The user with id ${request.body} is deleted successfully`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.DeleteUserFromController = DeleteUserFromController;
// the integration with get specific user using user_id which is send in url params
const getUserFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield theUserModel.getTheUser(request.params.id);
        response.json({
            status: "success",
            data: user,
            message: `The user with id ${request.body} is retrived successfully`,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserFromController = getUserFromController;
// creating the jwt
const creatingJWTByCallingServerFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { useremail, userpassword } = request.body;
        const userAuthenticated = yield theUserModel.checkingUserAuthenticationFromModel(useremail, userpassword);
        console.log("from contorller");
        console.log(userAuthenticated);
        const theJWTToken = jsonwebtoken_1.default.sign({ userAuthenticated }, config_1.default.tokenSecret);
        console.log(theJWTToken);
        if (userAuthenticated) {
            return response.json({
                status: "success",
                data: Object.assign(Object.assign({}, userAuthenticated), { theJWTToken })
            });
        }
        else {
            response.json({
                status: "error",
                message: "This user is not authenticated"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.creatingJWTByCallingServerFromController = creatingJWTByCallingServerFromController;

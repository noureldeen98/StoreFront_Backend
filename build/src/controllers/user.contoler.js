"use strict";
// In this file we will handle all the http responses and requests which will call the apis of the user
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
exports.createUserFromController = void 0;
const user_modell_1 = __importDefault(require("../models/user.modell"));
// As the userModel is a class represent the table we will create  an instance from this class to be a row
const theUserModel = new user_modell_1.default();
// This is method which reposible for calling creating user api
const createUserFromController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield theUserModel.createUser(request.body);
        response.json({
            code: 200,
            status: "success",
            data: Object.assign({}, user),
        }).send("hi");
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUserFromController = createUserFromController;

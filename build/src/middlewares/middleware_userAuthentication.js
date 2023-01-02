"use strict";
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
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuthenticationValidionMethFromMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //    gettting the authorization from header 
        const headerUserAuthorization = request.get("authorization");
        // if condition to know if the header request has authorization or not 
        if (headerUserAuthorization) {
            const tokenBarearFromHeaderRquest = headerUserAuthorization.split(" ")[0].toLowerCase();
            const theUserTokenFromHeaderRequest = headerUserAuthorization.split(" ")[1];
            if (theUserTokenFromHeaderRequest && tokenBarearFromHeaderRquest == "bearer") {
                // function verify is used to decode the encoded token which is sent in the header request and it have two arguments first the tokent which comes from header request and the second is secret token 
                const tokenDecoding = jsonwebtoken_1.default.verify(theUserTokenFromHeaderRequest, config_1.default.tokenSecret);
                if (tokenDecoding) {
                    // next hna bt2ol lw s7 el klam ro7 b2a klm al API
                    next();
                }
                else {
                    console.log(next);
                }
            }
            else {
                console.log(next);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = userAuthenticationValidionMethFromMiddleware;

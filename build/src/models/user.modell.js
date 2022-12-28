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
const database_1 = __importDefault(require("../databases/database"));
//Create user
// As we know that the table are represented by class in code and each row is represented by an instances of this class
class userModel {
    // create user method
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect(); // to conncet with dataBase
                const sqlInstruction = "INSERT INTO users (userName , userFirstName ,userLastName , userEmail,userPassword) VLAUES ($user_Name , $user_firstName , $user_secondName , $user_email ,$user_password ) returning *";
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [
                    user.user_name,
                    user.user_firsName,
                    user.user_lastName,
                    user.user_email,
                    user.user_password,
                ]);
                dataBaseConnection.release(); // is used to stop the connection
                return resultsFromMySqlInstruction.rows[0]; // returns the first index of the array
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = userModel;

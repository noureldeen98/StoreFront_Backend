"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const config_1 = __importDefault(require("../config"));
const bcrypt = __importStar(require("bcrypt"));
// Hashing method which is used to hash the passwords with some salt and pepper
const hashingPasswords = (thePasswordOfUser) => {
    const saltOfBcrypt = parseInt(config_1.default.salfBcrypt, 10);
    return bcrypt.hashSync(`${thePasswordOfUser}${config_1.default.bcryptHashing}`, saltOfBcrypt);
};
// As we know that the table are represented by class in code and each row is represented by an instances of this class
class userModel {
    // create user method
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect(); // to conncet with dataBase
                const sqlInstruction = `INSERT INTO users (useremail,username , userfirstname ,userlastname , userpassword) VALUES ($1 , $2 , $3 , $4 ,$5) returning userid,username,userfirstname,userlastname,useremail,userpassword `;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [
                    user.useremail,
                    user.username,
                    user.userfirstname,
                    user.userlastname,
                    hashingPasswords(user.userpassword),
                ]);
                dataBaseConnection.release(); // is used to stop the connection
                return resultsFromMySqlInstruction.rows[0]; // returns the first index of the array
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // get all users method
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = "SELECT userid, username, userfirstname , userlastname , useremail FROM users";
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction);
                dataBaseConnection.release();
                return resultsFromMySqlInstruction.rows;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    //  get specific user using userid as a parameter
    getTheUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = `SELECT userid,username, userfirstname , userlastname , useremail FROM user WHERE userid = ($user_id)`;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [user_id]);
                dataBaseConnection.release();
                return resultsFromMySqlInstruction.rows[0];
            }
            catch (error) {
                throw new Error(`Sorry this user ${user_id} is not found, ${error.message} `);
            }
        });
    }
    // Updating users
    userUpdating(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataBaseConnection = yield database_1.default.connect();
            const sqlInstruction = `UPDATE users SET username=$1, userfirstname=$2 , userlastname=$3, useremail=$4 , userpassword =$5 where userid=$6 returning username,userfirstname, userlastname ,useremail`;
            const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [
                user.username,
                user.userfirstname,
                user.userlastname,
                user.useremail,
                hashingPasswords(user.userpassword),
            ]);
            dataBaseConnection.release();
            return resultsFromMySqlInstruction.rows[0];
        });
    }
    // Deleting user
    userDeleting(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = `DELETE FROM users WHERE userid = ($user_id) returning userid , username ,userfirstname,userlastname ,useremail`;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction);
                return resultsFromMySqlInstruction.rows[0];
            }
            catch (error) {
                throw new Error(`Sorry this user ${user_id} is not found, ${error.message} `);
            }
        });
    }
    // Checking user authentication
    checkingUserAuthenticationFromModel(email, userpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email);
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = `SELECT userpassword FROM users WHERE useremail = $1`;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [email]);
                console.log(resultsFromMySqlInstruction);
                // checking is the rows or not ?
                if (resultsFromMySqlInstruction.rows.length) {
                    const { userpassword: hashingPasswords } = resultsFromMySqlInstruction.rows[0];
                    const isPasswordIsValid = bcrypt.compareSync(`${userpassword}${config_1.default.bcryptHashing}`, hashingPasswords); // Returning boolean
                    console.log("password is valid");
                    console.log(`${userpassword}${config_1.default.bcryptHashing}`, hashingPasswords);
                    console.log(isPasswordIsValid);
                    // if it is true?
                    if (isPasswordIsValid) {
                        const sqlInstruction = `SELECT username,useremail,userfirstname,userlastname FROM users WHERE useremail=($1)`;
                        const theNeededdUser = yield dataBaseConnection.query(sqlInstruction, [email]);
                        return theNeededdUser.rows[0];
                    }
                }
                dataBaseConnection.release();
                return undefined;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = userModel;

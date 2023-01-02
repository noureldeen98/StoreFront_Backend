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
// As we know that the table are represented by class in code and each row is represented by an instances of this class
class productModel {
    // create product method
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect(); // to conncet with dataBase
                const sqlInstruction = `INSERT INTO products (productname , productexpirationdate , productcategory) VALUES ($1 , $2,$3 ) returning productid,productname,productexpirationdate,productcategory `;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [
                    product.productname,
                    product.productexpirationdate,
                    product.productcategory
                ]);
                dataBaseConnection.release(); // is used to stop the connection
                return resultsFromMySqlInstruction.rows[0]; // returns the first index of the array
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // get all products method
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = "SELECT productid,productname,productexpirationdate,productcategory  FROM products";
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction);
                dataBaseConnection.release();
                return resultsFromMySqlInstruction.rows;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    //  get specific product using productid as a parameter
    getTheProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = `SELECT useremail,productid,productid,productdate,totalprice FROM product WHERE productid = ($product_id)`;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [product_id]);
                dataBaseConnection.release();
                return resultsFromMySqlInstruction.rows[0];
            }
            catch (error) {
                throw new Error(`Sorry this product ${product_id} is not found, ${error.message} `);
            }
        });
    }
    // Updating products
    productUpdating(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataBaseConnection = yield database_1.default.connect();
            const sqlInstruction = `UPDATE products SET productname=$1, productexpirationdate=$2 ,productcategory=$3  WHERE productid=$4 returning productid,productname,productexpirationdate,productcategory`;
            const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [
                product.productname,
                product.productexpirationdate,
                product.productcategory
            ]);
            dataBaseConnection.release();
            return resultsFromMySqlInstruction.rows[0];
        });
    }
    // Deleting product
    productDeleting(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = `DELETE FROM products WHERE productid = ($product_id) returning useremail,productid,productid,productdate,totalprice`;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction);
                return resultsFromMySqlInstruction.rows[0];
            }
            catch (error) {
                throw new Error(`Sorry this product ${product_id} is not found, ${error.message} `);
            }
        });
    }
}
exports.default = productModel;

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
class orderModel {
    // create order method
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect(); // to conncet with dataBase
                const sqlInstruction = `INSERT INTO oreders (orderdate , totalprice) VALUES ($1 , $2 ) returning useremail,productid,orderid,orderdate,totalprice `;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [
                    order.useremail,
                    order.productid,
                    order.orderid,
                    order.orderdate,
                    order.totalprice
                ]);
                dataBaseConnection.release(); // is used to stop the connection
                return resultsFromMySqlInstruction.rows[0]; // returns the first index of the array
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // get all orders method
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = "SELECT useremail,productid,orderid,orderdate,totalprice FROM orders";
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction);
                dataBaseConnection.release();
                return resultsFromMySqlInstruction.rows;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    //  get specific order using orderid as a parameter
    getTheOrder(oredr_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = `SELECT useremail,productid,orderid,orderdate,totalprice FROM order WHERE orderid = ($oredr_id)`;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [oredr_id]);
                dataBaseConnection.release();
                return resultsFromMySqlInstruction.rows[0];
            }
            catch (error) {
                throw new Error(`Sorry this order ${oredr_id} is not found, ${error.message} `);
            }
        });
    }
    // Updating orders
    orderUpdating(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataBaseConnection = yield database_1.default.connect();
            const sqlInstruction = `UPDATE orders SET orderdate=$1, totalprice=$2 where orderid=$3 returning useremail,productid,orderid,orderdate,totalprice`;
            const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction, [
                order.useremail,
                order.productid,
                order.orderid,
                order.orderdate,
                order.totalprice
            ]);
            dataBaseConnection.release();
            return resultsFromMySqlInstruction.rows[0];
        });
    }
    // Deleting order
    orderDeleting(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseConnection = yield database_1.default.connect();
                const sqlInstruction = `DELETE FROM orders WHERE orderid = ($order_id) returning useremail,productid,orderid,orderdate,totalprice`;
                const resultsFromMySqlInstruction = yield dataBaseConnection.query(sqlInstruction);
                return resultsFromMySqlInstruction.rows[0];
            }
            catch (error) {
                throw new Error(`Sorry this order ${order_id} is not found, ${error.message} `);
            }
        });
    }
}
exports.default = orderModel;

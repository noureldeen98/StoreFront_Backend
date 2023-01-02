import storeFrontDevDB from "../databases/database";
import theOrder from "../types/orderType";
import { PoolClient, QueryResult } from "pg";

// As we know that the table are represented by class in code and each row is represented by an instances of this class
class orderModel {
  // create order method
  async createOrder(order: theOrder): Promise<theOrder | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect(); // to conncet with dataBase
      const sqlInstruction = `INSERT INTO oreders (orderdate , totalprice) VALUES ($1 , $2 ) returning useremail,productid,orderid,orderdate,totalprice `;
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction, [
          order.useremail,
          order.productid,
          order.orderid,
          order.orderdate,
          order.totalprice
        
        ]);

      dataBaseConnection.release(); // is used to stop the connection

      return resultsFromMySqlInstruction.rows[0]; // returns the first index of the array
    } catch (err) {
      console.log(err);
    }
  }

  // get all orders method
  async getAllOrders(): Promise<theOrder[]> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction =
        "SELECT useremail,productid,orderid,orderdate,totalprice FROM orders";
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction);
      dataBaseConnection.release();
      return resultsFromMySqlInstruction.rows;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  }

  //  get specific order using orderid as a parameter
  async getTheOrder(oredr_id: string): Promise<theOrder | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction = `SELECT useremail,productid,orderid,orderdate,totalprice FROM order WHERE oredrid = ($oredr_id)`;
      const resultsFromMySqlInstruction = await dataBaseConnection.query(
        sqlInstruction,
        [oredr_id]
      );
      dataBaseConnection.release();
      return resultsFromMySqlInstruction.rows[0];
    } catch (error) {
      throw new Error(
        `Sorry this order ${oredr_id} is not found, ${(error as Error).message} `
      );
    }
  }

  // Updating orders
  async orderUpdating(order: theOrder): Promise<theOrder | undefined> {
    const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
    const sqlInstruction = `UPDATE orders SET orderdate=$1, totalprice=$2 where orderid=$3 returning useremail,productid,orderid,orderdate,totalprice`;
    const resultsFromMySqlInstruction = await dataBaseConnection.query(
      sqlInstruction,
      [
        order.useremail,
        order.productid,
        order.orderid,
        order.orderdate,
        order.totalprice
      ]
    );
    dataBaseConnection.release();
    return resultsFromMySqlInstruction.rows[0];
  }

  // Deleting order
  async orderDeleting(order_id: string): Promise<theOrder | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction = `DELETE FROM orders WHERE orderid = ($order_id) returning useremail,productid,orderid,orderdate,totalprice`;
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction);
      return resultsFromMySqlInstruction.rows[0];
    } catch (error) {
      throw new Error(
        `Sorry this order ${order_id} is not found, ${(error as Error).message} `
      );
    }
  }

  
}

export default orderModel;

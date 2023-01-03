import storeFrontDevDB from "../databases/database";
import theOrder from "../types/orderType";
import { PoolClient, QueryResult } from "pg";


class orderProductModel{

      // get all order_Products method
  async getAllOrderProducts(): Promise<theOrder[]> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction =
        "SELECT orderid,productid,quantity FROM order_products";
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction);
      dataBaseConnection.release();
      return resultsFromMySqlInstruction.rows;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  }

    //  get specific order using orderid as a parameter
    async getTheOrderProducts(orderProduct_id: string): Promise<theOrder | undefined> {
        try {
          const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
          const sqlInstruction = `SELECT orderid,productid,quantity FROM order_products WHERE id = ($1)`;
          const resultsFromMySqlInstruction = await dataBaseConnection.query(
            sqlInstruction,
            [orderProduct_id]
          );
          dataBaseConnection.release();
          return resultsFromMySqlInstruction.rows[0];
        } catch (error) {
          throw new Error(
            `Sorry this order ${orderProduct_id} is not found, ${(error as Error).message} `
          );
        }
      }



}


export default orderProductModel
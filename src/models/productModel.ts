import storeFrontDevDB from "../databases/database";
import theProduct from "../types/productType";
import { PoolClient, QueryResult } from "pg";

// As we know that the table are represented by class in code and each row is represented by an instances of this class
class productModel {
  // create product method
  async createProduct(product: theProduct): Promise<theProduct | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect(); // to conncet with dataBase
      const sqlInstruction = `INSERT INTO products (productname , productexpirationdate , productcategory ,productprice) VALUES ($1 , $2,$3,$4 ) returning productid,productname,productexpirationdate,productcategory,productprice `;
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction, [
            
            product.productname,
            product.productexpirationdate,
            product.productcategory,
            product.productprice
        
        ]);

      dataBaseConnection.release(); // is used to stop the connection

      return resultsFromMySqlInstruction.rows[0]; // returns the first index of the array
    } catch (err) {
      console.log(err);
    }
  }

  // get all products method
  async getAllProducts(): Promise<theProduct[]> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction =
        "SELECT productid,productname,productexpirationdate,productcategory,productprice  FROM products";
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction);
      dataBaseConnection.release();
      return resultsFromMySqlInstruction.rows;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  }

  //  get specific product using productid as a parameter
  async getTheProduct(product_id: string): Promise<theProduct | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction = `SELECT productid , productname ,productexpirationdate , productcategory,productprice FROM products WHERE productid = ($1)`;
      const resultsFromMySqlInstruction = await dataBaseConnection.query(
        sqlInstruction,
        [product_id]
      );
      dataBaseConnection.release();
      return resultsFromMySqlInstruction.rows[0];
    } catch (error) {
      throw new Error(
        `Sorry this product ${product_id} is not found, ${(error as Error).message} `
      );
    }
  }

  // Updating products
  async productUpdating(product: theProduct): Promise<theProduct | undefined> {
    const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
    const sqlInstruction = `UPDATE products SET productname=$1, productexpirationdate=$2 ,productcategory=$3 ,productprice=$4  WHERE productid=$5 returning productid,productname,productexpirationdate,productcategory,productprice`;
    const resultsFromMySqlInstruction = await dataBaseConnection.query(
      sqlInstruction,
      [
        product.productname,
        product.productexpirationdate,
        product.productcategory,
        product.productprice
      ]
    );
    dataBaseConnection.release();
    return resultsFromMySqlInstruction.rows[0];
  }

  // Deleting product
  async productDeleting(product_id: string): Promise<theProduct | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction = `DELETE FROM products WHERE productid = ($1) returning productid,productname,productexpirationdate,productcategory,productprice`;
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction);
      return resultsFromMySqlInstruction.rows[0];
    } catch (error) {
      throw new Error(
        `Sorry this product ${product_id} is not found, ${(error as Error).message} `
      );
    }
  }

  
}

export default productModel;

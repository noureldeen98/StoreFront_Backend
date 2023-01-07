import storeFrontDevDB from "../databases/database";
import theUser from "../types/userType";
import config from "../config";
import * as bcrypt from "bcrypt";
import { PoolClient, QueryResult } from "pg";

// Hashing method which is used to hash the passwords with some salt and pepper
const hashingPasswords = (thePasswordOfUser: string) => {
  const saltOfBcrypt = parseInt(config.salfBcrypt as string, 10);
  return bcrypt.hashSync(
    `${thePasswordOfUser}${config.bcryptHashing}`,saltOfBcrypt
  );
};
// As we know that the table are represented by class in code and each row is represented by an instances of this class
class userModel {
  // create user method
  async createUser(user: theUser): Promise<theUser | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect(); // to conncet with dataBase
      const sqlInstruction = `INSERT INTO users (useremail,username , userfirstname ,userlastname , userpassword) VALUES ($1 , $2 , $3 , $4 ,$5) returning userid,username,userfirstname,userlastname,useremail,userpassword `;
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction, [
          user.useremail,
          user.username,
          user.userfirstname,
          user.userlastname,
          hashingPasswords(user.userpassword),
        ]);

      dataBaseConnection.release(); // is used to stop the connection

      return resultsFromMySqlInstruction.rows[0]; // returns the first index of the array
    } catch (err) {
      console.log(err);
    }
  }

  // get all users method
  async getAllUsers(): Promise<theUser[]> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction =
        "SELECT userid, username, userfirstname , userlastname , useremail FROM users";
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction);
      dataBaseConnection.release();
      return resultsFromMySqlInstruction.rows;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  }

  //  get specific user using userid as a parameter
  async getTheUser(user_id: string): Promise<theUser | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction = `SELECT userid,username, userfirstname , userlastname , useremail FROM users WHERE userid = ($1)`;
      const resultsFromMySqlInstruction = await dataBaseConnection.query(
        sqlInstruction,
        [user_id]
      );
      dataBaseConnection.release();
      return resultsFromMySqlInstruction.rows[0];
    } catch (error) {
      throw new Error(
        `Sorry this user ${user_id} is not found, ${(error as Error).message} `
      );
    }
  }

  // Updating users
  async userUpdating(user: theUser): Promise<theUser | undefined> {
    const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
    const sqlInstruction = `UPDATE users SET username=$1, userfirstname=$2 , userlastname=$3, useremail=$4 , userpassword =$5 where userid=$6 returning username,userfirstname, userlastname ,useremail`;
    const resultsFromMySqlInstruction = await dataBaseConnection.query(
      sqlInstruction,
      [
        user.username,
        user.userfirstname,
        user.userlastname,
        user.useremail,
        hashingPasswords(user.userpassword),
      ]
    );
    dataBaseConnection.release();
    return resultsFromMySqlInstruction.rows[0];
  }

  // Deleting user
  async userDeleting(user_id: string): Promise<theUser | undefined> {
    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction = `DELETE FROM users WHERE userid = ($1) returning userid , username ,userfirstname,userlastname ,useremail`;
      const resultsFromMySqlInstruction: QueryResult =
        await dataBaseConnection.query(sqlInstruction);
        dataBaseConnection.release();

      return resultsFromMySqlInstruction.rows[0];
    } catch (error) {
      throw new Error(
        `Sorry this user ${user_id} is not found, ${(error as Error).message} `
      );
    }
  }

  // Checking user authentication
  async checkingUserAuthenticationFromModel(
    email: string,
    userpassword: string
  ): Promise<theUser | undefined> {
    console.log(email);

    try {
      const dataBaseConnection: PoolClient = await storeFrontDevDB.connect();
      const sqlInstruction = `SELECT userpassword FROM users WHERE useremail = $1`;
      const resultsFromMySqlInstruction = await dataBaseConnection.query(
        sqlInstruction,
        [email]
      );
      console.log(resultsFromMySqlInstruction);
      // checking is the rows or not ?
      if (resultsFromMySqlInstruction.rows.length) {
        const { userpassword: hashingPasswords } =
          resultsFromMySqlInstruction.rows[0];
        const isPasswordIsValid = bcrypt.compareSync(
          `${userpassword}${config.bcryptHashing}`,
          hashingPasswords
        ); // Returning boolean
        console.log("password is valid?");
console.log( `${userpassword}${config.bcryptHashing}`,hashingPasswords);



        console.log(isPasswordIsValid);
        // if it is true?
        if (isPasswordIsValid) {

          const sqlInstruction = `SELECT username,useremail,userfirstname,userlastname FROM users WHERE useremail=($1)`;
          const theNeededdUser = await dataBaseConnection.query(
            sqlInstruction,
            [email]
          );
          return theNeededdUser.rows[0];
        }
      }
      dataBaseConnection.release();
      return undefined;
    } catch (error) {
      console.log(error);
    }
  }
}

export default userModel;

import storeFrontDevDB from "../databases/database";
import theUser from "../types/userType";
//Create user
// As we know that the table are represented by class in code and each row is represented by an instances of this class
class userModel {
  // create user method
  async createUser(user: theUser): Promise<theUser | undefined> {
    try {
      const dataBaseConnection = await storeFrontDevDB.connect(); // to conncet with dataBase
      const sqlInstruction =
        `INSERT INTO users (useremail,username , userfirstname ,userlastname , userpassword) VALUES ($1 , $2 , $3 , $4 ,$5) returning *`;
      const resultsFromMySqlInstruction = await dataBaseConnection.query(
        sqlInstruction,
        [
          user.useremail,
          user.username,
          user.userfirstname,
          user.userlastname,
          user.userpassword,
        ]
      );

      dataBaseConnection.release(); // is used to stop the connection

      return resultsFromMySqlInstruction.rows[0]; // returns the first index of the array
    } catch (err) {
      console.log(err);
    }
  }
}

export default userModel;

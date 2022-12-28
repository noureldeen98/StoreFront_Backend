import db from "../databases/database";
import theUser from "../types/userType";
//Create user
// As we know that the table are represented by class in code and each row is represented by an instances of this class
class userModel {
  // create user method
  async createUser(user: theUser): Promise<theUser | undefined> {
    try {
      const dataBaseConnection = await db.connect(); // to conncet with dataBase
      const sqlInstruction =
        "INSERT INTO users (userName , userFirstName ,userLastName , userEmail,userPassword) VLAUES ($user_Name , $user_firstName , $user_secondName , $user_email ,$user_password ) returning *";
      const resultsFromMySqlInstruction = await dataBaseConnection.query(
        sqlInstruction,
        [
          user.user_name,
          user.user_firsName,
          user.user_lastName,
          user.user_email,
          user.user_password,
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

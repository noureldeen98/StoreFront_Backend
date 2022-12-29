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
        `INSERT INTO users (useremail,username , userfirstname ,userlastname , userpassword) VALUES ($1 , $2 , $3 , $4 ,$5) returning userid,username,userfirstname,userlastname,useremail `;
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


    // get all users method
  async getAllUsers ():Promise<theUser[]> {
    try {const dataBaseConnection = await storeFrontDevDB.connect()
    const sqlInstruction = 'SELECT userid, username, userfirstname , userlastname, userpassword , useremail FROM users';
    const resultsFromMySqlInstruction = await dataBaseConnection.query(sqlInstruction);
    dataBaseConnection.release()
    return resultsFromMySqlInstruction.rows
  }catch(error){
     throw new Error(`${(error as Error).message}`)
  }
 
  }

//  get specific user using userid as a parameter
async getTheUser (user_id:string): Promise<theUser | undefined>{
try {  const dataBaseConnection = await storeFrontDevDB.connect();
  const sqlInstruction =`SELECT userid,username, userfirstname , userlastname , useremail FROM user WHERE userid = ($user_id)`;
  const resultsFromMySqlInstruction =await dataBaseConnection.query(sqlInstruction,[user_id])
  dataBaseConnection.release();
  return  resultsFromMySqlInstruction.rows[0];
}catch(error){
  throw new Error (`Sorry this user ${user_id} is not found, ${(error as Error).message} `)
}
}

// Updating users
async userUpdating (user:theUser):Promise<theUser | undefined>{
const dataBaseConnection = await storeFrontDevDB.connect();
const sqlInstruction = `UPDATE users SET username=$1, userfirstname=$2 , userlastname=$3, useremail=$4 , userpassword =$5 where userid=$6 returning username,userfirstname, userlastname ,useremail`;
const resultsFromMySqlInstruction =await dataBaseConnection.query(sqlInstruction,[
  user.username,
  user.userfirstname,
  user.userlastname,
  user.useremail,
  user.userpassword
]);
dataBaseConnection.release();
return resultsFromMySqlInstruction.rows[0]
}

// Deleting user 
async userDeleting(user_id:string ):Promise<theUser | undefined>{
try { const dataBaseConnection = await storeFrontDevDB.connect();
 const sqlInstruction = `DROP FROM users WHERE userid = ($user_id) returning userid , username ,userfirstname,userlastname ,useremail`;
 const resultsFromMySqlInstruction = await dataBaseConnection.query(sqlInstruction);
 return resultsFromMySqlInstruction.rows[0]
}catch(error){
  throw new Error(`Sorry this user ${user_id} is not found, ${(error as Error).message} `)
}
}

}

export default userModel;

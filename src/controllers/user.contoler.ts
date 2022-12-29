// In this file we will handle all the http responses and requests which will call the apis of the user
// Here the controllers can integrate with models

import { Response, Request, NextFunction } from "express";
import userModel from "../models/user.modell";

// As the userModel is a class represent the table we will create  an instance from this class to be a row
const theUserModel = new userModel();

// This is method which reposible for calling creating user api
export const createUserFromController = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const user = await theUserModel.createUser(request.body);
    response
      .json({
        code: 200,
        status: "success", //when it successed
        data: { ...user },
      })
  } catch (error) {
    console.log(error);
  }
};

// the integration with get all users
 export const getAllUsersFromController = async (request: Request, response: Response):Promise<void> => {
    try {const allUsers = await theUserModel.getAllUsers();
     response.json({
      status:"success",
        data:allUsers,
        message:"All users are returned"
     })
    }catch(error){
      console.log(error);
    }
  };


  // the integration with update user using user_id
 export const updateUserFromController= async  (request:Request , response:Response):Promise<void> =>{
try{    const updatedUser = await theUserModel.userUpdating(request.body) 
    response.json({
     status:"success",
     data:updatedUser
    })}catch(error){
      console.log(error);
      
    }
  }

  // the integration with deleting user using user_id
  export const DeleteUserFromController  =async (request:Request , response:Response):Promise<void>=>{
    try{
      const deletedUser = await theUserModel.userDeleting(request.body);
      response.json({
        status:"success",
        data:deletedUser,
        message:`The user with id ${request.body} is deleted successfully`
      })
    }catch(error){
   console.log(error)
    }
  }

    
  // the integration with get specific user using user_id which is send in body request
export const getUserFromController = async (request:Request , response:Response):Promise<void>=>{
  try{
    const user = await theUserModel.getTheUser(request.params.userID as unknown as string);
    response.json({
      status:"success",
      data:user,
      message:`The user with id ${request.body} is retrived successfully`
    })
  }
catch(error){
   console.log(error);
   
}
}





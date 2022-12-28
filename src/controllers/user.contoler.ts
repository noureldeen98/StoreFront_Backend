// In this file we will handle all the http responses and requests which will call the apis of the user

import { Response, Request, NextFunction } from "express";
import userModel from "../models/user.modell";
import theUser from "../types/userType";

// As the userModel is a class represent the table we will create  an instance from this class to be a row
const theUser = new userModel();

// This is method which reposible for calling creating user api
export const createUserFromController = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user :theUser | undefined = await theUser.createUser(request.body);
    response.json({
      code: 200,
      status: "success",
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

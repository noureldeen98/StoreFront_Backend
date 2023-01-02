// In this file we will handle all the http responses and requests which will call the apis of the order
// Here the controllers can integrate with models

import { Response, Request, NextFunction } from "express";
import orderModel from "../models/orderModel";
import jwt from "jsonwebtoken"
import  config  from "../config";
import theOrder from "../types/orderType";
import userModel from '../models/user.modell'

// As the orderModel is a class represent the table we will create  an instance from this class to be a row
const theOrderModel = new orderModel();
const theUserModel = new userModel();

// This is method which reposible for calling creating order api
export const createOrderFromController = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const order = await theOrderModel.createOrder(request.body);
    response
      .json({
        code: 200,
        status: "success", //when it successed
        data: { ...order },
      })
  } catch (error) {
    console.log(error);
  }
};

// the integration with get all orders
 export const getAllOrdersFromController = async (request: Request, response: Response):Promise<void> => {
    try {const allOrders = await theOrderModel.getAllOrders();
     response.json({
      status:"success",
        data:allOrders,
        message:"All orders are returned"
     })
    }catch(error){
      console.log(error);
    }
  };


  // the integration with update order using order_id
 export const updateOrderFromController= async  (request:Request , response:Response):Promise<void> =>{
try{    const updatedOrder = await theOrderModel.orderUpdating(request.body) 
    response.json({
     status:"success",
     data:updatedOrder
    })}catch(error){
      console.log(error);
      
    }
  }

  // the integration with deleting order using order_id
  export const DeleteOrderFromController  =async (request:Request , response:Response):Promise<void>=>{
    try{
      const deletedOrder = await theOrderModel.orderDeleting(request.body);
      response.json({
        status:"success",
        data:deletedOrder,
        message:`The order with id ${request.body} is deleted successfully`
      })
    }catch(error){
   console.log(error)
    }
  }

    
  // the integration with get specific order using order_id which is send in url params
export const getOrderFromController = async (request:Request , response:Response):Promise<void>=>{
  try{
    const order = await theOrderModel.getTheOrder(request.params.orderID as unknown as string);
    response.json({
      status:"success",
      data:order,
      message:`The order with id ${request.body} is retrived successfully`
    })
  }
catch(error){
   console.log(error);
   
}
}

// creating the jwt
export const creatingJWTByCallingServerFromController = async (request:Request,response:Response)=>{
    try{
      const  {orderemail,orderpassword} = request.body
      const orderAuthenticated = await theUserModel.checkingUserAuthenticationFromModel(orderemail,orderpassword);
      console.log("from contorller");
      
      console.log(orderAuthenticated);
      
      const theJWTToken:string  = jwt.sign({orderAuthenticated},config.tokenSecret as unknown  as string);
console.log(theJWTToken);

      
      if(orderAuthenticated){
        return response.json({
          status:"success",
          data:{...orderAuthenticated,theJWTToken}
        })
      }else{
        response.json({
          status:"error",
          message:"This order is not authenticated"
        })
      }
    }catch(error){
      console.log(error);
      
    }
}






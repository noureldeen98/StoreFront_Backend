import { Response, Request, NextFunction } from "express";


import orderProductModel from '../models/orderProduct'

const theorderProductModel = new orderProductModel();

// the integration with get all ordersProducts
export const getAllOrderProductFromController = async (request: Request, response: Response):Promise<void> => {
    try {const allOrders = await theorderProductModel.getAllOrderProducts();
     response.json({
      status:"success",
        data:allOrders,
        message:"All orders are returned"
     })
    }catch(error){
      console.log(error);
    }
  };


      
  // the integration with get specific order using orderProduct_id which is send in url params
export const getOrderProductFromController = async (request:Request , response:Response):Promise<void>=>{
    try{
      const order = await theorderProductModel.getTheOrderProducts(request.params.orderID as unknown as string);
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

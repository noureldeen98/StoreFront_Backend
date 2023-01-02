// In this file we will handle all the http responses and requests which will call the apis of the product
// Here the controllers can integrate with models

import { Response, Request, NextFunction } from "express";
import productModel from "../models/productModel";
import jwt from "jsonwebtoken"
import  config  from "../config";
import theProduct from "../types/productType";
import userModel from '../models/user.modell'

// As the productModel is a class represent the table we will create  an instance from this class to be a row
const theProductModel = new productModel();
const theUserModel = new userModel();

// This is method which reposible for calling creating product api
export const createProductFromController = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const product = await theProductModel.createProduct(request.body);
    response
      .json({
        code: 200,
        status: "success", //when it successed
        data: { ...product },
      })
  } catch (error) {
    console.log(error);
  }
};

// the integration with get all products
 export const getAllProductsFromController = async (request: Request, response: Response):Promise<void> => {
    try {const allProducts = await theProductModel.getAllProducts();
     response.json({
      status:"success",
        data:allProducts,
        message:"All products are returned"
     })
    }catch(error){
      console.log(error);
    }
  };


  // the integration with update product using product_id
 export const updateProductFromController= async  (request:Request , response:Response):Promise<void> =>{
try{    const updatedProduct = await theProductModel.productUpdating(request.body) 
    response.json({
     status:"success",
     data:updatedProduct
    })}catch(error){
      console.log(error);
      
    }
  }

  // the integration with deleting product using product_id
  export const DeleteProductFromController  =async (request:Request , response:Response):Promise<void>=>{
    try{
      const deletedProduct = await theProductModel.productDeleting(request.body);
      response.json({
        status:"success",
        data:deletedProduct,
        message:`The product with id ${request.body} is deleted successfully`
      })
    }catch(error){
   console.log(error)
    }
  }

    
  // the integration with get specific product using product_id which is send in url params
export const getProductFromController = async (request:Request , response:Response):Promise<void>=>{
  try{
    const product = await theProductModel.getTheProduct(request.params.id as unknown as string);
    response.json({
      status:"success",
      data:product,
      message:`The product with id ${request.body} is retrived successfully`
    })
  }
catch(error){
   console.log(error);
   
}
}

// creating the jwt
export const creatingJWTByCallingServerFromController = async (request:Request,response:Response)=>{
    try{
      const  {productemail,productpassword} = request.body
      const productAuthenticated = await theUserModel.checkingUserAuthenticationFromModel(productemail,productpassword);
      console.log("from contorller");
      
      console.log(productAuthenticated);
      
      const theJWTToken:string  = jwt.sign({productAuthenticated},config.tokenSecret as unknown  as string);
console.log(theJWTToken);

      
      if(productAuthenticated){
        return response.json({
          status:"success",
          data:{...productAuthenticated,theJWTToken}
        })
      }else{
        response.json({
          status:"error",
          message:"This product is not authenticated"
        })
      }
    }catch(error){
      console.log(error);
      
    }
}






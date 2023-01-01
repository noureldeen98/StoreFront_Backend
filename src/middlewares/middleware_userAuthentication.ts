import config from "../config";
import jwt from "jsonwebtoken"
import { NextFunction, Request , Response } from "express";




const userAuthenticationValidionMethFromMiddleware =async (request:Request , response:Response, next:NextFunction):Promise<void> => {

    try{
//    gettting the authorization from header 
const headerUserAuthorization = request.get("authorization");
// if condition to know if the header request has authorization or not 
if(headerUserAuthorization){
    const tokenBarearFromHeaderRquest = headerUserAuthorization.split(" ")[0].toLowerCase();
    const theUserTokenFromHeaderRequest = headerUserAuthorization.split(" ")[1];
    if(theUserTokenFromHeaderRequest && tokenBarearFromHeaderRquest=="bearer"){
        // function verify is used to decode the encoded token which is sent in the header request and it have two arguments first the tokent which comes from header request and the second is secret token 
        const tokenDecoding = jwt.verify(theUserTokenFromHeaderRequest,config.tokenSecret as unknown as string);
        if(tokenDecoding){ 
            // next hna bt2ol lw s7 el klam ro7 b2a klm al API
            next();
        }else{
            console.log(next)
        }
    }else{
        console.log(next)

    }
}

    }catch(error:unknown | Error){
        console.log(error);
        
    }
    
} 


export default userAuthenticationValidionMethFromMiddleware;
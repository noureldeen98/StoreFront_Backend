import theOrder from "../types/orderType"
import theProduct from "../types/productType"
import theUser from "../types/userType"

import userModel from "../models/user.modell"
import storeFrontDevDB from "../databases/database"
import productModel from "../models/productModel"
import orderModel from "../models/orderModel"

const userModelObj = new userModel()
const productModelObj = new productModel()
const orderModelObj = new orderModel()


const userID = "aaf5ac45-1a2a-4ea4-94c8-9a8d00324d60";
const productID = "a7522756-6d81-4ab5-90c2-cb6fd69f369c";
const orderID = "a7522756-6d81-4ab5-90c2-cb6fd69f369c";

const user:theUser={
    username:"NourEldeen_Nasser",
    userfirstname:"Nour-Eldeen",
    userlastname:"Nasser",
    useremail:"nenasser1000@gmail.com",
    userpassword:"test123456"
}

const createdUser={...user , userid:"1"}

const newuser={
    username:"NourEldeen_Nasser",
    userfirstname:"Nour-Eldeen",
    userlastname:"Nasser",
    useremail:"nenasser1000@gmail.com",
    userpassword:"test123456"
}

const product:theProduct={
    productname:"Tea",
    productexpirationdate:new Date("12-12-2024"),
    productprice:"12"
}
const createdProduct={...product,productid:"1"}



const order:theOrder={
    orderdate:"12-12-2022",
    totalprice:"105"
}

const createdOrder={...order,orderid:"1"}

describe("test order model",()=>{
    beforeAll(async()=>{
        const db_connection = await storeFrontDevDB.connect();
        await userModelObj.createUser(user);
        await productModelObj.createProduct(product)
        db_connection.release()
    })
    it("create order should be defined",()=>{
        expect(orderModelObj.createOrder).toBeDefined()
    })
    it("test the create order",async()=>{
        const result = await orderModelObj.createOrder(order)
        expect(result).toEqual({...createdOrder})
    })

    it("get the order",async()=>{
        const result = await orderModelObj.getTheOrder("1");
        expect(result).toEqual({...createdOrder})
    })
})

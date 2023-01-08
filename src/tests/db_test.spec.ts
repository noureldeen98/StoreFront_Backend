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


const userID = "9593088d-f62e-4a65-b6ae-eca255c9a731";
const productID = "4ded5895-a3f5-4b8a-b50e-8347cf3c381c";
const orderID = "f33af22a-9a1a-418d-bd1b-6f4d154ed245";


const numberOfProductsInMyTable=38 // Please edit it to the number of your product's table rows in my table there are 38 

const user:theUser={
    useremail:"nournasser10@gmail.com",
    username:"NourEldeen_Nasser",
    userfirstname:"Nour-Eldeen",
    userlastname:"Nasser",
    userpassword:"test123456"
}

const createdUser={...user , userid:`${userID}`}

const product:theProduct={
    productname:"Tea",
    productexpirationdate:new Date("12-12-2024"),
    productprice:"12"
}
const createdProduct={...product,productid:`${productID}`}



const order:theOrder={
    orderdate:new Date("12-12-2022"),
    totalprice:"105"
}

const createdOrder={...order,orderid:`${orderID}`}

describe("test user model",()=>{
    

    it("create user should be defined",()=>{
        expect(userModelObj.createUser).toBeDefined()
    })
    it("test the create user",async()=>{
        const result = await userModelObj.createUser(user)
        console.log(result);
        
        expect(result?.username).toEqual(createdUser.username)
    })

    it("get the user",async()=>{
        const result = await userModelObj.getTheUser(`${userID}`);
        expect(result?.useremail).toEqual(user.useremail)
    })
})




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
        expect(result?.orderdate).toEqual(createdOrder.orderdate)
        expect(result?.totalprice).toEqual(createdOrder.totalprice)
    })

    it("get the order",async()=>{
        const result = await orderModelObj.getTheOrder(`${orderID}`);
        expect(result?.totalprice).toEqual(createdOrder.totalprice)
    })
    it("get all orders",async()=>{
        const result = await orderModelObj.getAllOrders();
        expect(result.length).toEqual(28)
    })
    
})

describe("test product model", ()=>{
    it("create product",async ()=>{
        const result = await productModelObj.createProduct(product);
        expect(result?.productprice).toEqual(createdProduct.productprice)
    })

        it("get product",async ()=>{
        const result = await productModelObj.getTheProduct(`${productID}`);
        expect(result?.productprice).toEqual(createdProduct.productprice)
    })

    it("get all the products",async()=>{
        const results = await productModelObj.getAllProducts();
        expect(results.length).toBe(parseInt(`${numberOfProductsInMyTable}`)) // as I created 38 product
    })
})

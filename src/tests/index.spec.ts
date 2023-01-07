import supertest from "supertest";
import { myMainStoreFrontBackend } from "../index";
import orderModel from "../models/orderModel";
import userModel from "../models/user.modell";
import theOrderProductsRoutes from "../routes/api/orderProducts";

import theOrder from "../types/orderType"


const orderModelObj = new orderModel()
const requestSuperTest = supertest(myMainStoreFrontBackend);

const productSample  = {

  productname:"product1",
  productexpirationdate:"12/12/2024",
  productcategory:"products",
  productprice:"200"

}


const userAsTest={

  username:"Nour-Eldeen",
  userfirstname:"Nour-Eldeen",
  userlastname:"Nasser",
  userpassword:"test123",
  useremail:"nenasser10@gmail.com"
}



// This test case for the main api
describe("Test the main api ", () => {
  it("which is /sotreFront/api", async () => {
    const responseSuperTest = await requestSuperTest.get("/sotreFront/api");
    expect(responseSuperTest.status).toBe(404); // as this is not full path so the result will be 404
  });
});

describe("Test the users api endpoints ", () => {
 
  // test create user end point
  it("which is /sotreFront/api/users/createUser", async () => {
    const responseSuperTest = await requestSuperTest.post(
      "/sotreFront/api/users/createUser"
    );
    expect(responseSuperTest.status).toBe(200);
  });

  it("which is /sotreFront/api/users/createUser", async () => {
    const responseSuperTest = await requestSuperTest.get(
      "/sotreFront/api/users/createUser"
    );
    expect(responseSuperTest.status).toBe(404); // as this is not post request so the result will be 404
  });

  // test get all users end point
  it("which is /sotreFront/api/users/getAllUsers", async () => {
    const responseSuperTest = await requestSuperTest.get(
      "/sotreFront/api/users/getAllUsers"
    );
    expect(responseSuperTest.status).toBe(200); // as this is not full path so the result will be 404
  });

  it("which is /sotreFront/api/users/getAllUsers", async () => {
    const responseSuperTest = await requestSuperTest.post(
      "/sotreFront/api/users/getAllUsers"
    );
    expect(responseSuperTest.status).toBe(404); // as this is  post request so the result will be 404
  });

  // test get user end point using the id which sent as params in url
  it("which is /sotreFront/api/users/:id/getUser", async () => {
    const responseSuperTest = await requestSuperTest.get(
      "/sotreFront/api/users/15/getUser"
    );
    expect(responseSuperTest.body.status).toEqual("success");
  });

  it("which is /sotreFront/api/users/:id/getUser", async () => {
    const responseSuperTest = await requestSuperTest.post(
      "/sotreFront/api/users/:id/getUser"
    );
    expect(responseSuperTest.status).toBe(404); // as this is  post request so the result will be 404
  });


});

// Testing order endpoint
describe("Test the order end point ", () => {
  const orderByUser={
    
    orderdate:new Date("2022-12-12"),
    totalprice:"500",
  
  }as theOrder;
//  beforeAll(async()=>{
//   const {orderid} = await orderModelObj.createOrder(orderByUser);
//    orderByUser.orderid =orderid
//  });

 

  //  test create the order
  it("Test the create order ", async () => {

    const responseSuperTest = await requestSuperTest.post(
      "/sotreFront/api/orders/createOrder"
    );
    expect(responseSuperTest.status).toBe(200);
  });

  //  test get all orders
  it("Test the get all orders ", async () => {
    const responseSuperTest = await requestSuperTest.get(
      "/sotreFront/api/orders/getAllOrders"
    );
    expect(responseSuperTest.status).toBe(200);
  });
  // test edit the order
  it("Test edite the order  ", async () => {
    const responseSuperTest = await requestSuperTest.patch(
      "/sotreFront/api/orders/:id/editOrders"
    );
    expect(responseSuperTest.body.status).toEqual("success");
  });

  // test get the order
  it("Test get the order  ", async () => {
    const responseSuperTest = await requestSuperTest.get(
      `/sotreFront/api/orders/:id/getOrder`
    );
    expect(responseSuperTest.status).toBe(200);
  });


  // test delete the order
  // it("Test delet the order  ", async () => {
  //   const responseSuperTest = await requestSuperTest.delete(
  //     "/sotreFront/api/orders/:id/deletetOrder"
  //   );
  //   expect(responseSuperTest.status).toBe(200);
  // });
});

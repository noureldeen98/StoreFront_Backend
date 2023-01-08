import { PoolClient } from "pg";
import supertest from "supertest";
import storeFrontDevDB from "../databases/database";
import { myMainStoreFrontBackend } from "../index";
import orderModel from "../models/orderModel";
import productModel from "../models/productModel";
import userModel from "../models/user.modell";
import theOrderProductsRoutes from "../routes/api/orderProducts";

import theOrder from "../types/orderType";

import theUser from "../types/userType";

let client: PoolClient;

const orderModelObj = new orderModel();
const productModelObj = new productModel();
const userModelObj = new userModel();


const requestSuperTest = supertest(myMainStoreFrontBackend);

const userID = "aaf5ac45-1a2a-4ea4-94c8-9a8d00324d60";
const productID = "a7522756-6d81-4ab5-90c2-cb6fd69f369c";
const orderID = "a7522756-6d81-4ab5-90c2-cb6fd69f369c";


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
      `/sotreFront/api/users/${userID}/getUser`
    );
    expect(responseSuperTest.body.status).toEqual("success");
  });

  it("which is /sotreFront/api/users/:id/getUser", async () => {
    const responseSuperTest = await requestSuperTest.post(
      `/sotreFront/api/users/${userID}getUser`
    );
    expect(responseSuperTest.status).toBe(404); // as this is  post request so the result will be 404
  });
});

// Testing order endpoint
describe("Test the order end point ", () => {
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
      `/sotreFront/api/orders/${orderID}/editOrders`
    );
    expect(responseSuperTest.body.status).toEqual("success");
  });

  // test get the order
  it("Test get the order  ", async () => {
    const responseSuperTest = await requestSuperTest.get(
      `/sotreFront/api/orders/${orderID}/getOrder`
    );
    expect(responseSuperTest.status).toBe(200);
  });

  // test delete the order
  it("Test delet the order  ", async () => {
    const responseSuperTest = await requestSuperTest.delete(
      `/sotreFront/api/orders/${orderID}/deletetOrder`
    );
    expect(responseSuperTest.status).toBe(200);
  });
});

// Testing products endpoints
describe("Test the products end points", () => {
  it("test create a product end point ", async () => {
    const responseSuperTest = await requestSuperTest.post(
      "/sotreFront/api/products/createProduct"
    );
    expect(responseSuperTest.status).toBe(200);
  });

  it("test get a product end point ", async () => {
    const responseSuperTest = await requestSuperTest.get(
      `/sotreFront/api/products/${productID}/getProduct`
    );
    expect(responseSuperTest.status).toBe(200);
  });

  it("test get all products end point ", async () => {
    const responseSuperTest = await requestSuperTest.get(
      `/sotreFront/api/products/getAllProducts`
    );
    expect(responseSuperTest.status).toBe(200);
  });

  // it("test edit product end point ", async () => {
  //   const responseSuperTest = await requestSuperTest.patch(
  //     `/sotreFront/api/products/${productID}/editProducts`
  //   );
  //   expect(responseSuperTest.status).toBe(200);
  // });

  it("test delete product end point ", async () => {
    const responseSuperTest = await requestSuperTest.delete(
      `/sotreFront/api/products/${productID}/deletetProduct`
    );
    expect(responseSuperTest.status).toBe(200);
  });
});

// Test order product

describe("Test orderProduct", () => {
  it("get all orderProducts", async () => {
    const responseSuperTest = await requestSuperTest.get(
      "/sotreFront/api/theOrderProducts/getAllOrderProducts"
    );
    expect(responseSuperTest.status).toBe(200);
  });

  it("get all orderProducts", async () => {
    const responseSuperTest = await requestSuperTest.get(
      "/sotreFront/api/theOrderProducts/:id/getOrderProduct"
    );
    expect(responseSuperTest.status).toBe(200);
  });
});


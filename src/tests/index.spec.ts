import supertest from "supertest";
import { myMainStoreFrontBackend } from "../index";
import userModel from "../models/user.modell";

const requestSuperTest = supertest(myMainStoreFrontBackend);

// This test case for the main api
describe("Test the main api ", () => {
  it("which is /sotreFront/api", async () => {
    const responseSuperTest = await requestSuperTest.get("/sotreFront/api");
    expect(responseSuperTest.status).toBe(404); // as this is not full path so the result will be 404
  });
});

describe("Test the users api endpoints ", () => {
  const userID = 2;
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

  // test delete user end point using the id which sent as params in url
  it("which is /sotreFront/api/users/2/deletetUser", async () => {
    const responseSuperTest = await requestSuperTest.delete(
      "/sotreFront/api/users/15/deletetUser"
    );
    expect(responseSuperTest.body.status).toEqual("success");
  });

  // test edit user end point using the id which sent as params in url
  it("which is /sotreFront/api/users/:id/editUsers", async () => {
    const responseSuperTest = await requestSuperTest.patch(
      "/sotreFront/api/users/2/editUsers"
    );
    expect(responseSuperTest.status).toBe(200);
  });
});

// Testing order endpoint
describe("Test the order end point ", () => {
  //  test create the order
  it("Test the create order ", async () => {
    const responseSuperTest = await requestSuperTest.post(
      "/sotreFront/api/orders/createorder"
    );
    expect(responseSuperTest.status).toBe(200);
  });

  //  test get all orders
  it("Test the get all orders ", async () => {
    const responseSuperTest = await requestSuperTest.get(
      "/sotreFront/api/orders/getAllorders"
    );
    expect(responseSuperTest.status).toBe(200);
  });
  // test edit the order
  it("Test edite the order  ", async () => {
    const responseSuperTest = await requestSuperTest.patch(
      "/sotreFront/api/orders/15/editorders"
    );
    expect(responseSuperTest.body.status).toEqual("success");
  });
  // test get the order
  it("Test edite the order  ", async () => {
    const responseSuperTest = await requestSuperTest.get(
      "/sotreFront/api/orders/:id/getorder"
    );
    expect(responseSuperTest.status).toBe(200);
  });

  // test delete the order
  it("Test edite the order  ", async () => {
    const responseSuperTest = await requestSuperTest.delete(
      "/sotreFront/api/orders/:id/deletetorder"
    );
    expect(responseSuperTest.status).toBe(200);
  });
});

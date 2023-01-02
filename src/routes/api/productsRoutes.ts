import { Router } from "express";
import * as controllers from "../../controllers/productControllers";
import userAuthenticationValidionMethFromMiddleware from "../../middlewares/middleware_userAuthentication";

const theProductsRoutes = Router();

// just for testing the api
theProductsRoutes.post("/createProduct", controllers.createProductFromController);
theProductsRoutes.get(
  "/getAllProducts",
  controllers.getAllProductsFromController
);
theProductsRoutes.patch("/:id/editProducts", controllers.updateProductFromController);
theProductsRoutes.get("/:id/getProduct", controllers.getProductFromController);
theProductsRoutes.delete("/:id/deletetProduct", controllers.DeleteProductFromController);
theProductsRoutes.post(
  "/authenticate",
  userAuthenticationValidionMethFromMiddleware,
  controllers.creatingJWTByCallingServerFromController
);

export default theProductsRoutes;

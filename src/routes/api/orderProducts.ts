import { Router } from "express";
import * as controllers from "../../controllers/order_productControllers";


const theOrderProductsRoutes = Router();

// just for testing the api
theOrderProductsRoutes.get("/:id/getOrderProduct", controllers.getOrderProductFromController);
theOrderProductsRoutes.get(
  "/getAllOrderProducts",
  controllers.getAllOrderProductFromController
);


export default theOrderProductsRoutes;

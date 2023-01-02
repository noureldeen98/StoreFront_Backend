import { Router } from "express";
import * as controllers from "../../controllers/orderControllers";
import userAuthenticationValidionMethFromMiddleware from "../../middlewares/middleware_userAuthentication";

const theOrdersRoutes = Router();

// just for testing the api
theOrdersRoutes.post("/createOrder", controllers.createOrderFromController);
theOrdersRoutes.get(
  "/getAllOrders",
  controllers.getAllOrdersFromController
);
theOrdersRoutes.patch("/:id/editOrders", controllers.updateOrderFromController);
theOrdersRoutes.get("/:id/getOrder", controllers.getOrderFromController);
theOrdersRoutes.delete("/:id/deletetOrder", controllers.DeleteOrderFromController);
theOrdersRoutes.post(
  "/authenticate",
  userAuthenticationValidionMethFromMiddleware,
  controllers.creatingJWTByCallingServerFromController
);

export default theOrdersRoutes;

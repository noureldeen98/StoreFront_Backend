import { Router } from "express";
import * as controllers from "../../controllers/user.contoler";
import userAuthenticationValidionMethFromMiddleware from "../../middlewares/middleware_userAuthentication";

const theUsersRoutes = Router();

// just for testing the api
theUsersRoutes.post("/createUser", controllers.createUserFromController);
theUsersRoutes.get(
  "/getAllUsers",
  controllers.getAllUsersFromController
);
theUsersRoutes.patch("/:id/editUsers", controllers.updateUserFromController);
theUsersRoutes.get("/:id/getUser", controllers.getUserFromController);
theUsersRoutes.delete("/:id/deletetUser", controllers.DeleteUserFromController);
theUsersRoutes.post(
  "/authenticate",
  userAuthenticationValidionMethFromMiddleware,
  controllers.creatingJWTByCallingServerFromController
);

export default theUsersRoutes;

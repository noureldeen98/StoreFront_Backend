import { Request, Router, Response } from "express";
import * as controllers from "../../controllers/user.contoler";

const theUsersRoutes = Router();

// just for testing the api 
theUsersRoutes.post("/createUser",controllers.createUserFromController)
theUsersRoutes.get("/getAllUsers",controllers.getAllUsersFromController)
theUsersRoutes.patch("/:id/editUsers",controllers.updateUserFromController)
theUsersRoutes.get("/:id/getUser",controllers.getUserFromController)
theUsersRoutes.delete("/:id/deletetUser",controllers.DeleteUserFromController)



export default theUsersRoutes;
import { Request, Router, Response } from "express";
import * as controllers from "../../controllers/user.contoler";

const theUsersRoutes = Router();

// just for testing the api 
theUsersRoutes.post("/",controllers.createUserFromController)

export default theUsersRoutes;
import { Router } from "express";
import usersRouter from "./api/users.routes";

const themainRoutes = Router();

themainRoutes.use("/users", usersRouter);

export default themainRoutes;

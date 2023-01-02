import { Router } from "express";
import usersRouter from "./api/users.routes";
import theOrdersRoutes from "./api/orderRoutes"

const themainRoutes = Router();

themainRoutes.use("/users", usersRouter);
themainRoutes.use("/orders",theOrdersRoutes);


export default themainRoutes;

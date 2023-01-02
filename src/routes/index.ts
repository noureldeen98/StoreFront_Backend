import { Router } from "express";
import usersRouter from "./api/users.routes";
import theOrdersRoutes from "./api/orderRoutes"
import theProductsRoutes from "./api/productsRoutes"

const themainRoutes = Router();

themainRoutes.use("/users", usersRouter);
themainRoutes.use("/orders",theOrdersRoutes);
themainRoutes.use("/products",theProductsRoutes);



export default themainRoutes;

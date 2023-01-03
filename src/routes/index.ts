import { Router } from "express";
import usersRouter from "./api/users.routes";
import theOrdersRoutes from "./api/orderRoutes"
import theProductsRoutes from "./api/productsRoutes"
import theOrderProductsRoutes from "./api/orderProducts"

const themainRoutes = Router();

themainRoutes.use("/users", usersRouter);
themainRoutes.use("/orders",theOrdersRoutes);
themainRoutes.use("/products",theProductsRoutes);
themainRoutes.use("/theOrderProducts",theOrderProductsRoutes);





export default themainRoutes;

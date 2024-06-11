import { Router } from "express";
import Product from "../Controllers/Product.js";
const productRouter = Router();

productRouter.get("/search", Product.search);
productRouter.get("/", Product.getAll);
productRouter.get("/:id", Product.getDetail);
productRouter.post("/", Product.post);
productRouter.patch("/:id", Product.put);
productRouter.delete("/:id", Product.delete);

export default productRouter;

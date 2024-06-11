import { Router } from "express";
import Category from "../Controllers/Category.js";
const categoriesRouter = Router();

categoriesRouter.get("/", Category.getAll);
categoriesRouter.post("/", Category.post);

export default categoriesRouter;

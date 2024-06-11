import { Router } from "express";
import productRouter from "./product.js";
import categoriesRouter from "./category.js";
import authRouter from "./auth.js";
import bidRouter from "./bids.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("Home");
});

router.use("/products", productRouter);
router.use("/categories", categoriesRouter);
router.use("/auth", authRouter);
router.use("/bids", bidRouter);

export default router;

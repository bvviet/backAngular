import { Router } from "express";
import auth from "../Controllers/auth.js";

const authRouter = Router();

authRouter.get("/", auth.getAll);
authRouter.post("/register", auth.register);
authRouter.post("/login", auth.login);

export default authRouter;

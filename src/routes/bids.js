import { Router } from "express";
import bids from "../Controllers/bids.js";
const bidRouter = new Router();

bidRouter.get("/", bids.getBids);
bidRouter.post("/", bids.createBid);
bidRouter.put("/:id", bids.updateBids);

export default bidRouter;

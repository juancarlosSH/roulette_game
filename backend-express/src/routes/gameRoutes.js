import express from "express";
import { getLeaderBoard } from "../controllers/gameController.js";

const oRouter = express.Router();

oRouter.get("/leaderboard", getLeaderBoard);

export default oRouter;

import express from "express";

const oRouter = express.Router();

oRouter.get("/leaderboard", (req, res) => {
  res.send("Leaderboar!");
});

export default oRouter;

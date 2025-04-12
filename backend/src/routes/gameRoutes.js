import express from "express";
import {
  createSessionController,
  getSessionDetailsController,
  getUserSessionsController,
} from "../controllers/gameSessionController.js";

import {
  createRoundController,
  getSessionRoundsController,
} from "../controllers/gameRoundController.js";

const router = express.Router();

router.post("/sessions", createSessionController);
router.get("/sessions/:id", getSessionDetailsController);
router.get("/users/:userId/sessions", getUserSessionsController);

router.post("/rounds", createRoundController);
router.get("/sessions/:sessionId/rounds", getSessionRoundsController);

export default router;

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { markProgress, getReport } from "../controllers/progressController.js";

const router = express.Router();

router.post("/", authMiddleware, markProgress);
router.get("/report", authMiddleware, getReport);

export default router;

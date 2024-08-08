import express from "express";
import { isAuthenticate } from "../middlewares/verifyToken.js";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
const router = express.Router();

router.post("/send/:id", isAuthenticate, sendMessage);
router.get("/:id", isAuthenticate, getMessage);

export default router;

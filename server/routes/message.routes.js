import express from "express";
import { isAuthenticate } from "../middlewares/verifyToken.js";
import { sendMessage } from "../controllers/message.controllers.js";
const router = express.Router();

router.post("/send/:id", isAuthenticate, sendMessage);

export default router;

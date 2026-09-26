import { Router } from "express";
import { getCurrentUser, loginOne, registerOne } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth/index.js";

const router = Router();

router.post("/signup", registerOne);
router.post("/register", registerOne);
router.post("/login", loginOne);
router.get("/me", authMiddleware, getCurrentUser);

export default router;

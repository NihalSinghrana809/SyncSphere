import {Router} from "express";
import {getMyProfile,updateMyProfile} from "../controllers/user.controller.js";
import {authMiddleware} from "../middleware/auth/index.js";

const router=Router();

router.get("/profile/me",authMiddleware, getMyProfile);
router.put("/profile/me",authMiddleware, updateMyProfile);

export default router;

import { Router } from "express";
const router = Router();

import { insertUser, getUser } from "../Controller/userController.js";
import { uploadFile } from "../Controller/Filecontroller.js";

router.post("/register", insertUser);
router.post("/login", getUser);
router.post("/upload", uploadFile);

export default router;

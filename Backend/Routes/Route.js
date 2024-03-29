import { Router } from "express";
const router = Router();

import { insertUser, getUser } from "../Controller/userController.js";
import { insertImg, insertVid } from "../Controller/cloudController.js";
import { getData } from "../Controller/getdataController.js";
import { createVideo } from "../Controller/uploadController.js";

router.post("/register", insertUser);
router.post("/login", getUser);
router.post("/upld/img", insertImg);
router.post("/upld/vid", insertVid);
router.get("/getdata", getData);
router.post("/upld",createVideo)
export default router;

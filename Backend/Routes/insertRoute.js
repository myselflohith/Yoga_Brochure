const express = require("express");
const router = express.Router();
const { insertUser, getUser } = require("../Controller/userController");
router.post("/register", insertUser);
router.post("/login", getUser);
module.exports = router;

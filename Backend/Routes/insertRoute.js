const express = require("express");
const router = express.Router();
const { insertUser } = require("../Controller/insertController");
router.post("/register", insertUser);
module.exports = router;

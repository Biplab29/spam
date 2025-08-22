const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { report } = require("../controllers/spamController");

router.post("/", protect, report);

module.exports = router;

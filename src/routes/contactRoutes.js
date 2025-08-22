const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { list, add } = require("../controllers/contactController");

router.get("/", protect, list);
router.post("/", protect, add);

module.exports = router;

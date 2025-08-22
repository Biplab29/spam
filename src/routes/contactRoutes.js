// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/authMiddleware");
// const { list, add } = require("../controllers/contactController");

// router.get("/", protect, list);
// router.post("/", protect, add);

// module.exports = router;

const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.list);
router.post("/", contactController.add);
router.post("/:id/update", contactController.update);
router.post("/:id/delete", contactController.delete);

module.exports = router;


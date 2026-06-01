const express = require("express");
const router = express.Router();

const rockbandsControllers = require("../controllers/rockbands");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", rockbandsControllers.getAllRockbands);

router.get("/:id", rockbandsControllers.getRockbandById);

router.post(
  "/",
  isAuthenticated,
  validation.saveRockband,
  rockbandsControllers.createRockband
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveRockband,
  rockbandsControllers.updateRockbandById
);

router.delete(
  "/:id",
  isAuthenticated,
  rockbandsControllers.deleteRockbandById
);

module.exports = router;

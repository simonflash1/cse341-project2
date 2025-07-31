const express = require("express");
const router = express.Router();

const rockbandsControllers = require("../controllers/rockbands");
const validation = require("../middleware/validate");

router.get("/", rockbandsControllers.getAllRockbands);

router.get("/:id", rockbandsControllers.getRockbandById);

router.post("/", validation.saveRockband, rockbandsControllers.createRockband);

router.put(
  "/:id",
  validation.saveRockband,
  rockbandsControllers.updateRockbandById
);

router.delete("/:id", rockbandsControllers.deleteRockbandById);

module.exports = router;

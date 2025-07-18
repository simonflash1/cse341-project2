const express = require("express");
const router = express.Router();

const rockbandsControllers = require("../controllers/rockbands");

router.get("/", rockbandsControllers.getAllRockbands);

router.get("/:id", rockbandsControllers.getRockbandById);

router.post("/", rockbandsControllers.createRockband);

router.put("/:id", rockbandsControllers.updateRockbandById);

router.delete("/:id", rockbandsControllers.deleteRockbandById);


module.exports = router;

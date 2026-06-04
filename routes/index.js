const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/", require("./auth"));

router.use("/movies", require("./movies"));

router.use("/rockbands", require("./rockbands"));

module.exports = router;

const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/movies", require("./movies"));

router.use("/rockbands", require("./rockbands"));

module.exports = router;

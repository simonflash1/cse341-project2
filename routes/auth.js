const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
  //#swagger.tags = ['Auth']
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName || req.session.user.username}`
      : "Logged Out"
  );
});

router.get(
  "/login",
  //#swagger.tags = ['Auth']
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  //#swagger.tags = ['Auth']
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

router.get("/logout", (req, res, next) => {
  //#swagger.tags = ['Auth']
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

module.exports = router;

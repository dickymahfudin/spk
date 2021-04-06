const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const username = req.session.username;
  res.render("dashboard", { title: "Dashboard", username });
});

module.exports = router;

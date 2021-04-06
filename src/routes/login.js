const express = require("express");
const router = express.Router();
const { user } = require("../models");

const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.render("login", { title: "Login", layout: "layouts/blank" });
});

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  const tempUser = await user.findOne({ where: { username } });
  if (!tempUser) {
    req.flash("error", "Username atau Password Salah");
    res.redirect("/login");
  }
  const isValidPassword = await bcrypt.compare(password, tempUser.password);
  if (!isValidPassword) {
    req.flash("error", "Username atau Password Salah");
    res.redirect("/login");
  }
  req.session.login = true;
  req.session.userId = tempUser.id;
  req.session.username = tempUser.name;
  res.redirect("/criteria");
});

router.get("/register", (req, res, next) => {
  res.render("register", { title: "Register", layout: "layouts/blank" });
});

router.post("/register", async (req, res, next) => {
  const { name, username } = req.body;
  const tempUser = await user.findOne({ where: { username } });
  if (tempUser) {
    req.flash(
      "error",
      "Username Sudah Ada Harap menggunakan Username Yang Lain"
    );
    res.redirect("/login/register");
  }
  const password = await bcrypt.hash(req.body.password, 10);
  await user.create({ name, username, password });
  req.flash("success", "Silahkan Masuk");
  res.redirect("/login");
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("/login");
});

module.exports = router;

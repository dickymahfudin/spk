const express = require("express");
const router = express.Router();
const jsonToTable = require("../helpers/jsonToTable");
const group = require("../helpers/group");
const dataFormat = require("../helpers/dataFormat");
const updateState = require("../helpers/updateState");
const { nilai, criteria, list_location } = require("../models");

router.get("/", async (req, res, next) => {
  const username = req.session.username;
  const user_id = req.session.userId;
  const criterias = await criteria.getAll(user_id);
  const locations = await list_location.getAll(user_id);
  return res.render("nilai/index", {
    title: "Nilai",
    username,
    criterias,
    locations,
  });
});

router.get("/table", async (req, res, next) => {
  const user_id = req.session.userId;
  const nilais = await nilai.getAll(user_id);
  const table = nilais.map((e) => {
    return {
      id: e.id,
      location: e.location.name,
      criteria: e.criteria.name,
      name: e.name,
      value: e.value,
    };
  });
  return res.json(jsonToTable(table));
});

router.post("/", async (req, res, next) => {
  const { name, criteria_id, location_id, value } = req.body;
  const user_id = req.session.userId;

  await nilai.create({ user_id, criteria_id, name, location_id, value });
  await updateState(user_id, false);
  req.flash("success", "Data Berhasil Ditambahkan");
  return res.redirect("/nilai");
});

router.post("/:id", async (req, res, next) => {
  const { name, criteria_id, location_id, value } = req.body;
  const id = req.params.id;
  const user_id = req.session.userId;
  const tempName = await nilai.findByPk(id);
  await tempName.update({ criteria_id, name, location_id, value });
  await updateState(user_id, false);
  req.flash("success", "Data Berhasil Diubah");
  return res.redirect("/nilai");
});

router.get("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.session.userId;
  const tempCriteria = await nilai.findByPk(id);
  await tempCriteria.destroy();
  await updateState(user_id, false);
  req.flash("success", "Data Berhasil Dihapus");
  return res.redirect("/nilai");
});

router.get("/form", async (req, res, next) => {
  const user_id = req.session.userId;
  const criterias = await criteria.getAll(user_id);
  const locations = await list_location.getAll(user_id);
  const value = { name: "", criteria: "", lokasi: "" };
  return res.render("nilai/form", {
    layout: "layouts/blank",
    value,
    title: "",
    criterias,
    locations,
  });
});
router.get("/form/:id", async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.session.userId;
  const value = await nilai.findByPk(id);
  const locations = await list_location.getAll(user_id);
  const criterias = await criteria.getAll(user_id);
  return res.render("nilai/form", {
    layout: "layouts/blank",
    value,
    title: "",
    criterias,
    locations,
  });
});

module.exports = router;

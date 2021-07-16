const express = require("express");
const router = express.Router();
const jsonToTable = require("../helpers/jsonToTable");
const group = require("../helpers/group");
const dataFormat = require("../helpers/dataFormat");
const updateState = require("../helpers/updateState");
const { criteria, nilai, list_location } = require("../models");

router.get("/", async (req, res, next) => {
  const username = req.session.username;
  return res.render("criteria/index", { title: "Criteria", username });
});

router.get("/table", async (req, res, next) => {
  // const user_id = req.session.userId;
  const user_id = 1;
  const criterias = await criteria.getAll(user_id);
  return res.json(jsonToTable(criterias, "dataValues"));
});

router.post("/", async (req, res, next) => {
  const { name, bobot } = req.body;
  // const user_id = req.session.userId;
  const user_id = 1;
  const tempName = await criteria.findOne({ where: { name, user_id } });

  if (tempName) {
    req.flash("error", "Nama Criteria Tidak Boleh Sama");
    return res.redirect("/criteria");
  }
  const create = await criteria.create({ user_id, name, bobot });
  const locations = await list_location.getAll(user_id);
  if (locations.length != 0) {
    locations.forEach(async (el) => {
      await nilai.create({
        user_id,
        criteria_id: create.id,
        location_id: el.id,
        name: create.name,
        value: 0,
      });
    });
  }
  await updateState(user_id, false);
  req.flash("success", "Data Berhasil Ditambahkan");
  return res.redirect("/criteria");
});

router.post("/:id", async (req, res, next) => {
  const { name, bobot } = req.body;
  const id = req.params.id;
  const tempName = await criteria.findByPk(id);
  await tempName.update({ name, bobot });
  req.flash("success", "Data Berhasil Diubah");
  return res.redirect("/criteria");
});

router.get("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  const tempCriteria = await criteria.findByPk(id);
  await tempCriteria.destroy();
  await updateState(user_id, false);
  req.flash("success", "Data Berhasil Dihapus");
  return res.redirect("/criteria");
});

router.get("/form", async (req, res, next) => {
  const value = { name: "", bobot: "" };
  return res.render("criteria/form", {
    layout: "layouts/blank",
    value,
    title: "",
  });
});
router.get("/form/:id", async (req, res, next) => {
  const id = req.params.id;
  const value = await criteria.findByPk(id);
  return res.render("criteria/form", {
    layout: "layouts/blank",
    value,
    title: "",
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const jsonToTable = require("../helpers/jsonToTable");
const group = require("../helpers/group");
const dataFormat = require("../helpers/dataFormat");
const { criteria, link } = require("../models");

router.get("/", async (req, res, next) => {
  const username = req.session.username;
  return res.render("criteria/index", { title: "Criteria", username });
});

router.get("/table", async (req, res, next) => {
  const criterias = await criteria.findAll({
    order: [["id", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  return res.json(jsonToTable(criterias, "dataValues"));
});

router.post("/", async (req, res, next) => {
  const { name, bobot } = req.body;
  const user_id = req.session.userId;
  const tempName = await criteria.findOne({ where: { name } });

  if (tempName) {
    req.flash("error", "Nama Criteria Tidak Boleh Sama");
    return res.redirect("/criteria");
  }
  const create = await criteria.create({ name, bobot });
  const tempLink = await link.getAll({ user_id });
  if (tempLink.length != 0) {
    const tempgroup = group(tempLink, "location_id");
    const data = dataFormat(tempgroup);
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const el = data[key];
        await link.create({
          user_id,
          criteria_id: create.id,
          location_id: el.id,
          value: 0,
        });
      }
    }
  }
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

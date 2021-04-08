const express = require("express");
const router = express.Router();
const group = require("../helpers/group");
const jsonToTable = require("../helpers/jsonToTable");
const dataFormat = require("../helpers/dataFormat");
const { list_location, criteria, link } = require("../models");

router.get("/", async (req, res, next) => {
  const username = req.session.username;
  const user_id = req.session.userId;
  const criterias = await criteria.findAll({
    where: { user_id },
    order: [["id", "ASC"]],
  });
  return res.render("lokasi/index", { title: "Lokasi", username, criterias });
});

router.get("/table", async (req, res, next) => {
  const user_id = req.session.userId;
  const locations = await link.getAll({ user_id });
  const tempData = group(locations, "location_id");
  const data = dataFormat(tempData);
  return res.status(200).json(jsonToTable(data));
});

router.post("/", async (req, res, next) => {
  const data = req.body;
  const user_id = req.session.userId;
  const tempLocation = await list_location.findOne({
    where: {
      user_id,
      name: data.name,
    },
  });
  if (tempLocation) {
    req.flash("error", "Nama Lokasi Tidak Boleh Sama");
    return res.redirect("/lokasi");
  }
  const location = await list_location.create({ name: data.name, user_id });
  for (const value of Object.keys(data)) {
    if (value != "name") {
      await link.create({
        user_id,
        criteria_id: value,
        location_id: location.id,
        value: data[value],
      });
    }
  }
  req.flash("success", "Data Berhasil Ditambahkan");
  return res.redirect("/lokasi");
});

router.post("/:id", async (req, res, next) => {
  const data = req.body;
  const user_id = req.session.userId;
  const location = await list_location.findOne({ where: { name: data.name } });
  for (const value of Object.keys(data)) {
    if (value != "name") {
      await link.update(
        {
          user_id,
          criteria_id: value,
          location_id: location.id,
          value: data[value],
        },
        {
          where: {
            user_id: 1,
            criteria_id: value,
            location_id: location.id,
          },
        }
      );
    }
  }
  req.flash("success", "Data Berhasil Diubah");
  return res.redirect("/lokasi");
});

router.get("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  const tempLocation = await list_location.findByPk(id);
  await tempLocation.destroy();
  req.flash("success", "Data Berhasil Dihapus");
  return res.redirect("/lokasi");
});

router.get("/form", async (req, res, next) => {
  const user_id = req.session.userId;
  const forms = await criteria.findAll({
    where: { user_id },
    order: [["id", "ASC"]],
  });
  return res.render("lokasi/form", {
    layout: "layouts/blank",
    forms,
    location: "",
    title: "",
  });
});

router.get("/form/:id", async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.session.userId;
  const criterias = await criteria.findAll({
    where: { user_id },
    order: [["id", "ASC"]],
  });
  const tempForms = await link.getAll({ location_id: id, user_id });
  let location = tempForms[0]["location"]["name"];
  const forms = criterias.map((criteria) => {
    const passCriteria = criteria.dataValues;
    const find =
      tempForms.find((asli) => asli.criteria_id == criteria.id) || "";
    return { ...passCriteria, value: find.value };
  });
  return res.render("lokasi/form", {
    layout: "layouts/blank",
    forms,
    location,
    title: "",
  });
});

module.exports = router;

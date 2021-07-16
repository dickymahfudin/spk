const express = require("express");
const router = express.Router();
const jsonToTable = require("../helpers/jsonToTable");
const dataFormat = require("../helpers/dataFormat");
const { list_location, criteria, nilai } = require("../models");
const updateState = require("../helpers/updateState");
const group = require("../helpers/group");

router.get("/", async (req, res, next) => {
  const username = req.session.username;
  // const user_id = req.session.userId;
  const user_id = 1;
  const criterias = await criteria.getAll(user_id);
  return res.render("lokasi/index", { title: "Lokasi", username, criterias });
});

router.get("/table", async (req, res, next) => {
  // const user_id = req.session.userId;
  const user_id = 1;
  const nilais = await nilai.getAll(user_id);
  const groupLocation = group(nilais, "location_id");
  const datas = dataFormat(groupLocation);
  return res.status(200).json(jsonToTable(datas));
});

router.post("/", async (req, res, next) => {
  // const user_id = req.session.userId;
  const user_id = 1;
  const { name } = req.body;
  const tempLocation = await list_location.findOne({
    where: {
      user_id,
      name,
    },
  });
  if (tempLocation) {
    req.flash("error", "Nama Lokasi Tidak Boleh Sama");
    return res.redirect("/lokasi");
  }
  const location = await list_location.create({ name, user_id });
  const criterias = await criteria.getAll(user_id);
  criterias.forEach(async (e) => {
    await nilai.create({
      user_id,
      location_id: location.id,
      criteria_id: e.id,
      name: e.name,
      value: 0,
    });
  });
  await updateState(user_id, false);
  req.flash("success", "Data Berhasil Ditambahkan");
  return res.redirect("/lokasi");
});

router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  // const user_id = req.session.userId;
  const user_id = 1;
  const location = await list_location.findOne({
    where: { id, user_id },
  });
  if (location) {
    location.update({ name: data.name });
  }
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
            user_id,
            criteria_id: value,
            location_id: location.id,
          },
        }
      );
    }
  }
  await updateState(user_id, false);
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
  // const user_id = req.session.userId;
  return res.render("lokasi/form", {
    layout: "layouts/blank",
    location: "",
    title: "",
  });
});

router.get("/form/:id", async (req, res, next) => {
  const id = req.params.id;
  // const user_id = req.session.userId;
  const user_id = 1;
  const location = await list_location.findOne({ where: { id, user_id } });
  return res.render("lokasi/form", {
    layout: "layouts/blank",
    location: location.name,
    title: "",
  });
});

module.exports = router;

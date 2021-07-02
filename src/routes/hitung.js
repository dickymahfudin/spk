const express = require("express");
const router = express.Router();
const hitung = require("../helpers/hitung");
const group = require("../helpers/group");
const dataFormat = require("../helpers/dataFormat");
const { criteria, link, list_location, user } = require("../models");
const updateState = require("../helpers/updateState");

router.get("/", async (req, res, next) => {
  const user_id = req.session.userId;
  const username = req.session.username;
  const locations = await link.getAll({ user_id });
  const locationsNull = locations.filter((e) => e.value === 0).length;
  const criterias = await criteria.getAll(user_id);
  const users = (await user.findByPk(user_id)).status;
  let tempData, datas, hitungs, hasils;
  if (locations.length > 1) {
    hasils = locations[0].location.hasil;
    tempData = group(locations, "location_id");
    datas = dataFormat(tempData);
    hitungs = hitung({ datas, criterias });
  }
  res.render("rumus", {
    title: "Hitung",
    hitungs,
    username,
    hasils,
    location: locations.length,
    criteria: criterias.length,
    users,
    locationsNull,
  });
});

router.get("/hitung", async (req, res, next) => {
  try {
    const user_id = req.session.userId;
    const locations = await link.getAll({ user_id });
    const criterias = await criteria.findAll({ where: { user_id } });
    const tempData = group(locations, "location_id");
    const datas = dataFormat(tempData);
    const hitungs = hitung({ datas, criterias });
    console.log();
    if (hitungs.hasil.length != 0) {
      for (const key in hitungs.hasil) {
        if (Object.hasOwnProperty.call(hitungs.hasil, key)) {
          const el = hitungs.hasil[key];
          await list_location.update(el, { where: { id: el.id } });
        }
      }
      await updateState(user_id, true);
      req.flash("success", "Perhitungan Berhasil");
      return res.redirect("/hitung");
    }
    req.flash("error", "Perhitungan Gagal Data Lokasi Tidak Boleh Kosong");
    return res.redirect("/hitung");
  } catch (error) {
    req.flash(
      "error",
      "Perhitungan Gagal Harap Perksa nilai Lokasi Yang Masih 0"
    );
    return res.redirect("/hitung");
  }
});
module.exports = router;

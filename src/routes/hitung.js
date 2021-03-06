const express = require("express");
const router = express.Router();
const hitung = require("../helpers/hitung");
const group = require("../helpers/group");
const dataFormat = require("../helpers/dataFormat");
const { criteria, list_location, nilai, user } = require("../models");
const updateState = require("../helpers/updateState");

router.get("/", async (req, res, next) => {
  const user_id = req.session.userId;
  const username = req.session.username;
  const criterias = await criteria.getAll(user_id);
  const users = (await user.findByPk(user_id)).status;
  const nilais = await nilai.getAll(user_id);
  const totalCriterias =
    criterias.length !== 0
      ? criterias
          .map((e) => e.bobot)
          .reduce((acc, val) => +(acc + val).toFixed(5))
      : 0;
  let hitungs, hasils;
  if (nilais.length > 1 && criterias.length > 1) {
    const nilais = await nilai.getAll(user_id);
    const groupLocation = group(nilais, "location_id");
    const datas = dataFormat(groupLocation);
    hitungs = hitung({ datas, criterias });
  }
  res.render("rumus", {
    title: "Hitung",
    hitungs,
    username,
    location: nilais.length,
    criteria: criterias.length,
    users,
    totalCriterias,
  });
});

router.get("/hitung", async (req, res, next) => {
  try {
    const user_id = req.session.userId;
    const username = req.session.username;
    const locations = await list_location.getAll(user_id);
    const criterias = await criteria.getAll(user_id);
    const nilais = await nilai.getAll(user_id);
    const users = (await user.findByPk(user_id)).status;

    const groupLocation = group(nilais, "location_id");
    const datas = dataFormat(groupLocation);
    const hitungs = hitung({ datas, criterias });
    if (hitungs.hasil.length != 0) {
      if (hitungs.hasil[0].hasil) {
        for (const key in hitungs.hasil) {
          if (Object.hasOwnProperty.call(hitungs.hasil, key)) {
            const el = hitungs.hasil[key];
            await list_location.update(el, { where: { id: el.id } });
          }
        }
        req.flash("success", "Perhitungan Berhasil");
        await updateState(user_id, true);
        return res.redirect("/hitung");
      }
      req.flash(
        "error",
        "Perhitungan Gagal Harap Perksa nilai Lokasi Yang Masih 0"
      );
      return res.redirect("/hitung");
    }
    req.flash(
      "error",
      "Perhitungan Gagal Harap Perksa nilai Lokasi Yang Masih 0"
    );
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

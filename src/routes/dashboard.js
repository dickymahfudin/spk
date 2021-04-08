const express = require("express");
const router = express.Router();
const jsonToTable = require("../helpers/jsonToTable");
const { criteria, link, list_location } = require("../models");

router.get("/", async (req, res, next) => {
  const user_id = req.session.userId;
  const username = req.session.username;
  const locations = await list_location.findAll({ where: { user_id } });
  const criterias = await criteria.findAll({ where: { user_id } });
  res.render("dashboard", {
    title: "Dashboard",
    username,
    location: locations.length,
    criteria: criterias.length,
  });
});

router.get("/table", async (req, res, next) => {
  const user_id = req.session.userId;
  const locations = await list_location.findAll({
    where: { user_id },
    order: [["hasil", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return res.json(jsonToTable(locations, "dataValues"));
});
module.exports = router;

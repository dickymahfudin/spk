const express = require("express");
const router = express.Router();
const jsonToTable = require("../helpers/jsonToTable");
const { criteria, list_location, user } = require("../models");

router.get("/", async (req, res, next) => {
  const user_id = req.session.userId;
  const username = req.session.username;
  const locations = await list_location.findAll({
    where: { user_id },
    order: [
      ["hasil", "ASC"],
      ["name", "ASC"],
    ],
  });
  const users = (await user.findByPk(user_id)).status;
  const criterias = await criteria.getAll(user_id);
  const rangking =
    locations.length != 0 && locations[0].hasil ? locations[0].name : "";
  res.render("dashboard", {
    title: "Dashboard",
    username,
    location: locations.length,
    criteria: criterias.length,
    rangking,
    users,
  });
});

router.get("/table", async (req, res, next) => {
  const user_id = req.session.userId;
  const locations = await list_location.findAll({
    where: { user_id },
    order: [
      ["hasil", "ASC"],
      ["name", "ASC"],
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return res.json(jsonToTable(locations, "dataValues"));
});

module.exports = router;

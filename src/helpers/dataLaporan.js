const models = require("../models");

const criterias = async (user_id) => {
  const createdAt = new Date();
  const updatedAt = new Date();
  const dataCriteria = [
    { user_id, name: "Fasilitas", bobot: 0.35, createdAt, updatedAt },
    { user_id, name: "Harga Tanah", bobot: 0.25, createdAt, updatedAt },
    { user_id, name: "SDM", bobot: 0.25, createdAt, updatedAt },
    { user_id, name: "Geologi dan Iklim", bobot: 0.15, createdAt, updatedAt },
  ];
  const dataLocation = [
    {
      user_id,
      name: "Karawang",
      core: 0.025,
      secondary: 0.024,
      hasil: 0.0246,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Bekasi",
      core: 0.0435,
      secondary: 0.024,
      hasil: 0.0357,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Pulogadung",
      core: 0.0435,
      secondary: 0.024,
      hasil: 0.0357,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Surabaya",
      core: 0.0505,
      secondary: 0.0175,
      hasil: 0.0373,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Pasuruan",
      core: 0.0485,
      secondary: 0.013,
      hasil: 0.0343,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Sukabumi",
      core: 0.044,
      secondary: 0.01,
      hasil: 0.0304,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Cibubur",
      core: 0.0295,
      secondary: 0.024,
      hasil: 0.0273,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Gunung Putri",
      core: 0.0295,
      secondary: 0.024,
      hasil: 0.0273,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Tanjung Priuk",
      core: 0.025,
      secondary: 0.024,
      hasil: 0.0246,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: "Sentul",
      core: 0.0295,
      secondary: 0.024,
      hasil: 0.0273,
      createdAt,
      updatedAt,
    },
  ];
  const valueLink = [
    [0.8, 0.2, 1, 1],
    [1, 0.6, 1, 1],
    [1, 0.6, 1, 1],
    [1, 0.8, 1, 0.25],
    [0.6, 1, 0.25, 1],
    [0.4, 1, 0.5, 0.25],
    [1, 0.2, 1, 1],
    [1, 0.2, 1, 1],
    [0.8, 0.2, 1, 1],
    [1, 0.2, 1, 1],
  ];
  const criterias = await models.criteria.bulkCreate(dataCriteria);
  const locations = await models.list_location.bulkCreate(dataLocation);

  for (const i in locations) {
    if (Object.hasOwnProperty.call(locations, i)) {
      const location = locations[i];
      for (const j in criterias) {
        if (Object.hasOwnProperty.call(criterias, j)) {
          const criteria = criterias[j];
          await models.link.create({
            user_id,
            location_id: location.id,
            criteria_id: criteria.id,
            value: valueLink[i][j],
          });
        }
      }
    }
  }
  return { status: "success" };
};

module.exports = criterias;

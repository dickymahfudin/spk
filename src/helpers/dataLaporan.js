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
  const valueNilai = [
    [
      [
        { name: "Transportasi", value: 0.2 },
        { name: "Infrastruktur", value: 0.2 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.2 },
        { name: "Kedekatan Dengan Pemasok", value: 0.2 },
      ],
      [{ name: "Harga Tanah", value: 0.2 }],
      [{ name: "SDM", value: 1 }],
      [
        { name: "Konstur Tanah", value: 0.5 },
        { name: "Kelembapan", value: 0.3 },
        { name: "Cuaca", value: 0.2 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.2 },
        { name: "Infrastruktur", value: 0.4 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.2 },
        { name: "Kedekatan Dengan Pemasok", value: 0.2 },
      ],
      [{ name: "Harga Tanah", value: 0.6 }],
      [{ name: "SDM", value: 1 }],
      [
        { name: "Konstur Tanah ", value: 0.5 },
        { name: "Kelembapan", value: 0.2 },
        { name: "Cuaca", value: 0.3 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.3 },
        { name: "Infrastruktur", value: 0.2 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.2 },
        { name: "Kedekatan Dengan Pemasok", value: 0.3 },
      ],
      [{ name: "Harga Tanah", value: 0.6 }],
      [{ name: "SDM", value: 1 }],
      [
        { name: "Konstur Tanah ", value: 0.3 },
        { name: "Kelembapan", value: 0.3 },
        { name: "Cuaca", value: 0.4 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.5 },
        { name: "Infrastruktur", value: 0.1 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.1 },
        { name: "Kedekatan Dengan Pemasok", value: 0.3 },
      ],
      [{ name: "Harga Tanah", value: 0.8 }],
      [{ name: "SDM", value: 1 }],
      [
        { name: "Konstur Tanah ", value: 0.1 },
        { name: "Kelembapan", value: 0.1 },
        { name: "Cuaca", value: 0.05 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.1 },
        { name: "Infrastruktur", value: 0.1 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.3 },
        { name: "Kedekatan Dengan Pemasok", value: 0.1 },
      ],
      [{ name: "Harga Tanah", value: 1 }],
      [{ name: "SDM", value: 0.25 }],
      [
        { name: "Konstur Tanah ", value: 0.25 },
        { name: "Kelembapan", value: 0.25 },
        { name: "Cuaca", value: 0.5 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.1 },
        { name: "Infrastruktur", value: 0.1 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.1 },
        { name: "Kedekatan Dengan Pemasok", value: 0.1 },
      ],
      [{ name: "Harga Tanah", value: 1 }],
      [{ name: "SDM", value: 0.5 }],
      [
        { name: "Konstur Tanah ", value: 0.05 },
        { name: "Kelembapan", value: 0.1 },
        { name: "Cuaca", value: 0.1 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.25 },
        { name: "Infrastruktur", value: 0.25 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.25 },
        { name: "Kedekatan Dengan Pemasok", value: 0.25 },
      ],
      [{ name: "Harga Tanah", value: 0.2 }],
      [{ name: "SDM", value: 1 }],
      [
        { name: "Konstur Tanah ", value: 0.25 },
        { name: "Kelembapan", value: 0.5 },
        { name: "Cuaca", value: 0.25 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.25 },
        { name: "Infrastruktur", value: 0.25 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.25 },
        { name: "Kedekatan Dengan Pemasok", value: 0.25 },
      ],
      [{ name: "Harga Tanah", value: 0.2 }],
      [{ name: "SDM", value: 1 }],
      [
        { name: "Konstur Tanah ", value: 0.25 },
        { name: "Kelembapan", value: 0.5 },
        { name: "Cuaca", value: 0.25 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.2 },
        { name: "Infrastruktur", value: 0.2 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.2 },
        { name: "Kedekatan Dengan Pemasok", value: 0.2 },
      ],
      [{ name: "Harga Tanah", value: 0.2 }],
      [{ name: "SDM", value: 1 }],
      [
        { name: "Konstur Tanah ", value: 0.25 },
        { name: "Kelembapan", value: 0.5 },
        { name: "Cuaca", value: 0.25 },
      ],
    ],

    [
      [
        { name: "Transportasi", value: 0.25 },
        { name: "Infrastruktur", value: 0.25 },
        { name: "Industri dan Pelayanan Pendukung", value: 0.25 },
        { name: "Kedekatan Dengan Pemasok", value: 0.25 },
      ],
      [{ name: "Harga Tanah", value: 0.2 }],
      [{ name: "SDM", value: 1 }],
      [
        { name: "Konstur Tanah ", value: 0.25 },
        { name: "Kelembapan", value: 0.5 },
        { name: "Cuaca", value: 0.25 },
      ],
    ],
  ];
  const criterias = await models.criteria.bulkCreate(dataCriteria);
  const locations = await models.list_location.bulkCreate(dataLocation);
  const createNilai = async (datas, location, criteria) => {
    for (const i in datas) {
      if (Object.hasOwnProperty.call(datas, i)) {
        const data = datas[i];
        await models.nilai.create({
          user_id,
          location_id: location,
          criteria_id: criteria,
          name: data.name,
          value: data.value,
        });
      }
    }
  };

  for (const i in locations) {
    if (Object.hasOwnProperty.call(locations, i)) {
      const location = locations[i];
      for (const j in criterias) {
        if (Object.hasOwnProperty.call(criterias, j)) {
          const criteria = criterias[j];
          const nilai = valueNilai[i][j];
          createNilai(nilai, location.id, criteria.id);
        }
      }
    }
  }
  return { status: "success" };
};

module.exports = criterias;

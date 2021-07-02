const { user } = require("../models");

const state = async (id, status) => {
  await user.update(
    {
      status,
    },
    {
      where: {
        id,
      },
    }
  );
};

module.exports = state;

const group = require("./group");
const dataFormat = (datas) => {
  return datas.map((e) => {
    const data = group(e, "criteria_id");
    const sum = data
      .map((e) => {
        const valSum = e
          .map((el) => el.value)
          .reduce((acc, val) => +(acc + val));
        const result = {
          id: e[0].location_id,
          location: e[0].location.name,
          [e[0].criteria.name]: +valSum.toFixed(3),
        };
        return result;
      })
      .reduce(function (acc, val) {
        return Object.assign(acc, val);
      }, {});
    return sum;
  });
};

module.exports = dataFormat;

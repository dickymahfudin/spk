const dataFormat = (datas) => {
  let result = [];
  datas.forEach((data) => {
    let tempData;
    data.forEach((temp) => {
      const name = temp.criteria.name;
      tempData = {
        ...tempData,
        id: temp.location_id,
        location: temp.location.name,
        [name]: temp.value,
      };
    });
    result.push(tempData);
  });
  return result;
};

module.exports = dataFormat;

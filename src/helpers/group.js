const group = (log, param) => {
  const groups = log.reduce((acc, curr) => {
    const temp = curr[param];
    if (!acc[temp]) {
      acc[temp] = [];
    }
    acc[temp].push(curr);
    return acc;
  }, {});

  const groupArrays = Object.keys(groups).map((param) => {
    return groups[param];
  });
  return groupArrays;
};

module.exports = group;

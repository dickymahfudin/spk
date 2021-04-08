const hitung = ({ datas, criterias, db = false }) => {
  const sumPow = (arr, param, criteria) => {
    const sum = +arr
      .map((val) => val[param])
      .reduce((acc, val) => acc + Math.pow(val, 2), 0)
      .toFixed(3);
    return arr.map((val) => +(+(val[param] / sum) * criteria).toFixed(3));
  };

  const sum = (arr) => arr.reduce((acc, val) => +(acc + val).toFixed(5));

  const matrixD = criterias.map((criteria) => {
    return sumPow(datas, criteria.name, criteria.bobot);
  });

  const lengthI = matrixD[0].length;
  const lengthJ = matrixD.length;
  const newMatrix = new Array(lengthI)
    .fill(0)
    .map(() => new Array(lengthJ).fill(0));

  for (let i = 0; i < matrixD.length; i++) {
    const el = matrixD[i];
    for (let j = 0; j < el.length; j++) {
      const element = el[j];
      newMatrix[j][i] = element;
    }
  }
  const hasil = (coreSecondary = newMatrix.map((val, i) => {
    const valLength = val.length;
    const subLength = Math.ceil(valLength / 2);
    const sliceLength = val.slice(subLength, valLength).length;
    const location = datas[i];
    const core = sum(val.slice(0, subLength)) / subLength;
    const secondary = sum(val.slice(subLength, valLength)) / sliceLength;
    const hasil = +((60 * core) / 100 + (40 * secondary) / 100).toFixed(4);
    return {
      id: location.id,
      core,
      secondary,
      hasil,
      location: location.location,
    };
  }));
  return { hasil };
};

module.exports = hitung;

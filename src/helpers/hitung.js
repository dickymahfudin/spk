const hitung = ({ datas, criterias, db = false }) => {
  const sumPow = (arr, param, criteria) => {
    const matrix = arr.map((val) => val[param]);
    const sum = +matrix
      .reduce((acc, val) => acc + Math.pow(val, 2), 0)
      .toFixed(3);
    const perhitungan1 = matrix.map((val) => +(val / sum).toFixed(3));
    const ternormalisasi = arr.map(
      (val) => +((val[param] / sum) * criteria).toFixed(3)
    );
    return {
      matrixString: matrix.join("^2+"),
      matrix,
      sum,
      perhitungan1,
      ternormalisasi,
    };
  };

  const sum = (arr) => arr.reduce((acc, val) => +(acc + val).toFixed(5));
  const data = datas.map((data) => {
    const array = Object.values(data);
    return array.slice(2, array.length);
  });
  const matrix1 = data.map((matrix) => {
    return matrix.join("&");
  });
  const matrixD = criterias.map((criteria) => {
    return sumPow(datas, criteria.name, criteria.bobot);
  });
  const lengthI = matrixD[0].ternormalisasi.length;
  const lengthJ = matrixD.length;
  const newMatrixTernormalisasi = new Array(lengthI)
    .fill(0)
    .map(() => new Array(lengthJ).fill(0));
  const newMatrixPerhitungan1 = new Array(lengthI)
    .fill(0)
    .map(() => new Array(lengthJ).fill(0));
  matrixD.forEach((el, i) => {
    //ubah array urutan array
    el.ternormalisasi.forEach((element, j) => {
      newMatrixTernormalisasi[j][i] = element;
    });
    el.perhitungan1.forEach((element, j) => {
      newMatrixPerhitungan1[j][i] = element;
    });
  });
  const matrix2 = newMatrixPerhitungan1.map((matrix) => {
    return matrix.join("&");
  });
  const matrix3 = newMatrixTernormalisasi.map((matrix) => {
    return matrix.join("&");
  });

  const hasil = (coreSecondary = newMatrixTernormalisasi.map((val, i) => {
    const valLength = val.length;
    const subLength = Math.ceil(valLength / 2);
    const sliceLength = val.slice(subLength, valLength).length;
    const location = datas[i];
    const core = +(sum(val.slice(0, subLength)) / subLength).toFixed(3);
    const secondary = +(
      sum(val.slice(subLength, valLength)) / sliceLength
    ).toFixed(3);
    const hasil = +((60 * core) / 100 + (40 * secondary) / 100).toFixed(3);
    return {
      id: location.id,
      core,
      secondary,
      hasil,
      location: location.location,
    };
  }));

  return {
    matrix1: matrix1.join("\\\\"),
    matrix2: matrix2.join("\\\\"),
    matrix3: matrix3.join("\\\\"),
    perhitungan: matrixD,
    hasil,
  };
};
module.exports = hitung;

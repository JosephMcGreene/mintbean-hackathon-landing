const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const get2DArrayCopy = (array) => {
  let newArray = [];
  for (let i = 0; i < array.length; i++) newArray[i] = [...array[i]];
  return newArray;
};
const isArraySame = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i][j] !== arr2[i][j]) return false;
    }
  }
  return true;
};

const isInBorders = (i) => {
  return i >= 0 && i < 4;
};

export { getRandomInt, get2DArrayCopy, isArraySame, isInBorders };

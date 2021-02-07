const rowsArrayNumber = 20;
const colsArrayNumber = 7;

export const generateZeroBigArray = (value = 0, rows = rowsArrayNumber, cols = colsArrayNumber) => {
  const returnArray = [];
  for (let i = 0; i < cols; i++) {
    const rowArray = [];
    for (let j = 0; j < rows; j++) {
      rowArray.push(value);
    }
    returnArray.push(rowArray);
  }

  return returnArray;
};
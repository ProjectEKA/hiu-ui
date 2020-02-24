function createData(type, key, value) {
  return { type, key, value };
}
let rows = [];
function generateObservationRows(Observation) {
  let keys = Object.keys(Observation);
  let values = Object.values(Observation);
  for (var i = 0; i < Object.keys(Observation).length; i++) {
    if (typeof values[i] === "string") {
      rows.push(createData("row", keys[i], values[i]));
    } else if (typeof values[i] === "object") {
      let childObject = values[i];
      generateObservationRows(childObject);
    }
  }
  return rows;
}

export default generateObservationRows;

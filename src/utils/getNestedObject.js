const getNestedObject = (obj, path) => path
  .split('.')
  .reduce(
    (accu, curr) => (accu && accu[curr] != undefined ? accu[curr] : undefined),
    obj,
  );

export default getNestedObject;

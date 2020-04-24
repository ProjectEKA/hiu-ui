import getNestedObject from '../getNestedObject';

describe('getNestedObject', () => {
  const obj = { a: { b: { c: 2 } } };
  it('should return object if its exists', () => {
    expect(getNestedObject(obj, 'a.b.c')).toEqual(2);
  });
  it('should return undefined when nested Object does not exists', () => {
    expect(getNestedObject(obj, 'a.e.c')).toEqual(undefined);
  });
});

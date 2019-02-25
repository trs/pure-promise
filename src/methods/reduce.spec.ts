import reduce from './reduce';
import isPromise from './isPromise';

describe('reduce', () => {
  it('should return a promise', async () => {
    const x = reduce([1, 2, 3], (prev, value, i) => ({...(prev as object), [`${i}`]: value}), {});
    expect(isPromise(x));

    const y = await x;
    expect(y).toEqual({
      0: 1,
      1: 2,
      2: 3
    });
  });

  it('should allow no initial value', async () => {
    const x = reduce([1, 2, 3], (prev, value) => prev + value);
    expect(isPromise(x));

    const y = await x;
    expect(y).toEqual(6);
  });

  it('should accept promises as an iterator', async () => {
    const x = await reduce([1, 2, 3], (prev, value) => Promise.resolve(prev + value));
    expect(x).toEqual(6);
  });

  it('should accept promies as the iterable', async () => {
    const x = await reduce(Promise.resolve([1, 2, 3]), (prev, value) => Promise.resolve(prev + value));
    expect(x).toEqual(6);
  });
});

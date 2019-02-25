import props from './props';
import isPromise from './isPromise';

describe('props', () => {
  it('should return a promise', async () => {
    const x = props({a: 1, b: 2});
    expect(isPromise(x));

    const y = await x;
    expect(y).toEqual({a: 1, b: 2});
  });

  it('should map object values as promises', async () => {
    const x = await props({a: Promise.resolve(1), b: Promise.resolve(2)});
    expect(x).toEqual({a: 1, b: 2});
  });

  it('should map array values', async () => {
    const x = await props([Promise.resolve(1), Promise.resolve(2)]);
    expect(x).toEqual([1, 2]);
  });

  it('should accept a promise as the argument', async () => {
    const x = await props(Promise.resolve([1, 2]));
    expect(x).toEqual([1, 2]);
  });
});

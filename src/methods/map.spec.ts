import map from './map';
import {isPromise} from '../meta';

describe('map', () => {
  it('should return a promise', async () => {
    const x = map([1, 2, 3], (value) => value + 1);
    expect(isPromise(x));

    const y = await x;
    expect(y).toEqual([2, 3, 4]);
  });

  it('should accept promises as an iterator', async () => {
    const x = await map([1, 2, 3], (value) => Promise.resolve(value + 1));
    expect(x).toEqual([2, 3, 4]);
  });

  it('should accept promises as the iterable', async () => {
    const x = await map(Promise.resolve([1, 2, 3]), (value) => Promise.resolve(value + 1));
    expect(x).toEqual([2, 3, 4]);
  });

  it('should accept promises as items', async () => {
    const x = await map([Promise.resolve(1), 2, 3], (value) => Promise.resolve(value + 1));
    expect(x).toEqual([2, 3, 4]);
  });
});

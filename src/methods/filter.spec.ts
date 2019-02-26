import filter from './filter';
import {isPromise} from '../meta';

describe('filter', () => {
  it('should return a promise', async () => {
    const x = filter([1, 2, 3, 4], (value) => value % 2 === 0);
    expect(isPromise(x));

    const y = await x;
    expect(y).toEqual([2, 4]);
  });

  it('should accept promises as an iterator', async () => {
    const x = await filter([1, 2, 3, 4], (value) => Promise.resolve(value % 2 === 0));
    expect(x).toEqual([2, 4]);
  });

  it('should accept promies as the iterable', async () => {
    const x = await filter(Promise.resolve([1, 2, 3, 4]), (value) => Promise.resolve(value % 2 === 0));
    expect(x).toEqual([2, 4]);
  });
});

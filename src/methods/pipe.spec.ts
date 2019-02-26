import pipe from './pipe';
import {isPromise} from '../meta';

describe('pipe', () => {
  it('should return a promise', async () => {
    const x = pipe(
      (a: number) => a + 1,
      (b: number) => b - 1,
      (c: number) => c * 2,
    )(1);
    expect(isPromise(x));

    const y = await x;
    expect(y).toEqual(2);
  });

  it('should resolve methods', async () => {
    const x = await pipe(
      (a: number) => Promise.resolve(a + 1),
      (b: number) => Promise.resolve(b - 1),
      (c: number) => Promise.resolve(c * 2)
    )(1);

    expect(x).toEqual(2);
  });

  it('should accept promise as initial value', async () => {
    const x = await pipe(
      (a: number) => Promise.resolve(a + 1),
      (b: number) => Promise.resolve(b - 1),
      (c: number) => Promise.resolve(c * 2)
    )(Promise.resolve(1));

    expect(x).toEqual(2);
  });
});

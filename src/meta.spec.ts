import * as meta from './meta';

describe('toPromise', () => {
  it('should transform value into promise', async () => {
    const x = meta.toPromise(1);
    expect(meta.isPromise(x));

    const y = await x;
    expect(y).toEqual(1);
  });
});

import {mapSeries} from './mapSeries';

describe('mapSeries', () => {
  it('waits for previous value to resolve', async () => {
    const mapper = jest.fn((value) => value + 1);
    const a = new Promise<number>((resolve) => setTimeout(() => resolve(1), 100));

    setTimeout(() => {
      expect(mapper.mock.calls.length).toEqual(0);
    }, 50);

    const x = await mapSeries([a, 2, 3], mapper);
    expect(x).toEqual([2, 3, 4]);
  });
});

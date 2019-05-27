import {OrPromiseLike} from '../meta';

/**
 * Serially map through array values
 */
export async function mapSeries<T, R>(values: OrPromiseLike<ArrayLike<OrPromiseLike<T>>>, method: (value: T, index?: number) => R | Promise<R>): Promise<R[]> {
  try {
    const resolvedValues = await Promise.resolve(values);
    const result: R[] = [];

    for (let i = 0; i < resolvedValues.length; i++) {
      const value = resolvedValues[i];
      const resolvedValue = await Promise.resolve(value);
      result[i] = await method(resolvedValue, i);
    }

    return result;
  } catch (err) {
    throw err;
  }
}

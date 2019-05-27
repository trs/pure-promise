import { OrPromiseLike } from "../meta";

/**
 * Concurrently map values in an array
 */
export async function map<T, R>(values: OrPromiseLike<ArrayLike<OrPromiseLike<T>>>, method: (value: T, index: number) => R | Promise<R>): Promise<R[]> {
  try {
    const resolvedValues = await Promise.resolve(values);
    const result: (R | Promise<R>)[] = [];

    for (let i = 0; i < resolvedValues.length; i++) {
      const value = resolvedValues[i];
      result[i] = Promise.resolve(value)
        .then((resolvedValue) => method(resolvedValue, i));
    }

    return await Promise.all(result);
  } catch (err) {
    throw err;
  }
}

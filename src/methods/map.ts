import { OrPromiseLike } from "../interfaces";

/**
 * Async map through iterable items
 * @param items
 * @param method
 */
export default async function map<T, R>(values: OrPromiseLike<ArrayLike<T>>, method: (value: T, index?: number) => R | Promise<R>) {
  try {
    const resolvedValues = await Promise.resolve(values);
    const result: (R | Promise<R>)[] = [];

    for (let i = 0; i < resolvedValues.length; i++) {
      const value = resolvedValues[i];
      const valuePromise = Promise.resolve(value)
        .then((resolvedValue) => method(resolvedValue, i));

      result.push(valuePromise);
    }

    return await Promise.all(result);
  } catch (err) {
    throw err;
  }
}

import { OrPromiseLike } from "../interfaces";

/**
 * Concurrently filter values from an array
 * @param values
 * @param method
 */
export default async function filter<T>(values: OrPromiseLike<ArrayLike<T>>, method: (value: T, index?: number) => boolean | Promise<boolean>): Promise<T[]> {
  try {
    const resolvedValues = await Promise.resolve(values);
    const runningResults: Promise<void>[] = [];
    const result: T[] = [];

    for (let i = 0; i < resolvedValues.length; i++) {
      const value = resolvedValues[i];
      const valuePromise = Promise.resolve(value)
        .then((resolvedValue) => {
          return Promise.resolve(method(resolvedValue, i))
            .then((filter) => {
              if (filter) {
                result.push(resolvedValue);
              }
            })
        });

      runningResults.push(valuePromise);
    }

    await Promise.all(runningResults);

    return result;
  } catch (err) {
    throw err;
  }
}
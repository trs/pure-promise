import {OrPromiseLike, Record} from '../interfaces';

/**
 * Concurrently resolve values from a key/value pair into their key/values
 * @param items
 */
export default async function props<T>(items: OrPromiseLike<Record<OrPromiseLike<T>>>): Promise<Record<T>>;
export default async function props<T>(items: OrPromiseLike<ArrayLike<OrPromiseLike<T>>>): Promise<Record<T>>;
export default async function props<T>(items: OrPromiseLike<Record<OrPromiseLike<T>> | ArrayLike<OrPromiseLike<T>>>): Promise<Record<T>> {
  try {
    const resolvedItems = await Promise.resolve(items);
    const entries = Object.entries(resolvedItems);

    const promiseValues: Promise<[string, any]>[] = [];

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      const promise = Promise.resolve(value)
        .then((resolvedValue): [string, any] => [key, resolvedValue]);

      promiseValues.push(promise);
    }

    const resolvedEntires = await Promise.all(promiseValues);

    return resolvedEntires.reduce<Record<T>>((prev, [key, value]) => {
      return {
        ...prev,
        [key]: value
      };
    }, {});
  } catch (err) {
    throw err;
  }
}

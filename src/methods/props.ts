import {OrPromiseLike, RecordLike} from '../meta';


export default async function props<T>(items: OrPromiseLike<RecordLike<OrPromiseLike<T>>>): Promise<RecordLike<T>>;
export default async function props<T>(items: OrPromiseLike<ArrayLike<OrPromiseLike<T>>>): Promise<RecordLike<T>>;
/**
 * Concurrently resolve values from a key/value pair into their key/values
 */
export default async function props<T>(items: OrPromiseLike<RecordLike<OrPromiseLike<T>> | ArrayLike<OrPromiseLike<T>>>): Promise<RecordLike<T>> {
  try {
    const resolvedItems = await Promise.resolve(items);
    const entries = Object.entries(resolvedItems);

    const promiseValues: Promise<[string, any]>[] = [];

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      const resultPromise = Promise.resolve(value)
        .then((resolvedValue): [string, any] => [key, resolvedValue]);

      promiseValues.push(resultPromise);
    }

    const resolvedEntires = await Promise.all(promiseValues);

    return resolvedEntires.reduce<RecordLike<T>>((prev, [key, value]) => {
      return {
        ...prev,
        [key]: value
      };
    }, {});
  } catch (err) {
    throw err;
  }
}

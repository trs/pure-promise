import {OrPromiseLike, Record} from '../interfaces';

function objectReducer<T>(prev: T, [key, value]: [string, any]) {
  return {
    ...prev,
    [key]: value
  };
}

function arrayReducer<T>(prev: Iterable<T>, [_, value]: [any, any]) {
  return [...prev, value];
}

export default async function props<T>(items: OrPromiseLike<Record<OrPromiseLike<T>>>): Promise<Record<T>>;
export default async function props<T>(items: OrPromiseLike<ArrayLike<OrPromiseLike<T>>>): Promise<ArrayLike<T>>;
export default async function props<T>(items: OrPromiseLike<Record<OrPromiseLike<T>> | ArrayLike<OrPromiseLike<T>>>) {
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

    if (Array.isArray(resolvedItems)) {
      return resolvedEntires.reduce<Iterable<T>>(arrayReducer, []);
    }

    return resolvedEntires.reduce<Record<T>>(objectReducer, {});
  } catch (err) {
    throw err;
  }
}

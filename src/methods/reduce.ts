import {OrPromiseLike} from '../interfaces';

/**
 * Serially reduce through iterable values
 * @param items
 * @param method
 */
export default async function reduce<T>(
  values: OrPromiseLike<ArrayLike<T>>,
  iterator: (previousValue: T, currentValue: T, currentIndex: number) => T | Promise<T>
): Promise<T>;
export default async function reduce<T, R>(
  values: OrPromiseLike<ArrayLike<T>>,
  iterator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  initialValue: R
): Promise<T>;
export default async function reduce<T, R>(
  values: OrPromiseLike<ArrayLike<T>>,
  iterator: (previousValue: R | T, currentValue: T, currentIndex: number) => R | Promise<R>,
  initialValue?: R | T
): Promise<R | T> {
  try {
    const resolvedValues = await Promise.resolve(values);

    let i = 0;
    let previousValue = initialValue || resolvedValues[i++];
    for (; i < resolvedValues.length; i++) {
      const currentValue = resolvedValues[i];
      previousValue = await Promise.resolve(currentValue)
        .then((resolvedValue) => iterator(previousValue, resolvedValue, i));
    }

    return previousValue;
  } catch (err) {
    throw err;
  }
}

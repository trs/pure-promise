import {OrPromiseLike} from '../meta';

/**
 * Serially reduce through iterable values
 */
export default async function reduce<T>(
  values: OrPromiseLike<ArrayLike<OrPromiseLike<T>>>,
  iterator: (previousValue: T, currentValue: T, currentIndex: number) => T | Promise<T>
): Promise<T>;
export default async function reduce<T, R>(
  values: OrPromiseLike<ArrayLike<OrPromiseLike<T>>>,
  iterator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  initialValue: R
): Promise<T>;
export default async function reduce<T, R>(
  values: OrPromiseLike<ArrayLike<OrPromiseLike<T>>>,
  iterator: (previousValue: R | T, currentValue: T, currentIndex: number) => R | Promise<R>,
  initialValue?: R | T
): Promise<R | T> {
  try {
    const resolvedValues = await Promise.resolve(values);

    let i = 0;
    let previousValue = initialValue || await Promise.resolve(resolvedValues[i++]);
    for (; i < resolvedValues.length; i++) {
      const currentValue = await Promise.resolve(resolvedValues[i]);
      previousValue = await iterator(previousValue, currentValue, i);
    }

    return previousValue;
  } catch (err) {
    throw err;
  }
}

import { OrPromiseLike } from "../meta";

type PipeMethod<T> = (...args: any[]) => OrPromiseLike<T>;

type Pipe<T, U> = (initialValue: OrPromiseLike<T>) => Promise<U>;

export function pipe<T1>(): Pipe<T1, T1>;
export function pipe<T1, T2>(
  first: (a: T1) => OrPromiseLike<T2>
): Pipe<T1, T2>;
export function pipe<T1, T2, T3>(
  first: (a: T1) => OrPromiseLike<T2>,
  second: (a: T2) => OrPromiseLike<T3>
): Pipe<T1, T3>;
export function pipe<T1, T2, T3, T4>(
  first: (a: T1) => OrPromiseLike<T2>,
  second: (a: T2) => OrPromiseLike<T3>,
  third: (a: T3) => OrPromiseLike<T4>
): Pipe<T1, T4>;
export function pipe<T1, T2, T3, T4, T5>(
  first: (a: T1) => OrPromiseLike<T2>,
  second: (a: T2) => OrPromiseLike<T3>,
  third: (a: T3) => OrPromiseLike<T4>,
  fourth: (a: T4) => OrPromiseLike<T5>
): Pipe<T1, T5>;
export function pipe<T1, T2, T3, T4, T5, T6>(
  first: (a: T1) => OrPromiseLike<T2>,
  second: (a: T2) => OrPromiseLike<T3>,
  third: (a: T3) => OrPromiseLike<T4>,
  fourth: (a: T4) => OrPromiseLike<T5>,
  fifth: (a: T5) => OrPromiseLike<T6>
): Pipe<T1, T6>;
export function pipe<T1, T2, T3, T4, T5, T6, T7>(
  first: (a: T1) => OrPromiseLike<T2>,
  second: (a: T2) => OrPromiseLike<T3>,
  third: (a: T3) => OrPromiseLike<T4>,
  fourth: (a: T4) => OrPromiseLike<T5>,
  fifth: (a: T5) => OrPromiseLike<T6>,
  sixth: (a: T6) => OrPromiseLike<T7>
): Pipe<T1, T7>;
/**
 * Concurrently pipes the results of the previous function into the next
 */
export function pipe<T>(...methods: PipeMethod<T>[]) {
  const piper = async (initialValue: T) => {
    let resultingValue = await Promise.resolve(initialValue);

    for (const method of methods) {
      resultingValue = await Promise.resolve(method(resultingValue));
    }
    return resultingValue;
  };
  return piper;
}

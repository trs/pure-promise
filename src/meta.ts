export type OrPromiseLike<T> = T | PromiseLike<T>;
export interface RecordLike<T> {[key: string]: T}

export async function toPromise<T>(value: OrPromiseLike<T>): Promise<T>;
export async function toPromise<T, R>(value: OrPromiseLike<T>, method?: (arg: T) => Promise<R>): Promise<R>;
export async function toPromise<T, R>(value: OrPromiseLike<T>, method?: (arg: T) => Promise<R>): Promise<T | R> {
  const resolvedValue = await Promise.resolve(value);

  if (!method) return resolvedValue;

  return await method(resolvedValue);
}

export function isPromise(variable: any): boolean {
  return typeof variable === 'object'
    && typeof variable.then === 'function';
}


export type OrPromiseLike<T> = T | PromiseLike<T>;

export interface Record<T> {[key: string]: T}

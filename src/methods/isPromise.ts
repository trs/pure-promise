export default function isPromise(variable: any): boolean {
  return typeof variable === 'object'
    && typeof variable.then === 'function';
}

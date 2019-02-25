export default function isPromise(variable: any) {
  return typeof variable === 'object'
    && typeof variable.then === 'function';
}

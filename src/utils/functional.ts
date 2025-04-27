export function pipe<A>(value: A): A;
export function pipe<A, B>(value: A, fn1: (input: A) => B): B;
export function pipe<A, B, C>(value: A, fn1: (input: A) => B, fn2: (input: B) => C): C;
export function pipe<A, B, C, D>(value: A, fn1: (input: A) => B, fn2: (input: B) => C, fn3: (input: C) => D): D;
export function pipe(value: any, ...fns: Array<(arg: any) => any>): any {
  return fns.reduce((acc, fn) => fn(acc), value);
}

  export const compose = <T>(...fns: Array<(arg: T) => T>) =>
    (value: T): T => fns.reduceRight((acc, fn) => fn(acc), value);

  // Function to apply conditional transformations
  export const when = <T>(
    predicate: (value: T) => boolean,
    transform: (value: T) => T
  ) => (value: T): T =>
    predicate(value) ? transform(value) : value;

  // Function to handle side effects in a more controlled way
  export const tap = <T>(fn: (value: T) => void) => (value: T): T => {
    fn(value);
    return value;
  };

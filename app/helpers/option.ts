import { Result } from "@/helpers/result";

export class Option<T> {
  private readonly _value: T | null;
  private readonly _isSome: boolean;

  private constructor(value: T | null, isSome: boolean) {
    this._value = value;
    this._isSome = isSome;
  }

  static Some<T>(value: T): Option<T> {
    if (null === value || undefined === value)
      throw new Error("Cannot create Some with null or undefined");
    return new Option<T>(value, true);
  }

  static None<T>(): Option<T> {
    return new Option<T>(null, false);
  }

  isSome(): boolean {
    return this._isSome;
  }

  isNone(): boolean {
    return !this._isSome;
  }

  unwrap(): T {
    if (this._isSome) return this._value as T;
    throw new Error("Called unwrap on a None value");
  }

  unwrapOr(defaultValue: T): T {
    return this._isSome ? (this._value as T) : defaultValue;
  }

  unwrapOrElse(fn: () => T): T {
    return this._isSome ? (this._value as T) : fn();
  }

  map<U>(fn: (value: T) => U): Option<U> {
    if (this._isSome) return Option.Some(fn(this._value as T));
    return Option.None<U>();
  }

  mapOr<U>(defaultValue: U, fn: (value: T) => U): U {
    return this._isSome ? fn(this._value as T) : defaultValue;
  }

  mapOrElse<U>(defaultFn: () => U, fn: (value: T) => U): U {
    return this._isSome ? fn(this._value as T) : defaultFn();
  }

  andThen<U>(fn: (value: T) => Option<U>): Option<U> {
    if (this._isSome) return fn(this._value as T);
    return Option.None<U>();
  }

  or(other: Option<T>): Option<T> {
    return this._isSome ? this : other;
  }

  orElse(fn: () => Option<T>): Option<T> {
    return this._isSome ? this : fn();
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    if (this._isSome && predicate(this._value as T)) return this;
    return Option.None<T>();
  }

  match<U>(onSome: (value: T) => U, onNone: () => U): U {
    return this._isSome ? onSome(this._value as T) : onNone();
  }

  // To work with Result
  okOr<E>(err: E): Result<T, E> {
    return this._isSome ? Result.Ok<T, E>(this._value as T) : Result.Err<T, E>(err);
  }

  okOrElse<E>(errFn: () => E): Result<T, E> {
    return this._isSome ? Result.Ok<T, E>(this._value as T) : Result.Err<T, E>(errFn());
  }
}

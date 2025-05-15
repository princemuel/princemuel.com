import { Option } from "@/helpers/option";

export class Result<T, E> {
  private readonly _value: T | E;
  private readonly _isOk: boolean;

  private constructor(value: T | E, isOk: boolean) {
    this._value = value;
    this._isOk = isOk;
  }

  // Constructors
  static Ok<T, E>(value: T): Result<T, E> {
    return new Result<T, E>(value, true);
  }

  static Err<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(error, false);
  }

  // Methods
  isOk(): boolean {
    return this._isOk;
  }

  isErr(): boolean {
    return !this._isOk;
  }

  unwrap(): T {
    if (this._isOk) return this._value as T;
    throw new Error(`Called unwrap on an Err value: ${this._value}`);
  }

  unwrapOr(defaultValue: T): T {
    return this._isOk ? (this._value as T) : defaultValue;
  }

  unwrapOrElse(fn: (err: E) => T): T {
    return this._isOk ? (this._value as T) : fn(this._value as E);
  }

  unwrapErr(): E {
    if (!this._isOk) return this._value as E;
    throw new Error("Called unwrapErr on an Ok value");
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this._isOk) return Result.Ok<U, E>(fn(this._value as T));
    return Result.Err<U, E>(this._value as E);
  }

  mapOr<U>(defaultValue: U, fn: (value: T) => U): U {
    return this._isOk ? fn(this._value as T) : defaultValue;
  }

  mapOrElse<U>(defaultFn: (err: E) => U, fn: (value: T) => U): U {
    return this._isOk ? fn(this._value as T) : defaultFn(this._value as E);
  }

  mapErr<F>(fn: (err: E) => F): Result<T, F> {
    if (this._isOk) return Result.Ok<T, F>(this._value as T);
    return Result.Err<T, F>(fn(this._value as E));
  }

  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this._isOk) return fn(this._value as T);
    return Result.Err<U, E>(this._value as E);
  }

  or<F>(res: Result<T, F>): Result<T, F> {
    return this._isOk ? Result.Ok<T, F>(this._value as T) : res;
  }

  orElse<F>(fn: (err: E) => Result<T, F>): Result<T, F> {
    return this._isOk ? Result.Ok<T, F>(this._value as T) : fn(this._value as E);
  }

  match<U>(onOk: (value: T) => U, onErr: (err: E) => U): U {
    return this._isOk ? onOk(this._value as T) : onErr(this._value as E);
  }

  // Convert to Option
  ok(): Option<T> {
    return this._isOk ? Option.Some<T>(this._value as T) : Option.None<T>();
  }

  err(): Option<E> {
    return this._isOk ? Option.None<E>() : Option.Some<E>(this._value as E);
  }
}

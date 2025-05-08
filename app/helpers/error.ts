import { createError, HttpError, isHttpError } from "http-errors-enhanced";
import type { GenericObject } from "node_modules/http-errors-enhanced/dist/utils";

/** Helper for throwing errors in expression positions */
export const throwAsError = (exception: unknown) => {
  throw "string" === typeof exception ? new Error(exception) : exception;
};

export const getErrorMessage = (exception: unknown): string => {
  if (exception instanceof Error) return exception.message;
  if ("string" === typeof exception) return exception;
  return "An unknown error occurred";
};

interface ErrorResponse {
  code: string;
  status: number;
  payload: string;
}

export const toHttpErrorResponse = (exception: unknown): ErrorResponse => {
  if (isHttpError(exception)) {
    return { code: exception.code, status: exception.status, payload: exception.message };
  }
  // @ts-expect-error just ignore error.message
  const { code, status, message } = createError(toHttpStatus(exception), exception.message);
  return { code, status, payload: message };
};

const toHttpStatus = (error: unknown) => {
  return (
    new Map([
      ["AbortError", 499],
      ["TimeoutError", 408],
      ["TypeError", 400],
      ["SyntaxError", 500],
      ["NetworkError", 503],
      ["NotFoundError", 404],
      ["UnknownError", 501],
    ])
      // @ts-expect-error just ignore error.name
      .get(error.name) || 500
  );
};

export class ClientClosedRequestError extends HttpError {
  static status = 499;
  static error = "ClientClosedRequest";
  static message = "Client Closed Request";
  static phrase = "Client closed request.";
  constructor(
    message: string | GenericObject | undefined,
    properties: GenericObject | undefined,
  ) {
    super(499, message, properties);
    this.name = "ClientClosedRequestError";
  }
}

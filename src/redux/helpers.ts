import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export function isErrorWithBodyMessage(
  error: unknown
): error is { data: { error: string } } {
  return (
    // error is not null object
    typeof error === "object" &&
    error != null &&
    //
    // error.data is not null object
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    //
    // error.data.error is string
    "error" in error.data &&
    typeof error.data.error === "string"
  );
}

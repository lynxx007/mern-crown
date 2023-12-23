import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type isErrorWithMsg = {
  status: number;
  data: {
    msg: string;
    stack: string;
    statusCode: number;
    success: boolean;
  };
};
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function isErrorWithMsg(error: unknown): error is isErrorWithMsg {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error &&
    "msg" in error.data
  );
}

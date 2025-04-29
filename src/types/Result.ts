// Specific error types for better categorization
export enum ErrorCode {
  VALIDATION = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  NETWORK_ERROR = 503,
  PERMISSION_DENIED = 403,
  CONFLICT = 409,
  TIMEOUT = 408,
  BAD_FORMAT = 415,
  PARSE_ERROR = 422
}

// Defines a more detailed error response structure
export type ErrorResponse = {
  code: ErrorCode | number;
  msg: string;
  source?: string; // component or service that generated the error
  data?: any; // additional data for debugging
  timestamp?: number; // when the error occurred
};

// Defines discriminated union type for result with generic parameter
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: ErrorResponse };

// Helper functions to create results
export const success = <T>(data: T): Result<T> => ({
  success: true,
  data
});

export const failure = (error: ErrorResponse): Result<never> => ({
  success: false,
  error
});

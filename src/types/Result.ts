// Define the error response type
type ErrorResponse = {
    code: number;
    msg: string;
    data?: any;
  };

  // Define discriminated union type for the result with generic parameter
  export type Result<T> =
    | { success: true; data: T }
    | { success: false; data: ErrorResponse };

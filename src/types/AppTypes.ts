export interface AppState {
    isLoading: boolean;
    hasError: boolean;
  }

  export interface ConnectionResult {
    success: boolean;
    error?: Error;
  }

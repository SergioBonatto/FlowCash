// Tipos de erro específicos para melhor categorização
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

// Define a estrutura de error response mais detalhada
export type ErrorResponse = {
  code: ErrorCode | number;
  msg: string;
  source?: string; // componente ou serviço que gerou o erro
  data?: any; // dados adicionais para debug
  timestamp?: number; // quando o erro ocorreu
};

// Define discriminated union type para resultado com parâmetro genérico
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: ErrorResponse };

// Funções auxiliares para criar resultados
export const success = <T>(data: T): Result<T> => ({
  success: true,
  data
});

export const failure = (error: ErrorResponse): Result<never> => ({
  success: false,
  error
});

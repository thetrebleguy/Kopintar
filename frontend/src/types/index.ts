export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthStatus {
  status: 'ok' | 'error' | 'loading';
  message: string;
}

export interface MathSummaryRequest {
  numbers: number[];
}

export interface MathSummaryResponse {
  mean: number;
  sum: number;
  std_dev: number;
}

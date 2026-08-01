export interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  environment: string;
  version: string;
  database_connected: boolean;
}

export interface ApiError {
  detail: string;
  status_code?: number;
}

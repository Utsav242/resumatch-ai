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

export interface UserProfile {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  target_role: string | null;
  target_industry: string | null;
  enable_rag: boolean;
  strict_ats: boolean;
  email_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfileUpdate {
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  target_role?: string | null;
  target_industry?: string | null;
  enable_rag?: boolean;
  strict_ats?: boolean;
  email_notifications?: boolean;
}


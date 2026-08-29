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

export interface ResumeSection {
  summary: string;
  experience: string;
  education: string;
  skills: string;
  certifications: string;
  other: string;
}

export interface FileMetadata {
  filename: string;
  file_size: number;
  content_type: string;
  page_count: number | null;
}

export interface ResumeData {
  id: string;
  user_id: string;
  raw_text: string;
  structured_sections: ResumeSection;
  file_metadata: FileMetadata;
  is_active: boolean;
  target_role?: string;
  target_company?: string;
  job_description_text?: string;
  job_description_source?: string;
  created_at: string;
  updated_at: string;
}


export interface JobDescriptionData {
  raw_text: string;
  metadata: {
    source: "upload" | "paste";
    filename?: string;
    file_size?: number;
    page_count?: number | null;
    target_role?: string;
    target_company?: string;
  };
}


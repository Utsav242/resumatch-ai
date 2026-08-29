import { env } from "@/config/env";
import { HealthStatus, UserProfile, UserProfileUpdate, ResumeData, JobDescriptionData } from "@/types";

export class ApiService {
  private static baseUrl = env.NEXT_PUBLIC_API_URL;

  static async fetchHealth(): Promise<HealthStatus> {
    const res = await fetch(`${this.baseUrl}/api/v1/health`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch health: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Fetch current user profile from the database.
   * If the user doesn't exist in the database, the backend automatically registers them using their Clerk ID.
   */
  static async fetchCurrentUser(token: string): Promise<UserProfile> {
    const res = await fetch(`${this.baseUrl}/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user profile: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Update the current user's profile and ATS engine preferences.
   */
  static async updateCurrentUser(
    token: string,
    data: UserProfileUpdate
  ): Promise<UserProfile> {
    const res = await fetch(`${this.baseUrl}/api/v1/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to update user profile: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Upload resume file (PDF or DOCX).
   */
  static async uploadResume(token: string, file: File): Promise<ResumeData> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${this.baseUrl}/api/v1/resume/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Failed to upload resume: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Upload job description PDF file.
   */
  static async uploadJobDescription(token: string, file: File): Promise<JobDescriptionData> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${this.baseUrl}/api/v1/job-description/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Failed to upload job description: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Submit pasted job description text.
   */
  static async pasteJobDescription(
    token: string,
    data: { text: string; target_role?: string; target_company?: string; resume_id?: string }
  ): Promise<JobDescriptionData> {
    const res = await fetch(`${this.baseUrl}/api/v1/job-description/paste`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Failed to submit job description: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Fetch the active uploaded resume for the current user.
   */
  static async fetchActiveResume(token: string): Promise<ResumeData | null> {
    const res = await fetch(`${this.baseUrl}/api/v1/resume/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch active resume: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * List all uploaded resumes for the current user.
   */
  static async listResumes(token: string): Promise<ResumeData[]> {
    const res = await fetch(`${this.baseUrl}/api/v1/resume/`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to list resumes: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Fetch a specific resume by ID for the current user.
   */
  static async fetchResumeById(token: string, resumeId: string): Promise<ResumeData> {
    const res = await fetch(`${this.baseUrl}/api/v1/resume/${resumeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Failed to fetch resume: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Delete a specific resume by ID for the current user.
   */
  static async deleteResume(token: string, resumeId: string): Promise<{ message: string }> {
    const res = await fetch(`${this.baseUrl}/api/v1/resume/${resumeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Failed to delete resume: ${res.statusText}`);
    }

    return res.json();
  }
}




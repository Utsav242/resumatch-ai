import { env } from "@/config/env";
import { HealthStatus, UserProfile, UserProfileUpdate } from "@/types";

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
}


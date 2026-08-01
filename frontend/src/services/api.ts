import { env } from "@/config/env";
import { HealthStatus } from "@/types";

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
}

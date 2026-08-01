"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api";

export function useHealth() {
  return useQuery({
    queryKey: ["system-health"],
    queryFn: () => ApiService.fetchHealth(),
    refetchInterval: 15000,
    retry: 2,
  });
}

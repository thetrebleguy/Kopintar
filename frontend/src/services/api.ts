import type { HealthStatus, MathSummaryRequest, MathSummaryResponse } from '../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export async function checkBackendHealth(): Promise<HealthStatus> {
  const response = await fetch(`${BACKEND_URL}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed with status: ${response.status}`);
  }
  return response.json();
}

export async function calculateSummary(
  data: MathSummaryRequest
): Promise<MathSummaryResponse> {
  const response = await fetch(`${BACKEND_URL}/api/math/summary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Math summary request failed: ${response.statusText}`);
  }

  return response.json();
}

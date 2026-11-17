import { useState, useEffect } from 'react';
import { checkBackendHealth } from '../services/api';
import type { HealthStatus } from '../types';

export function useBackendHealth() {
  const [health, setHealth] = useState<HealthStatus>({
    status: 'loading',
    message: 'Connecting to backend...',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await checkBackendHealth();
      setHealth(res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      setHealth({
        status: 'error',
        message: 'Could not connect to FastAPI backend at port 8000',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return { health, loading, error, refetch: fetchHealth };
}

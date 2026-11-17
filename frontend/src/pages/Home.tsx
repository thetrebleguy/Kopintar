import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { useBackendHealth } from '../hooks/useBackendHealth';
import { calculateSummary } from '../services/api';
import type { MathSummaryResponse } from '../types';

export const Home: React.FC = () => {
  const { health, loading: healthLoading, refetch } = useBackendHealth();
  const [numbersInput, setNumbersInput] = useState('10, 20, 30, 40, 50');
  const [mathResult, setMathResult] = useState<MathSummaryResponse | null>(null);
  const [mathLoading, setMathLoading] = useState(false);
  const [mathError, setMathError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMathError(null);
    setMathLoading(true);

    try {
      const numbers = numbersInput
        .split(',')
        .map((n) => parseFloat(n.trim()))
        .filter((n) => !isNaN(n));

      if (numbers.length === 0) {
        throw new Error('Please enter at least one valid number');
      }

      const res = await calculateSummary({ numbers });
      setMathResult(res);
    } catch (err: unknown) {
      setMathError(err instanceof Error ? err.message : 'Calculation error');
    } finally {
      setMathLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Backend Connection Status */}
          <Card
            title="FastAPI Backend Status"
            description="Testing CORS and communication between React (5173) and FastAPI (8000)"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className={`w-3.5 h-3.5 rounded-full ${
                    healthLoading
                      ? 'bg-amber-400 animate-pulse'
                      : health.status === 'ok'
                      ? 'bg-emerald-500'
                      : 'bg-rose-500'
                  }`}
                />
                <span className="font-medium text-sm">
                  {healthLoading
                    ? 'Checking backend connection...'
                    : health.status === 'ok'
                    ? 'Connected successfully (CORS Active)'
                    : 'Disconnected'}
                </span>
              </div>

              <div className="p-3 bg-slate-100 rounded-lg text-xs font-mono text-slate-700">
                {JSON.stringify(health, null, 2)}
              </div>

              <button
                onClick={refetch}
                disabled={healthLoading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              >
                {healthLoading ? 'Testing...' : 'Test Connection Again'}
              </button>
            </div>
          </Card>

          {/* NumPy & Backend API Demo */}
          <Card
            title="NumPy Backend API Test"
            description="Send numeric data to FastAPI to compute statistics with NumPy"
          >
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Numbers (comma-separated):
                </label>
                <input
                  type="text"
                  value={numbersInput}
                  onChange={(e) => setNumbersInput(e.target.value)}
                  placeholder="e.g. 10, 25, 42, 88"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={mathLoading}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              >
                {mathLoading ? 'Computing...' : 'Calculate with NumPy'}
              </button>

              {mathError && (
                <p className="text-xs text-rose-600 font-medium">{mathError}</p>
              )}

              {mathResult && (
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs space-y-1">
                  <p>
                    <span className="font-semibold text-indigo-900">Mean:</span>{' '}
                    {mathResult.mean.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold text-indigo-900">Sum:</span>{' '}
                    {mathResult.sum.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold text-indigo-900">
                      Standard Deviation:
                    </span>{' '}
                    {mathResult.std_dev.toFixed(2)}
                  </p>
                </div>
              )}
            </form>
          </Card>
        </div>

        {/* Project Setup Checklist */}
        <section className="mt-8">
          <Card title="Project Structure & Configuration Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800">Frontend (port 5173):</h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Vite + React 19 + TypeScript</li>
                  <li>Tailwind CSS configured and styled</li>
                  <li><code>src/components/</code> (Header, Card)</li>
                  <li><code>src/pages/</code> (Home)</li>
                  <li><code>src/services/</code> (api.ts)</li>
                  <li><code>src/types/</code> (index.ts)</li>
                  <li><code>src/hooks/</code> (useBackendHealth.ts)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800">Backend (port 8000):</h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>FastAPI + Uvicorn server</li>
                  <li>NumPy + Pydantic dependencies</li>
                  <li>CORS enabled for <code>http://localhost:5173</code></li>
                  <li>Interactive Swagger docs at <code>/docs</code></li>
                  <li>Health check endpoint at <code>/health</code></li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

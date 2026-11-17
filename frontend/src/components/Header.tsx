import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Kopintar',
  subtitle = 'React + TypeScript + Vite + Tailwind CSS + FastAPI',
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white py-6 px-8 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-indigo-400">☕</span> {title}
          </h1>
          <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
            Frontend: localhost:5173
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
            Backend: localhost:8000
          </span>
        </div>
      </div>
    </header>
  );
};

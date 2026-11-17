import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 mb-4">{description}</p>
      )}
      <div>{children}</div>
    </div>
  );
};

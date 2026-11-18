import React from 'react';

type BadgeVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'purple'
  | 'cyan';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dotColor: string }> = {
  success: {
    bg: 'bg-emerald-50 border-emerald-200/60 text-emerald-700',
    dotColor: 'bg-emerald-500',
  },
  warning: {
    bg: 'bg-amber-50 border-amber-200/60 text-amber-700',
    dotColor: 'bg-amber-500',
  },
  danger: {
    bg: 'bg-rose-50 border-rose-200/60 text-rose-700',
    dotColor: 'bg-rose-500',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200/60 text-blue-700',
    dotColor: 'bg-blue-500',
  },
  purple: {
    bg: 'bg-indigo-50 border-indigo-200/60 text-indigo-700',
    dotColor: 'bg-indigo-500',
  },
  cyan: {
    bg: 'bg-cyan-50 border-cyan-200/60 text-cyan-700',
    dotColor: 'bg-cyan-500',
  },
  neutral: {
    bg: 'bg-slate-100 border-slate-200/80 text-slate-700',
    dotColor: 'bg-slate-400',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const styles = variantStyles[variant];
  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${styles.bg} ${styles.text} ${sizeStyles} ${className} transition-colors`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${styles.dotColor}`}
        />
      )}
      {children}
    </span>
  );
};

// Helper for status strings to variant
export const getStatusBadgeVariant = (status: string): BadgeVariant => {
  const s = status.toLowerCase();
  if (['customer', 'won', 'active', 'qualified', 'completed', 'high'].includes(s)) return 'success';
  if (['lead', 'proposal', 'negotiation', 'medium'].includes(s)) return 'warning';
  if (['prospect', 'new', 'contacted', 'discovery'].includes(s)) return 'info';
  if (['inactive', 'lost', 'low'].includes(s)) return 'neutral';
  if (['danger', 'urgent'].includes(s)) return 'danger';
  return 'purple';
};

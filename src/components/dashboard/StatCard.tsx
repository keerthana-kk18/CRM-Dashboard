import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  isPositive?: boolean;
  timeframe?: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  subtitle?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  timeframe = 'vs last month',
  icon,
  iconColor,
  iconBg,
  subtitle,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs transition-all duration-200 hover:shadow-card-hover hover:border-slate-300 relative overflow-hidden group ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
            {value}
          </h3>
        </div>

        {/* Themed Icon Box */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor} shadow-inner transition-transform duration-200 group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>

      {/* Metric footer with % change */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-semibold text-xs ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : 'bg-rose-50 text-rose-700 border border-rose-200/60'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-slate-400 font-normal">{timeframe}</span>
        </div>

        {subtitle && (
          <span className="text-slate-400 text-[11px] font-mono hidden sm:inline-block">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

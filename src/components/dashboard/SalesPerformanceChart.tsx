import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { PIPELINE_STAGE_DATA } from '../../data/mockData';
import { Briefcase } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      amount: number;
      color: string;
    };
  }>;
}

const CustomPieTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs font-sans min-w-[150px]">
        <div className="flex items-center gap-1.5 mb-1.5 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
          <span>{data.name} Stage</span>
        </div>
        <p className="text-slate-400">
          Deals Count:{' '}
          <span className="font-mono font-medium text-white">{data.value} deals</span>
        </p>
        <p className="text-slate-400">
          Pipeline Value:{' '}
          <span className="font-mono font-semibold text-emerald-400">
            ${data.amount.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export const SalesPerformanceChart: React.FC = () => {
  const totalPipelineValue = PIPELINE_STAGE_DATA.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDealsCount = PIPELINE_STAGE_DATA.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Sales Pipeline Performance
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage distribution ({totalDealsCount} active deals in pipeline)
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
          <Briefcase className="w-4 h-4" />
        </div>
      </div>

      <div className="relative h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Pie
              data={PIPELINE_STAGE_DATA}
              innerRadius={62}
              outerRadius={88}
              paddingAngle={4}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {PIPELINE_STAGE_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Total Pipeline
          </span>
          <span className="text-lg font-bold text-slate-900 font-mono">
            ${(totalPipelineValue / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      {/* Legend list with stage details */}
      <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
        {PIPELINE_STAGE_DATA.map((stage) => {
          const percent = ((stage.amount / totalPipelineValue) * 100).toFixed(0);
          return (
            <div
              key={stage.name}
              className="flex items-center justify-between text-xs text-slate-600 group hover:text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="font-medium text-slate-700">{stage.name}</span>
                <span className="text-slate-400 text-[11px]">({stage.value})</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-slate-400">{percent}%</span>
                <span className="font-semibold text-slate-800">
                  ${(stage.amount / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

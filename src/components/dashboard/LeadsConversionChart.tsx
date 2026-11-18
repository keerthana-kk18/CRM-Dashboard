import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { LEAD_CONVERSION_DATA } from '../../data/mockData';
import { Filter } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: {
      channel: string;
      leads: number;
      conversions: number;
      rate: number;
    };
  }>;
  label?: string;
}

const CustomBarTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs font-sans min-w-[160px]">
        <p className="font-semibold text-slate-300 mb-2 border-b border-slate-800 pb-1">
          {label} Channel
        </p>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Total Leads:</span>
            <span className="font-semibold text-white font-mono">{data.leads}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-emerald-400">Converted:</span>
            <span className="font-semibold text-emerald-300 font-mono">{data.conversions}</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <span className="text-slate-400">Conversion Rate:</span>
            <span className="font-semibold text-cyan-400 font-mono">{data.rate}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const LeadsConversionChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Leads & Channel Conversion
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown of inbound traffic vs confirmed deal transitions
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>All Channels</span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={LEAD_CONVERSION_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="channel"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '16px', fontSize: '12px' }}
            />
            <Bar
              name="Generated Leads"
              dataKey="leads"
              fill="#818CF8"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              name="Converted Deals"
              dataKey="conversions"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

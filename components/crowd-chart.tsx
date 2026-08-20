"use client";

import type { CrowdForecast } from '@/lib/types';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type CrowdChartProps = {
  forecast: CrowdForecast;
  bestWindow: string;
};

export function CrowdChart({ forecast, bestWindow }: CrowdChartProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">Hourly crowd forecast</h3>
          <p className="text-sm text-black/55">{bestWindow}</p>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={forecast.hourly} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="crowdFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B5651D" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#B5651D" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.08)" />
            <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 20,
                border: '1px solid rgba(17,17,17,0.08)',
                background: 'rgba(255,255,255,0.92)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            />
            <Area type="monotone" dataKey="score" stroke="#B5651D" fill="url(#crowdFill)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-2 text-xs font-medium text-black/55">
        <span className="rounded-full bg-black/5 px-3 py-1">Low: 0-35</span>
        <span className="rounded-full bg-black/5 px-3 py-1">Moderate: 36-65</span>
        <span className="rounded-full bg-black/5 px-3 py-1">High: 66-100</span>
      </div>
    </div>
  );
}

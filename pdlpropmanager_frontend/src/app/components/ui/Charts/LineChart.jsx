'use client';

import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function LineChart({ data, xKey = 'month', yKey = 'total', label = 'Payments' }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey={xKey} stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke="#BB86FC"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}

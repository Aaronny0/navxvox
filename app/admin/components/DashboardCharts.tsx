"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#1a6fd4", "#00c8e0", "#e65c00", "#c62828", "#1b8a4e"];

export function ProjectStatusChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--nv-bg-secondary)', border: '1px solid var(--nv-border-light)' }}
            itemStyle={{ color: 'var(--nv-text-primary)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueChart({ data }: { data: { month: string; revenue: number }[] }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="month" stroke="var(--nv-text-secondary)" fontSize={12} tickLine={false} />
          <YAxis stroke="var(--nv-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `€${val}`} />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ backgroundColor: 'var(--nv-bg-secondary)', border: '1px solid var(--nv-border-light)' }}
            itemStyle={{ color: 'var(--nv-text-primary)' }}
          />
          <Bar dataKey="revenue" fill="var(--nv-accent-cyan)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProjectsByMonthChart({ data }: { data: { month: string; count: number }[] }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="month" stroke="var(--nv-text-secondary)" fontSize={12} tickLine={false} />
          <YAxis stroke="var(--nv-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--nv-bg-secondary)', border: '1px solid var(--nv-border-light)' }}
            itemStyle={{ color: 'var(--nv-text-primary)' }}
          />
          <Line type="monotone" dataKey="count" stroke="var(--nv-accent-violet)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardData } from "@/lib/dashboard-data";

const colors = ["#0b6388", "#2ea39a", "#f2a12b", "#475569", "#be123c", "#7c3aed"];

export function CommandCharts({ charts }: { charts: DashboardData["charts"] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <CardDescription>Monthly income and spend from Supabase revenue and expense records.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={charts.revenueVsExpenses} margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="revenue" stroke="#0b6388" fill="#0b6388" fillOpacity={0.16} strokeWidth={3} />
              <Area type="monotone" dataKey="expenses" stroke="#f2a12b" fill="#f2a12b" fillOpacity={0.16} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <BreakdownPie
        title="Project Status Breakdown"
        description="Active delivery mix by project status."
        data={charts.projectStatusBreakdown}
      />

      <BreakdownPie
        title="Task Status Breakdown"
        description="Current workload distribution across task stages."
        data={charts.taskStatusBreakdown}
      />

      <Card>
        <CardHeader>
          <CardTitle>Content Output by Platform</CardTitle>
          <CardDescription>Content items grouped by channel or publishing platform.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.contentOutputByPlatform}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="platform" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="items" fill="#2ea39a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proposal Pipeline Value</CardTitle>
          <CardDescription>Proposal value grouped by pipeline stage.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.proposalPipelineValue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="status" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Bar dataKey="value" fill="#0b6388" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Growth</CardTitle>
          <CardDescription>Monthly follower base and lead movement across tracked platforms.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={charts.socialMediaGrowth} margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="followers" stroke="#0b6388" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="leads" stroke="#f2a12b" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function BreakdownPie({
  title,
  description,
  data
}: {
  title: string;
  description: string;
  data: Array<{ name: string; value: number }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={96} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

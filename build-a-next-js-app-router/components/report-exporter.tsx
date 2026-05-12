"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardData } from "@/lib/dashboard-data";

type ExportRow = Record<string, string | number>;

export function ReportExporter({ data }: { data: DashboardData }) {
  const reports: Array<{ title: string; description: string; fileName: string; rows: ExportRow[] }> = [
    {
      title: "KPI Summary",
      description: "One-row executive snapshot of core operating indicators.",
      fileName: "operations-kpi-summary.csv",
      rows: [
        {
          active_projects: data.kpis.activeProjects,
          pending_tasks: data.kpis.pendingTasks,
          overdue_tasks: data.kpis.overdueTasks,
          monthly_revenue: data.kpis.monthlyRevenue,
          monthly_expenses: data.kpis.monthlyExpenses,
          net_balance: data.kpis.netBalance,
          active_clients: data.kpis.activeClients,
          content_in_production: data.kpis.contentInProduction,
          partnership_opportunities: data.kpis.partnershipOpportunities,
          meetings_this_week: data.kpis.meetingsThisWeek,
          ai_systems_in_development: data.kpis.aiSystemsInDevelopment,
          proposals_submitted: data.kpis.proposalsSubmitted
        }
      ]
    },
    {
      title: "Revenue vs Expenses",
      description: "Monthly revenue and expense series for finance review.",
      fileName: "revenue-vs-expenses.csv",
      rows: data.charts.revenueVsExpenses
    },
    {
      title: "Project Status Breakdown",
      description: "Project count by delivery status.",
      fileName: "project-status-breakdown.csv",
      rows: data.charts.projectStatusBreakdown
    },
    {
      title: "Task Status Breakdown",
      description: "Task count by workflow status.",
      fileName: "task-status-breakdown.csv",
      rows: data.charts.taskStatusBreakdown
    },
    {
      title: "Content Output",
      description: "Content count by publishing platform.",
      fileName: "content-output-by-platform.csv",
      rows: data.charts.contentOutputByPlatform
    },
    {
      title: "Proposal Pipeline",
      description: "Proposal value grouped by status.",
      fileName: "proposal-pipeline-value.csv",
      rows: data.charts.proposalPipelineValue
    },
    {
      title: "Social Media Growth",
      description: "Follower and lead movement by month.",
      fileName: "social-media-growth.csv",
      rows: data.charts.socialMediaGrowth
    }
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {reports.map((report) => (
        <Card key={report.fileName}>
          <CardHeader>
            <CardTitle>{report.title}</CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{report.rows.length} rows</p>
            <Button onClick={() => downloadCsv(report.fileName, report.rows)}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function downloadCsv(fileName: string, rows: ExportRow[]) {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

function toCsv(rows: ExportRow[]) {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const body = rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(","));
  return [headers.join(","), ...body].join("\n");
}

function escapeCsv(value: string | number) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

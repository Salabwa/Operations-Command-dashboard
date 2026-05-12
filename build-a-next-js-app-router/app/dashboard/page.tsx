import {
  Banknote,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  DollarSign,
  FileText,
  Handshake,
  Megaphone,
  Receipt,
  TrendingDown,
  Users
} from "lucide-react";
import { CommandCharts } from "@/components/command-charts";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDashboardData } from "@/lib/dashboard-data";
import { currency } from "@/lib/utils";

export default async function DashboardPage() {
  const data = await getDashboardData();

  const kpis = [
    { label: "Active Projects", value: String(data.kpis.activeProjects), change: "Currently moving through delivery", icon: BriefcaseBusiness },
    { label: "Pending Tasks", value: String(data.kpis.pendingTasks), change: "Open work items across all projects", icon: ClipboardList },
    { label: "Overdue Tasks", value: String(data.kpis.overdueTasks), change: "Needs follow-up from project owners", icon: TrendingDown },
    { label: "Monthly Revenue", value: currency(data.kpis.monthlyRevenue), change: "Revenue expected or received this month", icon: DollarSign },
    { label: "Monthly Expenses", value: currency(data.kpis.monthlyExpenses), change: "Approved and tracked operating spend", icon: Receipt },
    { label: "Net Balance", value: currency(data.kpis.netBalance), change: "Monthly revenue minus expenses", icon: Banknote },
    { label: "Active Clients", value: String(data.kpis.activeClients), change: "Accounts in the command database", icon: Users },
    { label: "Content in Production", value: String(data.kpis.contentInProduction), change: "Drafting, review, and scheduled items", icon: Megaphone },
    { label: "Partnership Opportunities", value: String(data.kpis.partnershipOpportunities), change: "Prospecting and negotiating partners", icon: Handshake },
    { label: "Meetings This Week", value: String(data.kpis.meetingsThisWeek), change: "Scheduled operating conversations", icon: CalendarDays },
    { label: "AI Systems in Development", value: String(data.kpis.aiSystemsInDevelopment), change: "Prototype or review-stage systems", icon: Bot },
    { label: "Proposals Submitted", value: String(data.kpis.proposalsSubmitted), change: "Submitted proposals awaiting decision", icon: FileText }
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Executive command view powered by Supabase records across projects, tasks, finance, clients, content, partnerships, meetings, AI systems, proposals, and social media."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} change={kpi.change} icon={kpi.icon} />
        ))}
      </div>

      <div className="mt-6">
        <CommandCharts charts={data.charts} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Priority Projects</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.tables.projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>
                      <StatusBadge value={project.status} />
                    </TableCell>
                    <TableCell>{currency(Number(project.budget))}</TableCell>
                    <TableCell>
                      <div className="min-w-32 space-y-1">
                        <div className="text-xs font-medium">{project.progress}%</div>
                        <Progress value={Number(project.progress)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Watchlist</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.tables.tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.assignee ?? "Unassigned"}</TableCell>
                    <TableCell>
                      <StatusBadge value={task.priority} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge value={task.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

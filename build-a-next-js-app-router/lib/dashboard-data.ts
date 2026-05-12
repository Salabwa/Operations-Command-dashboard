import {
  aiSystems as fallbackAiSystems,
  clients as fallbackClients,
  contentItems as fallbackContentItems,
  expenses as fallbackExpenses,
  meetings as fallbackMeetings,
  partnerships as fallbackPartnerships,
  projects as fallbackProjects,
  proposals as fallbackProposals,
  revenue as fallbackRevenue,
  socialMediaMetrics as fallbackSocialMediaMetrics,
  tasks as fallbackTasks
} from "@/lib/sample-data";
import { supabase } from "@/lib/supabase";
import type { AISystem, Client, ContentItem, Expense, Meeting, Partnership, Project, Proposal, Revenue, SocialMediaMetric, TeamTask } from "@/types/database";

export interface DashboardData {
  kpis: {
    activeProjects: number;
    pendingTasks: number;
    overdueTasks: number;
    monthlyRevenue: number;
    monthlyExpenses: number;
    netBalance: number;
    activeClients: number;
    contentInProduction: number;
    partnershipOpportunities: number;
    meetingsThisWeek: number;
    aiSystemsInDevelopment: number;
    proposalsSubmitted: number;
  };
  charts: {
    revenueVsExpenses: Array<{ month: string; revenue: number; expenses: number }>;
    projectStatusBreakdown: Array<{ name: string; value: number }>;
    taskStatusBreakdown: Array<{ name: string; value: number }>;
    contentOutputByPlatform: Array<{ platform: string; items: number }>;
    proposalPipelineValue: Array<{ status: string; value: number }>;
    socialMediaGrowth: Array<{ month: string; followers: number; leads: number }>;
  };
  tables: {
    projects: Project[];
    tasks: TeamTask[];
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  if (!supabase) {
    return buildDashboardData({
      projects: fallbackProjects,
      tasks: fallbackTasks,
      expenses: fallbackExpenses,
      revenue: fallbackRevenue,
      clients: fallbackClients,
      contentItems: fallbackContentItems,
      partnerships: fallbackPartnerships,
      socialMediaMetrics: fallbackSocialMediaMetrics,
      meetings: fallbackMeetings,
      aiSystems: fallbackAiSystems,
      proposals: fallbackProposals
    });
  }

  const [
    projectsResult,
    tasksResult,
    expensesResult,
    revenueResult,
    clientsResult,
    contentResult,
    partnershipsResult,
    socialResult,
    meetingsResult,
    aiSystemsResult,
    proposalsResult
  ] = await Promise.all([
    supabase.from("projects").select("*"),
    supabase.from("tasks").select("*"),
    supabase.from("expenses").select("*"),
    supabase.from("revenue").select("*"),
    supabase.from("clients").select("*"),
    supabase.from("content_items").select("*"),
    supabase.from("partnerships").select("*"),
    supabase.from("social_media_metrics").select("*"),
    supabase.from("meetings").select("*"),
    supabase.from("ai_systems").select("*"),
    supabase.from("proposals").select("*")
  ]);

  const errors = [
    projectsResult.error,
    tasksResult.error,
    expensesResult.error,
    revenueResult.error,
    clientsResult.error,
    contentResult.error,
    partnershipsResult.error,
    socialResult.error,
    meetingsResult.error,
    aiSystemsResult.error,
    proposalsResult.error
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error(errors.map((error) => error?.message).join("; "));
  }

  return buildDashboardData({
    projects: projectsResult.data ?? [],
    tasks: tasksResult.data ?? [],
    expenses: expensesResult.data ?? [],
    revenue: revenueResult.data ?? [],
    clients: clientsResult.data ?? [],
    contentItems: contentResult.data ?? [],
    partnerships: partnershipsResult.data ?? [],
    socialMediaMetrics: socialResult.data ?? [],
    meetings: meetingsResult.data ?? [],
    aiSystems: aiSystemsResult.data ?? [],
    proposals: proposalsResult.data ?? []
  });
}

function buildDashboardData({
  projects,
  tasks,
  expenses,
  revenue,
  clients,
  contentItems,
  partnerships,
  socialMediaMetrics,
  meetings,
  aiSystems,
  proposals
}: {
  projects: Project[];
  tasks: TeamTask[];
  expenses: Expense[];
  revenue: Revenue[];
  clients: Client[];
  contentItems: ContentItem[];
  partnerships: Partnership[];
  socialMediaMetrics: SocialMediaMetric[];
  meetings: Meeting[];
  aiSystems: AISystem[];
  proposals: Proposal[];
}): DashboardData {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const weekStart = startOfWeek(today);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const monthlyRevenue = revenue
    .filter((item) => inRange(parseDate(item.received_at ?? item.expected_at), monthStart, nextMonthStart))
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const monthlyExpenses = expenses
    .filter((item) => inRange(parseDate(item.spent_at), monthStart, nextMonthStart))
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const overdueTasks = tasks.filter((task) => {
    const dueDate = parseDate(task.due_date);
    return task.status !== "Done" && Boolean(dueDate) && dueDate < today;
  }).length;

  return {
    kpis: {
      activeProjects: projects.filter((project) => project.status === "Active").length,
      pendingTasks: tasks.filter((task) => task.status !== "Done").length,
      overdueTasks,
      monthlyRevenue,
      monthlyExpenses,
      netBalance: monthlyRevenue - monthlyExpenses,
      activeClients: clients.length,
      contentInProduction: contentItems.filter((item) => ["Drafting", "Review", "Scheduled"].includes(item.status)).length,
      partnershipOpportunities: partnerships.filter((item) => ["Prospecting", "Negotiating"].includes(item.status)).length,
      meetingsThisWeek: meetings.filter((meeting) => inRange(parseDate(meeting.meeting_at), weekStart, weekEnd) && meeting.status !== "Cancelled").length,
      aiSystemsInDevelopment: aiSystems.filter((system) => ["Prototype", "Needs Review"].includes(system.status)).length,
      proposalsSubmitted: proposals.filter((proposal) => proposal.status === "Submitted").length
    },
    charts: {
      revenueVsExpenses: buildFinancialSeries(revenue, expenses),
      projectStatusBreakdown: countBy(projects, "status"),
      taskStatusBreakdown: countBy(tasks, "status"),
      contentOutputByPlatform: countContentByPlatform(contentItems),
      proposalPipelineValue: sumByStatus(proposals),
      socialMediaGrowth: buildSocialSeries(socialMediaMetrics)
    },
    tables: {
      projects: projects.slice(0, 5),
      tasks: tasks
        .filter((task) => task.status !== "Done")
        .sort((a, b) => String(a.due_date ?? "").localeCompare(String(b.due_date ?? "")))
        .slice(0, 5)
    }
  };
}

function buildFinancialSeries(revenue: Revenue[], expenses: Expense[]) {
  return lastSixMonths().map(({ label, start, end }) => ({
    month: label,
    revenue: revenue
      .filter((item) => inRange(parseDate(item.received_at ?? item.expected_at), start, end))
      .reduce((sum, item) => sum + Number(item.amount), 0),
    expenses: expenses
      .filter((item) => inRange(parseDate(item.spent_at), start, end))
      .reduce((sum, item) => sum + Number(item.amount), 0)
  }));
}

function countBy<T>(items: T[], key: keyof T) {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    const value = String(item[key] ?? "Unknown");
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });
  return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
}

function countContentByPlatform(items: ContentItem[]) {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    counts.set(item.channel, (counts.get(item.channel) ?? 0) + 1);
  });
  return Array.from(counts.entries()).map(([platform, items]) => ({ platform, items }));
}

function sumByStatus(proposals: Proposal[]) {
  const sums = new Map<string, number>();
  proposals.forEach((proposal) => {
    sums.set(proposal.status, (sums.get(proposal.status) ?? 0) + Number(proposal.value));
  });
  return Array.from(sums.entries()).map(([status, value]) => ({ status, value }));
}

function buildSocialSeries(metrics: SocialMediaMetric[]) {
  const months = lastSixMonths();
  return months.map(({ label, start, end }) => {
    const rows = metrics.filter((metric) => inRange(parseDate(metric.measured_at), start, end));
    return {
      month: label,
      followers: rows.reduce((sum, metric) => sum + Number(metric.followers), 0),
      leads: rows.reduce((sum, metric) => sum + Number(metric.leads), 0)
    };
  });
}

function lastSixMonths() {
  const today = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const start = new Date(today.getFullYear(), today.getMonth() - 5 + index, 1);
    const end = new Date(today.getFullYear(), today.getMonth() - 4 + index, 1);
    return {
      label: start.toLocaleString("en-US", { month: "short" }),
      start,
      end
    };
  });
}

function startOfWeek(date: Date) {
  const start = new Date(date);
  const day = start.getDay();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - day);
  return start;
}

function parseDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function inRange(date: Date | null, start: Date, end: Date) {
  return Boolean(date && date >= start && date < end);
}

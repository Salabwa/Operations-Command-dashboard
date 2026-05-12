export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ProjectStatus = "Planning" | "Active" | "On Hold" | "Completed" | "Cancelled";
export type TaskStatus = "Backlog" | "In Progress" | "Review" | "Done" | "Blocked";
export type ExpenseStatus = "Draft" | "Submitted" | "Approved" | "Paid" | "Rejected";
export type RevenueStatus = "Forecast" | "Invoiced" | "Received" | "Overdue" | "Cancelled";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Client {
  id: string;
  name: string;
  industry: string | null;
  owner: string;
  health: "Excellent" | "Stable" | "At Risk";
  value: number;
  next_touch: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string | null;
  name: string;
  owner: string;
  status: ProjectStatus;
  priority: Priority;
  budget: number;
  spent: number;
  progress: number;
  start_date: string | null;
  due_date: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamTask {
  id: string;
  project_id: string;
  title: string;
  assignee: string | null;
  status: TaskStatus;
  priority: Priority;
  due_date: string | null;
  completed_at: string | null;
  progress: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  project_id: string;
  vendor: string;
  category: string;
  amount: number;
  status: ExpenseStatus;
  spent_at: string;
  receipt_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Revenue {
  id: string;
  project_id: string | null;
  client_id: string;
  source: string;
  amount: number;
  status: RevenueStatus;
  expected_at: string | null;
  received_at: string | null;
  invoice_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  project_id: string | null;
  title: string;
  channel: string;
  owner: string;
  status: "Idea" | "Drafting" | "Review" | "Scheduled" | "Published" | "Archived";
  format: string | null;
  campaign: string | null;
  publish_date: string | null;
  production_cost: number;
  performance_score: number;
  created_at: string;
  updated_at: string;
}

export interface Partnership {
  id: string;
  partner: string;
  type: string;
  owner: string;
  status: "Prospecting" | "Negotiating" | "Active" | "Dormant" | "Closed";
  value: number;
  probability: number;
  start_date: string | null;
  next_step: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialMediaMetric {
  id: string;
  platform: string;
  followers: number;
  impressions: number;
  reach: number;
  engagement_rate: number;
  leads: number;
  spend: number;
  measured_at: string;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  project_id: string | null;
  title: string;
  participants: string | null;
  owner: string;
  status: "Scheduled" | "Completed" | "Follow Up" | "Cancelled";
  meeting_at: string;
  duration_minutes: number;
  decisions: string | null;
  action_items: string | null;
  created_at: string;
  updated_at: string;
}

export interface AISystem {
  id: string;
  name: string;
  owner: string;
  purpose: string;
  status: "Prototype" | "Live" | "Needs Review" | "Paused" | "Retired";
  monthly_cost: number;
  automation_count: number;
  reliability_score: number;
  last_reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  client_id: string;
  title: string;
  owner: string;
  status: "Research" | "Writing" | "Submitted" | "Won" | "Lost" | "Paused";
  value: number;
  probability: number;
  due_date: string | null;
  submitted_at: string | null;
  decision_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

type Insert<T> = Omit<T, "id" | "created_at" | "updated_at">;

export interface Database {
  public: {
    Tables: {
      projects: { Row: Project; Insert: Insert<Project>; Update: Partial<Project> };
      tasks: { Row: TeamTask; Insert: Insert<TeamTask>; Update: Partial<TeamTask> };
      expenses: { Row: Expense; Insert: Insert<Expense>; Update: Partial<Expense> };
      revenue: { Row: Revenue; Insert: Insert<Revenue>; Update: Partial<Revenue> };
      clients: { Row: Client; Insert: Insert<Client>; Update: Partial<Client> };
      content_items: { Row: ContentItem; Insert: Insert<ContentItem>; Update: Partial<ContentItem> };
      partnerships: { Row: Partnership; Insert: Insert<Partnership>; Update: Partial<Partnership> };
      social_media_metrics: { Row: SocialMediaMetric; Insert: Insert<SocialMediaMetric>; Update: Partial<SocialMediaMetric> };
      meetings: { Row: Meeting; Insert: Insert<Meeting>; Update: Partial<Meeting> };
      ai_systems: { Row: AISystem; Insert: Insert<AISystem>; Update: Partial<AISystem> };
      proposals: { Row: Proposal; Insert: Insert<Proposal>; Update: Partial<Proposal> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

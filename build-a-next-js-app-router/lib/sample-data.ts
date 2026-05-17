import type {
  AISystem,
  Client,
  ContentItem,
  Expense,
  Meeting,
  Partnership,
  Project,
  Proposal,
  Revenue,
  SocialMediaMetric,
  TeamTask
} from "@/types/database";

export const projects: Project[] = [];
export const tasks: TeamTask[] = [];
export const expenses: Expense[] = [];
export const revenue: Revenue[] = [];
export const clients: Client[] = [];
export const contentItems: ContentItem[] = [];
export const partnerships: Partnership[] = [];
export const socialMediaMetrics: SocialMediaMetric[] = [];
export const meetings: Meeting[] = [];
export const aiSystems: AISystem[] = [];
export const proposals: Proposal[] = [];

export const monthlyPerformance = [];
export const pipelineMix = [];

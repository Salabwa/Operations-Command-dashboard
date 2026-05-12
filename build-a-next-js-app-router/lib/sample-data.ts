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

const now = "2026-05-12T09:00:00.000Z";

export const projects: Project[] = [
  {
    id: "prj_001",
    client_id: "cli_001",
    name: "Client Operations Portal",
    owner: "Amara",
    status: "Active",
    priority: "High",
    budget: 85000,
    spent: 47200,
    progress: 64,
    start_date: "2026-04-01",
    due_date: "2026-06-18",
    description: "A single operating hub for client delivery and executive reporting.",
    created_at: now,
    updated_at: now
  },
  {
    id: "prj_002",
    client_id: null,
    name: "AI Proposal Engine",
    owner: "David",
    status: "Planning",
    priority: "High",
    budget: 36000,
    spent: 8400,
    progress: 28,
    start_date: "2026-05-06",
    due_date: "2026-07-05",
    description: "AI-assisted proposal drafting, scoring, and review workflow.",
    created_at: now,
    updated_at: now
  },
  {
    id: "prj_003",
    client_id: "cli_002",
    name: "Partner Launch Campaign",
    owner: "Lina",
    status: "Active",
    priority: "Critical",
    budget: 52000,
    spent: 39100,
    progress: 76,
    start_date: "2026-03-25",
    due_date: "2026-05-31",
    description: "Co-marketing campaign for a new partner launch.",
    created_at: now,
    updated_at: now
  },
  {
    id: "prj_004",
    client_id: "cli_003",
    name: "Revenue Intelligence Report",
    owner: "Noah",
    status: "On Hold",
    priority: "Medium",
    budget: 24000,
    spent: 11200,
    progress: 42,
    start_date: "2026-04-18",
    due_date: "2026-06-27",
    description: "Commercial analytics report for revenue planning.",
    created_at: now,
    updated_at: now
  }
];

export const tasks: TeamTask[] = [
  {
    id: "tsk_001",
    project_id: "prj_001",
    title: "Map Supabase schema for project tracker",
    assignee: "Mira",
    status: "In Progress",
    priority: "High",
    due_date: "2026-05-16",
    completed_at: null,
    progress: 55,
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "tsk_002",
    project_id: "prj_004",
    title: "Draft Q2 revenue narrative",
    assignee: "Jon",
    status: "Review",
    priority: "Medium",
    due_date: "2026-05-19",
    completed_at: null,
    progress: 82,
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "tsk_003",
    project_id: "prj_003",
    title: "Publish partner teaser assets",
    assignee: "Lina",
    status: "Backlog",
    priority: "Critical",
    due_date: "2026-05-14",
    completed_at: null,
    progress: 20,
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "tsk_004",
    project_id: "prj_002",
    title: "Build proposal scoring prompt",
    assignee: "David",
    status: "Done",
    priority: "High",
    due_date: "2026-05-10",
    completed_at: "2026-05-10T15:30:00.000Z",
    progress: 100,
    notes: null,
    created_at: now,
    updated_at: now
  }
];

export const expenses: Expense[] = [
  {
    id: "exp_001",
    project_id: "prj_001",
    vendor: "Figma",
    category: "Software",
    amount: 960,
    status: "Paid",
    spent_at: "2026-05-02",
    receipt_url: null,
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "exp_002",
    project_id: "prj_003",
    vendor: "Freelance Motion Studio",
    category: "Creative",
    amount: 6200,
    status: "Approved",
    spent_at: "2026-05-07",
    receipt_url: null,
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "exp_003",
    project_id: "prj_002",
    vendor: "OpenAI",
    category: "AI Systems",
    amount: 1480,
    status: "Submitted",
    spent_at: "2026-05-09",
    receipt_url: null,
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "exp_004",
    project_id: "prj_004",
    vendor: "Data Research Desk",
    category: "Research",
    amount: 2800,
    status: "Draft",
    spent_at: "2026-05-11",
    receipt_url: null,
    notes: null,
    created_at: now,
    updated_at: now
  }
];

export const revenue: Revenue[] = [
  {
    id: "rev_001",
    project_id: "prj_001",
    client_id: "cli_001",
    source: "Implementation Milestone",
    amount: 42000,
    status: "Invoiced",
    expected_at: "2026-05-24",
    received_at: null,
    invoice_number: "INV-2026-041",
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "rev_002",
    project_id: "prj_003",
    client_id: "cli_002",
    source: "Campaign Retainer",
    amount: 18000,
    status: "Received",
    expected_at: "2026-05-08",
    received_at: "2026-05-08",
    invoice_number: "INV-2026-037",
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "rev_003",
    project_id: "prj_004",
    client_id: "cli_003",
    source: "Analytics Report",
    amount: 27000,
    status: "Forecast",
    expected_at: "2026-06-03",
    received_at: null,
    invoice_number: null,
    notes: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "rev_004",
    project_id: "prj_002",
    client_id: "cli_004",
    source: "Proposal Automation Pilot",
    amount: 15000,
    status: "Overdue",
    expected_at: "2026-05-01",
    received_at: null,
    invoice_number: "INV-2026-029",
    notes: null,
    created_at: now,
    updated_at: now
  }
];

export const clients: Client[] = [
  {
    id: "cli_001",
    name: "Northstar Advisory",
    industry: "Professional Services",
    owner: "Amara",
    health: "Excellent",
    value: 125000,
    next_touch: "2026-05-15",
    notes: "Expansion conversation scheduled for Q2.",
    created_at: now,
    updated_at: now
  },
  {
    id: "cli_002",
    name: "Mosaic Labs",
    industry: "Technology",
    owner: "Lina",
    health: "Stable",
    value: 78000,
    next_touch: "2026-05-20",
    notes: "Partner launch campaign is the main account priority.",
    created_at: now,
    updated_at: now
  },
  {
    id: "cli_003",
    name: "Vertex Group",
    industry: "Finance",
    owner: "Noah",
    health: "At Risk",
    value: 54000,
    next_touch: "2026-05-17",
    notes: "Report paused until stakeholder alignment is complete.",
    created_at: now,
    updated_at: now
  },
  {
    id: "cli_004",
    name: "Internal Venture",
    industry: "Innovation",
    owner: "David",
    health: "Stable",
    value: 30000,
    next_touch: "2026-05-22",
    notes: "Pilot revenue tied to proposal automation adoption.",
    created_at: now,
    updated_at: now
  }
];

export const contentItems: ContentItem[] = [
  {
    id: "cnt_001",
    project_id: "prj_003",
    title: "Partner launch announcement",
    channel: "LinkedIn",
    owner: "Lina",
    status: "Scheduled",
    format: "Carousel",
    campaign: "Mosaic Launch",
    publish_date: "2026-05-18",
    production_cost: 1200,
    performance_score: 72,
    created_at: now,
    updated_at: now
  },
  {
    id: "cnt_002",
    project_id: "prj_001",
    title: "Client operations case study",
    channel: "Website",
    owner: "Amara",
    status: "Drafting",
    format: "Article",
    campaign: "Operations Proof",
    publish_date: "2026-05-28",
    production_cost: 850,
    performance_score: 40,
    created_at: now,
    updated_at: now
  },
  {
    id: "cnt_003",
    project_id: null,
    title: "AI proposal writing tips",
    channel: "YouTube",
    owner: "David",
    status: "Review",
    format: "Video",
    campaign: "AI Systems",
    publish_date: "2026-06-04",
    production_cost: 1600,
    performance_score: 55,
    created_at: now,
    updated_at: now
  }
];

export const partnerships: Partnership[] = [
  {
    id: "par_001",
    partner: "Mosaic Labs",
    type: "Co-marketing",
    owner: "Lina",
    status: "Active",
    value: 52000,
    probability: 80,
    start_date: "2026-03-25",
    next_step: "Approve joint launch report.",
    created_at: now,
    updated_at: now
  },
  {
    id: "par_002",
    partner: "Summit Cloud",
    type: "Referral",
    owner: "Noah",
    status: "Negotiating",
    value: 44000,
    probability: 55,
    start_date: "2026-05-01",
    next_step: "Finalize referral terms.",
    created_at: now,
    updated_at: now
  },
  {
    id: "par_003",
    partner: "Civic Data Studio",
    type: "Implementation",
    owner: "Amara",
    status: "Prospecting",
    value: 28000,
    probability: 35,
    start_date: "2026-05-09",
    next_step: "Send capability deck.",
    created_at: now,
    updated_at: now
  }
];

export const socialMediaMetrics: SocialMediaMetric[] = [
  {
    id: "soc_001",
    platform: "LinkedIn",
    followers: 12800,
    impressions: 186000,
    reach: 74000,
    engagement_rate: 4.8,
    leads: 84,
    spend: 1400,
    measured_at: "2026-05-01",
    created_at: now,
    updated_at: now
  },
  {
    id: "soc_002",
    platform: "YouTube",
    followers: 6200,
    impressions: 92000,
    reach: 41000,
    engagement_rate: 5.6,
    leads: 46,
    spend: 900,
    measured_at: "2026-05-01",
    created_at: now,
    updated_at: now
  },
  {
    id: "soc_003",
    platform: "Instagram",
    followers: 9400,
    impressions: 118000,
    reach: 56000,
    engagement_rate: 3.9,
    leads: 31,
    spend: 700,
    measured_at: "2026-05-01",
    created_at: now,
    updated_at: now
  }
];

export const meetings: Meeting[] = [
  {
    id: "mtg_001",
    project_id: "prj_001",
    title: "Northstar implementation review",
    participants: "Amara, Mira, Northstar Ops",
    owner: "Amara",
    status: "Scheduled",
    meeting_at: "2026-05-14T13:00:00.000Z",
    duration_minutes: 45,
    decisions: null,
    action_items: "Confirm reporting fields and rollout owners.",
    created_at: now,
    updated_at: now
  },
  {
    id: "mtg_002",
    project_id: "prj_003",
    title: "Partner launch readiness",
    participants: "Lina, Mosaic Marketing",
    owner: "Lina",
    status: "Follow Up",
    meeting_at: "2026-05-13T10:30:00.000Z",
    duration_minutes: 30,
    decisions: "Keep launch date unchanged.",
    action_items: "Send final social asset list.",
    created_at: now,
    updated_at: now
  }
];

export const aiSystems: AISystem[] = [
  {
    id: "ais_001",
    name: "Proposal Scoring Assistant",
    owner: "David",
    purpose: "Score drafts against buyer priorities and win themes.",
    status: "Prototype",
    monthly_cost: 480,
    automation_count: 3,
    reliability_score: 68,
    last_reviewed_at: "2026-05-06",
    created_at: now,
    updated_at: now
  },
  {
    id: "ais_002",
    name: "Meeting Action Extractor",
    owner: "Mira",
    purpose: "Convert meeting notes into action items and follow-ups.",
    status: "Live",
    monthly_cost: 220,
    automation_count: 6,
    reliability_score: 91,
    last_reviewed_at: "2026-05-09",
    created_at: now,
    updated_at: now
  }
];

export const proposals: Proposal[] = [
  {
    id: "pro_001",
    client_id: "cli_001",
    title: "Northstar expansion proposal",
    owner: "Amara",
    status: "Submitted",
    value: 64000,
    probability: 65,
    due_date: "2026-05-21",
    submitted_at: "2026-05-10",
    decision_at: null,
    notes: "Awaiting procurement review.",
    created_at: now,
    updated_at: now
  },
  {
    id: "pro_002",
    client_id: "cli_003",
    title: "Vertex analytics refresh",
    owner: "Noah",
    status: "Writing",
    value: 38000,
    probability: 45,
    due_date: "2026-05-26",
    submitted_at: null,
    decision_at: null,
    notes: "Needs sharper ROI section.",
    created_at: now,
    updated_at: now
  }
];

export const monthlyPerformance = [
  { month: "Jan", revenue: 52000, expenses: 26000, tasks: 42 },
  { month: "Feb", revenue: 61000, expenses: 31000, tasks: 51 },
  { month: "Mar", revenue: 74000, expenses: 36500, tasks: 58 },
  { month: "Apr", revenue: 68000, expenses: 34800, tasks: 64 },
  { month: "May", revenue: 82000, expenses: 40200, tasks: 73 },
  { month: "Jun", revenue: 96000, expenses: 45500, tasks: 81 }
];

export const pipelineMix = [
  { name: "Projects", value: 42 },
  { name: "Proposals", value: 24 },
  { name: "Partnerships", value: 18 },
  { name: "Content", value: 16 }
];

create extension if not exists pgcrypto;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  owner text not null,
  health text not null default 'Stable'
    check (health in ('Excellent', 'Stable', 'At Risk')),
  value numeric(14, 2) not null default 0 check (value >= 0),
  next_touch date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  name text not null,
  owner text not null,
  status text not null default 'Planning'
    check (status in ('Planning', 'Active', 'On Hold', 'Completed', 'Cancelled')),
  priority text not null default 'Medium'
    check (priority in ('Low', 'Medium', 'High', 'Critical')),
  budget numeric(14, 2) not null default 0 check (budget >= 0),
  spent numeric(14, 2) not null default 0 check (spent >= 0),
  progress numeric(5, 2) not null default 0 check (progress >= 0 and progress <= 100),
  start_date date,
  due_date date,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  assignee text,
  status text not null default 'Backlog'
    check (status in ('Backlog', 'In Progress', 'Review', 'Done', 'Blocked')),
  priority text not null default 'Medium'
    check (priority in ('Low', 'Medium', 'High', 'Critical')),
  progress numeric(5, 2) not null default 0 check (progress >= 0 and progress <= 100),
  due_date date,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  vendor text not null,
  category text not null,
  amount numeric(14, 2) not null default 0 check (amount >= 0),
  status text not null default 'Draft'
    check (status in ('Draft', 'Submitted', 'Approved', 'Paid', 'Rejected')),
  spent_at date not null default current_date,
  receipt_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists revenue (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete set null,
  client_id uuid not null references clients(id) on delete cascade,
  source text not null,
  amount numeric(14, 2) not null default 0 check (amount >= 0),
  status text not null default 'Forecast'
    check (status in ('Forecast', 'Invoiced', 'Received', 'Overdue', 'Cancelled')),
  expected_at date,
  received_at date,
  invoice_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete set null,
  title text not null,
  channel text not null,
  owner text not null,
  status text not null default 'Idea'
    check (status in ('Idea', 'Drafting', 'Review', 'Scheduled', 'Published', 'Archived')),
  format text,
  campaign text,
  publish_date date,
  production_cost numeric(14, 2) not null default 0 check (production_cost >= 0),
  performance_score numeric(5, 2) not null default 0 check (performance_score >= 0 and performance_score <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists partnerships (
  id uuid primary key default gen_random_uuid(),
  partner text not null,
  type text not null,
  owner text not null,
  status text not null default 'Prospecting'
    check (status in ('Prospecting', 'Negotiating', 'Active', 'Dormant', 'Closed')),
  value numeric(14, 2) not null default 0 check (value >= 0),
  probability numeric(5, 2) not null default 25 check (probability >= 0 and probability <= 100),
  start_date date,
  next_step text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists social_media_metrics (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  followers integer not null default 0 check (followers >= 0),
  impressions integer not null default 0 check (impressions >= 0),
  reach integer not null default 0 check (reach >= 0),
  engagement_rate numeric(5, 2) not null default 0 check (engagement_rate >= 0 and engagement_rate <= 100),
  leads integer not null default 0 check (leads >= 0),
  spend numeric(14, 2) not null default 0 check (spend >= 0),
  measured_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, measured_at)
);

create table if not exists meetings (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete set null,
  title text not null,
  participants text,
  owner text not null,
  status text not null default 'Scheduled'
    check (status in ('Scheduled', 'Completed', 'Follow Up', 'Cancelled')),
  meeting_at timestamptz not null,
  duration_minutes integer not null default 30 check (duration_minutes > 0),
  decisions text,
  action_items text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_systems (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner text not null,
  purpose text not null,
  status text not null default 'Prototype'
    check (status in ('Prototype', 'Live', 'Needs Review', 'Paused', 'Retired')),
  monthly_cost numeric(14, 2) not null default 0 check (monthly_cost >= 0),
  automation_count integer not null default 0 check (automation_count >= 0),
  reliability_score numeric(5, 2) not null default 0 check (reliability_score >= 0 and reliability_score <= 100),
  last_reviewed_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  owner text not null,
  status text not null default 'Research'
    check (status in ('Research', 'Writing', 'Submitted', 'Won', 'Lost', 'Paused')),
  value numeric(14, 2) not null default 0 check (value >= 0),
  probability numeric(5, 2) not null default 25 check (probability >= 0 and probability <= 100),
  due_date date,
  submitted_at date,
  decision_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_clients_updated_at on clients;
create trigger set_clients_updated_at before update on clients
for each row execute function set_updated_at();

drop trigger if exists set_projects_updated_at on projects;
create trigger set_projects_updated_at before update on projects
for each row execute function set_updated_at();

drop trigger if exists set_tasks_updated_at on tasks;
create trigger set_tasks_updated_at before update on tasks
for each row execute function set_updated_at();

drop trigger if exists set_expenses_updated_at on expenses;
create trigger set_expenses_updated_at before update on expenses
for each row execute function set_updated_at();

drop trigger if exists set_revenue_updated_at on revenue;
create trigger set_revenue_updated_at before update on revenue
for each row execute function set_updated_at();

drop trigger if exists set_content_items_updated_at on content_items;
create trigger set_content_items_updated_at before update on content_items
for each row execute function set_updated_at();

drop trigger if exists set_partnerships_updated_at on partnerships;
create trigger set_partnerships_updated_at before update on partnerships
for each row execute function set_updated_at();

drop trigger if exists set_social_media_metrics_updated_at on social_media_metrics;
create trigger set_social_media_metrics_updated_at before update on social_media_metrics
for each row execute function set_updated_at();

drop trigger if exists set_meetings_updated_at on meetings;
create trigger set_meetings_updated_at before update on meetings
for each row execute function set_updated_at();

drop trigger if exists set_ai_systems_updated_at on ai_systems;
create trigger set_ai_systems_updated_at before update on ai_systems
for each row execute function set_updated_at();

drop trigger if exists set_proposals_updated_at on proposals;
create trigger set_proposals_updated_at before update on proposals
for each row execute function set_updated_at();

create index if not exists idx_projects_client_id on projects(client_id);
create index if not exists idx_projects_status on projects(status);
create index if not exists idx_tasks_project_id on tasks(project_id);
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_expenses_project_id on expenses(project_id);
create index if not exists idx_revenue_project_id on revenue(project_id);
create index if not exists idx_revenue_client_id on revenue(client_id);
create index if not exists idx_content_items_project_id on content_items(project_id);
create index if not exists idx_meetings_project_id on meetings(project_id);
create index if not exists idx_proposals_client_id on proposals(client_id);
create index if not exists idx_social_media_metrics_platform_date on social_media_metrics(platform, measured_at desc);

import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { Project } from "@/types/database";

const fields: CrudField<Project>[] = [
  { key: "name", label: "Project" },
  { key: "client_id", label: "Client ID" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status", type: "status", options: ["Planning", "Active", "On Hold", "Completed"] },
  { key: "budget", label: "Budget", type: "currency" },
  { key: "spent", label: "Spent", type: "currency" },
  { key: "progress", label: "Progress", type: "progress" },
  { key: "due_date", label: "Due Date", type: "date" }
];

export default async function ProjectsPage() {
  const records = await getTableRows("projects");

  return (
    <>
      <PageHeader title="Projects" description="Track delivery, budget, ownership, status, and completion progress for every active initiative." />
      <CrudManager tableName="projects" title="Project Tracker" description="Manage strategic projects from planning through delivery." initialRecords={records} fields={fields} />
    </>
  );
}

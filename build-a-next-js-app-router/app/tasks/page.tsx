import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { TeamTask } from "@/types/database";

const fields: CrudField<TeamTask>[] = [
  { key: "title", label: "Task" },
  { key: "project_id", label: "Project ID" },
  { key: "assignee", label: "Assignee" },
  { key: "status", label: "Status", type: "status", options: ["Backlog", "In Progress", "Review", "Done"] },
  { key: "priority", label: "Priority", type: "status", options: ["Low", "Medium", "High", "Critical"] },
  { key: "due_date", label: "Due Date", type: "date" },
  { key: "progress", label: "Progress", type: "progress" }
];

export default async function TasksPage() {
  const records = await getTableRows("tasks");

  return (
    <>
      <PageHeader title="Tasks" description="Coordinate ownership, priorities, deadlines, status, and completion across the team." />
      <CrudManager tableName="tasks" title="Task Tracker" description="Manage work items and keep delivery blockers visible." initialRecords={records} fields={fields} />
    </>
  );
}

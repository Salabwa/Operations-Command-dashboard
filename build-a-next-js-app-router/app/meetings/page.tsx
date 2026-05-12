import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { Meeting } from "@/types/database";

const fields: CrudField<Meeting>[] = [
  { key: "title", label: "Meeting" },
  { key: "project_id", label: "Project ID" },
  { key: "participants", label: "Participants" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status", type: "status", options: ["Scheduled", "Completed", "Follow Up", "Cancelled"] },
  { key: "meeting_at", label: "Meeting Date" },
  { key: "duration_minutes", label: "Minutes", type: "number" },
  { key: "decisions", label: "Decisions" },
  { key: "action_items", label: "Action Items" }
];

export default async function MeetingsPage() {
  const records = await getTableRows("meetings");

  return (
    <>
      <PageHeader title="Meetings" description="Organize agendas, participants, decisions, action items, follow-ups, and meeting cadence." />
      <CrudManager tableName="meetings" title="Meetings Module" description="Track meeting schedule, decisions, action items, and owners." initialRecords={records} fields={fields} />
    </>
  );
}

import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { Proposal } from "@/types/database";

const fields: CrudField<Proposal>[] = [
  { key: "title", label: "Proposal" },
  { key: "client_id", label: "Client ID" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status", type: "status", options: ["Research", "Writing", "Submitted", "Won", "Lost", "Paused"] },
  { key: "value", label: "Value", type: "currency" },
  { key: "probability", label: "Probability", type: "progress" },
  { key: "due_date", label: "Due Date", type: "date" },
  { key: "submitted_at", label: "Submitted", type: "date" },
  { key: "decision_at", label: "Decision", type: "date" },
  { key: "notes", label: "Notes" }
];

export default async function ProposalsPage() {
  const records = await getTableRows("proposals");

  return (
    <>
      <PageHeader title="Proposals" description="Manage proposal research, writing, review, submission, value, and win-loss status." />
      <CrudManager tableName="proposals" title="Proposals Module" description="Track proposal stage, value, probability, due date, and outcome timing." initialRecords={records} fields={fields} />
    </>
  );
}

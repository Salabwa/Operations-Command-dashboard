import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { AISystem } from "@/types/database";

const fields: CrudField<AISystem>[] = [
  { key: "name", label: "System" },
  { key: "owner", label: "Owner" },
  { key: "purpose", label: "Purpose" },
  { key: "status", label: "Status", type: "status", options: ["Prototype", "Live", "Needs Review", "Paused", "Retired"] },
  { key: "monthly_cost", label: "Monthly Cost", type: "currency" },
  { key: "automation_count", label: "Automations", type: "number" },
  { key: "reliability_score", label: "Reliability", type: "progress" },
  { key: "last_reviewed_at", label: "Last Reviewed", type: "date" }
];

export default async function AISystemsPage() {
  const records = await getTableRows("ai_systems");

  return (
    <>
      <PageHeader title="AI Systems" description="Govern AI tools, owners, workflows, monthly cost, review status, and operating impact." />
      <CrudManager tableName="ai_systems" title="AI Systems Module" description="Manage AI systems, reliability, automation footprint, and review cadence." initialRecords={records} fields={fields} />
    </>
  );
}

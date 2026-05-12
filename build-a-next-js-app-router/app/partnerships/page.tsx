import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { Partnership } from "@/types/database";

const fields: CrudField<Partnership>[] = [
  { key: "partner", label: "Partner" },
  { key: "type", label: "Type" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status", type: "status", options: ["Prospecting", "Negotiating", "Active", "Dormant", "Closed"] },
  { key: "value", label: "Value", type: "currency" },
  { key: "probability", label: "Probability", type: "progress" },
  { key: "start_date", label: "Start Date", type: "date" },
  { key: "next_step", label: "Next Step" }
];

export default async function PartnershipsPage() {
  const records = await getTableRows("partnerships");

  return (
    <>
      <PageHeader title="Partnerships" description="Track partnership pipeline, deal stage, strategic value, owners, and activation plans." />
      <CrudManager tableName="partnerships" title="Partnerships Module" description="Manage partner opportunities, probability, value, and next steps." initialRecords={records} fields={fields} />
    </>
  );
}

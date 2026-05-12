import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { Revenue } from "@/types/database";

const fields: CrudField<Revenue>[] = [
  { key: "source", label: "Source" },
  { key: "client_id", label: "Client ID" },
  { key: "project_id", label: "Project ID" },
  { key: "amount", label: "Amount", type: "currency" },
  { key: "status", label: "Status", type: "status", options: ["Forecast", "Invoiced", "Received", "Overdue"] },
  { key: "expected_at", label: "Expected Date", type: "date" }
];

export default async function RevenuePage() {
  const records = await getTableRows("revenue");

  return (
    <>
      <PageHeader title="Revenue" description="Track expected, invoiced, received, and overdue revenue across clients and project workstreams." />
      <CrudManager tableName="revenue" title="Revenue Tracker" description="Manage revenue records and forecast cash timing." initialRecords={records} fields={fields} />
    </>
  );
}

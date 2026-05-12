import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { Client } from "@/types/database";

const fields: CrudField<Client>[] = [
  { key: "name", label: "Client" },
  { key: "industry", label: "Industry" },
  { key: "owner", label: "Owner" },
  { key: "health", label: "Health", type: "status", options: ["Excellent", "Stable", "At Risk"] },
  { key: "value", label: "Account Value", type: "currency" },
  { key: "next_touch", label: "Next Touch", type: "date" },
  { key: "notes", label: "Notes" }
];

export default async function ClientsPage() {
  const records = await getTableRows("clients");

  return (
    <>
      <PageHeader title="Clients" description="Manage accounts, relationship health, owners, touchpoints, and commercial value." />
      <CrudManager tableName="clients" title="Clients Module" description="Track account ownership, value, relationship health, and next actions." initialRecords={records} fields={fields} />
    </>
  );
}

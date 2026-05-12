import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { Expense } from "@/types/database";

const fields: CrudField<Expense>[] = [
  { key: "vendor", label: "Vendor" },
  { key: "category", label: "Category" },
  { key: "project_id", label: "Project ID" },
  { key: "amount", label: "Amount", type: "currency" },
  { key: "status", label: "Status", type: "status", options: ["Draft", "Submitted", "Approved", "Paid"] },
  { key: "spent_at", label: "Spent Date", type: "date" }
];

export default async function ExpensesPage() {
  const records = await getTableRows("expenses");

  return (
    <>
      <PageHeader title="Expenses" description="Review operating spend by vendor, project, category, approval state, and payment status." />
      <CrudManager tableName="expenses" title="Expenses Tracker" description="Manage spend requests and keep approval flow visible." initialRecords={records} fields={fields} />
    </>
  );
}

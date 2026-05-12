import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { ContentItem } from "@/types/database";

const fields: CrudField<ContentItem>[] = [
  { key: "title", label: "Title" },
  { key: "project_id", label: "Project ID" },
  { key: "channel", label: "Channel" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status", type: "status", options: ["Idea", "Drafting", "Review", "Scheduled", "Published", "Archived"] },
  { key: "format", label: "Format" },
  { key: "campaign", label: "Campaign" },
  { key: "publish_date", label: "Publish Date", type: "date" },
  { key: "production_cost", label: "Cost", type: "currency" },
  { key: "performance_score", label: "Score", type: "progress" }
];

export default async function ContentPage() {
  const records = await getTableRows("content_items");

  return (
    <>
      <PageHeader title="Content" description="Plan content creation across channels, owners, statuses, publishing dates, and campaign themes." />
      <CrudManager tableName="content_items" title="Content Module" description="Manage production status, publishing channel, budget, and performance score." initialRecords={records} fields={fields} />
    </>
  );
}

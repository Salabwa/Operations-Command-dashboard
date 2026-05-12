import { CrudManager, type CrudField } from "@/components/crud-manager";
import { PageHeader } from "@/components/page-header";
import { getTableRows } from "@/lib/table-data";
import type { SocialMediaMetric } from "@/types/database";

const fields: CrudField<SocialMediaMetric>[] = [
  { key: "platform", label: "Platform" },
  { key: "followers", label: "Followers", type: "number" },
  { key: "impressions", label: "Impressions", type: "number" },
  { key: "reach", label: "Reach", type: "number" },
  { key: "engagement_rate", label: "Engagement", type: "progress" },
  { key: "leads", label: "Leads", type: "number" },
  { key: "spend", label: "Spend", type: "currency" },
  { key: "measured_at", label: "Measured At", type: "date" }
];

export default async function SocialMediaPage() {
  const records = await getTableRows("social_media_metrics");

  return (
    <>
      <PageHeader title="Social Media" description="Monitor platform growth, engagement, leads, campaign performance, and audience trends." />
      <CrudManager tableName="social_media_metrics" title="Social Media Module" description="Track platform metrics, spend, engagement, reach, and leads." initialRecords={records} fields={fields} />
    </>
  );
}

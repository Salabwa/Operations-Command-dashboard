import { PageHeader } from "@/components/page-header";
import { ReportExporter } from "@/components/report-exporter";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function ReportsPage() {
  const data = await getDashboardData();

  return (
    <>
      <PageHeader title="Reports" description="Export operating summaries for KPIs, finance, project status, task status, content, proposals, and social growth." />
      <ReportExporter data={data} />
    </>
  );
}

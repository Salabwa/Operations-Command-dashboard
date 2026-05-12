import { ComingSection } from "@/components/coming-section";

export default function SettingsPage() {
  return <ComingSection title="Settings" description="Configure workspace preferences, Supabase connection details, teams, statuses, and dashboard modules." focus={["Workspace Profile", "Supabase Setup", "Module Settings"]} />;
}

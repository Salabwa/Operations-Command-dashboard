import {
  aiSystems,
  clients,
  contentItems,
  expenses,
  meetings,
  partnerships,
  projects,
  proposals,
  revenue,
  socialMediaMetrics,
  tasks
} from "@/lib/sample-data";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type Tables = Database["public"]["Tables"];
type TableName = keyof Tables;
type Row<T extends TableName> = Tables[T]["Row"];

const fallbackRows = {
  projects,
  tasks,
  expenses,
  revenue,
  clients,
  content_items: contentItems,
  partnerships,
  social_media_metrics: socialMediaMetrics,
  meetings,
  ai_systems: aiSystems,
  proposals
} satisfies { [K in TableName]: Row<K>[] };

export async function getTableRows<T extends TableName>(table: T): Promise<Row<T>[]> {
  if (!supabase) return fallbackRows[table];

  const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
  if (error) return fallbackRows[table];
  return (data ?? fallbackRows[table]) as Row<T>[];
}

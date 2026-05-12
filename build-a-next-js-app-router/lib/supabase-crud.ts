import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type Tables = Database["public"]["Tables"];
type TableName = keyof Tables;
type Row<T extends TableName> = Tables[T]["Row"];
type Insert<T extends TableName> = Tables[T]["Insert"];
type Update<T extends TableName> = Tables[T]["Update"];

export async function listRecords<T extends TableName>(table: T) {
  if (!supabase) return [] as Row<T>[];
  const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Row<T>[];
}

export async function createRecord<T extends TableName>(table: T, record: Insert<T>) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.from(table).insert(record).select("*").single();
  if (error) throw error;
  return data as Row<T>;
}

export async function updateRecord<T extends TableName>(table: T, id: string, record: Update<T>) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.from(table).update(record).eq("id", id).select("*").single();
  if (error) throw error;
  return data as Row<T>;
}

export async function deleteRecord<T extends TableName>(table: T, id: string) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

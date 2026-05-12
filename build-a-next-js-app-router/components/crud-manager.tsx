"use client";

import { Eye, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { currency } from "@/lib/utils";
import type { Database } from "@/types/database";

type FieldType = "text" | "number" | "date" | "status" | "currency" | "progress";
type TableName = keyof Database["public"]["Tables"];
type SaveResult = Promise<{ data: unknown; error: Error | null }>;
type DeleteResult = Promise<{ error: Error | null }>;
type SupabaseTableAdapter = {
  insert: (value: Record<string, unknown>) => { select: (columns: string) => { single: () => SaveResult } };
  update: (value: Record<string, unknown>) => { eq: (column: string, value: string) => { select: (columns: string) => { single: () => SaveResult } } };
  delete: () => { eq: (column: string, value: string) => DeleteResult };
};

export interface CrudField<T> {
  key: keyof T & string;
  label: string;
  type?: FieldType;
  options?: string[];
}

export function CrudManager<T extends { id: string; created_at: string }>({
  title,
  description,
  initialRecords,
  fields,
  tableName
}: {
  title: string;
  description: string;
  initialRecords: T[];
  fields: CrudField<T>[];
  tableName?: TableName;
}) {
  const [records, setRecords] = useState<T[]>(initialRecords);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [active, setActive] = useState<T | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "add" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const statusField = fields.find((field) => field.type === "status");
  const statusOptions = statusField?.options ?? [];

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const haystack = Object.values(record).join(" ").toLowerCase();
      const queryMatch = haystack.includes(query.toLowerCase());
      const statusMatch = status === "All" || String(record[statusField?.key as keyof T]) === status;
      return queryMatch && statusMatch;
    });
  }, [query, records, status, statusField?.key]);

  function openAdd() {
    const seed = fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.key]:
          field.options?.[0] ??
          (field.type === "number" || field.type === "currency" || field.type === "progress" ? 0 : "")
      }),
      { id: `tmp_${Date.now()}`, created_at: new Date().toISOString() }
    ) as T;
    setActive(seed);
    setMode("add");
  }

  async function saveRecord() {
    if (!active) return;
    setErrorMessage("");
    try {
      let saved = active;
      if (isSupabaseConfigured && supabase && tableName) {
        const payload = Object.fromEntries(Object.entries(active).filter(([key]) => key !== "id" && key !== "created_at" && key !== "updated_at"));
        const table = supabase.from(tableName) as unknown as SupabaseTableAdapter;
        const saveQuery =
          mode === "add"
            ? table.insert(payload).select("*").single()
            : table.update(payload).eq("id", active.id).select("*").single();
        const { data, error } = await saveQuery;
        if (error) throw error;
        saved = data as T;
      }
      setRecords((current) => (mode === "add" ? [saved, ...current] : current.map((record) => (record.id === saved.id ? saved : record))));
      setActive(null);
      setMode(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save this record.");
    }
  }

  async function deleteRecord(id: string) {
    setErrorMessage("");
    try {
      if (isSupabaseConfigured && supabase && tableName) {
        const table = supabase.from(tableName) as unknown as SupabaseTableAdapter;
        const { error } = await table.delete().eq("id", id);
        if (error) throw error;
      }
      setRecords((current) => current.filter((record) => record.id !== id));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to delete this record.");
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search records" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          {statusField ? (
            <Select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>All</option>
              {statusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          ) : null}
        </div>
        {errorMessage ? <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</div> : null}

        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {fields.map((field) => (
                  <TableHead key={field.key}>{field.label}</TableHead>
                ))}
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  {fields.map((field) => (
                    <TableCell key={field.key}>{renderCell(record[field.key], field.type)}</TableCell>
                  ))}
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="View" onClick={() => { setActive(record); setMode("view"); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit" onClick={() => { setActive(record); setMode("edit"); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => deleteRecord(record.id)}>
                        <Trash2 className="h-4 w-4 text-rose-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {active && mode ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/40 p-4">
          <div className="w-full max-w-2xl rounded-lg border bg-white shadow-soft">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h3 className="text-lg font-semibold">{mode === "add" ? "Add Record" : mode === "edit" ? "Edit Record" : "Record Details"}</h3>
                <p className="text-sm text-muted-foreground">{title}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { setActive(null); setMode(null); }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              {fields.map((field) => (
                <label key={field.key} className="space-y-2 text-sm font-medium">
                  {field.label}
                  {mode === "view" ? (
                    <div className="min-h-10 rounded-md border bg-muted/40 px-3 py-2 font-normal">{renderPlain(active[field.key], field.type)}</div>
                  ) : field.options ? (
                    <Select value={String(active[field.key] ?? "")} onChange={(event) => setActive({ ...active, [field.key]: event.target.value })}>
                      {field.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      type={field.type === "number" || field.type === "currency" || field.type === "progress" ? "number" : field.type === "date" ? "date" : "text"}
                      value={String(active[field.key] ?? "")}
                      onChange={(event) =>
                        setActive({
                          ...active,
                          [field.key]:
                            field.type === "number" || field.type === "currency" || field.type === "progress"
                              ? Number(event.target.value)
                              : event.target.value
                        })
                      }
                    />
                  )}
                </label>
              ))}
            </div>
            {mode !== "view" ? (
              <div className="flex justify-end gap-2 border-t p-5">
                <Button variant="outline" onClick={() => { setActive(null); setMode(null); }}>Cancel</Button>
                <Button onClick={saveRecord}>Save Record</Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </Card>
  );
}

function renderCell(value: unknown, type?: FieldType) {
  if (type === "status") return <StatusBadge value={String(value)} />;
  if (type === "currency") return <span className="font-medium">{currency(Number(value))}</span>;
  if (type === "progress") {
    return (
      <div className="min-w-32 space-y-1">
        <div className="text-xs font-medium">{value}%</div>
        <Progress value={Number(value)} />
      </div>
    );
  }
  return <span>{renderPlain(value, type)}</span>;
}

function renderPlain(value: unknown, type?: FieldType) {
  if (type === "currency") return currency(Number(value));
  return String(value ?? "");
}

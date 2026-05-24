"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { JobOpening } from "@/lib/jobs";

type JobFormState = {
  title: string;
  location: string;
  employment_type: string;
  summary: string;
  published: boolean;
  sort_order: number;
};

const emptyForm: JobFormState = {
  title: "",
  location: "",
  employment_type: "Full-time",
  summary: "",
  published: true,
  sort_order: 0,
};

export function JobsManager() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JobFormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/jobs");
      const data = (await res.json()) as { jobs?: JobOpening[]; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not load jobs.");
        setJobs([]);
        return;
      }
      setJobs(data.jobs ?? []);
    } catch {
      setError("Network error.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setDialogOpen(true);
  }

  function openEdit(job: JobOpening) {
    setEditingId(job.id);
    setForm({
      title: job.title,
      location: job.location,
      employment_type: job.employment_type,
      summary: job.summary,
      published: job.published,
      sort_order: job.sort_order,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = editingId ? `/api/admin/jobs/${editingId}` : "/api/admin/jobs";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Could not save job.");
        return;
      }

      setDialogOpen(false);
      await load();
    } catch {
      setError("Network error while saving.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this job posting?")) return;

    setError(null);
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not delete job.");
        return;
      }
      await load();
    } catch {
      setError("Network error while deleting.");
    }
  }

  async function togglePublished(job: JobOpening) {
    setError(null);
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !job.published }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not update job.");
        return;
      }
      await load();
    } catch {
      setError("Network error.");
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Job openings</CardTitle>
          <CardDescription>
            Published jobs appear on the public careers page.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
            <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
          </Button>
          <Button size="sm" onClick={openCreate}>
            <Plus className="size-4" data-icon="inline-start" />
            Add job
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit job" : "New job"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="job-title">
                    Title
                  </label>
                  <Input
                    id="job-title"
                    required
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="job-location">
                    Location
                  </label>
                  <Input
                    id="job-location"
                    required
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="job-type">
                    Employment type
                  </label>
                  <Input
                    id="job-type"
                    required
                    placeholder="Full-time, Contract, etc."
                    value={form.employment_type}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, employment_type: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="job-summary">
                    Summary
                  </label>
                  <Textarea
                    id="job-summary"
                    required
                    rows={4}
                    value={form.summary}
                    onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="job-sort">
                      Sort order
                    </label>
                    <Input
                      id="job-sort"
                      type="number"
                      value={form.sort_order}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          sort_order: Number.parseInt(e.target.value, 10) || 0,
                        }))
                      }
                    />
                  </div>
                  <label className="flex items-end gap-2 pb-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, published: e.target.checked }))
                      }
                      className="size-4 rounded border-input"
                    />
                    Published on careers page
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? "Saving…" : editingId ? "Save changes" : "Create job"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {!error && !loading && jobs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No jobs yet. Add one or run supabase/job_openings.sql to seed defaults.
          </p>
        )}

        {jobs.map((job) => (
          <article
            key={job.id}
            className="rounded-xl border border-border/80 bg-background p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{job.title}</h3>
                  <Badge variant={job.published ? "default" : "outline"}>
                    {job.published ? "Published" : "Hidden"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.employment_type} · {job.location}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(job)}>
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void togglePublished(job)}
                >
                  {job.published ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => void handleDelete(job.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}

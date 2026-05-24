"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Lead = {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
  created_at: string;
};

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/leads");
      const data = (await res.json()) as { leads?: Lead[]; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not load leads.");
        setLeads([]);
        return;
      }
      setLeads(data.leads ?? []);
    } catch {
      setError("Network error.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Contact leads</CardTitle>
          <CardDescription>
            Submissions from the contact form. Newest first.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
          <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {!error && !loading && leads.length === 0 && (
          <p className="text-sm text-muted-foreground">No submissions yet.</p>
        )}

        {leads.map((lead) => (
          <article
            key={lead.id}
            className="rounded-xl border border-border/80 bg-background p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{lead.full_name}</p>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
                {lead.company && (
                  <p className="mt-1 text-sm text-muted-foreground">{lead.company}</p>
                )}
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {new Date(lead.created_at).toLocaleString()}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{lead.service}</Badge>
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${lead.email}`}>
                  <Mail className="size-4" data-icon="inline-start" />
                  Reply
                </a>
              </Button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{lead.message}</p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}

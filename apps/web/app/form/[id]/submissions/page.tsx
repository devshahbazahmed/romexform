"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useGetSubmissionsByFormId } from "~/hooks/api/form-submission";
import { useGetFields } from "~/hooks/api/form-field";
import { ArrowLeft, Database, ShieldCheck } from "lucide-react";

type Submission = {
  id: string;
  formId?: string | null;
  values?: { fieldId: string; value: string }[] | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export default function FormSubmissionsPage() {
  const params = useParams();
  const formId = params?.id as string | undefined;

  const { submissions, isLoading: subsLoading, error } = useGetSubmissionsByFormId(formId ?? "");

  const { fields, isLoading: fieldsLoading } = useGetFields(formId ?? "");

  const rows = useMemo(() => {
    return (submissions ?? []) as Submission[];
  }, [submissions]);

  const orderedFields = useMemo(() => {
    return [...(fields ?? [])].sort((a, b) => parseFloat(a.index) - parseFloat(b.index));
  }, [fields]);

  const loading = subsLoading || fieldsLoading;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="text-sm text-slate-400 animate-pulse">Loading submissions...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-300">
          Failed to load submissions
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* background glows */}
      <div className="absolute left-[-120px] bottom-[-120px] h-[300px] w-[300px] rounded-full bg-blue-500 blur-[140px] opacity-30" />
      <div className="absolute right-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-blue-500 blur-[120px] opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-indigo-300">
            <Database className="h-5 w-5" />
            <span className="font-semibold tracking-wide">RomexForms</span>
          </div>

          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            High Performance Response System
          </p>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-100">
            Form Submissions
          </h1>

          <p className="mt-2 text-sm text-slate-400">View all collected responses for this form</p>
        </div>

        {/* Main card */}
        <div className="rounded-3xl border border-white/10 bg-slate-950/50 backdrop-blur-xl shadow-2xl">
          {/* top stats */}
          <div className="flex flex-col gap-4 border-b border-white/5 px-8 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Total Responses</p>

              <p className="mt-2 text-3xl font-semibold text-white">{rows.length}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              Responses are encrypted
            </div>
          </div>

          {/* table */}
          {rows.length === 0 ? (
            <div className="px-8 py-20 text-center">
              <p className="text-lg text-slate-300">No submissions yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Responses will appear here once users submit the form.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/5 bg-white/[0.02]">
                  <tr>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Submission ID
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                      Submitted At
                    </th>

                    {orderedFields.map((field) => (
                      <th
                        key={field.id}
                        className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500"
                      >
                        {field.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-6 py-5 text-xs text-slate-400">
                        <span className="font-mono">{row.id.slice(0, 12)}...</span>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-300 whitespace-nowrap">
                        {row.createdAt ? new Date(row.createdAt).toLocaleString() : "-"}
                      </td>

                      {orderedFields.map((field) => {
                        const value = row.values?.find((v) => v.fieldId === field.id);

                        return (
                          <td key={field.id} className="max-w-xs px-6 py-5 text-sm text-slate-200">
                            <div className="truncate">{value?.value || "-"}</div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* footer */}
          <div className="flex items-center justify-between border-t border-white/5 px-8 py-5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to form editor
            </div>

            <div>RomexForms Analytics</div>
          </div>
        </div>
      </div>
    </main>
  );
}

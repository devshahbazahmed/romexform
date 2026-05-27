"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";

import { useGetFormWithFields } from "~/hooks/api/form";
import { useCreateSubmission } from "~/hooks/api/form-submission";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function PublicFormPage() {
  const params = useParams();
  const formId = params?.id as string | undefined;

  const { form, isLoading } = useGetFormWithFields(formId ?? "");
  const { createSubmissionAsync, status, error } = useCreateSubmission();

  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!form?.fields) return;

    const initial: Record<string, string> = {};

    for (const field of form.fields) {
      initial[field.id] = "";
    }

    setValues(initial);
  }, [form?.fields]);

  const handleChange = (fieldId: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formId) return;

    await createSubmissionAsync({
      formId,
      values: Object.entries(values).map(([fieldId, value]) => ({
        fieldId,
        value,
      })),
    });

    setSubmitted(true);

    setValues((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, ""])));
  };

  const completedCount = Object.values(values).filter(Boolean).length;
  const totalFields = form?.fields.length ?? 0;

  const progressPct = totalFields > 0 ? Math.round((completedCount / totalFields) * 100) : 0;

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#0d1117_0%,#0f1923_50%,#0d1117_100%)] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#7c6af7]" />
          <p className="text-sm tracking-wide text-white/40">Loading form…</p>
        </div>
      </main>
    );
  }

  if (!form) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#0d1117_0%,#0f1923_50%,#0d1117_100%)] px-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <div className="mb-4 text-5xl">⚠</div>

          <h2 className="mb-2 text-xl font-semibold">Form not found</h2>

          <p className="text-sm text-white/40">
            This form may have been removed or the link is invalid.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#0d1117_0%,#0f1923_60%,#0d1117_100%)] px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-[640px]">
        {/* Card */}
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="border-b border-white/5 bg-gradient-to-b from-[#7c6af7]/5 to-transparent px-9 py-8">
            <div className="mb-5 flex items-start justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{form.title}</h1>

                {form.description ? (
                  <p className="mt-2 text-sm leading-6 text-white/45">{form.description}</p>
                ) : null}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-center">
                <div className="font-mono text-xl font-medium">{totalFields}</div>

                <div className="mt-1 text-[10px] tracking-widest text-white/35">FIELDS</div>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <span className="min-w-[36px] text-right font-mono text-xs text-white/35">
                {progressPct}%
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-9 py-8">
            {submitted && (
              <div className="mb-7 flex items-center gap-4 rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-500/30 bg-green-500/15 text-sm text-green-400">
                  ✓
                </div>

                <div>
                  <div className="text-sm font-semibold text-green-400">Submission received</div>

                  <div className="text-xs text-white/40">
                    Your response has been recorded successfully.
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {form.fields.map((f) => (
                <div key={f.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label
                      className={`text-sm font-medium transition-colors ${
                        focusedField === f.id ? "text-blue-500" : "text-white/75"
                      }`}
                    >
                      {f.label}
                    </label>

                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/25">
                      {f.type.replace("_", " ")}
                    </span>

                    {values[f.id] && <span className="ml-auto text-xs text-green-400">✓</span>}
                  </div>

                  {["TEXT", "NUMBER", "EMAIL", "PASSWORD"].includes(f.type) && (
                    <Input
                      type={f.type === "TEXT" ? "text" : f.type.toLowerCase()}
                      value={values[f.id] ?? ""}
                      placeholder={f.placeholder ?? ""}
                      onFocus={() => setFocusedField(f.id)}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => handleChange(f.id, e.target.value)}
                      className="h-11 rounded-[10px] border-white/10 bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-blue-800 focus-visible:ring-blue-900"
                    />
                  )}

                  {f.type === "YES_NO" && (
                    <div className="flex gap-3">
                      {[
                        { label: "Yes", value: "true" },
                        { label: "No", value: "false" },
                      ].map((opt) => {
                        const selected = values[f.id] === opt.value;

                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleChange(f.id, opt.value)}
                            className={`flex-1 rounded-[10px] border py-2.5 text-sm transition-all ${
                              selected
                                ? "border-blue-800 bg-blue-900 font-semibold text-blue-500 shadow-[0_0_0_3px_rgba(124,106,247,0.12)]"
                                : "border-white/10 bg-white/[0.03] text-white/50"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {f.description ? (
                    <p className="text-xs leading-5 text-white/30">{f.description}</p>
                  ) : null}
                </div>
              ))}

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error.message}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                <span className="text-xs text-white/25">
                  {completedCount} of {totalFields} completed
                </span>

                <Button
                  type="submit"
                  disabled={status === "pending"}
                  className="rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-800 px-8 text-white hover:shadow-[0_8px_24px_rgba(124,106,247,0.4)] cursor-pointer hover:scale-110 active:scale-95"
                >
                  {status === "pending" ? "Submitting…" : "Submit Response"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

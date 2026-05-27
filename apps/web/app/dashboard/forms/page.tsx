"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, PencilLine, Plus, Search, FileText, Calendar } from "lucide-react";

import { useCreateForm, useListForms } from "~/hooks/api/form";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export default function DashboardFormsPage() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const { createFormAsync, error, status } = useCreateForm();
  const { forms, isLoading } = useListForms();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = await createFormAsync({
      title: title.trim(),
      description: description.trim() || undefined,
    });

    setOpen(false);
    setTitle("");
    setDescription("");

    return form;
  };

  const filteredForms =
    forms?.filter((form) => form.title.toLowerCase().includes(search.toLowerCase())) ?? [];

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,#13224f_0%,#020817_60%)]" />

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Dashboard</p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight">Your Forms</h1>

              <p className="mt-3 max-w-xl text-slate-400">
                Build, edit and manage forms across your workspace.
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-800 cursor-pointer active:scale-95 hover:scale-110">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Form
                </Button>
              </DialogTrigger>

              <DialogContent className="border-white/10 bg-[#091224] text-white sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Form</DialogTitle>

                  <DialogDescription className="text-slate-400">
                    Add a title and optional description.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm text-slate-300">
                      Title
                    </label>

                    <Input
                      id="title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Anime Poll 2024"
                      className="border-white/10 bg-white/[0.03]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm text-slate-300">
                      Description
                    </label>

                    <Textarea
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Describe your form..."
                      className="min-h-28 border-white/10 bg-white/[0.03]"
                    />
                  </div>

                  {error ? <p className="text-sm text-red-400">{error.message}</p> : null}

                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={title.trim().length === 0 || status === "pending"}
                      className="w-full bg-blue-600 hover:bg-blue-800 cursor-pointer active:scale-95"
                    >
                      {status === "pending" ? "Creating..." : "Create Form"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative mt-10 max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search forms..."
              className="pl-11 border-white/10 bg-white/[0.03]"
            />
          </div>

          {/* Forms */}
          <section className="mt-10">
            {isLoading ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-slate-400">
                Loading forms...
              </div>
            ) : filteredForms.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredForms.map((form) => (
                  <motion.article
                    key={form.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                  >
                    <div className="mb-6 inline-flex rounded-xl bg-white/5 p-3 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>

                    <h2 className="text-xl font-semibold">{form.title}</h2>

                    <p className="mt-3 min-h-[48px] text-sm leading-7 text-slate-400">
                      {form.description || "No description provided"}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="h-4 w-4" />

                        {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : ""}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          asChild
                          size="icon"
                          variant="outline"
                          className="border-white/10 bg-white/5 hover:bg-white/10"
                        >
                          <Link href={`/form/${form.id}/submissions`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          asChild
                          size="icon"
                          variant="outline"
                          className="border-white/10 bg-white/5 hover:bg-white/10"
                        >
                          <Link href={`/dashboard/forms/${form.id}`}>
                            <PencilLine className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-14 text-center">
                <p className="text-lg text-slate-300">No forms yet</p>

                <p className="mt-2 text-sm text-slate-500">
                  Create your first form to get started.
                </p>

                <Button
                  onClick={() => setOpen(true)}
                  className="mt-6 bg-blue-600 hover:bg-blue-800 cursor-pointer active:scale-95 hover:scale-110"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Form
                </Button>
              </div>
            )}
          </section>
        </motion.div>
      </section>
    </main>
  );
}

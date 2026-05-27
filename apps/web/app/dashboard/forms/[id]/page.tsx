"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useParams } from "next/navigation";
import {
  Plus,
  Type,
  Hash,
  Mail,
  Lock,
  CheckSquare,
  GripVertical,
  Calendar,
  List,
  Star,
} from "lucide-react";

import { useCreateField, useGetFields } from "~/hooks/api/form-field";

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
import { Checkbox } from "~/components/ui/checkbox";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function SortableFieldCard({
  field,
}: {
  field: {
    id: string;
    label: string;
    description?: string | null;
    placeholder?: string | null;
    type: string;
  };
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 rounded-xl border border-white/5 bg-[#101733] p-5 transition ${
        isDragging ? "opacity-60 shadow-2xl" : ""
      }`}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-4 w-4 text-white/20" />
      </button>

      <div className="flex-1">
        <p className="font-medium text-white">{field.label}</p>

        {(field.description || field.placeholder) && (
          <p className="mt-1 text-sm text-white/40">{field.description || field.placeholder}</p>
        )}
      </div>

      <span className="rounded-md bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-[#B6BCFF]">
        {field.type}
      </span>
    </div>
  );
}

export default function FormBuilder() {
  const params = useParams();
  const formId = params?.id as string | undefined;

  const [orderedFields, setOrderedFields] = useState<typeof fields>([]);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [type, setType] = useState<
    "TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD" | "SELECT" | "DATE" | "RATING"
  >("TEXT");
  const [description, setDescription] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const { createFieldAsync, status, error } = useCreateField(formId ?? "");
  const { fields, isLoading: fieldsLoading } = useGetFields(formId ?? "");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formId) return;

    await createFieldAsync({
      label: label.trim(),
      type,
      formId,
      description: description.trim() || undefined,
      placeholder: placeholder.trim() || undefined,
      isRequired,
    });

    setOpen(false);
    setLabel("");
    setType("TEXT");
    setDescription("");
    setPlaceholder("");
    setIsRequired(false);
  };

  const fieldTypes = [
    { icon: Type, label: "Text", value: "TEXT" },
    { icon: Hash, label: "Number", value: "NUMBER" },
    { icon: Mail, label: "Email", value: "EMAIL" },
    { icon: CheckSquare, label: "Yes / No", value: "YES_NO" },
    { icon: Lock, label: "Password", value: "PASSWORD" },
    { icon: List, label: "Select", value: "SELECT" },
    { icon: Calendar, label: "Date", value: "DATE" },
    { icon: Star, label: "Rating", value: "RATING" },
  ];

  useEffect(() => {
    if (fields) {
      setOrderedFields(fields);
    }
  }, [fields]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setOrderedFields((items) => {
      if (!items) return [];

      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });

    /**
   Optional:
   Persist ordering to DB here.
   Example:
   await updateFieldOrderMutation(...)
   */
  };
  return (
    <main className="min-h-screen bg-[#050816] text-[#E6E8F0]">
      <div className="grid min-h-screen grid-cols-[260px_1fr_320px]">
        {/* LEFT SIDEBAR */}
        <aside className="border-r border-white/5 bg-[#070b1d] p-6">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[#C7C9FF]">RomexForms</h2>
            <p className="mt-1 text-sm text-white/40">Enterprise Suite</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mb-8 w-full bg-blue-600 text-white hover:bg-blue-800 cursor-pointer active:scale-95 hover:scale-110">
                <Plus className="mr-2 h-4 w-4" />
                Create Field
              </Button>
            </DialogTrigger>

            <DialogContent className="border-white/10 bg-[#0A1024] text-white">
              <DialogHeader>
                <DialogTitle>Create Field</DialogTitle>
                <DialogDescription className="text-white/50">
                  Add a field to your form
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Field label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="border-white/10 bg-white/5"
                />

                <select
                  value={type}
                  onChange={(e) =>
                    setType(
                      e.target.value as
                        | "TEXT"
                        | "NUMBER"
                        | "EMAIL"
                        | "YES_NO"
                        | "PASSWORD"
                        | "SELECT"
                        | "DATE"
                        | "RATING",
                    )
                  }
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  {fieldTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-white/10 bg-white/5"
                />

                <Input
                  placeholder="Placeholder"
                  value={placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
                  className="border-white/10 bg-white/5"
                />

                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isRequired}
                    onCheckedChange={(v) => setIsRequired(Boolean(v))}
                  />
                  <span className="text-sm text-white/60">Required</span>
                </div>

                {error && <p className="text-sm text-red-400">{error.message}</p>}

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={!label.trim() || status === "pending"}
                    className="bg-blue-600 text-white hover:bg-blue-800"
                  >
                    {status === "pending" ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <div className="space-y-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              Basic Fields
            </p>

            {fieldTypes.map((item) => (
              <button
                key={item.value}
                onClick={() => setType(item.value as any)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                  type === item.value ? "bg-[#131A36] text-white" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER */}
        <section className="p-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/50">
                Live Editor
              </div>

              <h1 className="text-5xl font-semibold tracking-tight text-[#DCE2FF]">Form Builder</h1>

              <p className="mt-4 text-lg text-white/50">
                Build dynamic forms and collect structured responses.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0C1228] p-6 shadow-2xl shadow-black/30">
              {fieldsLoading ? (
                <div className="py-12 text-center text-white/40">Loading fields...</div>
              ) : fields?.length ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={orderedFields?.map((f) => f.id) ?? []}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {orderedFields?.map((field) => (
                        <SortableFieldCard key={field.id} field={field} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              ) : (
                <div className="rounded-xl border border-dashed border-white/10 p-16 text-center text-white/40">
                  No fields yet — click “Create Field” to start building.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside className="border-l border-white/5 bg-[#070b1d] p-6">
          <h3 className="mb-6 text-lg font-medium">Settings</h3>

          <div className="space-y-6">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="mb-2 text-sm text-white/50">Field Count</p>
              <p className="text-3xl font-semibold">{fields?.length ?? 0}</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="mb-2 text-sm text-white/50">Current Type</p>
              <p className="font-medium text-[#B6BCFF]">{type}</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="mb-2 text-sm text-white/50">Theme</p>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-600" />
                <div className="h-8 w-8 rounded-full bg-[#3B82F6]" />
                <div className="h-8 w-8 rounded-full bg-[#F59E0B]" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

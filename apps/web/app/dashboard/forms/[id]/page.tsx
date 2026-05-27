"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Type,
  Mail,
  Calendar,
  Upload,
  Moon,
  Copy,
  Trash2,
  GripVertical,
  Circle,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import FormSidebarItem from "~/components/FormSidebarItem";
import ThemeCard from "~/components/ThemeCard";
import StepperButton from "~/components/StepperButton";
import FormSettingPanel from "~/components/FormSettingPanel";

export default function FormBuilderPage() {
  const [title, setTitle] = React.useState("Anime Poll 2024");

  const [description, setDescription] = React.useState(
    "Help us determine the most anticipated series and characters of the upcoming seasonal cycle.",
  );

  const [options, setOptions] = React.useState([
    "One Piece - Egghead Island Arc",
    "Bleach - Thousand-Year Blood War",
    "Naruto - Boruto: Two Blue Vortex",
  ]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">
      <div className="grid min-h-screen grid-cols-12">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-2 border-r border-white/10 bg-[#030b1d] px-6 py-8 hidden lg:block">
          <h2 className="text-3xl font-semibold text-[#b8b4ff]">Romex Admin</h2>

          <p className="mt-2 text-sm text-slate-500">Enterprise Suite</p>

          <Button className="mt-8 w-full bg-[#c4bbff] text-black hover:bg-[#d4ceff]">
            <Plus className="mr-2 h-4 w-4" />
            Create New Form
          </Button>

          <div className="mt-12">
            <p className="mb-5 text-xs tracking-[0.18em] uppercase text-slate-500">Basic Fields</p>

            <div className="space-y-2">
              <FormSidebarItem icon={<Type size={18} />} label="Short Text" />
              <FormSidebarItem active icon={<Circle size={18} />} label="Multiple Choice" />
              <FormSidebarItem icon={<Mail size={18} />} label="Email" />
              <FormSidebarItem icon={<Calendar size={18} />} label="Date Picker" />
              <FormSidebarItem icon={<Upload size={18} />} label="File Upload" />
            </div>
          </div>
        </aside>

        {/* CENTER */}
        <section className="col-span-12 lg:col-span-7 px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
                LIVE EDITOR
              </div>

              {/* title + description = your schema */}
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-center text-6xl font-semibold outline-none"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-6 w-full resize-none bg-transparent text-center text-xl text-slate-400 outline-none"
              />

              {/* question card */}
              <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-10 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg border border-white/10 px-4 py-2 text-xs tracking-widest text-slate-400">
                    #04 MULTIPLE_CHOICE
                  </span>

                  <div className="flex gap-4 text-slate-400">
                    <Copy size={18} />
                    <Trash2 size={18} />
                  </div>
                </div>

                <div className="mt-10">
                  <p className="mb-4 text-sm text-slate-400">Question Title</p>

                  <textarea
                    defaultValue="Which 'Big Three' series do you think has the best current arc?"
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-[#020817] p-6 text-3xl font-medium outline-none"
                  />
                </div>

                <div className="mt-10">
                  <p className="mb-6 text-sm text-slate-400">Options</p>

                  <div className="space-y-4">
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <GripVertical className="text-slate-500" size={18} />

                        <div className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-[#020817] px-5 py-5">
                          <Circle size={18} className="text-slate-500" />

                          <input
                            value={option}
                            onChange={(e) => {
                              const copy = [...options];
                              copy[index] = e.target.value;
                              setOptions(copy);
                            }}
                            className="w-full bg-transparent outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={addOption}
                    className="mt-6 flex items-center gap-2 text-[#b8b4ff] hover:text-white"
                  >
                    <Plus size={18} />
                    Add another option
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block col-span-3 border-l border-white/10 bg-[#030b1d] px-6 py-10">
          <div className="flex border-b border-white/10 pb-6">
            <button className="border-b-2 border-[#b8b4ff] pb-2 pr-8 text-lg">Settings</button>

            <button className="pb-2 pl-8 text-slate-500">Theme</button>
          </div>

          <div className="mt-10">
            <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500">Question Settings</h3>

            <FormSettingPanel label="Required" enabled />
            <FormSettingPanel label="Randomize Order" />

            <div className="mt-10">
              <p className="mb-4 text-sm">Selection Limit</p>

              <div className="flex gap-3">
                <StepperButton>-</StepperButton>
                <StepperButton>1</StepperButton>
                <StepperButton>+</StepperButton>
              </div>
            </div>

            <div className="mt-12">
              <p className="mb-6 text-sm">Theme Preset</p>

              <div className="grid grid-cols-2 gap-4">
                <ThemeCard active name="Deep Space" />
                <ThemeCard name="Paper" />
              </div>
            </div>

            <div className="mt-12">
              <p className="mb-5 text-sm">Accent Color</p>

              <div className="flex gap-3">
                {["#c9c2ff", "#f7b089", "#8c83ff", "#f5b1b1"].map((color) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    className="h-9 w-9 rounded-full border border-white/10"
                  />
                ))}
              </div>
            </div>

            <Button className="mt-12 w-full bg-white/10 hover:bg-white/15">
              Advanced Scripting (JS)
            </Button>
          </div>
        </aside>
      </div>

      {/* footer */}
      <footer className="fixed bottom-0 w-full border-t border-white/10 bg-[#020817]/90 backdrop-blur-md px-8 py-4 text-sm text-slate-400">
        <div className="flex justify-between">
          <span>© 2026 RomexForms</span>

          <div className="flex gap-8">
            <span>API Status</span>
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

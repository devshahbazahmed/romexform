export default function FormSidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
        active ? "bg-[#11183d] text-[#b8b4ff]" : "hover:bg-white/5 text-slate-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

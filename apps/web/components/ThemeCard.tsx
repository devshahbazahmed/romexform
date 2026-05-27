export default function ThemeCard({ name, active }: { name: string; active?: boolean }) {
  return (
    <button
      className={`rounded-2xl border p-6 ${
        active ? "border-[#b8b4ff] bg-[#151c43]" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {name}
    </button>
  );
}

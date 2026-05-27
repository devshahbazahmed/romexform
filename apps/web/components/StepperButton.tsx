export default function StepperButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-lg border border-white/10 px-4 py-3 hover:bg-white/5">
      {children}
    </button>
  );
}

export default function FormSettingPanelFormSettingPanel({
  label,
  enabled = false,
}: {
  label: string;
  enabled?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <span>{label}</span>

      <div className={`h-7 w-12 rounded-full p-1 ${enabled ? "bg-blue-600" : "bg-white/10"}`}>
        <div className={`h-5 w-5 rounded-full bg-white transition ${enabled ? "ml-auto" : ""}`} />
      </div>
    </div>
  );
}

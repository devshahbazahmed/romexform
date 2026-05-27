import { motion } from "framer-motion";

export function FeatureCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
    >
      <div className="mb-6 inline-flex rounded-xl bg-white/5 p-3 text-blue-600">{icon}</div>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <p className="mt-4 leading-8 text-slate-400">{description}</p>

      {children}
    </motion.div>
  );
}

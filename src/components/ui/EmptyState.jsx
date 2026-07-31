import { motion as Motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const EmptyState = ({ title, description, icon = "✦" }) => {
  return (
    <div className="flex min-h-[58vh] items-center justify-center px-4 py-16">
      <GlassPanel className="max-w-xl p-8 text-center" hover={false}>
        <Motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-purple-500/30 to-cyan-400/25 text-3xl shadow-[0_0_48px_rgba(34,211,238,0.22)]"
        >
          {icon}
        </Motion.div>
        <h2 className="gradient-text text-2xl font-black md:text-3xl">{title}</h2>
        {description && <p className="mt-3 text-sm leading-6 text-slate-300/72 md:text-base">{description}</p>}
      </GlassPanel>
    </div>
  );
};

export default EmptyState;

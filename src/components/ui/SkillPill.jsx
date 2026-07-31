import { motion as Motion } from "framer-motion";

const SkillPill = ({ children, index = 0 }) => {
  return (
    <Motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035 }}
      className="skill-pill"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
      {children}
    </Motion.span>
  );
};

export default SkillPill;

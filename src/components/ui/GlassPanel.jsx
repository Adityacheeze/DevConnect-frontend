import { motion as Motion } from "framer-motion";

const GlassPanel = ({ children, className = "", hover = true, ...props }) => {
  return (
    <Motion.div
      whileHover={hover ? { y: -4, rotateX: 1.2, rotateY: -1.2 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`glass-panel rounded-[2rem] ${className}`}
      {...props}
    >
      {children}
    </Motion.div>
  );
};

export default GlassPanel;

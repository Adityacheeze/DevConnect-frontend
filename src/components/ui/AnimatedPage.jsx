import { motion as Motion } from "framer-motion";

const AnimatedPage = ({ children, className = "" }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Motion.div>
  );
};

export default AnimatedPage;

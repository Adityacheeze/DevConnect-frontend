const styles = {
  primary: "aurora-button",
  ghost: "ghost-button",
  danger: "danger-button",
  subtle:
    "inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.08]",
};

const GradientButton = ({ children, variant = "primary", className = "", type = "button", ...props }) => {
  return (
    <button type={type} className={`${styles[variant] || styles.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default GradientButton;

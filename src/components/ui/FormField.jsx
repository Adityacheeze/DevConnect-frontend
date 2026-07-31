const FormField = ({ label, as = "input", className = "", error, ...props }) => {
  const Component = as;

  return (
    <label className="block space-y-2 text-left">
      {label && <span className="text-xs font-black uppercase tracking-[0.22em] text-cyan-100/62">{label}</span>}
      <Component className={`form-field ${className}`} {...props} />
      {error && <span className="text-xs font-semibold text-red-300">{error}</span>}
    </label>
  );
};

export default FormField;

import { motion as Motion } from "framer-motion";

const PageShell = ({ eyebrow, title, description, children, className = "", actions }) => {
  return (
    <main className={`mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}>
      {(title || eyebrow || description || actions) && (
        <Motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs font-black uppercase tracking-[0.34em] text-cyan-200/70">
                {eyebrow}
              </p>
            )}
            {title && <h1 className="gradient-text text-4xl font-black tracking-tight md:text-6xl">{title}</h1>}
            {description && <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300/74 md:text-lg">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
        </Motion.header>
      )}
      {children}
    </main>
  );
};

export default PageShell;

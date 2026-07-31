const Footer = () => {
  return (
    <footer className="relative z-10 mt-10 border-t border-white/10 bg-[#05050b]/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-300/65 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-black text-white">devConnect</p>
          <p>Copyright © {new Date().getFullYear()} — Crafted for builders, dreamers, and makers.</p>
        </div>
        <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/55">
          <span>3D network</span>
          <span>•</span>
          <span>Glass UI</span>
          <span>•</span>
          <span>Social coding</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

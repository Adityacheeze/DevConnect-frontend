import axios from "axios";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { removeUser } from "../utils/userSlice";

const navLinks = [
  { to: "/", label: "Feed" },
  { to: "/profile", label: "Profile" },
  { to: "/connections", label: "Network" },
  { to: "/requests", label: "Requests" },
];

const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `rounded-full px-4 py-2 text-sm font-bold transition ${
        isActive
          ? "bg-white/12 text-white shadow-[0_0_24px_rgba(34,211,238,0.16)]"
          : "text-slate-300/76 hover:bg-white/[0.07] hover:text-white"
      }`
    }
  >
    {label}
  </NavLink>
);

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setMenuOpen(false);
      setProfileOpen(false);
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Motion.header
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-[9999] pointer-events-auto border-b border-white/10 bg-[#05050b]/58 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-gradient-to-br from-purple-500/45 to-cyan-400/28 shadow-[0_0_40px_rgba(124,58,237,0.35)] transition group-hover:scale-105">
            <span className="text-xl">⌁</span>
          </div>
          <div>
            <p className="gradient-text text-xl font-black tracking-tight">devConnect</p>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/50 sm:block">developer orbit</p>
          </div>
        </Link>

        {user && (
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 md:flex">
            {navLinks.map((link) => (
              <NavItem key={link.to} {...link} />
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] p-1.5 pr-4 text-sm font-bold text-white transition hover:bg-white/[0.09]"
              >
                <img src={user.photoURL} alt="User" className="h-10 w-10 rounded-full object-cover ring-2 ring-cyan-300/30" />
                <span className="max-w-32 truncate">{user.firstName}</span>
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <Motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    className="glass-panel absolute right-0 mt-3 w-64 rounded-3xl p-3"
                  >
                    <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-3">
                      <img src={user.photoURL} alt="User" className="h-12 w-12 rounded-2xl object-cover" />
                      <div className="min-w-0">
                        <p className="truncate font-black text-white">{user.firstName} {user.lastName}</p>
                        <p className="truncate text-xs text-slate-300/62">Ready to connect</p>
                      </div>
                    </div>
                    <Link to="/delete" onClick={() => setProfileOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-bold text-red-200 transition hover:bg-red-400/10">
                      Delete Account
                    </Link>
                    <button onClick={handleLogout} className="mt-1 w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-slate-200 transition hover:bg-white/[0.07]">
                      Logout
                    </button>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="aurora-button hidden sm:inline-flex">Join now</Link>
          )}

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white md:hidden"
            aria-label="Open menu"
          >
            <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#05050b]/84 px-4 pb-5 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-4">
              {user ? (
                <>
                  <div className="mb-2 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.05] p-3">
                    <img src={user.photoURL} alt="User" className="h-12 w-12 rounded-2xl object-cover" />
                    <div>
                      <p className="font-black text-white">Welcome, {user.firstName}</p>
                      <p className="text-xs text-slate-300/62">Build your developer network</p>
                    </div>
                  </div>
                  {navLinks.map((link) => (
                    <NavItem key={link.to} {...link} onClick={() => setMenuOpen(false)} />
                  ))}
                  <NavItem to="/delete" label="Delete Account" onClick={() => setMenuOpen(false)} />
                  <button onClick={handleLogout} className="ghost-button mt-2 w-full">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="aurora-button w-full">Join now</Link>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  );
};

export default NavBar;

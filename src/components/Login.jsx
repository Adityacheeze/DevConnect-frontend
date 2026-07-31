import axios from "axios";
import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { addUser } from "../utils/userSlice";
import FormField from "./ui/FormField";
import GlassPanel from "./ui/GlassPanel";
import GradientButton from "./ui/GradientButton";

const InsightCard = ({ children, delay = 0, className = "" }) => (
  <Motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.55, ease: "easeOut" }}
    whileHover={{ y: -4 }}
    className={`glass-panel rounded-3xl p-4 ${className}`}
  >
    {children}
  </Motion.div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", { email, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, email, password }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-8">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-white/8 bg-white/[0.015] p-5 sm:p-8 lg:p-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-500/18 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-10 max-w-4xl"
        >
          <p className="mb-5 font-mono text-xs font-black uppercase tracking-[0.32em] text-cyan-200/70 sm:text-sm">
            developer social universe
          </p>
          <h1 className="gradient-text max-w-4xl text-[clamp(3.2rem,8vw,6.8rem)] font-black leading-[0.94] tracking-[-0.07em]">
            Find your next collaborator.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300/74 sm:text-lg md:text-xl md:leading-9">
            Discover developers, connect with builders, and turn interesting profiles into real collaborations — wrapped in a cinematic social graph.
          </p>
        </Motion.div>

        <div className="relative z-10 mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <InsightCard delay={0.18}>
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan-300/16 text-2xl shadow-[0_0_30px_rgba(34,211,238,0.18)]">⚡</div>
              <div>
                <p className="text-2xl font-black text-white">12k+ matches</p>
                <p className="text-sm text-slate-300/64">builders connected</p>
              </div>
            </div>
          </InsightCard>

          <InsightCard delay={0.28}>
            <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-purple-100/62">live skill pulse</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="skill-pill">React</span>
              <span className="skill-pill">Node</span>
              <span className="skill-pill">AI</span>
            </div>
          </InsightCard>
        </div>
      </section>

      <GlassPanel className="mx-auto w-full max-w-md p-6 md:p-8" hover={false}>
        <div className="mb-8 text-center">
          <Motion.div layout className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-purple-500/35 to-cyan-400/24 text-3xl shadow-[0_0_50px_rgba(168,85,247,0.35)]">
            {isLoginForm ? "✦" : "🚀"}
          </Motion.div>
          <h2 className="gradient-text text-3xl font-black">{isLoginForm ? "Welcome back" : "Create your orbit"}</h2>
          <p className="mt-2 text-sm text-slate-300/64">{isLoginForm ? "Sign in and keep building your network." : "Join the developer social graph."}</p>
        </div>

        <div className="space-y-4">
          {!isLoginForm && (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="First name" value={firstName} placeholder="Ada" onChange={(e) => setFirstName(e.target.value)} />
              <FormField label="Last name" value={lastName} placeholder="Lovelace" onChange={(e) => setLastName(e.target.value)} />
            </div>
          )}
          <FormField label="Email ID" type="email" value={email} placeholder="you@dev.com" onChange={(e) => setEmail(e.target.value)} />
          <FormField label="Password" type="password" value={password} placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="mt-7 flex flex-col items-center gap-4">
          {error && <span className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-center text-sm font-semibold text-red-200">{error}</span>}
          <GradientButton className="w-full" onClick={isLoginForm ? handleLogin : handleSignup}>
            {isLoginForm ? "Enter devConnect" : "Launch account"}
          </GradientButton>
          <button className="text-sm font-bold text-cyan-100/70 transition hover:text-cyan-100" onClick={() => setIsLoginForm((prev) => !prev)}>
            {isLoginForm ? "New here? Create an account" : "Already have an account? Login"}
          </button>
        </div>
      </GlassPanel>
    </main>
  );
};

export default Login;

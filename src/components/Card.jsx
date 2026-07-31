import { motion as Motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants";
import axios from "axios";
import { removeRequests } from "../utils/requestSlice";
import { removeConnection } from "../utils/connectionSlice";
import GlassPanel from "./ui/GlassPanel";
import GradientButton from "./ui/GradientButton";
import SkillPill from "./ui/SkillPill";

const Card = ({ user, flag, id, showRemoveConnection = false }) => {
  const dispatch = useDispatch();

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + id, {}, { withCredentials: true });
      dispatch(removeRequests(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveConnection = async () => {
    try {
      await axios.delete(BASE_URL + "/request/connection/" + user._id, { withCredentials: true });
      dispatch(removeConnection(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  const skills = Array.isArray(user.skills) ? user.skills : [];

  return (
    <GlassPanel className="relative w-full p-4 md:p-5">
      {showRemoveConnection && (
        <button
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-red-300/20 bg-red-500/10 text-lg font-black text-red-100 transition hover:scale-105 hover:bg-red-500/20"
          onClick={handleRemoveConnection}
          aria-label="Remove connection"
          title="Remove connection"
        >
          ×
        </button>
      )}
      <div className="flex flex-col gap-5 pr-0 sm:flex-row sm:items-center sm:pr-10">
        <Motion.img
          whileHover={{ scale: 1.05, rotate: 2 }}
          src={user.photoURL}
          alt="user"
          className="mx-auto h-32 w-32 shrink-0 rounded-[2rem] object-cover ring-2 ring-cyan-300/24 sm:mx-0 md:h-40 md:w-40"
        />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-black text-white">{user.firstName} {user.lastName}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300/72">{user.about || "A mysterious builder in the network."}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            {user.age && <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200">Age {user.age}</span>}
            {user.gender && <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200">{user.gender}</span>}
          </div>
          {skills.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {skills.slice(0, 7).map((skill, index) => <SkillPill key={`${skill}-${index}`} index={index}>{skill}</SkillPill>)}
            </div>
          )}
        </div>
        {flag && (
          <div className="grid gap-3 sm:w-36">
            <GradientButton variant="ghost" onClick={() => reviewRequest("rejected", id)}>Reject</GradientButton>
            <GradientButton onClick={() => reviewRequest("accepted", id)}>Accept</GradientButton>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default Card;

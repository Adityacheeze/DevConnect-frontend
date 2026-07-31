import axios from "axios";
import { motion as Motion } from "framer-motion";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import GlassPanel from "./ui/GlassPanel";
import GradientButton from "./ui/GradientButton";
import SkillPill from "./ui/SkillPill";

const UserCard = ({ user, preview = false }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    if (preview) return;
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + id, {}, { withCredentials: true });
      dispatch(removeFeed(id));
    } catch (error) {
      console.log(error);
    }
  };

  const skills = Array.isArray(user.skills) ? user.skills : [];

  return (
    <GlassPanel className="group flex h-full min-h-[560px] w-full max-w-md flex-col overflow-hidden" hover={!preview}>
      <div className="relative h-64 overflow-hidden">
        <Motion.img
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.5 }}
          src={user.photoURL}
          alt="Profile"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050b] via-[#05050b]/20 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/12 bg-black/35 px-3 py-1.5 font-mono text-xs font-black uppercase tracking-[0.18em] text-cyan-100/82 backdrop-blur-xl">
          {user.gender || "builder"}
        </div>
        {user.age && (
          <div className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/10 text-sm font-black backdrop-blur-xl">
            {user.age}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">{user.firstName} {user.lastName}</h2>
          <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-300/72">{user.about || "This developer is still crafting their story."}</p>
        </div>

        {skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.slice(0, 8).map((skill, index) => (
              <SkillPill key={`${skill}-${index}`} index={index}>{skill}</SkillPill>
            ))}
          </div>
        )}

        {!preview && (
          <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
            <GradientButton variant="ghost" onClick={() => handleSendRequest("ignored", user._id)}>
              Ignore
            </GradientButton>
            <GradientButton onClick={() => handleSendRequest("interested", user._id)}>
              Interested
            </GradientButton>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default UserCard;

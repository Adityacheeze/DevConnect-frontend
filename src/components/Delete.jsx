import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { removeUser } from "../utils/userSlice";
import EmptyState from "./ui/EmptyState";
import GlassPanel from "./ui/GlassPanel";
import GradientButton from "./ui/GradientButton";
import PageShell from "./ui/PageShell";
import UserCard from "./UserCard";

const Delete = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [armed, setArmed] = useState(false);

  const handleDelete = async () => {
    if (!armed) {
      setArmed(true);
      return;
    }

    try {
      await axios.post(BASE_URL + "/user/delete", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (user == null) {
    return <EmptyState icon="!" title="No profile found" description="We could not find a signed-in profile to delete." />;
  }

  return (
    <PageShell eyebrow="danger zone" title="Delete account" description="This area is intentionally dramatic. Confirm only when you are sure you want to leave the network.">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-center">
        <UserCard user={user} preview />
        <GlassPanel className="p-6 md:p-8" hover={false}>
          <div className="mb-6 grid h-16 w-16 place-items-center rounded-3xl border border-red-300/20 bg-red-500/12 text-3xl shadow-[0_0_46px_rgba(248,113,113,0.24)]">
            ⚠
          </div>
          <h2 className="text-3xl font-black text-white">Break the orbit?</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300/72 md:text-base">
            Deleting your account removes your profile from DevConnect. Tap once to arm the delete action, then tap again to confirm.
          </p>
          <div className="mt-7 rounded-3xl border border-red-300/18 bg-red-500/8 p-4 text-sm font-semibold text-red-100/80">
            {armed ? "Delete is armed. Tap the button again to permanently delete your account." : "Safety interlock enabled. First tap will only arm the action."}
          </div>
          <GradientButton variant="danger" className="mt-6 w-full" onClick={handleDelete}>
            {armed ? "Confirm permanent delete" : "Arm delete account"}
          </GradientButton>
          {armed && (
            <button onClick={() => setArmed(false)} className="mt-3 w-full rounded-full px-5 py-3 text-sm font-bold text-slate-300/80 transition hover:bg-white/[0.06] hover:text-white">
              Cancel
            </button>
          )}
        </GlassPanel>
      </div>
    </PageShell>
  );
};

export default Delete;

import axios from "axios";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants";
import { addUser } from "../utils/userSlice";
import FormField from "./ui/FormField";
import GlassPanel from "./ui/GlassPanel";
import GradientButton from "./ui/GradientButton";
import PageShell from "./ui/PageShell";
import UserCard from "./UserCard";

const commaStringToArray = (input = "") =>
  input
    .split(",")
    .map((word) => word.trim())
    .filter((word) => word.length > 0);

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [_id] = useState(user._id);
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [skills, setSkills] = useState(Array.isArray(user.skills) ? user.skills : commaStringToArray(user.skills));
  const [skillsInput, setSkillsInput] = useState(skills.join(", "));
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoURL, skills },
        { withCredentials: true }
      );
      setError("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError(error?.response?.data || "Unable to save profile");
    }
  };

  return (
    <PageShell eyebrow="profile studio" title="Design your developer identity." description="Tune your profile and preview exactly how your card appears inside the network.">
      <AnimatePresence>
        {showToast && (
          <Motion.div
            initial={{ opacity: 0, y: -20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.94 }}
            className="fixed left-1/2 top-24 z-[60] -translate-x-1/2 rounded-3xl border border-emerald-300/24 bg-emerald-400/12 px-5 py-3 font-bold text-emerald-100 shadow-[0_0_40px_rgba(52,211,153,0.22)] backdrop-blur-xl"
          >
            Profile saved successfully ✨
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <GlassPanel className="p-5 md:p-8" hover={false}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="First name" value={firstName} placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
            <FormField label="Last name" value={lastName} placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
            <FormField label="Age" type="number" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)} />
            <FormField label="Gender" as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </FormField>
            <FormField label="Photo URL" className="md:col-span-2" value={photoURL} placeholder="https://..." onChange={(e) => setPhotoURL(e.target.value)} />
            <FormField label="About" as="textarea" className="min-h-32 md:col-span-2" value={about} placeholder="Tell builders what you're about" onChange={(e) => setAbout(e.target.value)} />
            <FormField
              label="Skills"
              className="md:col-span-2"
              value={skillsInput}
              placeholder="React, Node, Systems Design"
              onChange={(e) => {
                setSkillsInput(e.target.value);
                setSkills(commaStringToArray(e.target.value));
              }}
            />
          </div>
          <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            {error && <span className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200">{error}</span>}
            <GradientButton className="w-full sm:ml-auto sm:w-auto" onClick={saveProfile}>Save profile</GradientButton>
          </div>
        </GlassPanel>

        <div className="lg:sticky lg:top-28">
          <UserCard preview user={{ _id, firstName, lastName, age, gender, about, photoURL, skills }} />
        </div>
      </div>
    </PageShell>
  );
};

export default EditProfile;

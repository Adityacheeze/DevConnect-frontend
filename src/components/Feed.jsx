import axios from "axios";
import { motion as Motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import { addFeed } from "../utils/feedSlice";
import EmptyState from "./ui/EmptyState";
import PageShell from "./ui/PageShell";
import UserCard from "./UserCard";
import { staggerContainer, staggerItem } from "./ui/motionVariants";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed === null) {
    return <EmptyState icon="◌" title="Scanning the network" description="Your next collaborator is materializing in the graph." />;
  }

  if (feed.length === 0) {
    return <EmptyState icon="✧" title="No builders in orbit right now" description="Try again later — the network is always moving." />;
  }

  return (
    <PageShell
      eyebrow="discovery feed"
      title="Meet builders who match your energy."
      description="Swipe through developers, founders, designers, and operators in a living 3D social graph. Every card is a possible collaboration."
    >
      <Motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {feed.map((user) => (
          <Motion.div key={user._id} variants={staggerItem}>
            <UserCard user={user} />
          </Motion.div>
        ))}
      </Motion.div>
    </PageShell>
  );
};

export default Feed;

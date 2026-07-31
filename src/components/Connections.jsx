import axios from "axios";
import { motion as Motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import { addConnection } from "../utils/connectionSlice";
import Card from "./Card";
import EmptyState from "./ui/EmptyState";
import PageShell from "./ui/PageShell";
import { staggerContainer, staggerItem } from "./ui/motionVariants";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnection(res?.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <EmptyState icon="◌" title="Loading your network" description="Synchronizing the developers already connected to you." />;

  if (connections.length === 0) {
    return <EmptyState icon="∞" title="No connections yet" description="Head to the feed and start building your developer constellation." />;
  }

  return (
    <PageShell eyebrow="your graph" title="Connections that could become companies." description={`${connections.length} builder${connections.length === 1 ? "" : "s"} connected to your orbit.`}>
      <Motion.div variants={staggerContainer} initial="hidden" animate="show" className="mx-auto grid max-w-5xl gap-5">
        {connections.map((connection) => (
          <Motion.div key={connection._id} variants={staggerItem}>
            <Card user={connection} showRemoveConnection />
          </Motion.div>
        ))}
      </Motion.div>
    </PageShell>
  );
};

export default Connections;

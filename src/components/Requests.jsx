import axios from "axios";
import { motion as Motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import { addRequests } from "../utils/requestSlice";
import Card from "./Card";
import EmptyState from "./ui/EmptyState";
import PageShell from "./ui/PageShell";
import { staggerContainer, staggerItem } from "./ui/motionVariants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <EmptyState icon="◌" title="Checking incoming signals" description="Looking for people who want to connect with you." />;

  if (requests.length === 0) {
    return <EmptyState icon="✉" title="No pending requests" description="You are all caught up. Fresh signals will appear here." />;
  }

  return (
    <PageShell eyebrow="incoming requests" title="Choose who enters your orbit." description={`${requests.length} pending connection request${requests.length === 1 ? "" : "s"} waiting for your response.`}>
      <Motion.div variants={staggerContainer} initial="hidden" animate="show" className="mx-auto grid max-w-5xl gap-5">
        {requests.map((request) => (
          <Motion.div key={request._id} variants={staggerItem}>
            <Card user={request.fromUserId} flag id={request._id} />
          </Motion.div>
        ))}
      </Motion.div>
    </PageShell>
  );
};

export default Requests;

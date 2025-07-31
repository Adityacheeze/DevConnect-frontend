import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import Card from "./Card";

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
  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="flex justify-center h-screen">
        <div className="font-bold text-2xl my-10">No requests Found</div>
      </div>
    );
  return (
    <div className="text-center min-h-max">
      <div className="font-bold text-2xl my-10">Connection Requests</div>
      <div key={requests._id} className="flex flex-col gap-10 items-center m-10">
        {requests.map((request) => {
          return <Card user={request.fromUserId} flag={true} id={request._id}/>;
        })}
      </div>
    </div>
  );
};

export default Requests;

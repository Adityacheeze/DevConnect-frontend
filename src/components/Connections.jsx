import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import Card from "./Card";

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
  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="flex justify-center  h-screen">
        <div className="font-bold text-2xl my-10">No Connections Found</div>
      </div>
    );
  return (
    <div className="text-center">
      <div className="font-bold text-2xl my-10">Connections</div>
      <div key={connections._id} className="flex flex-col gap-10 items-center m-10">
        {connections.map((connection) => {
          return <Card user={connection} />;
        })}
      </div>
    </div>
  );
};

export default Connections;

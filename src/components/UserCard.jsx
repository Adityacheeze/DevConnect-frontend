import axios from "axios";
import React from "react";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 shadow-sm w-96 h-[550px]">
      <figure className="h-[200px] overflow-hidden">
        <img
          src={user.photoURL}
          alt="Photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body overflow-auto">
        <h2 className="card-title text-lg">
          {user.firstName + " " + user.lastName}
        </h2>
        <p className="text-sm">{user.about}</p>
        {user.age && <p className="text-sm">AGE: {user.age}</p>}
        {user.gender && <p className="text-sm">{user.gender}</p>}
        {user.skills && (
          <p className="text-sm">
            SKILLS: {user.skills.map((skill) =>  skill + ", ")}
          </p>
        )}
        <div className="card-actions justify-center mt-auto">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

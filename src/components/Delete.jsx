import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const Delete = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await axios.post(
        BASE_URL + "/user/delete",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  if (user == null) return <div className="flex justify-center h-screen">
        <div className="font-bold text-2xl my-10">NO USER PROFILE FOUND</div>
      </div>
  return (
    <div className="flex flex-col items-center my-10 h-screen">
      <UserCard user={user} />
      <button className="btn btn-error w-96" onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
};

export default Delete;

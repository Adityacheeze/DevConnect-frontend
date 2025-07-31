import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(feed === null) return <div> NO FEED FOUND</div>;
  if(feed.length === 0) return (
      <div className="flex justify-center h-screen">
        <div className="font-bold text-2xl my-10">NO USER IN FEED, TRY AGAIN LATER</div>
      </div>
    );
  else return (
    feed && (
      <div className="flex flex-col gap-10 items-center my-10 min-h-max">
        {feed.map((u) => {
          return <UserCard user={u}/>
        })}
        
      </div>
    )
  );
};

export default Feed;

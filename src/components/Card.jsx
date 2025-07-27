import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants";
import axios from "axios";
import { removeRequests } from "../utils/requestSlice";

const Card = ({ user, flag, id }) => {
  const dispatch = useDispatch();
  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card card-side bg-base-300 shadow-sm p-4 w-125">
      <figure>
        <img
          className="rounded-full h-40 w-40"
          src={user.photoURL}
          alt="user photo"
        />
      </figure>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        <p>{user.about && user.about}</p>
        <p>{user.age && "AGE : " + user.age}</p>
        <p>{user.gender && user.gender}</p>
        <p key={user._id}>
          {user.skills && "SKILLS : " + user.skills.map((skill) => " " + skill)}
        </p>
        {flag && (
          <div className="flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                reviewRequest("rejected", id);
              }}
            >
              Reject
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                reviewRequest("accepted", id);
              }}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

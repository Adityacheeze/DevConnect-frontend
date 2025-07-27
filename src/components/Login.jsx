import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center h-screen">
      <div className="card bg-base-300 w-96 h-fit shadow-sm my-10">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div className="py-4">
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    placeholder="Type here"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    placeholder="Type here"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </fieldset>
              </>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={email}
                placeholder="Type here"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                placeholder="Type here"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div className="card-actions flex flex-col items-center">
            <span className="text-red-500">{error}</span>
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
            <span className="my-4 cursor-pointer" onClick={() => setIsLoginForm((prev) => !prev)}>
              {isLoginForm
                ? "New User... SignUp here"
                : "Existing User... Login Here"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;

import axios from "axios";
import React, { useState } from "react";

const login = () => {
  const [email, setEmail] = useState("anshika@gmail.com");
  const [password, setPassword] = useState("Anshika@123");
  const handleLogin = async () => {
    try {
      const res = axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm my-10">
        {/* <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure> */}
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="py-4">
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
                type="text"
                className="input"
                value={password}
                placeholder="Type here"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;

import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  function commaStringToArray(input) {
    return input
      .split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);
  }
  const [firstName, setFirstName] = useState(user.firstName);
  const [_id, set_id] = useState(user._id);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [error, setError] = useState();
  const [showToast, setShowToast] = useState(false);
  const [skills, setSkills] = useState(
    Array.isArray(user.skills) ? user.skills : commaStringToArray(user.skills)
  );
  const [skillsInput, setSkillsInput] = useState(skills.join(", "));

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName,
          lastName: lastName,
          age: age,
          gender: gender,
          about: about,
          photoURL: photoURL,
          skills: skills,
        },
        { withCredentials: true }
      );
      setError("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError(error?.response?.data);
    }
  };
  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully.</span>
          </div>
        </div>
      )}
      <div className="flex gap-10 justify-center my-10">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="py-4">
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
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    placeholder="Type here"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    className="input"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="">Select gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoURL}
                    placeholder="Type here"
                    onChange={(e) => {
                      setPhotoURL(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    className="input"
                    value={about}
                    placeholder="Type here"
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    className="input"
                    value={skillsInput}
                    placeholder="Type comma-separated skills"
                    onChange={(e) => {
                      setSkillsInput(e.target.value); // update text input
                      setSkills(commaStringToArray(e.target.value)); // update actual array
                    }}
                  />
                </fieldset>
              </div>
              <div className="card-actions flex flex-col items-center">
                <span className="text-red-500">{error}</span>
                <button className="btn btn-primary" onClick={saveProfile}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{_id, firstName, lastName, age, gender, about, photoURL, skills }}
        />
      </div>
    </>
  );
};

export default EditProfile;

import React from "react";

const Card = ({ user, flag }) => {
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
        <p>{user.age && user.age}</p>
        <p>{user.gender && user.gender}</p>
        <p>
          {user.skills && "SKILLS : " + user.skills.map((skill) => " " + skill)}
        </p>
        {flag && (
          <div className="flex gap-2">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-secondary">Reject</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

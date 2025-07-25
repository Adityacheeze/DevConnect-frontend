import React from "react";

const Card = ({ user }) => {
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
      </div>
    </div>
  );
};

export default Card;

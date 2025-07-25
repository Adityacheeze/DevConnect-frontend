import React from "react";

const UserCard = ({user}) => {
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={user.photoURL}
          alt="Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        <p>
          {user.about}
        </p>
        <p>
          {user.age && user.age}
        </p>
        <p>
          {user.gender && user.gender}
        </p>
        <p>
          {user.skills && "SKILLS : " + user.skills.map(skill => " " + skill)}
        </p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

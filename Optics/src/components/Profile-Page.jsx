import React, { useState } from "react";
import "../../Styles/App.css";
import SearchComponent from "../components/SearchComponent";

const ProfilePage = ({ user }) => {
  return (
    <div>
      <div className="top-profile-page">
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1719374252~exp=1719374852~hmac=384d89c4c305fabcd0e40764416da0985d75085f7c38963ef024b12944d7975f"
          alt="User Avatar"
          className="profile-picture-sidebar"
        />
        <h2 style={{ fontSize: "28px", color: "white" }}>HUGE NUTSACK</h2>
        <h2 className="profile-page-users-name">
          {user.firstName} {user.lastName}
        </h2>
        <h2>{user.email}</h2>
      </div>

    </div>
  );
};

export default ProfilePage;

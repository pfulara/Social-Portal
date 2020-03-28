import React from "react";
import database from "../../database";
import { Redirect } from "react-router-dom";

const Logout = ({ userData, user, setUser }) => {
  if (!userData) return <Redirect to="/login" />;
  database
    .auth()
    .signOut()
    .then(() => {
      setUser(false);
      sessionStorage.removeItem("uid");
    })
    .catch(err => {
      console.log(err);
    });
  return null;
};

export default Logout;

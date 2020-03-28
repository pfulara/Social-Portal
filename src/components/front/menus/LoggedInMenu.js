import React from "react";
import { styled, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const MenuUl = styled("ul")({
  "& li": {
    marginLeft: "10px"
  },
  display: "flex",
  listStyle: "none",
  padding: "0",
  justifyContent: "flex-end",
  margin: "0",
  alignItems: "center",
  position: "relative"
});

const LoggedInMenu = ({ user }) => {
  return (
    <MenuUl>
      <li>
        <Link to="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </li>
      <li>
        <Link to="/new-post">
          <Button>New Post</Button>
        </Link>
      </li>
      <li>
        <Link to="/logout">
          <Button>Logout</Button>
        </Link>
      </li>
    </MenuUl>
  );
};

export default LoggedInMenu;

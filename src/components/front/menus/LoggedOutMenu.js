import React from "react";
import { Link } from "react-router-dom";
import { styled, Button } from "@material-ui/core";

const Menu = styled("ul")({
  li: {
    marginLeft: "10px"
  },
  display: "flex",
  listStyle: "none",
  padding: "0",
  justifyContent: "flex-end",
  margin: "0"
});

const LoggedOutMenu = ({ user }) => {
  return (
    <Menu>
      <li>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </li>
      <li>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </li>
    </Menu>
  );
};

export default LoggedOutMenu;

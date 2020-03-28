import React from "react";
import { Link } from "react-router-dom";
import { styled, AppBar, Toolbar, Grid } from "@material-ui/core";
import LoggedInMenu from "./menus/LoggedInMenu";
import LoggedOutMenu from "./menus/LoggedOutMenu";

const HeaderStyled = styled("header")({
  background: "#fff",
  padding: "30px 0",
  boxShadow: "0px 2px 5px #666",
  position: "fixed",
  width: "100%",
  top: "0",
  zIndex: "10"
});

const ToolbarStyled = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
});

const Brand = styled("span")({
  fontSize: "2rem"
});

const Header = ({ userData }) => {
  return (
    <HeaderStyled>
      <AppBar color="inherit">
        <ToolbarStyled>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <Link to="/">
                <Brand>Social Portal</Brand>
              </Link>
            </Grid>
            <Grid xs={12} sm={6}>
              {userData ? <LoggedInMenu /> : <LoggedOutMenu />}
            </Grid>
          </Grid>
        </ToolbarStyled>
      </AppBar>
    </HeaderStyled>
  );
};

export default Header;

import React, { useState } from "react";
import database from "../../database";
import { Redirect } from "react-router-dom";
import { styled, Grid, TextField, Button } from "@material-ui/core";

const ButtonStyled = styled("button")({
  background: "transparent",
  border: "none",
  padding: "0"
});

const Login = ({ userData, user, setUser }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  if (userData) return <Redirect to="/dashboard" />;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        database
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(user => {
            setUser(user.user.uid);
            sessionStorage.setItem("uid", user.user.uid);
          })
          .catch(err => {
            setError(true);
          });
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Login</h1>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            error={error && !email ? true : false}
            style={{ width: "100%" }}
            label="email"
            type="email"
            variant="outlined"
            name="email"
            onChange={e => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            error={error && !password ? true : false}
            style={{ width: "100%" }}
            label="password"
            type="password"
            variant="outlined"
            name="password"
            onChange={e => {
              setPassword(e.target.value);
              setError(false);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonStyled>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </ButtonStyled>
        </Grid>
      </Grid>
    </form>
  );
};
export default Login;

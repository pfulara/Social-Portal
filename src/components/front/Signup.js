import React, { useState, useEffect } from "react";
import database from "../../database";
import { Redirect } from "react-router-dom";
import { styled, Grid, TextField, Button } from "@material-ui/core";

const ButtonStyled = styled("button")({
  background: "transparent",
  border: "none",
  padding: "0"
});

const Signup = ({ userData, user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(false);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    database
      .database()
      .ref("notifications")
      .on("value", snapshot => {
        setNotifications(snapshot.val() || []);
      });
    return () => {
      setNotifications([]);
    };
  }, []);
  if (userData) return <Redirect to="/dashboard" />;
  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        database
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            setUser(user.user.uid);
            const date = +new Date();
            const postDate = new Date(date).toLocaleDateString("pl-PL");
            const postTime = new Date(date).toLocaleTimeString("pl-PL");
            const newNotifics = [
              {
                date: postDate,
                time: postTime,
                authorNickname: nickname,
                msg: "has join to out team!"
              },
              ...notifications
            ];
            sessionStorage.setItem("uid", user.user.uid);
            database
              .database()
              .ref(`users/${user.user.uid}`)
              .set({ email: email, nickname: nickname, date: +new Date() })
              .then(() => {
                database
                  .database()
                  .ref("notifications")
                  .set(newNotifics);
              });
          })
          .catch(err => {
            setError(true);
          });
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Sign Up</h1>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            error={error && !email ? true : false}
            style={{ width: "100%" }}
            label="email"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            error={error && !nickname ? true : false}
            style={{ width: "100%" }}
            label="nickname"
            variant="outlined"
            type="text"
            name="nickname"
            value={nickname}
            onChange={e => {
              setNickname(e.target.value);
              setError(false);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            error={error && !password ? true : false}
            style={{ width: "100%" }}
            label="password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setError(false);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonStyled>
            <Button variant="contained" color="primary">
              Sign up
            </Button>
          </ButtonStyled>
        </Grid>
      </Grid>
    </form>
  );
};
export default Signup;

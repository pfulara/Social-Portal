import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = ({ userData }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return (
    <Grid container spacing={3}>
      {userData ? (
        <Grid item xs={12}>
          <h2>hello {userData.nickname}!</h2>
          <h3>
            Today is {Date().slice(0, 3)} it's {new Date().getDate()} day of{" "}
            {months[new Date().getMonth()]} {new Date().getFullYear()}.
          </h3>
          <p>Have a nice day!</p>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <h2>Hello Guest!</h2>
          <p>
            If you'd like to test Portal <Link to="/login">login</Link> with
            email: test@test.com and password: 123456.
          </p>
          <p>
            Or <Link to="/signup">create new account</Link> and login with it.
          </p>
        </Grid>
      )}
    </Grid>
  );
};

export default Home;

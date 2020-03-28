import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import database from "../../database";
import { styled, Grid, Hidden } from "@material-ui/core";

import Notifications from "./Notifications";
import Posts from "./Posts";

const WelcomeText = styled("p")({
  fontSize: "2rem",
  fontWeight: "bold"
});

const Dashboard = ({ userData }) => {
  const [notifications, setNotifications] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    database
      .database()
      .ref("notifications")
      .on("value", snapshot => {
        setNotifications(snapshot.val() || []);
      });
    database
      .database()
      .ref("posts")
      .on("value", snapshot => {
        setPosts(snapshot.val() || []);
      });
    return () => {
      setNotifications([]);
      setPosts([]);
    };
  }, []);
  if (!userData) return <Redirect to="/login" />;
  return (
    <section>
      {!userData ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <WelcomeText>Posts</WelcomeText>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Posts posts={posts} />
          </Grid>
          <Hidden xsDown>
            <Grid item xs={12} sm={4}>
              <Notifications notifications={notifications} />
            </Grid>
          </Hidden>
        </Grid>
      )}
    </section>
  );
};

export default Dashboard;

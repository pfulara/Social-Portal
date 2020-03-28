import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles.css";
import { Container } from "@material-ui/core";

import Login from "./components/front/Login";
import Signup from "./components/front/Signup";
import Header from "./components/front/Header";
import Footer from "./components/front/Footer";
import Home from "./components/front/Home";
import Logout from "./components/front/Logout";
import database from "./database";

import Dashboard from "./components/dashboard/Dashboard";
import NewPost from "./components/dashboard/NewPost";

export default function App() {
  const [user, setUser] = useState(false || sessionStorage.getItem("uid"));
  const [userData, setUserData] = useState({});
  useEffect(() => {
    database
      .database()
      .ref(`users/${user}`)
      .once("value")
      .then(snapshot => {
        setUserData(snapshot.val());
      });
  }, [user]);
  return (
    <BrowserRouter>
      <Header userData={userData} />
      <Container
        style={{
          marginBottom: "30px",
          marginTop: "150px",
          background: "#fff",
          boxShadow: "2px 2px 5px #666"
        }}
      >
        <Switch>
          <Route path="/logout">
            <Logout
              userData={userData}
              setUserData={setUserData}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/login">
            <Login
              userData={userData}
              setUserData={setUserData}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/signup">
            <Signup userData={userData} user={user} setUser={setUser} />
          </Route>
          <Route path="/dashboard">
            <Dashboard userData={userData} />
          </Route>
          <Route path="/new-post">
            <NewPost userData={userData} />
          </Route>
          <Route path="/">
            <Home userData={userData} />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

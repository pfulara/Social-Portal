import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import database from "../../database";
import {
  styled,
  Grid,
  TextField,
  TextareaAutosize,
  Button
} from "@material-ui/core";

const ButtonStyled = styled("button")({
  background: "transparent",
  padding: "0",
  border: "none"
});

const TextareaAutosizeStyled = styled(TextareaAutosize)({
  "&:focus": {
    outline: "none"
  },
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "-webkit-fill-available",
  padding: "10px"
});

const NewPost = ({ userData }) => {
  const [postAdded, setPostAdded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
  if (postAdded) return <Redirect to="/dashboard" />;
  if (!userData) return <Redirect to="/login" />;
  return (
    <section>
      <form
        noValidate
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          if (title.trim().length > 0 && content.trim().length > 0) {
            const date = +new Date();
            const postDate = new Date(date).toLocaleDateString("pl-PL");
            const postTime = new Date(date).toLocaleTimeString("pl-PL");
            const newNotifics = [
              {
                date: postDate,
                time: postTime,
                authorNickname: userData.nickname,
                msg: "has add new post on Wall."
              },
              ...notifications
            ];
            const newPost = [
              {
                title: title,
                content: content,
                authorNickname: userData.nickname,
                date: date
              },
              ...posts
            ];
            database
              .database()
              .ref(`posts`)
              .set(newPost)
              .then(() => {
                database
                  .database()
                  .ref("notifications")
                  .set(newNotifics);
                setTitle("");
                setContent("");
                setPostAdded(true);
              });
          }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>New Post</h1>
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: "100%", "&:focus": { outline: "none" } }}
              variant="outlined"
              name="title"
              required
              value={title}
              placeholder="Post title..."
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosizeStyled
              rowsMin={6}
              variant="outlined"
              name="content"
              required
              value={content}
              placeholder="Post content"
              onChange={e => {
                setContent(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonStyled>
              <Button variant="contained" color="primary">
                Send Post
              </Button>
            </ButtonStyled>
          </Grid>
        </Grid>
      </form>
    </section>
  );
};

export default NewPost;

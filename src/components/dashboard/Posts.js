import React from "react";
import {
  styled,
  Avatar,
  Card,
  CardHeader,
  CardContent
} from "@material-ui/core";

const PostTitle = styled("h2")({
  fontSize: "1.6rem",
  fontWeight: "bold",
  textTransform: "uppercase"
});

const CardStyled = styled(Card)({
  background: "#f7f9fb",
  marginBottom: "30px"
});

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <CardStyled key={`post${index}`}>
          <CardHeader
            avatar={<Avatar>{post.authorNickname.slice(0, 1)}</Avatar>}
            title={post.authorNickname}
            subheader={new Date(post.date).toLocaleDateString("pl-PL")}
          />
          <CardContent>
            <PostTitle>{post.title}</PostTitle>
            <p style={{ textAlign: "justify" }}>{post.content}</p>
          </CardContent>
        </CardStyled>
      ))}
    </div>
  );
};

export default Posts;

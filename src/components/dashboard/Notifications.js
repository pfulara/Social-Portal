import React from "react";
import { styled, Paper } from "@material-ui/core";

const PaperStyled = styled(Paper)({
  padding: "10px",
  marginBottom: "10px"
});

const Notifications = ({ notifications }) => {
  return (
    <div>
      {notifications.map((item, index) => (
        <PaperStyled elevation={3} key={`notifi${index}`}>
          <p>
            {item.date} {item.time}
          </p>
          <p>
            <strong>
              {item.authorNickname} {item.msg}
            </strong>
          </p>
        </PaperStyled>
      ))}
    </div>
  );
};

export default Notifications;

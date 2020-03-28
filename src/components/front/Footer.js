import React from "react";
import { styled } from "@material-ui/core";

const FooterStyled = styled("footer")({
  textAlign: "center"
});

const Footer = () => {
  return (
    <FooterStyled>
      <p>
        created by{" "}
        <a
          rel="noopener noreferrer"
          href="https://github.com/pfulara"
          target="_blank"
        >
          pfulara
        </a>
      </p>
    </FooterStyled>
  );
};

export default Footer;

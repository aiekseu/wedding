import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

const ShrekSomebody = () => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    disable_scrolling();
    setTimeout(() => {
      setHidden(true);
      enable_scrolling();
    }, 4000); // TODO: change to 5000
  }, []);

  let scroll_style_element;

  function disable_scrolling() {
    // Create a style sheet we will only use to disable scrolling :
    scroll_style_element = document.createElement("style");
    document.head.appendChild(scroll_style_element);
    const scroll_style_sheet = scroll_style_element.sheet;

    scroll_style_sheet.insertRule(
      "html{height:100%;overflow-y:hidden;}",
      scroll_style_sheet.cssRules.length
    );
  }

  function enable_scrolling() {
    if (scroll_style_element) document.head.removeChild(scroll_style_element);
  }

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: hidden ? -1 : 100,
        opacity: hidden ? 0.1 : 1,
        transition: "opacity ease-out .7s",
      }}
    >
      <video
        muted
        autoPlay
        loop
        src={"/video/shrek-somebody.mp4"}
        controls={false}
        playsInline
        style={{
          height: "100vh",
          minWidth: "100vw",
          overflow: "hidden",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default ShrekSomebody;

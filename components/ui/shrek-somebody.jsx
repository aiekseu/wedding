import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ASSETS_URL } from "../../utils/consts";

const ShrekSomebody = () => {
  const [hidden, setHidden] = useState(false);
  const [playing, setPlaying] = useState(false);
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

  useEffect(() => {
    disable_scrolling();
  }, []);

  const startVideo = () => {
    setPlaying(true);
    setTimeout(() => {
      setHidden(true);
      enable_scrolling();
    }, 4000); // TODO: change to 5000
  };

  return (
    <>
      {!playing && (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            background: "rgba(221,222,205,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
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
          src={ASSETS_URL + "shrek-somebody.mp4"}
          controls={false}
          playsInline
          onPlay={startVideo}
          onLoad={startVideo}
          style={{
            height: "100vh",
            minWidth: "100vw",
            overflow: "hidden",
            objectFit: "cover",
          }}
        />
      </Box>
    </>
  );
};

export default ShrekSomebody;

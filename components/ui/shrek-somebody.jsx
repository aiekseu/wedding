import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ASSETS_URL } from "../../utils/consts";

const ShrekSomebody = () => {
  const [hidden, setHidden] = useState(false);
  const [playing, setPlaying] = useState(false);

  const startVideo = () => {
    setPlaying(true);
    setTimeout(() => {
      setHidden(true);
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

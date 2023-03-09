import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ASSETS_URL } from "../../utils/consts";
import theme from "../../styles/theme";

const stickers = Array(16)
  .fill()
  .map((v, i) => `${ASSETS_URL}stickers/${i + 1}.png`)
  .sort(() => (Math.random() > 0.5 ? 1 : -1));

const xCords = Array(20)
  .fill()
  .map(() => `${(Math.floor(Math.random() * 100) % 60) - 10}%`);

const yCords = Array(20)
  .fill()
  .map(() => `${Math.floor(Math.random() * 100) % 60}%`);

const rotations = Array(20)
  .fill()
  .map(() => `${Math.floor(Math.random() * 50 - 25)}deg`);

const Stickers = () => {
  const [stickerNum, setStickerNum] = useState(1);

  useEffect(() => {
    let i = 0;
    let increment = true;
    let interval = setInterval(() => {
      setStickerNum((prev) => (increment ? prev + 1 : prev - 1));
      if (i === 18) increment = false;
      if (i === 0) increment = true;
      increment ? i++ : i--;
    }, 500);
  }, []);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      position={"relative"}
      overflow={"hidden"}
      sx={{
        [theme.breakpoints.down("md")]: {
          height: "50vh",
          mt: 4,
        },
      }}
    >
      {stickers.map((src, index) => (
        <Box
          key={src}
          sx={{
            position: "absolute",
            top: yCords[index],
            left: xCords[index],
            width: "250px",
            height: "250px",
            opacity: stickerNum > index ? 1 : 0,
            transition: "opacity ease-in .1s",
            transform: `rotate(${rotations[index]})`,
            backgroundImage: `url(${src})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        />
      ))}
    </Box>
  );
};

export default Stickers;

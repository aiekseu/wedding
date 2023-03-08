import React from "react";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ShrekButton = (props) => {
  return (
    <LoadingButton
      variant={"contained"}
      {...props}
      sx={{
        background: (theme) => theme.palette.secondary.main,
        ...props.sx,
      }}
    >
      <Typography sx={{ color: "white" }}>{props.children}</Typography>
    </LoadingButton>
  );
};

export default ShrekButton;

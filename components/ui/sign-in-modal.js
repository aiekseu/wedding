import React, { useState } from "react";
import { Dialog, Stack, TextField, Typography } from "@mui/material";
import { createDefaultMaskGenerator, useWebMask } from "react-hook-mask";
import ShrekButton from "./button";
import theme from "../../styles/theme";
import usePageRedirect from "../../utils/use-page-redirect";

const maskGenerator = createDefaultMaskGenerator("+9 (999) 999 99-99");

const SignInDialog = ({ open, handleClose }) => {
  const [mobile, setMobile] = useState("");

  const toOnboarding = usePageRedirect("/profile/onboarding");

  const handleSignIn = () => {
    localStorage.setItem("id", mobile);
    handleClose();
    toOnboarding();
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"sm"} onClose={handleClose}>
      <Stack
        direction={"column"}
        sx={{ p: 2, background: theme.palette.primary.background }}
      >
        <Typography variant={"h4"}>Войти</Typography>
        <MobileNumberInput
          maskGenerator={maskGenerator}
          value={mobile}
          onChange={setMobile}
          variant={"standard"}
          label={"Номер телефона"}
          placeholder={"+7 (908) 954 87-93"}
          hint={"Пожалуйста, запомните этот номер телефона"}
          sx={{ mt: 1 }}
        />
        <ShrekButton
          sx={{ mt: 2, py: 1 }}
          onClick={handleSignIn}
          disabled={mobile.length !== 11}
        >
          Подтвердить присутствие
        </ShrekButton>
      </Stack>
    </Dialog>
  );
};

const MobileNumberInput = React.forwardRef(
  (
    {
      maskGenerator,
      value: outerValue,
      onChange: onChangeOuter,
      keepMask,
      ...otherProps
    },
    outerRef
  ) => {
    const { value, onChange, ref } = useWebMask({
      maskGenerator,
      value: outerValue,
      onChange: onChangeOuter,
      keepMask,
      ref: outerRef,
    });

    return (
      <TextField {...otherProps} value={value} onChange={onChange} ref={ref} />
    );
  }
);

export default SignInDialog;

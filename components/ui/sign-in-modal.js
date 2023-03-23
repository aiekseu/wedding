import React, { useState } from "react";
import { Dialog, Stack, TextField, Typography } from "@mui/material";
import { createDefaultMaskGenerator, useWebMask } from "react-hook-mask";
import ShrekButton from "./button";
import theme from "../../styles/theme";
import usePageRedirect from "../../utils/use-page-redirect";
import axios from "axios";
import { API_URL } from "../../utils/consts";

const maskGenerator = createDefaultMaskGenerator("+9 (999) 999 99-99");

const SignInDialog = ({ open, handleClose }) => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const toOnboarding = usePageRedirect("/profile/onboarding");
  const toProfile = usePageRedirect("/profile");

  const handleSignIn = async () => {
    setLoading(true);
    const user = await axios.get(API_URL, {
      params: { data: "userById", id: mobile },
    });

    localStorage.setItem("id", mobile);
    setLoading(false);

    if (user.data.length > 0) {
      // if user already exist
      localStorage.setItem("user", JSON.stringify(user.data));
      handleClose();
      toProfile();
    } else {
      handleClose();
      toOnboarding();
    }
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
          loading={loading}
        >
          Войти в профиль
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

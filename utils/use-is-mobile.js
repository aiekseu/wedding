import { useMediaQuery } from "@mui/material";

const useIsMobile = () =>
  useMediaQuery((theme) => theme.breakpoints.down("md"));

export default useIsMobile;

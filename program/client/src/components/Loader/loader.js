import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

export const Loader = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

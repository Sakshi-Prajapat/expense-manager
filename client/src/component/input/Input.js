import React from "react";
import TextField from "@mui/material/TextField";

export const Input = ({ placehoder, label, type, value, handleChange }) => {
  return (
    <>
      <TextField required label="Required" defaultValue="Hello World" />
    </>
  );
};

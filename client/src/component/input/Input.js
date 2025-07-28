import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
// import theme from "../../util/theme/theme";

export const Input = ({ placehoder, label, type, value, handleChange,...rest }) => {
  const theme = useTheme();
  return (
    <>
      <TextField
        fullWidth
        type={type}
        placeholder={placehoder}
        label={label}
        value={value}
        onChange={handleChange}
        variant="filled"
        
        InputProps={{ disableUnderline: true , sx:{
          // backgroundColor: theme.palette.background.default
        }}}
        {...rest}
      />
    </>
  );
};

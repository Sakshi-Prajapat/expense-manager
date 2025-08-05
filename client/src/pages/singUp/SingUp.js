import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Input } from "../../component";

export const SingUp = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",

          overflow: "hidden",
          width: 500,
          height: 350,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 4,
            backgroundColor: theme.palette.secondary.main,
            // opacity:0.7
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Input placehoder="Email" />
            </Grid>
            <Grid item xs={12}>
              <Input placehoder="User Name" type="text" />
            </Grid>
            <Grid item xs={12}>
              <Input placehoder="Password" type="password" />
            </Grid>

            

            <Grid item xs={12}>
              <Button variant="contained" style={{
                padding:10,
                width:"150px",
                margin:6
              }}>Sing Up</Button>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            width: 500,
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // opacity:0.7
          }}
        >
          <Typography variant="h6" color="white">
            SING UP
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};


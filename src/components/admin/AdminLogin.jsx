import React, { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  InputAdornment,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";

import {
  School,
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    navigate("/s-admin/dashboard");
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: "24px",
          px: { xs: 3, sm: 5 },
          py: { xs: 3, sm: 4 },
          border: "1px solid #E5E7EB",
          background: theme.palette.background.paper,
          boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
        }}
      >

        {/* LOGO */}
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "18px",
            background: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <School
            sx={{
              color: "#fff",
              fontSize: 30,
            }}
          />
        </Box>

        {/* HEADER */}
        <Box textAlign="center" mb={2}>

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              fontSize: {
                xs: "1.6rem",
                sm: "2rem",
              },

              color: theme.palette.text.primary,

              mb: 0.5,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: 16,
            }}
          >
            Sign in to Bright Hill Academy ERP
            {/* Sign in to ERP */}
          </Typography>

        </Box>

        {/* FORM */}
        <Stack spacing={2}>

          {/* EMAIL */}
          <Box>

            <Typography
              sx={{
                mb: 1,
                fontWeight: 600,
                fontSize: 14,
                color: theme.palette.text.primary,
              }}
            >
              Email address
            </Typography>

            <TextField
              fullWidth
              placeholder="admin@brighthill.edu"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined
                      sx={{
                        color: theme.palette.text.secondary,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  background:
                    theme.palette.background.default,
                  height: 54,
                },
              }}
            />

          </Box>

          {/* PASSWORD */}
          <Box>

            <Typography
              sx={{
                mb: 1,
                fontWeight: 600,
                fontSize: 14,
                color: theme.palette.text.primary,
              }}
            >
              Password
            </Typography>

            <TextField
              fullWidth
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter password"
              size="medium"
              InputProps={{

                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined
                      sx={{
                        color: theme.palette.text.secondary,
                      }}
                    />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {
                        showPassword
                          ? <VisibilityOff />
                          : <Visibility />
                      }
                    </IconButton>

                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  background:
                    theme.palette.background.default,
                  height: 54,
                },
              }}
            />

          </Box>

          {/* REMEMBER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >

            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography fontSize={14}>
                  Remember me
                </Typography>
              }
            />

            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Forgot password?
            </Typography>

          </Box>

          {/* LOGIN BUTTON */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/s-admin/dashboard")}
            sx={{
              height: 52,
              borderRadius: "16px",
              fontSize: 18,
              fontWeight: 700,
              background:
                theme.palette.primary.main,
              "&:hover": {
                background:
                  theme.palette.secondary.main,
              },
            }}
          >
            Sign In
          </Button>

        </Stack>

        {/* DIVIDER */}
        <Box mt={3} mb={3}>

          <Divider>

            <Typography
              sx={{
                color:
                  theme.palette.text.secondary,
                px: 1,
                fontSize: 14,
              }}
            >
              Or continue with
            </Typography>

          </Divider>

        </Box>

        {/* SOCIAL BUTTONS */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => window.open("https://accounts.google.com/", "_blank")}
            sx={{
              height: 50,
              borderRadius: "14px",
              fontSize: 16,
              color: theme.palette.text.primary,
              borderColor: "#E2E8F0",
            }}
          >
            Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<MicrosoftIcon />}
            onClick={() =>
              window.open(
                "https://login.microsoftonline.com/",
                "_blank"
              )
            }
            sx={{
              height: 50,
              borderRadius: "14px",
              fontSize: 16,
              color: theme.palette.text.primary,
              borderColor: "#E2E8F0",
            }}
          >
            Microsoft
          </Button>

        </Stack>

        {/* FOOTER */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >

          <Typography
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
              fontSize: 14,
            }}
          >
            Don’t have an account?{" "}

            <span
              onClick={() => navigate("/signup")}
              style={{
                color: theme.palette.primary.main,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Sign Up
            </span>

          </Typography>

          <Typography
            sx={{
              color: "#CBD5E1",
              fontSize: 13,
            }}
          >
            Privacy Policy • Terms of Service
          </Typography>

        </Box>

      </Paper>

    </Box>
  );
};

export default AdminLogin;
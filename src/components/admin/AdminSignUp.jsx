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
  PersonOutlineOutlined,
} from "@mui/icons-material";

import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";

import { useNavigate } from "react-router-dom";

const AdminSignUp = () => {

  const theme = useTheme();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:theme.palette.background.default,
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
          maxWidth: 470,

          borderRadius: "20px",

          px: { xs: 2.5, sm: 4 },
          py: { xs: 2.5, sm: 3 },

          border: "1px solid #E5E7EB",

          background:
            theme.palette.background.paper,

          boxShadow:
            "0 8px 30px rgba(15,23,42,0.06)",
        }}
      >

        {/* LOGO */}
        <Box
          sx={{
            width: 56,
            height: 56,

            borderRadius: "16px",

            background:
              theme.palette.primary.main,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            mx: "auto",
            mb: 1.5,
          }}
        >
          <School
            sx={{
              color: "#fff",
              fontSize: 28,
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

              color:
                theme.palette.text.primary,

              mb: 0.5,
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              color:
                theme.palette.text.secondary,

              fontSize: 14,
            }}
          >
            Sign up to Bright Hill Academy ERP
          </Typography>

        </Box>

        {/* FORM */}
        <Stack spacing={1.8}>

          {/* FULL NAME */}
          <Box>

            <Typography
              sx={{
                mb: 0.7,
                fontWeight: 600,
                fontSize: 13,

                color:
                  theme.palette.text.primary,
              }}
            >
              Full Name
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your full name"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlined
                      sx={{
                        color:
                          theme.palette.text.secondary,
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",

                  background:
                    theme.palette.background.default,

                  height: 48,
                },
              }}
            />

          </Box>

          {/* EMAIL */}
          <Box>

            <Typography
              sx={{
                mb: 0.7,
                fontWeight: 600,
                fontSize: 13,

                color:
                  theme.palette.text.primary,
              }}
            >
              Email address
            </Typography>

            <TextField
              fullWidth
              placeholder="admin@brighthill.edu"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined
                      sx={{
                        color:
                          theme.palette.text.secondary,
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",

                  background:
                    theme.palette.background.default,

                  height: 48,
                },
              }}
            />

          </Box>

          {/* PASSWORD */}
          <Box>

            <Typography
              sx={{
                mb: 0.7,
                fontWeight: 600,
                fontSize: 13,

                color:
                  theme.palette.text.primary,
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
              size="small"
              InputProps={{

                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined
                      sx={{
                        color:
                          theme.palette.text.secondary,
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      size="small"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {
                        showPassword
                          ? <VisibilityOff fontSize="small" />
                          : <Visibility fontSize="small" />
                      }
                    </IconButton>

                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",

                  background:
                    theme.palette.background.default,

                  height: 48,
                },
              }}
            />

          </Box>

          {/* OPTIONS */}
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
              sx={{ m: 0 }}
              control={<Checkbox size="small" />}
              label={
                <Typography fontSize={13}>
                  Remember me
                </Typography>
              }
            />

            <Typography
              onClick={() =>
                navigate("/")
              }
              sx={{
                color:
                  theme.palette.primary.main,

                fontWeight: 600,
                fontSize: 13,

                cursor: "pointer",
              }}
            >
              Already have an account?
            </Typography>

          </Box>

          {/* SIGN UP BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 46,

              borderRadius: "14px",

              fontSize: 16,
              fontWeight: 700,

              background:
                theme.palette.primary.main,

              "&:hover": {
                background:
                  theme.palette.secondary.main,
              },
            }}
          >
            Sign Up
          </Button>

        </Stack>

        {/* DIVIDER */}
        <Box mt={2.5} mb={2.5}>

          <Divider>

            <Typography
              sx={{
                color:
                  theme.palette.text.secondary,

                px: 1,
                fontSize: 13,
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
          spacing={1.5}
        >

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() =>
              window.open(
                "https://accounts.google.com/",
                "_blank"
              )
            }
            sx={{
              height: 46,

              borderRadius: "12px",

              fontSize: 14,

              color:
                theme.palette.text.primary,

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
              height: 46,

              borderRadius: "12px",

              fontSize: 14,

              color:
                theme.palette.text.primary,

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
            mt: 3,
          }}
        >

          <Typography
            sx={{
              color:
                theme.palette.text.secondary,

              mb: 0.5,
              fontSize: 13,
            }}
          >
            Having trouble?{" "}

            <span
              style={{
                color:
                  theme.palette.primary.main,

                cursor: "pointer",

                fontWeight: 600,
              }}
            >
              Contact Administrator
            </span>

          </Typography>

          <Typography
            sx={{
              color: "#CBD5E1",
              fontSize: 12,
            }}
          >
            Privacy Policy • Terms of Service
          </Typography>

        </Box>

      </Paper>

    </Box>
  );
};

export default AdminSignUp;
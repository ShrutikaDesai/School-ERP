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

const AdminSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F4F7FB",
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
          maxWidth: 520,
          borderRadius: "32px",
          px: { xs: 3, sm: 6 },
          py: { xs: 4, sm: 5 },
          border: "1px solid #E5E7EB",
          boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
        }}
      >
        {/* LOGO */}
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "22px",
            background: "#1E293B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
          }}
        >
          <School sx={{ color: "#fff", fontSize: 34 }} />
        </Box>

        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem" },
              color: "#0F172A",
              mb: 1,
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: 18,
            }}
          >
            Sign up to Bright Hill Academy ERP
          </Typography>
        </Box>

        {/* FORM */}
        <Stack spacing={3}>
          {/* FULL NAME */}
          <Box>
            <Typography
              sx={{
                mb: 1,
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Full Name
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your full name"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlined  sx={{ color: "#94A3B8" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "18px",
                  background: "#F8FAFC",
                  height: 62,
                },
              }}
            />
          </Box>

          {/* EMAIL */}
          <Box>
            <Typography
              sx={{
                mb: 1,
                fontWeight: 600,
                color: "#334155",
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
                    <EmailOutlined sx={{ color: "#94A3B8" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "18px",
                  background: "#F8FAFC",
                  height: 62,
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
                color: "#334155",
              }}
            >
              Password
            </Typography>

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "#94A3B8" }} />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "18px",
                  background: "#F8FAFC",
                  height: 62,
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
              control={<Checkbox />}
              label="Remember me"
            />

            <Typography
              sx={{
                color: "#4F46E5",
                fontWeight: 600,
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
              height: 58,
              borderRadius: "18px",
              textTransform: "none",
              fontSize: 20,
              fontWeight: 700,
              background:
                "linear-gradient(135deg,#F87171,#EF4444)",
              boxShadow: "none",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#EF4444,#DC2626)",
                boxShadow: "none",
              },
            }}
          >
            Sign Up
          </Button>
        </Stack>

        {/* DIVIDER */}
        <Box mt={5} mb={4}>
          <Divider>
            <Typography
              sx={{
                color: "#94A3B8",
                px: 1,
              }}
            >
              Or continue with
            </Typography>
          </Divider>
        </Box>

        {/* SOCIAL BUTTONS */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon size={22} />}
            sx={{
              height: 56,
              borderRadius: "16px",
              textTransform: "none",
              fontSize: 18,
              color: "#0F172A",
              borderColor: "#E2E8F0",
            }}
          >
            Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <MicrosoftIcon
                size={18}
                color="#2563EB"
              />
            }
            sx={{
              height: 56,
              borderRadius: "16px",
              textTransform: "none",
              fontSize: 18,
              color: "#0F172A",
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
            mt: 6,
          }}
        >
          <Typography
            sx={{
              color: "#94A3B8",
              mb: 1,
            }}
          >
            Having trouble?{" "}
            <span
              style={{
                color: "#4F46E5",
                cursor: "pointer",
              }}
            >
              Contact Administrator
            </span>
          </Typography>

          <Typography
            sx={{
              color: "#CBD5E1",
              fontSize: 14,
            }}
          >
            Privacy Policy &nbsp; • &nbsp; Terms of Service
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminSignUp;
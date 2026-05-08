import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Divider,
  Chip,
  TextField,
  Stack,
  Paper,
} from "@mui/material";

import {
  Edit,
  Email,
  Phone,
  LocationOn,
  School,
  Badge,
  CalendarMonth,
} from "@mui/icons-material";

const Profile = () => {
  const profileData = {
    name: "Admin User",
    role: "School Administrator",
    email: "admin@schoolerp.com",
    phone: "+91 9876543210",
    address: "Pune, Maharashtra, India",
    department: "Administration",
    joiningDate: "12 Jan 2024",
    schoolName: "Modern Public School",
    bio: "Responsible for managing school operations, student records, staff coordination, and administrative reporting.",
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#eef3f8",
        minHeight: "100vh",
      }}
    >
      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#1b2b4b", mb: 4 }}
      >
        My Profile
      </Typography>

      <Grid container spacing={4} alignItems="flex-start">
        {/* LEFT PROFILE CARD */}
        <Grid item xs={12} md={4} lg={3}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                p: 4,
              }}
            >
              <Avatar
                src="https://i.pravatar.cc/300?img=12"
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 3,
                  border: "4px solid #EAF2FB",
                }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#13294b" }}
              >
                {profileData.name}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {profileData.role}
              </Typography>

              <Chip
                label="Active"
                sx={{
                  backgroundColor: "#2e7d32",
                  color: "#fff",
                  fontWeight: 600,
                  px: 1,
                }}
              />

              <Divider sx={{ my: 4 }} />

              <Stack spacing={3} alignItems="center">
                <Box textAlign="center">
                  <Email color="primary" />
                  <Typography variant="body2" mt={1}>
                    {profileData.email}
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <Phone color="primary" />
                  <Typography variant="body2" mt={1}>
                    {profileData.phone}
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <LocationOn color="primary" />
                  <Typography variant="body2" mt={1}>
                    {profileData.address}
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <School color="primary" />
                  <Typography variant="body2" mt={1}>
                    {profileData.schoolName}
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant="contained"
                startIcon={<Edit />}
                fullWidth
                sx={{
                  mt: 4,
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontSize: "15px",
                  textTransform: "none",
                }}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT DETAILS */}
        <Grid item xs={12} md={8} lg={9}>
          {/* PERSONAL INFO */}
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#13294b", mb: 3 }}
              >
                Personal Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={profileData.name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Role"
                    value={profileData.role}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={profileData.department}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Joining Date"
                    value={profileData.joiningDate}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Bio"
                    value={profileData.bio}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* RECENT ACTIVITY */}
          <Paper
            sx={{
              mt: 4,
              p: 4,
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#13294b" }}
            >
              Recent Activity
            </Typography>

            <Stack spacing={3} mt={3}>
              <Box display="flex" alignItems="center" gap={2}>
                <Badge color="primary" />
                <Typography variant="body1">
                  Updated student management settings
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <CalendarMonth color="primary" />
                <Typography variant="body1">
                  Generated monthly attendance report
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <School color="primary" />
                <Typography variant="body1">
                  Added new academic section
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
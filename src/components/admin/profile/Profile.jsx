import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { useState } from "react";

import { Edit } from "@mui/icons-material";
import EditProfile from "./EditProfile";

const Profile = () => {
  const profileData = {
    firstName: "Admin",
    lastName: "User",
    role: "Admin",
    city: "Pune, Maharashtra",
    dob: "12-10-1990",
    email: "admin@school.com",
    phone: "(+91) 9876543210",
    country: "India",
    fullCity: "Bavadhan, Pune",
    // postalCode: "ERT 1254",
    avatar: "https://i.pravatar.cc/300?img=12",
  };
  const [openPersonalModal, setOpenPersonalModal] = useState(false);

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* PAGE TITLE */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ color: "#12332b", mb: 3 }}
      >
        My Profile
      </Typography>

      {/* TOP PROFILE CARD */}
      <Card
        sx={{
          borderRadius: 3,
          mb: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 3,
      flexDirection: "row",
    }}
  >
    {/* AVATAR */}
    <Avatar
      src={profileData.avatar}
      sx={{
        width: 80,
        height: 80,
        flexShrink: 0,
      }}
    />

    {/* USER DETAILS */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          color: "#0b4b3e",
          lineHeight: 1.4,
        }}
      >
        {profileData.firstName} {profileData.lastName}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        {profileData.role}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        {profileData.city}
      </Typography>
    </Box>
  </Box>
</CardContent>
      </Card>

      {/* PERSONAL INFORMATION */}
      <EditProfile
  open={openPersonalModal}
  handleClose={() => setOpenPersonalModal(false)}
  profileData={profileData}
/>
     {/* PERSONAL INFORMATION + ADDRESS COMBINED CARD */}
<Card
  sx={{
    borderRadius: 3,
    mb: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  }}
>
  <CardContent sx={{ p: 4 }}>
    
    {/* HEADER */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "relative",
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ color: "#12332b" }}
      >
        Personal Information
      </Typography>

      <Button
        variant="contained"
        size="small"
        onClick={() => setOpenPersonalModal(true)}
        startIcon={<Edit />}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          backgroundColor: "#f59e0b",
          color: "#fff",
          textTransform: "none",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: 500,
          minWidth: "78px",
          height: "34px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#d97706",
          },
        }}
      >
        Edit
      </Button>
    </Box>

    <Divider sx={{ mb: 4 }} />

    {/* DETAILS SECTION */}
<Box sx={{ width: "100%" }}>

  {/* ROW 1 */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 4,
      mb: 4,
    }}
  >
    <Box>
      <Typography variant="body2" color="text.secondary">
        First Name
      </Typography>
      <Typography fontWeight={500}>
        {profileData.firstName}
      </Typography>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        Last Name
      </Typography>
      <Typography fontWeight={500}>
        {profileData.lastName}
      </Typography>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        Date of Birth
      </Typography>
      <Typography fontWeight={500}>
        {profileData.dob}
      </Typography>
    </Box>
  </Box>

  {/* ROW 2 */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 4,
      mb: 4,
    }}
  >
    <Box>
      <Typography variant="body2" color="text.secondary">
        Email Address
      </Typography>
      <Typography fontWeight={500}>
        {profileData.email}
      </Typography>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        Phone Number
      </Typography>
      <Typography fontWeight={500}>
        {profileData.phone}
      </Typography>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        User Role
      </Typography>
      <Typography fontWeight={500}>
        {profileData.role}
      </Typography>
    </Box>
  </Box>

  {/* ROW 3 */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 4,
    }}
  >
    <Box>
      <Typography variant="body2" color="text.secondary">
        Country
      </Typography>
      <Typography fontWeight={500}>
        {profileData.country}
      </Typography>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        City
      </Typography>
      <Typography fontWeight={500}>
        {profileData.fullCity}
      </Typography>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        Postal Code
      </Typography>
      <Typography fontWeight={500}>
        {profileData.postalCode || "411001"}
      </Typography>
    </Box>
  </Box>

</Box>
  </CardContent>
</Card>

      
    </Box>
  );
};

export default Profile;
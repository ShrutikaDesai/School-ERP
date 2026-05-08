import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const EditProfile = ({ open, handleClose, profileData, onSave }) => {
  const [editData, setEditData] = useState(profileData);

  /* UPDATE FORM WHEN PROFILE DATA CHANGES */
  useEffect(() => {
    setEditData(profileData);
  }, [profileData]);

  /* HANDLE INPUT CHANGE */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* SAVE UPDATED DATA */
  const handleSave = () => {
    if (onSave) {
      onSave(editData);
    }

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Edit Personal Information
        </Typography>
      </DialogTitle>

      <Divider />

      {/* FORM CONTENT */}
      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          
          {/* FIRST NAME */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={editData.firstName || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* LAST NAME */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={editData.lastName || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* EMAIL */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={editData.email || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* PHONE */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={editData.phone || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* DOB */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              value={editData.dob || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* ROLE */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={editData.role || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* CITY */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="fullCity"
              value={editData.fullCity || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* COUNTRY */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={editData.country || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* POSTAL CODE */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={editData.postalCode || ""}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      {/* ACTION BUTTONS */}
      <DialogActions
        sx={{
          p: 3,
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#f59e0b",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            "&:hover": {
              backgroundColor: "#d97706",
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
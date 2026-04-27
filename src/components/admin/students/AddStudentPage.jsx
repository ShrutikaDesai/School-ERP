import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  MenuItem,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";

const steps = ["Personal Info", "Guardian Info", "Academic Info"];

const AddStudentPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    fatherName: "",
    motherName: "",
    phone: "",
    class: "",
    school: "",
    city: ""
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fb", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">

        {/* HEADER */}
        <Typography variant="h5" fontWeight={600} mb={1}>
          Add New Student
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Fill in the student admission details
        </Typography>

        {/* STEPPER */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* FORM CARD */}
        <Paper sx={{ p: 4, borderRadius: 2 }}>

          {/* ================= STEP 1 ================= */}
          {activeStep === 0 && (
            <>
              <Typography fontWeight={600} mb={2}>
                Personal Info
              </Typography>

              <Stack spacing={2}>

                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dob}
                    onChange={handleChange("dob")}
                  />

                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    value={formData.gender}
                    onChange={handleChange("gender")}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                </Stack>

                <TextField
                  select
                  fullWidth
                  label="Blood Group"
                  value={formData.bloodGroup}
                  onChange={handleChange("bloodGroup")}
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                </TextField>

              </Stack>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {activeStep === 1 && (
            <>
                <Typography fontWeight={600} mb={3}>
                Guardian Info
                </Typography>

                <Stack spacing={3}>

                {/* ROW 1 */}
                <Stack direction="row" spacing={2}>
                    <TextField
                    fullWidth
                    label="Father's Name"
                    placeholder="Enter father's name"
                    value={formData.fatherName}
                    onChange={handleChange("fatherName")}
                    />

                    <TextField
                    fullWidth
                    label="Mother's Name"
                    placeholder="Enter mother's name"
                    value={formData.motherName}
                    onChange={handleChange("motherName")}
                    />
                </Stack>

                {/* ROW 2 */}
                <Stack direction="row" spacing={2}>
                    <TextField
                    fullWidth
                    label="Phone Number"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    />

                    <TextField
                    fullWidth
                    label="Email Address"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange("email")}
                    />
                </Stack>

                {/* ADDRESS */}
                <TextField
                    fullWidth
                    label="Address"
                    placeholder="Enter complete address"
                    multiline
                    rows={4}
                    value={formData.address}
                    onChange={handleChange("address")}
                />

                </Stack>
            </>
            )}

          {/* ================= STEP 3 ================= */}
            {activeStep === 2 && (
            <>
                <Typography fontWeight={600} mb={3}>
                Academic Info
                </Typography>

                <Stack spacing={3}>

                {/* ROW 1 */}
                <Stack direction="row" spacing={2}>
                    <TextField
                    fullWidth
                    label="Admission Number"
                    placeholder="Enter admission number"
                    value={formData.admissionNumber || ""}
                    onChange={handleChange("admissionNumber")}
                    />

                    <TextField
                    select
                    fullWidth
                    label="Class"
                    value={formData.class}
                    onChange={handleChange("class")}
                    >
                    <MenuItem value="1">Class 1</MenuItem>
                    <MenuItem value="2">Class 2</MenuItem>
                    <MenuItem value="3">Class 3</MenuItem>
                    <MenuItem value="4">Class 4</MenuItem>
                    <MenuItem value="5">Class 5</MenuItem>
                    <MenuItem value="6">Class 6</MenuItem>
                    <MenuItem value="7">Class 7</MenuItem>
                    <MenuItem value="8">Class 8</MenuItem>
                    <MenuItem value="9">Class 9</MenuItem>
                    <MenuItem value="10">Class 10</MenuItem>    
                    </TextField>
                </Stack>

                {/* ROW 2 */}
                <Stack direction="row" spacing={2}>
                    <TextField
                    select
                    fullWidth
                    label="Section"
                    value={formData.section || ""}
                    onChange={handleChange("section")}
                    >
                    <MenuItem value="A">Section A</MenuItem>
                    <MenuItem value="B">Section B</MenuItem>
                    <MenuItem value="C">Section C</MenuItem>
                    <MenuItem value="C">Section D</MenuItem>

                    </TextField>

                    <TextField
                    fullWidth
                    type="date"
                    label="Admission Date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.admissionDate || ""}
                    onChange={handleChange("admissionDate")}
                    />
                </Stack>

                {/* ROW 3 */}
                <TextField
                    select
                    fullWidth
                    label="Discount Type"
                    value={formData.discountType || ""}
                    onChange={handleChange("discountType")}
                >
                    <MenuItem value="none">No Discount</MenuItem>
                    <MenuItem value="sibling">Sibling Discount</MenuItem>
                    <MenuItem value="scholarship">Staff Ward Discount</MenuItem>
                    <MenuItem value="scholarship">Merit Scholarship</MenuItem>
                    <MenuItem value="scholarship">Financial Aid</MenuItem>
                </TextField>

                </Stack>
            </>
            )}

          {/* ================= BUTTONS ================= */}
          <Box mt={4} display="flex" alignItems="center">
  
  {/* LEFT */}
  <Button
    disabled={activeStep === 0}
    onClick={handleBack}
    variant="outlined"
  >
    Previous
  </Button>

  {/* THIS pushes Next to the extreme right */}
  <Box sx={{ marginLeft: "auto" }}>
    <Button
      variant="contained"
      onClick={handleNext}
    >
      {activeStep === steps.length - 1 ? "Save Student" : "Next"}
    </Button>
  </Box>

</Box>

        </Paper>

      </Container>
    </Box>
  );
};

export default AddStudentPage;
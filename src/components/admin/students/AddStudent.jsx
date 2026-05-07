import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { Row, Col, Grid as AntGrid, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";

const { useBreakpoint } = AntGrid;

const steps = ["Personal Info", "Guardian Info", "Academic Info"];

const AddStudent = () => {
  const screens = useBreakpoint();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    email: "",
    address: "",
    admissionNumber: "",
    class: "",
    section: "",
    admissionDate: "",
    discountType: ""
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1440,
        mx: "auto",
        px: screens.xs ? 0 : 2,
        py: screens.xs ? 3 : 2,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Typography variant="h5" color="text.primary">
          Add New Student
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          Fill in the student admission details
        </Typography>

        {/* STEPPER */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel={!isMobile}
          orientation={isMobile ? "vertical" : "horizontal"}
          sx={{
            mb: 4,
            mt: 4,

            "& .MuiStepIcon-root.Mui-active": {
              color: theme.palette.primary.main
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: theme.palette.primary.main
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: theme.palette.primary.main,
              fontWeight: 600
            },
            "& .MuiStepLabel-label.Mui-completed": {
              color: theme.palette.primary.main
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* FORM CARD */}
        <Paper
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            backgroundColor: theme.palette.background.paper
          }}
        >

          {/* ================= STEP 1 ================= */}
          {activeStep === 0 && (
            <>
              <Typography fontWeight={600} mb={3}>
                Personal Info
              </Typography>

              <Row gutter={[16, 16]}>

                <Col xs={24} sm={12}>
                  <TextField fullWidth label="First Name" />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField fullWidth label="Last Name" />
                </Col>

                <Col xs={24} sm={12}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob ? dayjs(formData.dob) : null}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        dob: val?.format("YYYY-MM-DD")
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        placeholder: "MM/DD/YYYY"
                      }
                    }}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField select fullWidth label="Gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                </Col>

                <Col xs={24} sm={12}>
                  <TextField select fullWidth label="Blood Group">
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                  </TextField>
                </Col>

                {/* Upload */}
                <Col xs={24}>
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    style={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        border: "2px dashed #d1d5db",
                        borderRadius: 3,
                        height: 150,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        background: "#fafafa",
                        cursor: "pointer",
                        transition: "0.3s",

                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                          background: "#f5f7ff"
                        }
                      }}
                    >
                      <UploadOutlined
                        style={{
                          fontSize: 28,
                          color: theme.palette.primary.main
                        }}
                      />

                      <Typography fontWeight={500} mt={1}>
                        Upload Student Photo
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Click or drag file to upload
                      </Typography>
                    </Box>
                  </Upload>
                </Col>

              </Row>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {activeStep === 1 && (
            <>
              <Typography fontWeight={600} mb={3}>
                Guardian Info
              </Typography>

              <Row gutter={[16, 16]}>

                <Col xs={24} sm={12}>
                  <TextField fullWidth label="Father Name" />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField fullWidth label="Mother Name" />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField fullWidth label="Phone" />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField fullWidth label="Email" />
                </Col>

                <Col xs={24}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Address"
                  />
                </Col>

              </Row>
            </>
          )}

          {/* ================= STEP 3 ================= */}
          {activeStep === 2 && (
            <>
              <Typography fontWeight={600} mb={3}>
                Academic Info
              </Typography>

              <Row gutter={[16, 16]}>

                <Col xs={24} sm={12}>
                  <TextField fullWidth label="Admission Number" />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField select fullWidth label="Class">
                    {[1,2,3,4,5,6,7,8,9,10].map(c => (
                      <MenuItem key={c} value={c}>
                        Class {c}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>

                <Col xs={24} sm={12}>
                  <TextField select fullWidth label="Section">
                    {["A","B","C","D"].map(sec => (
                      <MenuItem key={sec} value={sec}>
                        Section {sec}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>

                <Col xs={24} sm={12}>
                  <DatePicker
                    label="Admission Date"
                    value={formData.admissionDate ? dayjs(formData.admissionDate) : null}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        admissionDate: val?.format("YYYY-MM-DD")
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        placeholder: "MM/DD/YYYY"
                      }
                    }}
                  />
                </Col>

                <Col xs={24}>
                  <TextField select fullWidth label="Discount Type">
                    <MenuItem value="none">No Discount</MenuItem>
                    <MenuItem value="sibling">Sibling</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                  </TextField>
                </Col>

              </Row>
            </>
          )}

          <br></br>

          {/* BUTTONS */}
        <Box
  mt={4}
  display="flex"
  flexDirection={isMobile ? "column" : "row"}
  alignItems="center"
  gap={2}
>
  {/* PREVIOUS BUTTON */}
  <Box sx={{ flex: 1 }}>
    <Button
      fullWidth={isMobile}
      disabled={activeStep === 0}
      onClick={handleBack}
      variant="outlined"
      startIcon={<ArrowBackIcon />}
    >
      Previous
    </Button>
  </Box>

  {/* NEXT / SAVE BUTTON */}
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "flex-end"
    }}
  >
    <Button
      fullWidth={isMobile}
      variant="contained"
      onClick={handleNext}
      endIcon={
        activeStep === steps.length - 1 ? (
          <SaveIcon />
        ) : (
          <ArrowForwardIcon />
        )
      }
      sx={{
        mt: isMobile ? 2 : 0,
        px: 4,
        marginTop: isMobile ? 2 : -5
      }}
    >
      {activeStep === steps.length - 1
        ? "Save Student"
        : "Next"}
    </Button>
  </Box>
</Box>

        </Paper>
      </Container>
    </Box>
  );
};

export default AddStudent;
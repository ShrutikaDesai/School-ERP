import React, { useState, useEffect } from "react";
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
  Stack,
  useMediaQuery,
  useTheme,
  Switch,
  Collapse,
  IconButton,
} from "@mui/material";

import { Row, Col, Grid as AntGrid, Upload, message, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  addStudentToStorage,
  getStoredStudents,
  saveStudents
} from "./studentStorage";

const { useBreakpoint } = AntGrid;

const steps = [
  "Personal Info",
  "Guardian Info",
  "Academic Info",
  "Fees Info"

];

const classOptions = [
  "FY BCA",
  "SY BCA",
  "TY BCA",
  "FY BSc"
];

const sectionOptions = ["A", "B", "C", "D"];
const bloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
];

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DUMMY_STUDENT_FALLBACK = {
  dob: "2005-06-15",
  bloodGroup: "B+",
  fatherName: "Rajesh Sharma",
  motherName: "Sunita Sharma",
  phone: "9876543210",
  email: "student@example.com",
  address: "123 College Road, Pune",
  admissionDate: "2024-06-01",
  discountType: "none",
  photo:
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='180' viewBox='0 0 300 180'><rect width='300' height='180' fill='%23e3f2fd'/><circle cx='150' cy='68' r='28' fill='%2390caf9'/><path d='M95 150c10-28 36-42 55-42s45 14 55 42' fill='%2390caf9'/><text x='150' y='168' text-anchor='middle' font-family='Arial' font-size='14' fill='%231565c0'>Student Photo</text></svg>"
};

const AddStudent = ({ mode = "add" }) => {
  const screens = useBreakpoint();

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [activeStep, setActiveStep] = useState(0);
  const [primaryGuardianOpen, setPrimaryGuardianOpen] = useState(true);
  const [guardianOpen, setGuardianOpen] = useState(false);

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
    discountType: "",
    photo: "",

    communicationConsent: false
  });

  /* ================= ADD THIS ALSO ================= */

  const tableHeadStyle = {
    textAlign: "left",
    padding: "14px 16px",
    fontSize: 14,
    color: "#64748B",
    borderBottom: "1px solid #E5E7EB"
  };

  const tableCellStyle = {
    padding: "16px",
    borderBottom: "1px solid #E5E7EB",
    fontSize: 15,
    color: "#1F2937"
  };

  const inputFieldStyle = {
    "& .MuiOutlinedInput-root": {
      height: 52,
      borderRadius: "12px",
      backgroundColor: "#fff",

      "& fieldset": {
        borderColor: "#D1D5DB",
      },

      "&:hover fieldset": {
        borderColor: "#9CA3AF",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#6366F1",
        borderWidth: "1.5px",
      },
    },

    "& .MuiInputLabel-root": {
      fontSize: 14,
      color: "#6B7280",
    },

    "& .MuiInputBase-input": {
      fontSize: 15,
      color: "#111827",
    },
  };

  /* ================= LOAD STUDENT ================= */

  useEffect(() => {
    if (!id) return;

    const students = getStoredStudents();

    const existingStudent = students.find(
      (student) =>
        String(student.id) === String(id)
    );

    if (!existingStudent) return;

    const fullName =
      existingStudent.name?.split(" ") || [];

    const mergedStudent = {
      ...DUMMY_STUDENT_FALLBACK,
      ...existingStudent
    };

    setFormData((prev) => ({
      ...prev,
      firstName: fullName[0] || "",
      lastName: fullName.slice(1).join(" "),
      dob: mergedStudent.dob || "",
      bloodGroup: mergedStudent.bloodGroup || "",
      fatherName: mergedStudent.fatherName || "",
      motherName: mergedStudent.motherName || "",
      admissionNumber:
        mergedStudent.rollNo || "",
      class: mergedStudent.class || "",
      section: mergedStudent.section || "",
      gender: mergedStudent.gender || "",
      phone: mergedStudent.phone || "",
      email: mergedStudent.email || "",
      address: mergedStudent.address || "",
      admissionDate: mergedStudent.admissionDate || "",
      discountType: mergedStudent.discountType || "",
      photo: mergedStudent.photo || ""
    }));
  }, [id]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange =
    (field) => (event) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value
      }));
    };

  const handlePhotoUpload = async (file) => {
    try {
      const base64File = await fileToBase64(file);

      setFormData((prev) => ({
        ...prev,
        photo: base64File
      }));
    } catch {
      message.error("Unable to upload photo.");
    }

    return false;
  };

  /* ================= VALIDATION ================= */

  const validateStep = () => {
    if (activeStep === 0) {
      return (
        formData.firstName &&
        formData.lastName &&
        formData.dob &&
        formData.gender &&
        formData.bloodGroup
      );
    }

    if (activeStep === 1) {
      return (
        formData.fatherName &&
        formData.motherName &&
        formData.phone &&
        formData.email &&
        formData.address
      );
    }

    return (
      formData.admissionNumber &&
      formData.class &&
      formData.section &&
      formData.admissionDate &&
      formData.discountType
    );
  };

  /* ================= NEXT ================= */

  const handleNext = () => {
    if (isView) {
      setActiveStep((prev) => prev + 1);
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  /* ================= BACK ================= */

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  /* ================= SAVE / UPDATE ================= */

  const handleSaveStudent = () => {
    if (!validateStep()) {
      message.warning(
        "Please fill all fields before saving."
      );

      return;
    }

    const currentStudents =
      getStoredStudents();

    /* ===== EDIT ===== */

    if (isEdit) {
      const updatedStudents =
        currentStudents.map((student) =>
          String(student.id) === String(id)
            ? {
              ...student,

              name:
                `${formData.firstName} ${formData.lastName}`.trim(),

              rollNo:
                formData.admissionNumber,

              class: formData.class,

              section:
                formData.section,

              gender:
                formData.gender,

              phone:
                formData.phone,

              dob: formData.dob,

              bloodGroup:
                formData.bloodGroup,

              fatherName:
                formData.fatherName,

              motherName:
                formData.motherName,

              email:
                formData.email,

              address:
                formData.address,

              admissionDate:
                formData.admissionDate,

              discountType:
                formData.discountType,

              photo:
                formData.photo
            }
            : student
        );

      localStorage.setItem(
        "students",
        JSON.stringify(updatedStudents)
      );
      saveStudents(updatedStudents);

      message.success(
        "Student updated successfully."
      );
    }

    /* ===== ADD ===== */

    else {
      const nextId =
        currentStudents.length > 0
          ? Math.max(
            ...currentStudents.map(
              (student) =>
                Number(student.id) || 0
            )
          ) + 1
          : 1;

      const student = {
        id: nextId,

        name:
          `${formData.firstName} ${formData.lastName}`.trim(),

        rollNo:
          formData.admissionNumber,

        class: formData.class,

        section:
          formData.section,

        gender:
          formData.gender,

        phone:
          formData.phone,

        dob: formData.dob,

        bloodGroup:
          formData.bloodGroup,

        fatherName:
          formData.fatherName,

        motherName:
          formData.motherName,

        email:
          formData.email,

        address:
          formData.address,

        admissionDate:
          formData.admissionDate,

        discountType:
          formData.discountType,

        photo:
          formData.photo,

        status: "Active"
      };

      addStudentToStorage(student);

      message.success(
        "Student added successfully."
      );
    }

    navigate("/s-admin/students");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1440,
        mx: "auto",
        px: screens.xs ? 0 : 2,
        py: screens.xs ? 3 : 2,
        backgroundColor:
          theme.palette.background.default,
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="lg">

        {/* ================= HEADER ================= */}

        <Typography
          variant="h5"
          color="text.primary"
        >
          {isView
            ? "View Student"
            : isEdit
              ? "Edit Student"
              : "Add New Student"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          Manage student details
        </Typography>

        {/* ================= STEPPER ================= */}

        <Stepper
          activeStep={activeStep}
          alternativeLabel={!isMobile}
          orientation={
            isMobile
              ? "vertical"
              : "horizontal"
          }
          sx={{
            mb: 4,
            mt: 4,

            "& .MuiStepIcon-root.Mui-active":
            {
              color:
                theme.palette.primary.main
            },

            "& .MuiStepIcon-root.Mui-completed":
            {
              color:
                theme.palette.primary.main
            },

            "& .MuiStepLabel-label.Mui-active":
            {
              color:
                theme.palette.primary.main,
              fontWeight: 600
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* ================= FORM CARD ================= */}

        <Paper
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4
            },

            borderRadius: 2,

            border:
              "1px solid #e5e7eb"
          }}
        >

          {/* ================= STEP 1 ================= */}

          {activeStep === 0 && (
            <>
              {/* HEADER */}

              <Box mb={4}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 22,
                      sm: 22
                    },
                    fontWeight: 700,
                    color: "#111827",
                    mb: 1
                  }}
                >
                  Student Details
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15,
                    color: "#6B7280"
                  }}
                >
                  Provide the primary information and residential details of the student.
                </Typography>
              </Box>

              {/* COMMON INPUT STYLE */}

              {/* Add this above return section
    const inputStyle = {
      "& .MuiOutlinedInput-root": {
        height: 54,
        borderRadius: "14px",
        background: "#fff"
      }
    };
    */}
              <br></br>

              {/* BASIC DETAILS */}

              <Paper
                elevation={0}
                sx={{
                  p: {
                    xs: 2,
                    sm: 3
                  },
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  mb: 4
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: "#374151",
                    mb: 3
                  }}
                >
                  BASIC INFORMATION
                </Typography>

                <Row
                  gutter={[28, 28]}
                  align="top"
                >

                  {/* LEFT FORM SECTION */}

                  <Col xs={24} lg={18}>

                    <Row gutter={[20, 20]}>

                      {/* FIRST NAME */}

                      <Col xs={24} sm={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          First Name
                          <span style={{ color: "#EF4444" }}>
                            {" "}*
                          </span>
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="e.g. John"
                          value={formData.firstName}
                          onChange={handleChange("firstName")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* LAST NAME */}

                      <Col xs={24} sm={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Last Name
                          <span style={{ color: "#EF4444" }}>
                            {" "}*
                          </span>
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="e.g. Doe"
                          value={formData.lastName}
                          onChange={handleChange("lastName")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* GENDER */}

                      <Col xs={24} sm={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Gender
                        </Typography>

                        <TextField
                          select
                          fullWidth
                          value={formData.gender}
                          onChange={handleChange("gender")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        >
                          <MenuItem value="">
                            Select Gender
                          </MenuItem>

                          <MenuItem value="Male">
                            Male
                          </MenuItem>

                          <MenuItem value="Female">
                            Female
                          </MenuItem>
                        </TextField>
                      </Col>

                      {/* DOB */}

                      <Col xs={24} sm={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Date of Birth
                        </Typography>

                        <DatePicker
                          value={
                            formData.dob
                              ? dayjs(formData.dob)
                              : null
                          }
                          disabled={isView}
                          onChange={(val) =>
                            setFormData({
                              ...formData,
                              dob: val?.format("YYYY-MM-DD")
                            })
                          }
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              sx: inputFieldStyle
                            }
                          }}
                        />
                      </Col>

                      {/* BLOOD GROUP */}

                      <Col xs={24} sm={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Blood Group
                        </Typography>

                        <TextField
                          select
                          fullWidth
                          value={formData.bloodGroup}
                          onChange={handleChange("bloodGroup")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        >
                          <MenuItem value="">
                            Select Blood Group
                          </MenuItem>

                          {bloodGroupOptions.map((group) => (
                            <MenuItem
                              key={group}
                              value={group}
                            >
                              {group}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Col>

                      {/* EMAIL */}

                      <Col xs={24} sm={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Student Email
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="student@example.com"
                          value={formData.studentEmail || ""}
                          onChange={handleChange("studentEmail")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* PHONE */}

                      <Col xs={24} sm={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Student Phone
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="+91 9876543210"
                          value={formData.studentPhone || ""}
                          onChange={handleChange("studentPhone")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                    </Row>

                  </Col>

                  {/* RIGHT PHOTO SECTION */}

                  <Col
                    xs={24}
                    lg={6}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: {
                          xs: "flex-start",
                          lg: "flex-end"
                        }
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          width: "100%",
                          maxWidth: 260,
                          border: "1px solid #E5E7EB",
                          borderRadius: "20px",
                          p: 3,
                          textAlign: "center",
                          background: "#FAFAFA"
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#374151",
                            mb: 3
                          }}
                        >
                          Student Photo
                        </Typography>

                        <Upload
                          showUploadList={false}
                          beforeUpload={handlePhotoUpload}
                          disabled={isView}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              cursor: isView
                                ? "default"
                                : "pointer"
                            }}
                          >
                            <Box
                              sx={{
                                width: 150,
                                height: 150,
                                borderRadius: "50%",
                                border: "2px dashed #D1D5DB",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                background: "#FFFFFF",
                                transition: "0.3s",

                                "&:hover": {
                                  borderColor: "#6366F1",
                                  background: "#F5F7FF"
                                }
                              }}
                            >
                              {formData.photo ? (
                                <Box
                                  component="img"
                                  src={formData.photo}
                                  alt="Student"
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                  }}
                                />
                              ) : (
                                <UploadOutlined
                                  style={{
                                    fontSize: 40,
                                    color: "#9CA3AF"
                                  }}
                                />
                              )}
                            </Box>

                            <Typography
                              sx={{
                                mt: 2,
                                fontSize: 14,
                                color: "#6B7280",
                                fontWeight: 500
                              }}
                            >
                              Click to upload
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 12,
                                color: "#9CA3AF",
                                mt: 0.5
                              }}
                            >
                              PNG, JPG up to 5MB
                            </Typography>
                          </Box>
                        </Upload>
                      </Paper>
                    </Box>
                  </Col>

                </Row>
              </Paper>

              {/* ADDRESS SECTION */}

              <Paper
                elevation={0}
                sx={{
                  p: {
                    xs: 2,
                    sm: 3
                  },
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB"
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: "#374151",
                    mb: 3
                  }}
                >
                  RESIDENTIAL ADDRESS
                </Typography>

                <Row gutter={[20, 20]}>

                  {/* ADDRESS 1 */}

                  <Col xs={24}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#374151",
                        mb: 1
                      }}
                    >
                      Address Line 1
                      <span style={{ color: "#EF4444" }}>
                        {" "}*
                      </span>
                    </Typography>

                    <TextField
                      fullWidth
                      placeholder="Start typing to search address..."
                      value={formData.addressLine1 || ""}
                      onChange={handleChange("addressLine1")}
                      disabled={isView}
                      sx={inputFieldStyle}
                    />
                  </Col>

                  {/* ADDRESS 2 */}

                  <Col xs={24}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#374151",
                        mb: 1
                      }}
                    >
                      Address Line 2

                      <span
                        style={{
                          color: "#6B7280",
                          fontWeight: 400
                        }}
                      >
                        {" "} (Optional)
                      </span>
                    </Typography>

                    <TextField
                      fullWidth
                      placeholder="Apartment, suite, unit, etc."
                      value={formData.addressLine2 || ""}
                      onChange={handleChange("addressLine2")}
                      disabled={isView}
                      sx={inputFieldStyle}
                    />
                  </Col>

                  {/* CITY */}

                  <Col xs={24} sm={12}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#374151",
                        mb: 1
                      }}
                    >
                      City
                    </Typography>

                    <TextField
                      fullWidth
                      placeholder="e.g. Pune"
                      value={formData.city || ""}
                      onChange={handleChange("city")}
                      disabled={isView}
                      sx={inputFieldStyle}
                    />
                  </Col>

                  {/* STATE */}

                  <Col xs={24} sm={12}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#374151",
                        mb: 1
                      }}
                    >
                      State / Province
                    </Typography>

                    <TextField
                      select
                      fullWidth
                      value={formData.state || ""}
                      onChange={handleChange("state")}
                      disabled={isView}
                      sx={inputFieldStyle}
                    >
                      <MenuItem value="">
                        Select State
                      </MenuItem>

                      <MenuItem value="Maharashtra">
                        Maharashtra
                      </MenuItem>

                      <MenuItem value="Gujarat">
                        Gujarat
                      </MenuItem>

                      <MenuItem value="Karnataka">
                        Karnataka
                      </MenuItem>
                    </TextField>
                  </Col>

                  {/* ZIP */}

                  <Col xs={24} sm={12}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#374151",
                        mb: 1
                      }}
                    >
                      ZIP / Postal Code
                    </Typography>

                    <TextField
                      fullWidth
                      placeholder="e.g. 411001"
                      value={formData.zipCode || ""}
                      onChange={handleChange("zipCode")}
                      disabled={isView}
                      sx={inputFieldStyle}
                    />
                  </Col>

                  {/* COUNTRY */}

                  <Col xs={24} sm={12}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#374151",
                        mb: 1
                      }}
                    >
                      Country
                    </Typography>

                    <TextField
                      select
                      fullWidth
                      value={formData.country || "India"}
                      onChange={handleChange("country")}
                      disabled={isView}
                      sx={inputFieldStyle}
                    >
                      <MenuItem value="India">
                        India
                      </MenuItem>

                      <MenuItem value="United States">
                        United States
                      </MenuItem>

                      <MenuItem value="Canada">
                        Canada
                      </MenuItem>
                    </TextField>
                  </Col>

                </Row>
              </Paper>
            </>
          )}

          {/* ================= STEP 2 ================= */}

          {/* ================= STEP 2 ================= */}

          {activeStep === 1 && (
            <>
              {/* HEADER */}

              <Box mb={3}>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#374151"
                  }}
                >
                  Guardian Information
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#6B7280",
                    mt: 0.5
                  }}
                >
                  Add primary and secondary guardian details.
                </Typography>
              </Box>

              {/* LINE */}

              <Box
                sx={{
                  borderBottom: "1px solid #E5E7EB",
                  mb: 3
                }}
              />

              {/* PRIMARY HEADER */}

              {/* ================= PRIMARY GUARDIAN ================= */}

              <Box
                sx={{
                  mt: 4,
                  border: "1px solid #E5E7EB",
                  borderRadius: 1,
                  overflow: "hidden",
                  background: "#fff"
                }}
              >

                {/* HEADER */}

                <Box
                  sx={{
                    px: 2.5,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderBottom: primaryGuardianOpen
                      ? "1px solid #E5E7EB"
                      : "none"
                  }}
                  onClick={() =>
                    setPrimaryGuardianOpen(!primaryGuardianOpen)
                  }
                >

                  {/* LEFT */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5
                    }}
                  >

                    {/* NUMBER */}

                    <Box
                      sx={{
                        minWidth: 34,
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "#EEF2FF",
                        color: "#4F46E5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700
                      }}
                    >
                      1
                    </Box>

                    {/* TITLE */}

                    <Typography
                      sx={{
                        fontSize: {
                          xs: 17,
                          sm: 20
                        },
                        fontWeight: 700,
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap"
                      }}
                    >
                      Primary Guardian

                      <Box
                        component="span"
                        sx={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#4F46E5",
                          background: "#EEF2FF",
                          px: 1.8,
                          py: 0.7,
                          borderRadius: "30px"
                        }}
                      >
                        Primary Contact
                      </Box>
                    </Typography>

                  </Box>

                  {/* ARROW */}

                  <IconButton size="small">

                    {primaryGuardianOpen ? (
                      <KeyboardArrowUpRoundedIcon />
                    ) : (
                      <KeyboardArrowDownRoundedIcon />
                    )}

                  </IconButton>

                </Box>

                {/* BODY */}

                <Collapse in={primaryGuardianOpen}>

                  <Box sx={{ p: 3 }}>

                    <Row gutter={[16, 20]}>

                      {/* GUARDIAN NAME */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Guardian Name
                          <span style={{ color: "#EF4444" }}>
                            {" "}*
                          </span>
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="e.g. John Doe"
                          value={formData.fatherName}
                          onChange={handleChange("fatherName")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* RELATIONSHIP */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Relationship
                          <span style={{ color: "#EF4444" }}>
                            {" "}*
                          </span>
                        </Typography>

                        <TextField
                          select
                          fullWidth
                          value={formData.relationship || ""}
                          onChange={handleChange("relationship")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        >
                          <MenuItem value="">
                            Select Relationship
                          </MenuItem>

                          <MenuItem value="Father">
                            Father
                          </MenuItem>

                          <MenuItem value="Mother">
                            Mother
                          </MenuItem>

                          <MenuItem value="Guardian">
                            Guardian
                          </MenuItem>
                        </TextField>
                      </Col>

                      {/* PHONE */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Phone Number
                          <span style={{ color: "#EF4444" }}>
                            {" "}*
                          </span>
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="+91 9876543210"
                          value={formData.phone}
                          onChange={handleChange("phone")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* EMAIL */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Email Address
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="guardian@example.com"
                          value={formData.email}
                          onChange={handleChange("email")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* OCCUPATION */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Occupation
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="e.g. Software Engineer"
                          value={formData.occupation || ""}
                          onChange={handleChange("occupation")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* COMPANY */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Employer / Company
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="e.g. Acme Corp"
                          value={formData.company || ""}
                          onChange={handleChange("company")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* ID TYPE */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          ID Proof Type
                        </Typography>

                        <TextField
                          select
                          fullWidth
                          value={formData.idType || ""}
                          onChange={handleChange("idType")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        >
                          <MenuItem value="">
                            Select ID Type
                          </MenuItem>

                          <MenuItem value="Aadhar">
                            Aadhar Card
                          </MenuItem>

                          <MenuItem value="PAN">
                            PAN Card
                          </MenuItem>

                          <MenuItem value="Passport">
                            Passport
                          </MenuItem>
                        </TextField>
                      </Col>

                      {/* ID NUMBER */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          ID Number
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="Enter ID Number"
                          value={formData.idNumber || ""}
                          onChange={handleChange("idNumber")}
                          disabled={isView}
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* CHECKBOX */}

                      <Col xs={24}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "nowrap"
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.sameAddress || false}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                sameAddress: e.target.checked
                              })
                            }
                            style={{
                              width: 16,
                              height: 16,
                              accentColor: "#A855F7",
                              cursor: "pointer",
                              margin: 0,
                              flexShrink: 0
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 14,
                              color: "#4B5563",
                              lineHeight: 1.2,
                              whiteSpace: "nowrap"
                            }}
                          >
                            Address is same as student's residential address
                          </Typography>
                        </Box>
                      </Col>

                    </Row>

                  </Box>

                </Collapse>

              </Box>
              {/* SECONDARY */}

              <Box
                sx={{
                  mt: 4,
                  border: "1px solid #E5E7EB",
                  borderRadius: 1,
                  overflow: "hidden",
                  background: "#fff"
                }}
              >

                {/* HEADER */}

                <Box
                  sx={{
                    px: 2.5,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderBottom: guardianOpen
                      ? "1px solid #E5E7EB"
                      : "none"
                  }}
                  onClick={() =>
                    setGuardianOpen(!guardianOpen)
                  }
                >

                  {/* LEFT */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5
                    }}
                  >

                    {/* NUMBER */}

                    <Box
                      sx={{
                        minWidth: 34,
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "#F3F4F6",
                        color: "#6B7280",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700
                      }}
                    >
                      2
                    </Box>

                    {/* TITLE */}

                    <Typography
                      sx={{
                        fontSize: {
                          xs: 17,
                          sm: 20
                        },
                        fontWeight: 700,
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap"
                      }}
                    >
                      Secondary Guardian

                      <Box
                        component="span"
                        sx={{
                          fontSize: 15,
                          fontWeight: 400,
                          color: "#6B7280"
                        }}
                      >
                        (Optional)
                      </Box>
                    </Typography>

                  </Box>

                  {/* ARROW */}

                  <IconButton size="small">

                    {guardianOpen ? (
                      <KeyboardArrowUpRoundedIcon />
                    ) : (
                      <KeyboardArrowDownRoundedIcon />
                    )}

                  </IconButton>

                </Box>

                {/* BODY */}

                <Collapse in={guardianOpen}>

                  <Box sx={{ p: 3 }}>

                    <Row gutter={[16, 20]}>

                      {/* GUARDIAN NAME */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Guardian Name
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="e.g. Jane Doe"
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* RELATIONSHIP */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Relationship
                        </Typography>

                        <TextField
                          select
                          fullWidth
                          defaultValue=""
                          sx={inputFieldStyle}
                        >
                          <MenuItem value="">
                            Select Relationship
                          </MenuItem>

                          <MenuItem value="uncle">
                            Uncle
                          </MenuItem>

                          <MenuItem value="aunt">
                            Aunt
                          </MenuItem>

                          <MenuItem value="brother">
                            Brother
                          </MenuItem>
                        </TextField>
                      </Col>

                      {/* PHONE NUMBER */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Phone Number
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="+1 (555) 000-0000"
                          sx={inputFieldStyle}
                        />
                      </Col>

                      {/* EMAIL ADDRESS */}

                      <Col xs={24} md={12}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#374151",
                            mb: 1
                          }}
                        >
                          Email Address
                        </Typography>

                        <TextField
                          fullWidth
                          placeholder="guardian@example.com"
                          sx={inputFieldStyle}
                        />
                      </Col>

                    </Row>

                    {/* SWITCH */}

                    <Box
                      sx={{
                        mt: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >

                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 500,
                          color: "#374151"
                        }}
                      >
                        Mark as Primary Contact
                      </Typography>

                      <Switch />

                    </Box>

                  </Box>

                </Collapse>

              </Box>

              {/* CONSENT */}

              <Box
                sx={{
                  mt: 4,
                  border: "1px solid #E5E7EB",
                  borderRadius: "5px",
                  background: "#F9FAFB",
                  p: 2.5
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.communicationConsent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        communicationConsent: e.target.checked
                      })
                    }
                    style={{
                      marginTop: 3,
                      width: 18,
                      height: 18,
                      accentColor: "#A855F7",
                      cursor: "pointer"
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#374151",
                        lineHeight: 1.2,
                        mb: 0.5
                      }}
                    >
                      Communication Consent
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#6B7280",
                        lineHeight: 1.6,
                        maxWidth: "720px"
                      }}
                    >
                      I agree to receive academic updates,
                      fee reminders, and emergency
                      notifications via SMS and Email for
                      this student.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          )}

          {/* ================= STEP 3 ================= */}

          {activeStep === 2 && (
            <>
              {/* HEADER */}

              <Box mb={3}>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#374151"
                  }}
                >
                  Academic Information
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#6B7280",
                    mt: 0.5
                  }}
                >
                  Add academic and admission related details.
                </Typography>
              </Box>

              {/* LINE */}

              <Box
                sx={{
                  borderBottom: "1px solid #E5E7EB",
                  mb: 3
                }}
              />

              {/* SECTION HEADER */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 3
                }}
              >
              </Box>

              {/* FORM */}

              <Row gutter={[16, 16]}>

                {/* ADMISSION NUMBER */}

                <Col xs={24} sm={12}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Admission Number
                    <span style={{ color: "#EF4444" }}>
                      {" "}*
                    </span>
                  </Typography>

                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter admission number"
                    value={formData.admissionNumber}
                    onChange={handleChange("admissionNumber")}
                    disabled={isView}
                    sx={inputFieldStyle}
                  />
                </Col>

                {/* CLASS */}

                <Col xs={24} sm={12}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Class
                    <span style={{ color: "#EF4444" }}>
                      {" "}*
                    </span>
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={formData.class}
                    onChange={handleChange("class")}
                    disabled={isView}
                    sx={inputFieldStyle}
                  >
                    <MenuItem value="">
                      Select Class
                    </MenuItem>

                    {classOptions.map((className) => (
                      <MenuItem
                        key={className}
                        value={className}
                      >
                        {className}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>

                {/* SECTION */}

                <Col xs={24} sm={12}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Section
                    <span style={{ color: "#EF4444" }}>
                      {" "}*
                    </span>
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={formData.section}
                    onChange={handleChange("section")}
                    disabled={isView}
                    sx={inputFieldStyle}
                  >
                    <MenuItem value="">
                      Select Section
                    </MenuItem>

                    {sectionOptions.map((sec) => (
                      <MenuItem
                        key={sec}
                        value={sec}
                      >
                        Section {sec}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>

                {/* ADMISSION DATE */}

                <Col xs={24} sm={12}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Admission Date
                    <span style={{ color: "#EF4444" }}>
                      {" "}*
                    </span>
                  </Typography>

                  <DatePicker
                    value={
                      formData.admissionDate
                        ? dayjs(formData.admissionDate)
                        : null
                    }
                    disabled={isView}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        admissionDate:
                          val?.format("YYYY-MM-DD")
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        sx: inputFieldStyle
                      }
                    }}
                  />
                </Col>

                {/* DISCOUNT TYPE */}

                <Col xs={24}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Discount Type
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={formData.discountType}
                    onChange={handleChange("discountType")}
                    disabled={isView}
                    sx={inputFieldStyle}
                  >
                    <MenuItem value="none">
                      No Discount
                    </MenuItem>

                    <MenuItem value="sibling">
                      Sibling
                    </MenuItem>

                    <MenuItem value="staff">
                      Staff
                    </MenuItem>
                  </TextField>
                </Col>

              </Row>
            </>
          )}

          {/* ================= STEP 4 ================= */}


          {activeStep === 3 && (
            <>
              {/* HEADER */}

              <Box mb={3}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="text.primary"
                >
                  Fees Configuration
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.5}
                >
                  Configure billing, installments and fee summary.
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* TOP FIELDS */}

              <Row gutter={[16, 16]}>

                <Col xs={24} sm={12}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Academic Year
                    <span style={{ color: "#EF4444" }}>
                      {" "}*
                    </span>
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    value={formData.academicYear || ""}
                    onChange={handleChange("academicYear")}
                    sx={inputFieldStyle}
                  >
                    <MenuItem value="">
                      Select Academic Year
                    </MenuItem>

                    <MenuItem value="2024-2025">
                      2024 - 2025
                    </MenuItem>

                    <MenuItem value="2025-2026">
                      2025 - 2026
                    </MenuItem>
                  </TextField>
                </Col>

                <Col xs={24} sm={12}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Fee Group
                    <span style={{ color: "#EF4444" }}>
                      {" "}*
                    </span>
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    value={formData.feeGroup || ""}
                    onChange={handleChange("feeGroup")}
                    sx={inputFieldStyle}
                  >
                    <MenuItem value="">
                      Select Fee Group
                    </MenuItem>

                    <MenuItem value="standard">
                      Standard Fees
                    </MenuItem>

                    <MenuItem value="hostel">
                      Hostel Fees
                    </MenuItem>
                  </TextField>
                </Col>

                <Col xs={24} sm={12}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Scholarship
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    value={formData.scholarship || ""}
                    onChange={handleChange("scholarship")}
                    sx={inputFieldStyle}
                  >
                    <MenuItem value="">
                      Select Scholarship
                    </MenuItem>

                    <MenuItem value="none">
                      No Scholarship
                    </MenuItem>

                    <MenuItem value="sibling">
                      Sibling Discount
                    </MenuItem>

                    <MenuItem value="staff">
                      Staff Discount
                    </MenuItem>
                  </TextField>
                </Col>

                <Col xs={24} sm={12}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#374151",
                      mb: 1
                    }}
                  >
                    Transport / Hostel
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    value={formData.addons || ""}
                    onChange={handleChange("addons")}
                    sx={inputFieldStyle}
                  >
                    <MenuItem value="">
                      Select Option
                    </MenuItem>

                    <MenuItem value="none">
                      None
                    </MenuItem>

                    <MenuItem value="transport">
                      Transport
                    </MenuItem>

                    <MenuItem value="hostel">
                      Hostel
                    </MenuItem>
                  </TextField>
                </Col>

              </Row>

              {/* INSTALLMENT PLAN */}

              <Paper
                sx={{
                  mt: 4,
                  borderRadius: 1,
                  overflow: "hidden",
                  border: "1px solid #E5E7EB"
                }}
              >

                {/* TOP BAR */}

                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #E5E7EB",
                    flexWrap: "wrap",
                    gap: 2
                  }}
                >
                  <Typography fontWeight={700}>
                    Installment Plan
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                    >
                      Auto Split
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                    >
                      Add Row
                    </Button>
                  </Stack>
                </Box>

                {/* TABLE */}

                <Box sx={{ overflowX: "auto" }}>

                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse"
                    }}
                  >
                    <thead
                      style={{
                        background: "#F8FAFC"
                      }}
                    >
                      <tr>
                        <th
                          style={tableHeadStyle}
                        >
                          Installment
                        </th>

                        <th
                          style={tableHeadStyle}
                        >
                          Due Date
                        </th>

                        <th
                          style={tableHeadStyle}
                        >
                          Amount
                        </th>

                        <th
                          style={tableHeadStyle}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr>
                        <td style={tableCellStyle}>
                          Term 1 Fee
                        </td>

                        <td style={tableCellStyle}>
                          08/01/2024
                        </td>

                        <td style={tableCellStyle}>
                          ₹ 15,000
                        </td>

                        <td style={tableCellStyle}>
                          <Box
                            sx={{
                              background: "#E8F5E9",
                              color: "#2E7D32",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              display: "inline-block",
                              fontSize: 13,
                              fontWeight: 600
                            }}
                          >
                            Planned
                          </Box>
                        </td>
                      </tr>

                      <tr>
                        <td style={tableCellStyle}>
                          Term 2 Fee
                        </td>

                        <td style={tableCellStyle}>
                          12/01/2024
                        </td>

                        <td style={tableCellStyle}>
                          ₹ 15,000
                        </td>

                        <td style={tableCellStyle}>
                          <Box
                            sx={{
                              background: "#E8F5E9",
                              color: "#2E7D32",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              display: "inline-block",
                              fontSize: 13,
                              fontWeight: 600
                            }}
                          >
                            Planned
                          </Box>
                        </td>
                      </tr>

                      <tr>
                        <td style={tableCellStyle}>
                          Term 3 Fee
                        </td>

                        <td style={tableCellStyle}>
                          04/01/2025
                        </td>

                        <td style={tableCellStyle}>
                          ₹ 15,000
                        </td>

                        <td style={tableCellStyle}>
                          <Box
                            sx={{
                              background: "#E8F5E9",
                              color: "#2E7D32",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              display: "inline-block",
                              fontSize: 13,
                              fontWeight: 600
                            }}
                          >
                            Planned
                          </Box>
                        </td>
                      </tr>

                    </tbody>
                  </table>

                </Box>

                {/* TOTAL */}

                <Box
                  sx={{
                    p: 2,
                    borderTop: "1px solid #E5E7EB",
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#FAFAFA"
                  }}
                >
                  <Typography fontWeight={600}>
                    Total Allocated
                  </Typography>

                  <Typography
                    fontWeight={700}
                    color="primary"
                  >
                    ₹ 45,000
                  </Typography>
                </Box>

                {/* AUTO FILL TEXT */}

                <Box
                  sx={{
                    p: 2,
                    background: "#EDF7ED",
                    borderTop: "1px solid #C8E6C9"
                  }}
                >
                  <Typography
                    fontSize={14}
                    color="#2E7D32"
                    fontWeight={500}
                  >
                    ✔ Installment totals automatically match the net payable amount.
                  </Typography>
                </Box>

              </Paper>

              {/* FINANCIAL SUMMARY */}

              {/* FINANCIAL SUMMARY */}

              <Paper
                elevation={0}
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: "14px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#F9FAFB"
                }}
              >
                {/* HEADER */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#374151",
                    mb: 2
                  }}
                >
                  Financial Summary
                </Typography>

                {/* DIVIDER */}
                <Box
                  sx={{
                    borderBottom: "1px solid #E5E7EB",
                    mb: 2
                  }}
                />

                <Stack spacing={2}>

                  {/* Tuition */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      columnGap: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#6B7280",
                        fontWeight: 500
                      }}
                    >
                      Base Tuition Fee
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#374151",
                        fontWeight: 600,
                        textAlign: "right",
                        minWidth: 120
                      }}
                    >
                      ₹ 45,000.00
                    </Typography>
                  </Box>

                  {/* Add-ons */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      columnGap: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#6B7280",
                        fontWeight: 500
                      }}
                    >
                      Add-ons Total
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#374151",
                        fontWeight: 600,
                        textAlign: "right",
                        minWidth: 120
                      }}
                    >
                      ₹ 0.00
                    </Typography>
                  </Box>

                  {/* Discount */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      columnGap: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#43A047",
                        fontWeight: 500
                      }}
                    >
                      Discount Applied
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#43A047",
                        fontWeight: 600,
                        textAlign: "right",
                        minWidth: 120
                      }}
                    >
                      -₹ 0.00
                    </Typography>
                  </Box>

                  {/* Divider */}
                  <Box
                    sx={{
                      borderBottom: "1px solid #E5E7EB",
                      my: 1
                    }}
                  />

                  {/* Net Payable */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      columnGap: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#374151"
                      }}
                    >
                      Net Payable
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#4F7DF3",
                        textAlign: "right",
                        minWidth: 140
                      }}
                    >
                      ₹ 45,000.00
                    </Typography>
                  </Box>

                </Stack>
              </Paper>
            </>
          )}
          <br></br>

          {/* ================= BUTTONS ================= */}

          <Box
            mt={4}
            display="flex"
            flexDirection={
              isMobile
                ? "column"
                : "row"
            }
            alignItems="center"
            gap={2}
          >

            {/* PREVIOUS */}

            <Box sx={{ flex: 1 }}>
              <Button
                fullWidth={isMobile}
                disabled={
                  activeStep === 0
                }
                onClick={handleBack}
                variant="outlined"
                startIcon={
                  <ArrowBackIcon />
                }
              >
                Previous
              </Button>
            </Box>

            {/* NEXT / SAVE */}

            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent:
                  "flex-end"
              }}
            >
              <Button
                fullWidth={isMobile}
                variant="contained"
                onClick={
                  isView
                    ? activeStep ===
                      steps.length - 1
                      ? () =>
                        navigate(
                          "/s-admin/students"
                        )
                      : handleNext
                    : activeStep ===
                      steps.length - 1
                      ? handleSaveStudent
                      : handleNext
                }
                endIcon={
                  activeStep ===
                    steps.length - 1 ? (
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
                {activeStep ===
                  steps.length - 1
                  ? isView
                    ? "Close"
                    : isEdit
                      ? "Update Student"
                      : "Save Student"
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

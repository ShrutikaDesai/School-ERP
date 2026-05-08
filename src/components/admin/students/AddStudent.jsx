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
  useTheme
} from "@mui/material";

import { Row, Col, Grid as AntGrid, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";

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
    photo: ""
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

    navigate("/students");
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
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 4 },
        borderRadius: "24px",
        border: "1px solid #E5E7EB",
        background: "#fff"
      }}
    >
      {/* TOP HEADER */}

      <Row
        gutter={[24, 24]}
        align="middle"
        justify="space-between"
      >
        {/* LEFT */}

        <Col xs={24} md={16}>
          <Typography
            sx={{
              fontSize: 38,
              fontWeight: 700,
              color: "#374151"
            }}
          >
            Student Details
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 18,
              color: "#6B7280"
            }}
          >
            Provide the primary information for the
            student.
          </Typography>
        </Col>

        {/* RIGHT PHOTO */}

        <Col
          xs={24}
          md={8}
          style={{
            display: "flex",
            justifyContent: screens.xs
              ? "flex-start"
              : "flex-end"
          }}
        >
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
                cursor: "pointer"
              }}
            >
              <Box
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  border: "3px dashed #D1D5DB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  background: "#F9FAFB"
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
                      fontSize: 38,
                      color: "#9CA3AF"
                    }}
                  />
                )}
              </Box>

              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: 16,
                  color: "#6B7280",
                  fontWeight: 500
                }}
              >
                Upload Photo (Opt)
              </Typography>
            </Box>
          </Upload>
        </Col>
      </Row>

      {/* DIVIDER */}

      <Box
        sx={{
          borderBottom: "1px solid #E5E7EB",
          my: 4
        }}
      />

      {/* FORM */}

      <Row gutter={[24, 24]}>

        {/* FIRST NAME */}

        <Col xs={24} sm={12}>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: "#374151"
            }}
          >
            First Name
            <Box
              component="span"
              sx={{ color: "#EF4444" }}
            >
              {" "}
              *
            </Box>
          </Typography>

          <TextField
            fullWidth
            placeholder="e.g. John"
            value={formData.firstName}
            onChange={handleChange("firstName")}
            disabled={isView}
          />
        </Col>

        {/* LAST NAME */}

        <Col xs={24} sm={12}>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: "#374151"
            }}
          >
            Last Name
            <Box
              component="span"
              sx={{ color: "#EF4444" }}
            >
              {" "}
              *
            </Box>
          </Typography>

          <TextField
            fullWidth
            placeholder="e.g. Doe"
            value={formData.lastName}
            onChange={handleChange("lastName")}
            disabled={isView}
          />
        </Col>

        {/* GENDER */}

        <Col xs={24} sm={12}>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: "#374151"
            }}
          >
            Gender
            <Box
              component="span"
              sx={{ color: "#EF4444" }}
            >
              {" "}
              *
            </Box>
          </Typography>

          <TextField
            select
            fullWidth
            value={formData.gender}
            onChange={handleChange("gender")}
            disabled={isView}
            placeholder="Select Gender"
          >
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
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: "#374151"
            }}
          >
            Date of Birth
            <Box
              component="span"
              sx={{ color: "#EF4444" }}
            >
              {" "}
              *
            </Box>
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
                placeholder: "mm/dd/yyyy"
              }
            }}
          />
        </Col>

        {/* ADMISSION DATE */}

        <Col xs={24} sm={12}>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: "#374151"
            }}
          >
            Admission Date
            <Box
              component="span"
              sx={{ color: "#EF4444" }}
            >
              {" "}
              *
            </Box>
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
                placeholder: "mm/dd/yyyy"
              }
            }}
          />
        </Col>

        {/* CLASS */}

        <Col xs={24} sm={12}>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: "#374151"
            }}
          >
            Grade / Class
            <Box
              component="span"
              sx={{ color: "#EF4444" }}
            >
              {" "}
              *
            </Box>
          </Typography>

          <TextField
            select
            fullWidth
            value={formData.class}
            onChange={handleChange("class")}
            disabled={isView}
          >
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
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: "#374151"
            }}
          >
            Section
            <Box
              component="span"
              sx={{ color: "#EF4444" }}
            >
              {" "}
              *
            </Box>
          </Typography>

          <TextField
            select
            fullWidth
            value={formData.section}
            onChange={handleChange("section")}
            disabled={isView}
          >
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

        {/* BLOOD GROUP */}

        <Col xs={24} sm={12}>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: "#374151"
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
          >
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

      </Row>
    </Paper>
  </>
)}

          {/* ================= STEP 2 ================= */}

          {activeStep === 1 && (
            <>
              <Typography
                fontWeight={600}
                mb={3}
              >
                Guardian Info
              </Typography>

              <Row gutter={[16, 16]}>

                <Col xs={24} sm={12}>
                  <TextField
                    fullWidth
                    label="Father Name"
                    value={
                      formData.fatherName
                    }
                    onChange={handleChange(
                      "fatherName"
                    )}
                    disabled={isView}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField
                    fullWidth
                    label="Mother Name"
                    value={
                      formData.motherName
                    }
                    onChange={handleChange(
                      "motherName"
                    )}
                    disabled={isView}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={
                      formData.phone
                    }
                    onChange={handleChange(
                      "phone"
                    )}
                    disabled={isView}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={
                      formData.email
                    }
                    onChange={handleChange(
                      "email"
                    )}
                    disabled={isView}
                  />
                </Col>

                <Col xs={24}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Address"
                    value={
                      formData.address
                    }
                    onChange={handleChange(
                      "address"
                    )}
                    disabled={isView}
                  />
                </Col>

              </Row>
            </>
          )}

          {/* ================= STEP 3 ================= */}

          {activeStep === 2 && (
            <>
              <Typography
                fontWeight={600}
                mb={3}
              >
                Academic Info
              </Typography>

              <Row gutter={[16, 16]}>

                <Col xs={24} sm={12}>
                  <TextField
                    fullWidth
                    label="Admission Number"
                    value={
                      formData.admissionNumber
                    }
                    onChange={handleChange(
                      "admissionNumber"
                    )}
                    disabled={isView}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <TextField
                    select
                    fullWidth
                    label="Class"
                    value={
                      formData.class
                    }
                    onChange={handleChange(
                      "class"
                    )}
                    disabled={isView}
                  >
                    {classOptions.map(
                      (className) => (
                        <MenuItem
                          key={className}
                          value={
                            className
                          }
                        >
                          {className}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Col>

                <Col xs={24} sm={12}>
                  <TextField
                    select
                    fullWidth
                    label="Section"
                    value={
                      formData.section
                    }
                    onChange={handleChange(
                      "section"
                    )}
                    disabled={isView}
                  >
                    {sectionOptions.map(
                      (sec) => (
                        <MenuItem
                          key={sec}
                          value={sec}
                        >
                          Section {sec}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Col>

                <Col xs={24} sm={12}>
                  <DatePicker
                    label="Admission Date"
                    value={
                      formData.admissionDate
                        ? dayjs(
                          formData.admissionDate
                        )
                        : null
                    }
                    disabled={isView}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        admissionDate:
                          val?.format(
                            "YYYY-MM-DD"
                          )
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true
                      }
                    }}
                  />
                </Col>

                <Col xs={24} >
                  <TextField
                    select
                    fullWidth
                    label="Discount Type"
                    value={
                      formData.discountType
                    }
                    onChange={handleChange(
                      "discountType"
                    )}
                    disabled={isView}
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

    {/* TOP FIELDS */}

    <Row gutter={[16, 16]}>

      <Col xs={24} sm={12}>
        <TextField
          select
          fullWidth
          label="Academic Year"
          value={formData.academicYear || ""}
          onChange={handleChange("academicYear")}
        >
          <MenuItem value="2024-2025">
            2024 - 2025
          </MenuItem>

          <MenuItem value="2025-2026">
            2025 - 2026
          </MenuItem>
        </TextField>
      </Col>

      <Col xs={24} sm={12}>
        <TextField
          select
          fullWidth
          label="Fee Group"
          value={formData.feeGroup || ""}
          onChange={handleChange("feeGroup")}
        >
          <MenuItem value="standard">
            Standard Fees
          </MenuItem>

          <MenuItem value="hostel">
            Hostel Fees
          </MenuItem>
        </TextField>
      </Col>

      <Col xs={24} sm={12}>
        <TextField
          select
          fullWidth
          label="Scholarship"
          value={formData.scholarship || ""}
          onChange={handleChange("scholarship")}
        >
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
        <TextField
          select
          fullWidth
          label="Transport / Hostel"
          value={formData.addons || ""}
          onChange={handleChange("addons")}
        >
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
                          "/students"
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

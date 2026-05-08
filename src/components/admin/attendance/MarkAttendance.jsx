import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  Autocomplete,
} from "@mui/material";

import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { Row, Col, Grid as AntGrid, Empty, message } from "antd";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const { useBreakpoint } = AntGrid;

/* ================= Dummy Data ================= */

const initialStudents = [
  {
    id: 1,
    name: "Amit Sharma",
    rollNo: "101",
    gender: "Male",
    status: "Present",
  },
  {
    id: 2,
    name: "Priya Patil",
    rollNo: "102",
    gender: "Female",
    status: "Present",
  },
  {
    id: 3,
    name: "Rahul Desai",
    rollNo: "103",
    gender: "Male",
    status: "Present",
  },
  {
    id: 4,
    name: "Sneha Joshi",
    rollNo: "104",
    gender: "Female",
    status: "Present",
  },
];

/* ================= Main Component ================= */

const MarkAttendance = () => {
  const screens = useBreakpoint();

  const [students, setStudents] = useState(initialStudents);

  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");

 const [selectAll, setSelectAll] = useState(true);

  const isReady = className && section && date;

  /* ================= Counts ================= */

  const presentCount = students.filter(
    (s) => s.status === "Present"
  ).length;

  const absentCount = students.filter(
    (s) => s.status === "Absent"
  ).length;

  const lateCount = students.filter(
    (s) => s.status === "Late"
  ).length;

  /* ================= Handlers ================= */

  const handleSelectAll = (checked) => {
    setSelectAll(checked);

    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        status: checked ? "Present" : "Absent",
      }))
    );
  };

  const handleSave = () => {
    console.log("Attendance Data:", students);
    message.success("Attendance saved successfully!");
  };

  /* ================= Reusable Icon Style ================= */

  const getIconStyles = (active, activeBg, activeBorder) => ({
    width: 42,
    height: 42,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: active ? activeBg : "#FAFAFA",
    border: active
      ? `1.5px solid ${activeBorder}`
      : "1px solid #E0E0E0",
    transition: "all 0.2s ease",

    "&:hover": {
      transform: "scale(1.04)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
  });

  /* ================= Columns ================= */

  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      flex: 0.5,

      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },

    {
      field: "rollNo",
      headerName: "Roll No",
      flex: 1,
    },

    {
      field: "name",
      headerName: "Student Name",
      flex: 2,
    },

    {
      field: "gender",
      headerName: "Gender",
      flex: 1,

      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor:
              params.value === "Male"
                ? "#E3F2FD"
                : params.value === "Female"
                ? "#FCE4EC"
                : "#F5F5F5",

            color:
              params.value === "Male"
                ? "#1565C0"
                : params.value === "Female"
                ? "#C2185B"
                : "#616161",

            fontWeight: 500,
          }}
        />
      ),
    },

    /* ================= PRESENT ================= */

    {
      field: "present",
      headerName: "Present",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            onClick={() => {
              setStudents((prev) =>
                prev.map((s) =>
                  s.id === params.id
                    ? { ...s, status: "Present" }
                    : s
                )
              );
            }}
            sx={getIconStyles(
              params.row.status === "Present",
              "#E8F5E9",
              "#66BB6A"
            )}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 22,
                color:
                  params.row.status === "Present"
                    ? "#43A047"
                    : "#BDBDBD",
              }}
            />
          </Box>
        </Box>
      ),
    },

    /* ================= ABSENT ================= */

    {
      field: "absent",
      headerName: "Absent",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            onClick={() => {
              setStudents((prev) =>
                prev.map((s) =>
                  s.id === params.id
                    ? { ...s, status: "Absent" }
                    : s
                )
              );
            }}
            sx={getIconStyles(
              params.row.status === "Absent",
              "#FFEBEE",
              "#EF5350"
            )}
          >
            <CancelIcon
              sx={{
                fontSize: 22,
                color:
                  params.row.status === "Absent"
                    ? "#E53935"
                    : "#BDBDBD",
              }}
            />
          </Box>
        </Box>
      ),
    },

    /* ================= LATE ================= */

    {
      field: "late",
      headerName: "Late",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            onClick={() => {
              setStudents((prev) =>
                prev.map((s) =>
                  s.id === params.id
                    ? { ...s, status: "Late" }
                    : s
                )
              );
            }}
            sx={getIconStyles(
              params.row.status === "Late",
              "#FFF3E0",
              "#FFB74D"
            )}
          >
            <AccessTimeIcon
              sx={{
                fontSize: 22,
                color:
                  params.row.status === "Late"
                    ? "#FB8C00"
                    : "#BDBDBD",
              }}
            />
          </Box>
        </Box>
      ),
    },
  ];

  /* ================= Footer ================= */

  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            px: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "green",
              }}
            />

            <Typography fontSize={13}>
              Present: {presentCount}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "red",
              }}
            />

            <Typography fontSize={13}>
              Absent: {absentCount}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "orange",
              }}
            />

            <Typography fontSize={13}>
              Late: {lateCount}
            </Typography>
          </Box>
        </Box>

        <GridPagination />
      </GridFooterContainer>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1440,
        mx: "auto",
        px: screens.xs ? 0 : 1,
        py: screens.xs ? 3 : 1,
      }}
    >
      {/* ================= HEADER ================= */}

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Mark Attendance
        </Typography>

        <Typography
          color="text.secondary"
          fontSize={14}
          sx={{ mt: 0.5 }}
        >
          Track student attendance
        </Typography>
      </Box>

      {/* ================= FILTERS ================= */}

      <Box sx={{ mb: 3 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Autocomplete
              options={["FY BCA", "SY BCA"]}
              value={className}
              onChange={(e, v) => setClassName(v || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Class"
                  size="small"
                />
              )}
              fullWidth
            />
          </Col>

          <Col xs={24} md={6}>
            <Autocomplete
              options={["A", "B"]}
              value={section}
              onChange={(e, v) => setSection(v || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Section"
                  size="small"
                />
              )}
              fullWidth
            />
          </Col>

          <Col xs={24} md={6}>
            <DatePicker
              label="Date"
              value={date ? dayjs(date) : null}
              onChange={(val) =>
                setDate(val?.format("YYYY-MM-DD"))
              }
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />
          </Col>

          {isReady && (
            <Col xs={24} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAll}
                    onChange={(e) =>
                      handleSelectAll(e.target.checked)
                    }
                  />
                }
                label="Mark All Present"
              />
            </Col>
          )}
        </Row>
      </Box>

      {/* ================= TABLE ================= */}

      <Paper
        sx={{
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}
      >
        {!isReady ? (
          <Box sx={{ py: 6 }}>
            <Empty description="Please select Class, Section & Date to see attendance data" />
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <DataGrid
              rows={students}
              columns={columns}
              autoHeight
              pageSizeOptions={[5, 10]}
              rowHeight={65}
              disableRowSelectionOnClick
              slots={{
                footer: CustomFooter,
              }}
              sx={{
                minWidth: screens.xs ? 900 : "100%",
                border: 0,

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#F9FAFB",
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        )}
      </Paper>

      {/* ================= SAVE BUTTON ================= */}

      {isReady && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            Save Attendance
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MarkAttendance;
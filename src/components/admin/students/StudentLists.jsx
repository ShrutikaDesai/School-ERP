import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Stack,
  Paper,
  LinearProgress,
  Divider
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";
import { Card, Col, Row } from "antd";
import {
  Add,
  Groups,
  School,
  Search,
  Visibility,
  Edit,
  Delete
} from "@mui/icons-material";

import { Grid as AntGrid, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { getStoredStudents, saveStudents } from "./studentStorage";
import { Download } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGridApiRef } from "@mui/x-data-grid";
import { Drawer } from "@mui/material";
import muiTheme from "../../../theme/muiTheme";

const { useBreakpoint } = AntGrid;

/* ================= Stat Card ================= */

const StatCard = ({ icon, value, label, iconBg, iconColor }) => (
  <Card
    style={{
      borderRadius: 16,
      border: "1px solid #E5E7EB",
      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      height: "100%",
    }}
    bodyStyle={{
      padding: "20px",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        minHeight: 70,
      }}
    >
      {/* ICON */}
      <Box
        sx={{
          width: 58,
          height: 58,
          minWidth: 58,
          borderRadius: "16px",
          backgroundColor: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,

          "& svg": {
            fontSize: 30,
          },
        }}
      >
        {icon}
      </Box>

      {/* CONTENT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            lineHeight: 1.1,
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 14,
            mt: 0.5,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  </Card>
);
/* ================= MAIN COMPONENT ================= */

const StudentLists = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [genderFilter, setGenderFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setRows(getStoredStudents());
  }, []);

  /* ================= Delete ================= */

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteModalOpen(true);
  };

  // 2. Auto-select first student on load
useEffect(() => {
  const stored = getStoredStudents();
  setRows(stored);
  if (stored.length > 0) {
    setSelectedStudent(stored[0]);
    setDrawerOpen(true);
  }
}, []);

// 3. Update handleViewClick
const handleViewClick = (row) => {
  setSelectedStudent(row);
  setDrawerOpen(true);
};

  // const handleViewClick = (row) => {
  //   navigate(`/s-admin/students/${row.id}/view`);
  // };

  const handleEditClick = (row) => {
    navigate(`/s-admin/students/${row.id}/edit`);
  };

  const handleConfirmDelete = () => {
    setRows(prev => prev.filter(r => r.id !== rowToDelete.id));
    setDeleteModalOpen(false);
    setRowToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setRowToDelete(null);
  };


  const handleExport = () => {

    const visibleRows = Array.from(
      apiRef.current.getRowModels().values()
    );

    const now = new Date();

    const exportDate = now.toLocaleDateString();
    const exportTime = now.toLocaleTimeString();

    const exportData = visibleRows.map((row, index) => ({
      "Sr No.": index + 1,
      "Roll No": row.rollNo,
      "Student Name": row.name,
      "Class": row.class,
      "Section": row.section,
      "Attendance": row.attendance ? `${row.attendance}%` : "0%",
      "Gender": row.gender,
      "Phone": row.phone,
      "Status": row.status
    }));

    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Students Data Export"],
      ["Export Date", exportDate],
      ["Export Time", exportTime],
      []
    ]);

    XLSX.utils.sheet_add_json(worksheet, exportData, {
      origin: "A5",
      skipHeader: false
    });

    worksheet["!cols"] = [
      { wch: 10 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 18 },
      { wch: 12 }
    ];

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(file, "students_data.xlsx");
  };

  /* ================= Filter ================= */

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.rollNo.includes(searchText);

    const matchesClass =
      !classFilter || row.class === classFilter;

    const matchesGender =
      !genderFilter || row.gender === genderFilter;

    return matchesSearch && matchesClass && matchesGender;
  });

  const classOptions = [...new Set(rows.map((row) => row.class))];

  /* ================= Columns ================= */

  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      width: 70,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
    },

    { field: "rollNo", headerName: "Roll No", flex: 1 },

    { field: "name", headerName: "Student Name", flex: 1.5 },

    {
      field: "classSection",
      headerName: "Class / Section",
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            fontSize: "0.875rem",
            fontWeight: 400,
          }}
        >
          {params.row.class} - {params.row.section}
        </Box>
      ),
    },

    {
      field: "attendance",
      headerName: "Attendance",
      flex: 1.5,
      renderCell: (params) => {
        const value = params.value || 0;

        return (
          <Box sx={{ width: "100%", px: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography variant="caption" fontWeight={600}>
                {value}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#E0E0E0",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  background:
                    value >= 75
                      ? "linear-gradient(90deg,#4CAF50,#81C784)"
                      : value >= 40
                        ? "linear-gradient(90deg,#FF9800,#FFB74D)"
                        : "linear-gradient(90deg,#F44336,#EF5350)",
                },
              }}
            />
          </Box>
        );
      },
    },


    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell: (params) => {
        const value = params.value;

        return (
          <Chip
            label={value}
            size="small"
            sx={{
              backgroundColor:
                value === "Male"
                  ? "#E3F2FD"   // light blue
                  : value === "Female"
                    ? "#FCE4EC"   // light pink
                    : "#F5F5F5",

              color:
                value === "Male"
                  ? "#1565C0"
                  : value === "Female"
                    ? "#C2185B"
                    : "#616161",

              fontWeight: 500,
            }}
          />
        );
      },
    },

    { field: "phone", headerName: "Phone", flex: 1.2 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const value = params.value;

        return (
          <Chip
            label={params.value}
            sx={{
              background:
                params.value === "Active"
                  ? "linear-gradient(45deg,#4CAF50,#81C784)"
                  : "#E0E0E0",
              color: params.value === "Active" ? "#fff" : "#333"
            }}
          />
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleViewClick(params.row)}
          >
            <Visibility />
          </IconButton>

          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
            <Edit />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteClick(params.row)}
          >
            <Delete />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1440,
        mx: "auto",
        px: screens.xs ? 0 : 1,
        py: screens.xs ? 3 : 1
      }}
    >
      {/* HEADER */}
      <Stack
        direction={screens.md ? "row" : "column"}
        spacing={2}
        alignItems={screens.md ? "center" : "stretch"}
        justifyContent="space-between"
        sx={{ mb: 4, width: "100%" }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant={screens.xs ? "h6" : "h5"} fontWeight={600}>
            Student Management
          </Typography>

          <Typography color="text.secondary">
            Manage all students
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/s-admin/add-student")} >
          Add Student
        </Button>
      </Stack>

      {/* STATS */}
      <Box sx={{ mb: 4 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={<Groups />}
              value={rows.length}
              label="Total Students"
              iconBg="#E3F2FD"
              iconColor="#1565C0"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={<School />}
              value="12"
              label="Classes"
              iconBg="#E8F5E9"
              iconColor="#2E7D32"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={<Groups />}
              value="8"
              label="Sections"
              iconBg="#FFF3E0"
              iconColor="#EF6C00"
            />
          </Col>
        </Row>
      </Box>

      {/* FILTER */}
      {/* FILTER */}
      <Box
        sx={{
          mb: 3,
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          py: 1,
        }}
      >
        <Row gutter={[16, 16]}>
          {/* SEARCH */}
          <Col xs={24} md={9}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search Student"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Col>

          {/* CLASS FILTER */}
          <Col xs={24} sm={12} md={5}>
            <Box sx={{ position: "relative" }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Filter by Class"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                SelectProps={{
                  IconComponent: classFilter ? () => null : undefined
                }}
                InputProps={{
                  sx: { pr: classFilter ? 5 : 2 }
                }}
              >
                {classOptions.map((className) => (
                  <MenuItem key={className} value={className}>
                    {className}
                  </MenuItem>
                ))}
              </TextField>

              {classFilter && (
                <IconButton
                  size="small"
                  onClick={() => setClassFilter("")}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 8,
                    transform: "translateY(-50%)",
                    p: 0.5,
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Col>

          {/* GENDER FILTER */}
          <Col xs={24} sm={12} md={5}>
            <Box sx={{ position: "relative" }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Filter by Gender"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                SelectProps={{
                  IconComponent: genderFilter ? () => null : undefined
                }}
                InputProps={{
                  sx: { pr: genderFilter ? 5 : 2 }
                }}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>

              {genderFilter && (
                <IconButton
                  size="small"
                  onClick={() => setGenderFilter("")}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 8,
                    transform: "translateY(-50%)",
                    p: 0.5,
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Col>

          {/* EXPORT */}
          <Col xs={24} md={5}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
            >
              Export
            </Button>
          </Col>
        </Row>
      </Box>

      {/* TABLE */}
      {/* TABLE */}
      <Paper
        sx={{
          border: "1px solid #E5E7EB",
          overflowX: "auto",
        }}
      >
        <Box sx={{ minWidth: 1000 }}>
          <DataGrid
            apiRef={apiRef}
            rows={filteredRows}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                  page: 0
                }
              }
            }}
            sx={{
              border: 0
            }}
          />
        </Box>
      </Paper>

      {/* DELETE MODAL */}
      <Modal
        open={deleteModalOpen}
        onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
        okText="Delete"
        cancelText="Cancel"
        centered
        okButtonProps={{
          danger: true,
          style: {
            background: "linear-gradient(45deg,#ff4d4f,#ff7875)",
            border: "none"
          }
        }}
        bodyStyle={{ padding: "20px 10px" }}
      >
        <Box textAlign="center">
          <Typography variant="h6" sx={{ mb: 1 }}>
            Delete student
          </Typography>

          <Typography color="text.secondary">
            Are you sure you want to delete{" "}
            <b>{rowToDelete?.name}</b>?
          </Typography>
        </Box>
      </Modal>




      {/* STUDENT DETAILS DRAWER */}
<Drawer
  anchor="right"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  variant="persistent"
  sx={{
    "& .MuiDrawer-paper": {
      width: 340,
      p: 3,
      boxSizing: "border-box",
      boxShadow: "-4px 0 20px rgba(21,101,192,0.08)",
      border: "none",
      backgroundColor: "background.paper",
    },
  }}
>
  {selectedStudent && (
    <Box>

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" color="text.primary">
          Student Details
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton size="small" color="primary"
            onClick={() => navigate(`/s-admin/students/${selectedStudent.id}/edit`)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => setDrawerOpen(false)}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Avatar + Name */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Box
          sx={{
            width: 72, height: 72,
            borderRadius: "50%",
            bgcolor: "primary.main",
            display: "flex", alignItems: "center", justifyContent: "center",
            mx: "auto", mb: 1.5,
            fontSize: 28, color: "#fff", fontWeight: 700,
          }}
        >
          {selectedStudent.name?.charAt(0)}
        </Box>

        <Typography variant="h6" color="text.primary">
          {selectedStudent.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {selectedStudent.class} - {selectedStudent.section}&nbsp;|&nbsp;#{selectedStudent.rollNo}
        </Typography>

        <Chip
          label={selectedStudent.status}
          size="small"
          color={selectedStudent.status === "Active" ? "success" : "default"}
          sx={{ mt: 1, color: selectedStudent.status === "Active" ? "#fff" : "text.secondary" }}
        />
      </Box>

      {/* Attendance + Gender cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Paper
          variant="outlined"
          sx={{ flex: 1, p: 1.5, borderRadius: `${muiTheme.shape.borderRadius}px`, textAlign: "center" }}
        >
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            ATTENDANCE
          </Typography>
          <Typography
            fontWeight={700}
            fontSize={20}
            color={
              selectedStudent.attendance >= 75 ? "success.main"
              : selectedStudent.attendance >= 40 ? "warning.main"
              : "error.main"
            }
          >
            {selectedStudent.attendance}%
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ flex: 1, p: 1.5, borderRadius: `${muiTheme.shape.borderRadius}px`, textAlign: "center" }}
        >
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            GENDER
          </Typography>
          <Typography fontWeight={700} fontSize={15} color="text.primary" sx={{ mt: 0.5 }}>
            {selectedStudent.gender}
          </Typography>
        </Paper>
      </Box>

      {/* Guardian Information */}
      <Typography
        variant="caption"
        fontWeight={700}
        color="text.secondary"
        sx={{ letterSpacing: 0.8, mb: 1.5, display: "block" }}
      >
        GUARDIAN INFORMATION
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: `${muiTheme.shape.borderRadius}px`,
          p: 2, mb: 2,
          display: "flex", alignItems: "center", gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40, height: 40, minWidth: 40,
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: 0.12,                         // light tint from primary
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        />
        {/* icon overlaid separately so opacity doesn't affect it */}
        <Box sx={{ position: "relative", ml: "-48px", mr: "8px" }}>
          <Box
            sx={{
              width: 40, height: 40, minWidth: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(21,101,192,0.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "primary.main",
            }}
          >
            <Groups fontSize="small" />
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            Kiran Kumar
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3, display: "block" }}>
            📞 9456776654
          </Typography>
        </Box>
      </Paper>

      {/* Primary Email */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: `${muiTheme.shape.borderRadius}px`,
          p: 2, mb: 3,
          display: "flex", alignItems: "center", gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40, height: 40, minWidth: 40,
            borderRadius: "50%",
            backgroundColor: "rgba(249,168,37,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "warning.main",
          }}
        >
          <Typography fontSize={18}>✉️</Typography>
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            Primary Email
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3, display: "block" }}>
            {selectedStudent.email || "N/A"}
          </Typography>
        </Box>
      </Paper>

      {/* Attendance Progress */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          ATTENDANCE PROGRESS
        </Typography>
        <LinearProgress
          variant="determinate"
          value={selectedStudent.attendance || 0}
          color={
            selectedStudent.attendance >= 75 ? "success"
            : selectedStudent.attendance >= 40 ? "warning"
            : "error"
          }
          sx={{ mt: 1 }}  // height + borderRadius come from theme MuiLinearProgress overrides
        />
      </Box>

    {/* Action Buttons */}
<Box sx={{ display: "flex", gap: 2, mt: 3 }}>

    {/* View Profile Button */}
  <Button
    fullWidth
    variant="contained"
    color="default"
    sx={{
      py: 1.2,
        fontWeight: 600,
      textTransform: "none",
      border: `1px solid ${muiTheme.palette.divider}`,
    }}
    onClick={() =>
      navigate(`/s-admin/students/${selectedStudent.id}/view`)
    }
  >
    View Profile
  </Button>

  {/* Collect Fee Button */}
  <Button
    fullWidth
    variant="contained"
    color="primary"
    sx={{
      py: 1.2,
      fontWeight: 600,
      boxShadow: "none",
      textTransform: "none",
    }}
    onClick={() =>
      navigate(`/s-admin/collect-fee/${selectedStudent.id}`)
    }
  >
    Collect Fee
  </Button>


</Box>

    </Box>
  )}
</Drawer>
    </Box>
  );
};

export default StudentLists;

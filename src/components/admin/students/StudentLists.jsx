import React, { useState } from "react";
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
  Paper
} from "@mui/material";

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

const { useBreakpoint } = AntGrid;

/* ================= Dummy Student Data ================= */

const initialStudents = [
  {
    id: 1,
    name: "Amit Sharma",
    rollNo: "101",
    class: "FY BCA",
    section: "A",
    gender: "Male",
    phone: "9876543210",
    status: "Active"
  },
  {
    id: 2,
    name: "Priya Patil",
    rollNo: "102",
    class: "FY BCA",
    section: "B",
    gender: "Female",
    phone: "9876543211",
    status: "Active"
  },
  {
    id: 3,
    name: "Rahul Desai",
    rollNo: "103",
    class: "SY BCA",
    section: "A",
    gender: "Male",
    phone: "9876543212",
    status: "Inactive"
  }
];

/* ================= Stat Card ================= */

const StatCard = ({ icon, value, label }) => (
  <Card
    style={{
      borderRadius: 12,
      border: "1px solid #E5E7EB"
    }}
  >
    <Box display="flex" alignItems="center" gap={2}>
      {icon}
      <Box>
        <Typography variant="h5">{value}</Typography>
        <Typography color="text.secondary">{label}</Typography>
      </Box>
    </Box>
  </Card>
);

/* ================= MAIN COMPONENT ================= */

const StudentLists = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const [rows, setRows] = useState(initialStudents);
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("all");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  /* ================= Delete ================= */

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setRows((prev) => prev.filter((r) => r.id !== rowToDelete.id));
    setDeleteModalOpen(false);
  };

  /* ================= Filter ================= */

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.rollNo.includes(searchText);

    const matchesClass =
      classFilter === "all" || row.class === classFilter;

    return matchesSearch && matchesClass;
  });

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

    { field: "class", headerName: "Class", flex: 1 },

    { field: "section", headerName: "Section", flex: 1 },

    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === "Male" ? "primary" : "secondary"}
        />
      )
    },

    { field: "phone", headerName: "Phone", flex: 1.2 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "default"}
        />
      )
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small">
            <Visibility />
          </IconButton>

          <IconButton size="small" color="primary">
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
          <Typography  variant={screens.xs ? "h6" : "h5"} fontWeight={600}>
            Student Management
          </Typography>

          <Typography color="text.secondary">
            Manage all students
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<Add />}  onClick={() => navigate("/add-student")} >
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
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={<School />}
              value="12"
              label="Classes"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={<Groups />}
              value="8"
              label="Sections"
            />
          </Col>
        </Row>
      </Box>

      {/* FILTER */}
      <Box sx={{ mb: 3 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
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

          <Col xs={24} md={6}>
            <TextField
              select
              fullWidth
              size="small"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <MenuItem value="all">All Classes</MenuItem>
              <MenuItem value="FY BCA">FY BCA</MenuItem>
              <MenuItem value="SY BCA">SY BCA</MenuItem>
            </TextField>
          </Col>
        </Row>
      </Box>

      {/* TABLE */}
      <Paper sx={{ border: "1px solid #E5E7EB" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* DELETE MODAL */}
      <Modal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={handleConfirmDelete}
        okText="Delete"
        centered
      >
        <Typography>
          Delete <b>{rowToDelete?.name}</b>?
        </Typography>
      </Modal>
    </Box>
  );
};

export default StudentLists;
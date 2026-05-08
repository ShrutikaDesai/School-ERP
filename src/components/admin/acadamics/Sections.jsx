import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Card, Col, Row, Grid as AntGrid, Modal } from "antd";
import {
  Add,
  Groups,
  Apartment,
  MenuBook,
  Search,
  Download,
  Visibility,
  Edit,
  Delete
} from "@mui/icons-material";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import AddSectionModal from "../modals/AddSectionModal";

const { useBreakpoint } = AntGrid;

/* ================= Dummy Data ================= */

const initialRows = [
  {
    id: 1,
    sectionName: "A",
    className: "7th Standard",
    students: 52,
    capacity: 80,
    teacher: "P. Sharma",
    status: "Active"
  },
  {
    id: 2,
    sectionName: "B",
    className: "8th Standard",
    students: 48,
    capacity: 75,
    teacher: "R. Patil",
    status: "Active"
  },
  {
    id: 3,
    sectionName: "A",
    className: "6th Standard",
    students: 50,
    capacity: 85,
    teacher: "A. Desai",
    status: "Inactive"
  }
];

/* ================= Stat Card ================= */

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

/* ================= Main Component ================= */

function SectionsContent() {
  const screens = useBreakpoint();
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState(initialRows);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  const handleOpenModal = () => {
    setModalMode('add');
    setSelectedRow(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleEdit = (row) => {
    setModalMode('edit');
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleView = (row) => {
    setModalMode('view');
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    setRows(prev => prev.filter(row => row.id !== rowToDelete.id));
    setDeleteModalOpen(false);
    setRowToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setRowToDelete(null);
  };

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteModalOpen(true);
  };

  const handleAddSection = (values) => {
    if (modalMode === 'add') {
      setRows(prev => [...prev, { id: prev.length + 1, ...values }]);
    } else if (modalMode === 'edit') {
      setRows(prev => prev.map(row => row.id === selectedRow.id ? { ...row, ...values } : row));
    }
    setOpenModal(false);
    setSelectedRow(null);
    setModalMode('add');
  };

  /* ================= Export ================= */

  const handleExport = () => {
    const visibleRows = Array.from(apiRef.current.getRowModels().values());

    const exportData = visibleRows.map((row, index) => ({
      "Sr No.": index + 1,
      Section: row.sectionName,
      Class: row.className,
      Students: row.students,
      "Capacity (%)": row.capacity,
      Coordinator: row.teacher,
      Status: row.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sections");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    saveAs(new Blob([buffer]), "sections.xlsx");
  };

  const classOptions = Array.from(new Set(rows.map((row) => row.className)));
  const sectionOptions = Array.from(new Set(rows.map((row) => row.sectionName)));

  const filteredRows = rows.filter((row) => {
    const searchMatch =
      row.sectionName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.className.toLowerCase().includes(searchText.toLowerCase()) ||
      row.teacher.toLowerCase().includes(searchText.toLowerCase());

    const classMatch = !classFilter || row.className === classFilter;
    const sectionMatch = !sectionFilter || row.sectionName === sectionFilter;

    return searchMatch && classMatch && sectionMatch;
  });

  /* ================= Columns ================= */

  const columns = [
    {
      field: "srNo",
      headerName: "Sr No.",
      width: 70,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
    },
    {
      field: "sectionName",
      headerName: "Section",
      flex: 1
    },
    {
      field: "className",
      headerName: "Class",
      flex: 1
    },
    {
      field: "students",
      headerName: "Student Count",
      flex: 1
    },
    {
      field: "capacity",
      headerName: "Capacity",
      flex: 0,
      renderCell: (params) => `${params.value}%`
    },
    {
      field: "teacher",
      headerName: "Coordinator",
      flex: 1
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
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
      )
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleView(params.row)}>
            <Visibility />
          </IconButton>

          <IconButton size="small" color="primary" onClick={() => handleEdit(params.row)}>
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

  /* ================= UI ================= */

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
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: screens.md ? "row" : "column",
          alignItems: screens.md ? "center" : "stretch",
          gap: 2,
          width: "100%"
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Sections Management
          </Typography>

          <Typography color="text.secondary">
            Manage sections within classes
          </Typography>
        </Box>

        <Box
          sx={{
            width: screens.md ? "auto" : "100%",
            display: "flex",
            justifyContent: screens.md ? "flex-end" : "stretch",
            marginLeft: screens.md ? "auto" : 0,
            gap: 1.5,
            flexDirection: screens.md ? "row" : "column"
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenModal}
            sx={{
              width: screens.md ? "auto" : "100%",
              minWidth: 160
            }}
          >
            Add Section
          </Button>
        </Box>
      </Box>


      {/* Stats */}
      <Box sx={{ mb: 4 }}>
        <Row gutter={[16, 16]}>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={<Apartment />}
              value={rows.length}
              label="Total Sections"
              iconBg="#E3F2FD"
              iconColor="#1565C0"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={<Groups />}
              value={rows.reduce((acc, row) => acc + row.students, 0)}
              label="Students"
              iconBg="#E8F5E9"
              iconColor="#2E7D32"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={<MenuBook />}
              value={new Set(rows.map((row) => row.teacher)).size}
              label="Faculty"
              iconBg="#FFF3E0"
              iconColor="#EF6C00"
            />
          </Col>

        </Row>
      </Box>

      {/* Filters */}
      <Box sx={{ my: 3 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={9}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search Section"
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

          <Col xs={24} md={5}>
            <TextField
              select
              fullWidth
              label="Filter by Class"
              size="small"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              {classOptions.map((className) => (
                <MenuItem key={className} value={className}>
                  {className}
                </MenuItem>
              ))}
            </TextField>
          </Col>

          <Col xs={24} md={5}>
            <TextField
              select
              fullWidth
              label="Filter by Section"
              size="small"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
            >
              {sectionOptions.map((sectionName) => (
                <MenuItem key={sectionName} value={sectionName}>
                  {sectionName}
                </MenuItem>
              ))}
            </TextField>
          </Col>

          <Col xs={24} md={5}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: screens.md ? "flex-end" : "flex-start",
                alignItems: "center"
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExport}
                sx={{
                  width: screens.md ? 140 : "100%",
                  minWidth: screens.md ? 140 : "100%"
                }}
              >
                Export
              </Button>
            </Box>
          </Col>
        </Row>
      </Box>

      {/* Table */}
      <Paper sx={{ overflow: "hidden" }}>
        <Box sx={{ overflowX: "auto" }}>
          <DataGrid
            apiRef={apiRef}
            rows={filteredRows}
            columns={columns}
            autoHeight
            rowHeight={72}
            pagination
            pageSizeOptions={[5, 10, 20, 50]}
            sx={{
              minWidth: screens.xs ? 900 : "100%",
              border: 0
            }}
          />
        </Box>
      </Paper>


      <AddSectionModal
        open={openModal}
        onCancel={handleCloseModal}
        onSubmit={handleAddSection}
        mode={modalMode}
        initialValues={selectedRow}
      />

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
            Delete Section
          </Typography>

          <Typography color="text.secondary">
            Are you sure you want to delete{" "}
            <b>{rowToDelete?.sectionName}</b> section?
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

/* ================= Export ================= */

export default function Sections() {
  return <SectionsContent />;
}

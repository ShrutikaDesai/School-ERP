import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  MenuItem,
  InputAdornment,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { Row, Col, Grid as AntGrid, Empty , DatePicker } from "antd";
import { Autocomplete } from "@mui/material";

import {
  Search,
  Download,
  Groups,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AccessTime } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const { useBreakpoint } = AntGrid;
const { RangePicker } = DatePicker;

/* ================= Dummy Data ================= */

const rowsData = [
  {
    id: 1,
    name: "Amit Sharma",
    class: "FY BCA",
    section: "A",
    present: 22,
    absent: 3,
    late: 2,
    percentage: 88,
    date: "2024-01-10",
  },
  {
    id: 2,
    name: "Priya Patil",
    class: "FY BCA",
    section: "B",
    present: 20,
    absent: 5,
      late: 0,
    percentage: 80,
    date: "2024-01-15",
  },
  {
    id: 3,
    name: "Rahul Verma",
    class: "FY BCA",
    section: "A",
    present: 25,
    absent: 0,
    late: 1,
    percentage: 100,
    date: "2024-01-12",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    class: "FY BCA",
    section: "B",
    present: 18,
    absent: 7,
    late: 2,
    percentage: 72,
    date: "2024-01-18",
  },
   {
    id: 5,
    name: "Vikram Singh",
    class: "SY BCA",
    section: "A",
    present: 23,
    absent: 2,
      late: 0,
    percentage: 92,
    date: "2024-01-11",
  },
  {
    id: 6,
    name: "Pooja Desai",
    class: "SY BCA",
    section: "B",
    present: 19,
    absent: 6,
    late: 1,
    percentage: 76,
    date: "2024-01-14",
  },
  {
    id: 7,
    name: "Karan Mehta",
    class: "SY BCA",
    section: "A",
    present: 21,
    absent: 4,
    late: 0,
    percentage: 84,
    date: "2024-01-16",
  },
  {
    id: 8,
    name: "Neha Joshi",
    class: "FY BCA",
    section: "A",
    present: 24,
    absent: 1,
    late: 0,
    percentage: 96,
    date: "2024-01-20",
  },
  {
    id: 9,
    name: "Arjun Nair",
    class: "SY BCA",
    section: "B",
    present: 17,
    absent: 8,
    late: 2,
    percentage: 68,
    date: "2024-01-22",
  },
  {
    id: 10,
    name: "Anjali Gupta",
    class: "FY BCA",
    section: "B",
    present: 22,
    absent: 3,
    late: 2,
    percentage: 88,
    date: "2024-01-25",
  },
];

/* ================= Stat Card ================= */

const StatCard = ({ label, value, icon, color }) => (
   <Box
    sx={{
      border: "1px solid #E5E7EB",
      borderRadius: 2,
      px: 3,
      py: 3 ,// 🔥 increase this instead of height
      display: "flex",
      alignItems: "center",
      gap: 2,
      background: "#fff",
    }}
  >
    <Box sx={{ color }}>{icon}</Box>

    <Box>
      <Typography variant="h6" fontWeight={600}>
        {value}
      </Typography>
      <Typography fontSize={13} color="text.secondary">
        {label}
      </Typography>
    </Box>
  </Box>
);

/* ================= Main ================= */

const AttendanceReport = () => {
  const screens = useBreakpoint();

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const classOptions = ["FY BCA", "SY BCA"];
const sectionOptions = ["A", "B"];

const handleExportExcel = () => {
  if (filteredRows.length === 0) return;

  const fromDate = dayjs(dateRange[0]).format("DD-MM-YYYY");
  const toDate = dayjs(dateRange[1]).format("DD-MM-YYYY");

  const exportData = filteredRows.map((row, index) => ({
    "Sr No": index + 1,
    Name: row.name,
    Class: row.class,
    Section: row.section,
    Present: row.present,
    Absent: row.absent,
    Late: row.late,
    "Attendance %": row.percentage,
    Date: row.date,
  }));

  // 🔥 Create worksheet with top header rows
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["Attendance Report"],
    [],
    ["Class:", classFilter],
    ["Section:", sectionFilter],
    ["Date:", `${fromDate} to ${toDate}`],
    [],
  ]);

  // 🔥 Add table after header (start from row 7)
  XLSX.utils.sheet_add_json(worksheet, exportData, {
    origin: "A7",
    skipHeader: false,
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "attendance_report.xlsx");
};

const handleExportPDF = () => {
  if (filteredRows.length === 0) return;

  const doc = new jsPDF();

  const fromDate = dayjs(dateRange[0]).format("DD-MM-YYYY");
  const toDate = dayjs(dateRange[1]).format("DD-MM-YYYY");

  const tableColumn = [
    "Sr No",
    "Name",
    "Class",
    "Section",
    "Present",
    "Absent",
    "Late",
    "Attendance %",
    "Date",
  ];

  const tableRows = filteredRows.map((row, index) => [
    index + 1,
    row.name,
    row.class,
    row.section,
    row.present,
    row.absent,
    row.late,
    `${row.percentage}%`,
    row.date,
  ]);

  // 🔥 Header Title
  doc.setFontSize(14);
  doc.text("Attendance Report", 14, 15);

  // 🔥 Filter Info
  doc.setFontSize(10);
  doc.text(`Class: ${classFilter}`, 14, 25);
  doc.text(`Section: ${sectionFilter}`, 14, 31);
  doc.text(`Date: ${fromDate} to ${toDate}`, 14, 37);

  // 🔥 Table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
  });

  doc.save("attendance_report.pdf");
};

  /* ================= Columns ================= */

  const columns = [
    {
      field: "sr",
      headerName: "Sr No",
      flex: screens.xs ? 0.8 : 0.5,
      minwidth: 80,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    { field: "name", headerName: "Student Name", flex: 2 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },

    {
      field: "present",
      headerName: "Present",
      flex: 1,
      renderCell: (params) => (
        <Chip
          icon={<CheckCircle />}
          label={params.value}
          sx={{ background: "#E8F5E9", color: "#2E7D32" }}
        />
      ),
    },
    {
      field: "absent",
      headerName: "Absent",
      flex: 1,
      renderCell: (params) => (
        <Chip
          icon={<Cancel />}
          label={params.value}
          sx={{ background: "#FFEBEE", color: "#C62828" }}
        />
      ),
    },
    {
  field: "late",
  headerName: "Late",
  flex: 1,
  renderCell: (params) => (
    <Chip
      label={params.value}
      sx={{
        background: "#FFF8E1",
        color: "#F57C00",
      }}
    />
  ),
},
    {
      field: "percentage",
      headerName: "Attendance %",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={`${params.value}%`}
          sx={{
            background: params.value > 75 ? "#E3F2FD" : "#FFF3E0",
            color: params.value > 75 ? "#1565C0" : "#EF6C00",
          }}
        />
      ),
    },
  ];

  /* ================= Filtering ================= */

  const isFilterApplied =
    classFilter && sectionFilter && dateRange[0] && dateRange[1];

  const filteredRows = rowsData.filter((row) => {
    const matchesSearch = row.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesClass = row.class === classFilter;
    const matchesSection = row.section === sectionFilter;

    const matchesDate =
      dayjs(row.date).isAfter(dayjs(dateRange[0]).subtract(1, "day")) &&
      dayjs(row.date).isBefore(dayjs(dateRange[1]).add(1, "day"));

    return (
      matchesSearch &&
      matchesClass &&
      matchesSection &&
      matchesDate
    );
  });

  const totalLate = filteredRows.reduce((acc, r) => acc + (r.late || 0), 0);

  /* ================= Stats ================= */

  const totalStudents = filteredRows.length;
  const avgAttendance =
    filteredRows.length > 0
      ? Math.round(
          filteredRows.reduce((acc, r) => acc + r.percentage, 0) /
            filteredRows.length
        )
      : 0;

  const avgAbsent = 100 - avgAttendance;

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
     <Box
  sx={{
    mb: 3,
    display: "flex",
    justifyContent: "space-between",
  }}
>
  <Box>
    <Typography variant="h5" fontWeight={600}>
      Attendance Report
    </Typography>

    <Typography color="text.secondary" fontSize={14}>
      Student attendance overview
    </Typography>
  </Box>
</Box>

      {/* FILTER ROW */}
      <Box sx={{ mb: 3 }}>
        <Row gutter={[16, 16]}>
         <Col xs={24} md={5}>
  <Autocomplete
    options={classOptions}
    value={classFilter || null}
    onChange={(e, newValue) => setClassFilter(newValue || "")}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Class"
        size="small"
        fullWidth
      />
    )}
  />
</Col>

       <Col xs={24} md={5}>
  <Autocomplete
    options={sectionOptions}
    value={sectionFilter || null}
    onChange={(e, newValue) => setSectionFilter(newValue || "")}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Section"
        size="small"
        fullWidth
      />
    )}
  />
</Col>

          <Col xs={24} md={6}>
          <RangePicker
  style={{
    width: "100%",
    height: 40, // ✅ match MUI small TextField
    display: "flex",
    alignItems: "center",
  }}
  value={dateRange}
  onChange={(dates) => {
    setDateRange(dates || [null, null]);
  }}
  format="DD-MM-YYYY"
  allowClear
/>
          </Col>

         
        </Row>
      </Box>

      {/* SHOW ONLY AFTER FILTER */}
    {isFilterApplied ? (
  <>
    {/* STATS */}
    <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
  <Col xs={24} sm={12} md={6}>
    <StatCard
      icon={<Groups />}
      value={totalStudents}
      label="Total Students"
      color="#1976d2"
    />
  </Col>

  <Col xs={24} sm={12} md={6}>
    <StatCard
      icon={<CheckCircle />}
      value={`${avgAttendance}%`}
      label="Avg Attendance"
      color="green"
    />
  </Col>

  <Col xs={24} sm={12} md={6}>
    <StatCard
      icon={<Cancel />}
      value={`${avgAbsent}%`}
      label="Avg Absence"
      color="red"
    />
  </Col>

  <Col xs={24} sm={12} md={6}>
    <StatCard
      icon={<AccessTime />}
      value={totalLate}
      label="Total Late"
      color="#f57c00"
    />
  </Col>
</Row>

    {/* TABLE */}
<Paper sx={{ p: 2 }}>
  
  {/* HEADER (NOT SCROLLABLE) */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
      flexDirection: screens.xs ? "column" : "row",
      gap: 1
    }}
  >
    <Typography fontWeight={600}>
      Student Attendance
    </Typography>

    <Box
      sx={{
        display: "flex",
        gap: 1,
        width: screens.xs ? "100%" : "auto",
        flexDirection: screens.xs ? "column" : "row"
      }}
    >
      {/* SEARCH */}
      <TextField
        size="small"
        placeholder="Search student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth={screens.xs}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* BUTTONS */}
      <Button
        variant="outlined"
        startIcon={<Download />}
        size="small"
        fullWidth={screens.xs}
        onClick={handleExportExcel}
      >
        Excel
      </Button>

      <Button
        variant="outlined"
        startIcon={<Download />}
        size="small"
        fullWidth={screens.xs}
        onClick={handleExportPDF}
      >
        PDF
      </Button>
    </Box>
  </Box>

  {/* TABLE SCROLL ONLY */}
  <Box sx={{ overflowX: "auto" }}>
    <DataGrid
      rows={filteredRows}
      columns={columns}
      autoHeight
      pageSizeOptions={[5, 10, 20, 50]}
      rowHeight={72}
      sx={{
        minWidth: 900,
        border: 0
      }}
    />
  </Box>

</Paper>
  </>
) : (
  <Paper
    sx={{
      py: 8,
      textAlign: "center",
      border: "1px dashed #d9d9d9",
    }}
  >
    <Empty
      description="Please select Class, Section and Date to view attendance"
    />
  </Paper>
)}
    </Box>
  );
};

export default AttendanceReport;
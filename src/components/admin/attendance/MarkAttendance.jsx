// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Chip,
//   Autocomplete,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { Row, Col, Grid as AntGrid, Empty } from "antd";
// import { motion } from "framer-motion";
// import { DatePicker } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
// import { Apartment, Groups, MenuBook } from "@mui/icons-material";

// const { useBreakpoint } = AntGrid;

// /* ================= Dummy Data ================= */

// const initialStudents = [
//   { id: 1, name: "Amit Sharma", rollNo: "101", gender: "Male", status: true },
//   { id: 2, name: "Priya Patil", rollNo: "102", gender: "Female", status: false },
//   { id: 3, name: "Rahul Desai", rollNo: "103", gender: "Male", status: true },
//   { id: 4, name: "Sneha Joshi", rollNo: "104", gender: "Female", status: true },
// ];

// /* ================= Stat Card ================= */

// const StatCard = ({ label, value, icon, color }) => (
//   <Paper
//     sx={{
//       minHeight: 140,
//       width: "100%",
//       p: 3,
//       border: "1px solid #E5E7EB",
//       borderRadius: 3,
//       boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
//       display: "flex",
//       alignItems: "center",
//       gap: 2,
//     }}
//   >
//     <Box sx={{ color, display: "flex", alignItems: "center" }}>
//       {icon}
//     </Box>

//     <Box sx={{ flex: 1 }}>
//       <Typography variant="h5" fontWeight={700}>
//         {value}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         {label}
//       </Typography>
//     </Box>
//   </Paper>
// );

// /* ================= Main Component ================= */

// const MarkAttendance = () => {
//   const screens = useBreakpoint();

//   const [students, setStudents] = useState(initialStudents);
//   const [className, setClassName] = useState("");
//   const [section, setSection] = useState("");
//   const [date, setDate] = useState("");
//   const [selectAll, setSelectAll] = useState(false);

//   const presentCount = students.filter((s) => s.status).length;

//   const isReady = className && section && date;

//   /* ================= Handlers ================= */

//   const handleToggle = (id) => {
//     setStudents((prev) =>
//       prev.map((s) =>
//         s.id === id ? { ...s, status: !s.status } : s
//       )
//     );
//   };

//   const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     setStudents((prev) =>
//       prev.map((s) => ({ ...s, status: checked }))
//     );
//   };

//   const handleSave = () => {
//     console.log("Attendance Data:", students);
//   };

//   /* ================= Columns ================= */

// const columns = [
//   {
//     field: "srNo",
//     headerName: "Sr No",
//     flex: 0.5,
//     renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
//   },
//   { field: "rollNo", headerName: "Roll No", flex: 1 },
//   { field: "name", headerName: "Student Name", flex: 2 },
// {
//   field: "gender",
//   headerName: "Gender",
//   flex: 1,
//   minWidth: 120,

//   valueGetter: (_, row) => row?.gender || "-",

//   renderCell: (params) => {
//     const gender = params.value;

//     return (
//       <Chip
//         label={gender}
//         size="small"
//         sx={{
//           background:
//             gender === "Male"
//               ? "#1565C0"
//               : gender === "Female"
//               ? "#E91E63"
//               : "#9E9E9E",
//           color: "#fff",
//           fontWeight: 500,
//         }}
//       />
//     );
//   },
// },

//   {
//     field: "status",
//     headerName: "Attendance",
//     flex: 1,
//     renderCell: (params) => (
//       <Box display="flex" alignItems="center" gap={1}>
//         <Checkbox
//           checked={params.row.status}
//           onChange={() => handleToggle(params.row.id)}
//         />
//         <Chip
//           label={params.row.status ? "Present" : "Absent"}
//           size="small"
//           sx={{
//             background: params.row.status ? "#4CAF50" : "#E0E0E0",
//             color: params.row.status ? "#fff" : "#333",
//           }}
//         />
//       </Box>
//     ),
//   },
// ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: 1440,
//         mx: "auto",
//         px: screens.xs ? 2 : 4,
//         py: 2,
//       }}
//     >
//       {/* HEADER */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h5" fontWeight={600}>
//           Mark Attendance
//         </Typography>
//         <Typography color="text.secondary">
//           Track daily student attendance
//         </Typography>
//       </Box>

//       {/* STATS */}
//       <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
//         <Col xs={24} sm={12} md={8}>
//           <StatCard
//             icon={<Groups />}
//             value={students.length}
//             label="Total Students"
//             color="#1976d2"
//           />
//         </Col>

//         <Col xs={24} sm={12} md={8}>
//           <StatCard
//             icon={<MenuBook />}
//             value={presentCount}
//             label="Present"
//             color="green"
//           />
//         </Col>

//         <Col xs={24} sm={12} md={8}>
//           <StatCard
//             icon={<Apartment />}
//             value={students.length - presentCount}
//             label="Absent"
//             color="#f57c00"
//           />
//         </Col>
//       </Row>

//       {/* FILTERS */}
//       <Box sx={{ mb: 3 }}>
//         <Row gutter={[16, 16]}>
//           <Col xs={24} md={6}>
//             <Autocomplete
//               options={["FY BCA", "SY BCA"]}
//               value={className}
//               onChange={(e, v) => setClassName(v || "")}
//               renderInput={(params) => (
//                 <TextField {...params} label="Class" size="small" />
//               )}
//               fullWidth
//             />
//           </Col>

//           <Col xs={24} md={6}>
//             <Autocomplete
//               options={["A", "B"]}
//               value={section}
//               onChange={(e, v) => setSection(v || "")}
//               renderInput={(params) => (
//                 <TextField {...params} label="Section" size="small" />
//               )}
//               fullWidth
//             />
//           </Col>

//           <Col xs={24} md={6}>
//             <DatePicker
//               label="Date"
//               value={date ? dayjs(date) : null}
//               onChange={(val) => setDate(val?.format("YYYY-MM-DD"))}
//               slotProps={{
//                 textField: { size: "small", fullWidth: true },
//               }}
//             />
//           </Col>

//           <Col xs={24} md={6}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={selectAll}
//                   onChange={(e) => handleSelectAll(e.target.checked)}
//                 />
//               }
//               label="Mark All Present"
//             />
//           </Col>
//         </Row>
//       </Box>

//       {/* TABLE CARD */}
//       <Paper
//         sx={{
//           border: "1px solid #E5E7EB",
//         //   borderRadius: 2,
//           overflow: "hidden",
//         }}
//       >
//         {/* HEADER */}
//         <Box
//           sx={{
//             px: 2,
//             py: 1.5,
//             background: "linear-gradient(90deg, #adadad, #adadad)",
//             color: "#fff",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography fontSize="14px" fontWeight={600}>
//             Student Attendance
//           </Typography>

//           <Box sx={{ display: "flex", gap: 1 }}>
//             <Box sx={{ px: 1.5, py: 0.5, background: "rgba(255,255,255,0.15)", borderRadius: 1 }}>
//               Class: {className || "-"}
//             </Box>
//             <Box sx={{ px: 1.5, py: 0.5, background: "rgba(255,255,255,0.15)", borderRadius: 1 }}>
//               Section: {section || "-"}
//             </Box>
//           </Box>
//         </Box>

//         {/* BODY */}
//       {!isReady ? (
//   <Box
//     sx={{
//       py: 6,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
//     <Empty
//       description={
//         <span style={{ color: "#6B7280", fontWeight: 500 }}>
//           Please select Class, Section & Date to view attendance records
//         </span>
//       }
//     />
//   </Box>
// ) : (
//           <DataGrid
//             rows={students}
//             columns={columns}
//             autoHeight
//             pageSizeOptions={[5, 10, 20]}
//             disableRowSelectionOnClick
//             rowHeight={65}
//             sx={{
//               border: 0,
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: "#F9FAFB",
//                 fontWeight: 600,
//               },
//             }}
//           />
//         )}
//       </Paper>

//       {isReady && (
//   <Box
//     sx={{
//       mt: 2,
//       display: "flex",
//       justifyContent: "flex-end",
//     }}
//   >
//     <Button
//       variant="contained"
//       size="large"
//       onClick={handleSave}
//       sx={{
//         px: 4,
//         fontWeight: 600,
//         borderRadius: 2,
//         textTransform: "none",
//         boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
//       }}
//     >
//       Save Attendance
//     </Button>
//   </Box>
// )}
//     </Box>
//   );
// };

// export default MarkAttendance;


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
  { id: 1, name: "Amit Sharma", rollNo: "101", gender: "Male", status: "Present" },
  { id: 2, name: "Priya Patil", rollNo: "102", gender: "Female", status: "Absent" },
  { id: 3, name: "Rahul Desai", rollNo: "103", gender: "Male", status: "Present" },
  { id: 4, name: "Sneha Joshi", rollNo: "104", gender: "Female", status: "Late" },
];

/* ================= Main Component ================= */

const MarkAttendance = () => {
  const screens = useBreakpoint();

  const [students, setStudents] = useState(initialStudents);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const isReady = className && section && date;

  /* ================= Counts ================= */

  const presentCount = students.filter((s) => s.status === "Present").length;
  const absentCount = students.filter((s) => s.status === "Absent").length;
  const lateCount = students.filter((s) => s.status === "Late").length;

  /* ================= Toggle (cycle status) ================= */

  const handleToggle = (id) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;

        const next =
          s.status === "Present"
            ? "Absent"
            : s.status === "Absent"
              ? "Late"
              : "Present";

        return { ...s, status: next };
      })
    );
  };

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

  /* ================= Columns ================= */

  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      flex: 0.5,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    { field: "rollNo", headerName: "Roll No", flex: 1 },
    { field: "name", headerName: "Student Name", flex: 2 },

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
                ? "#E3F2FD" // light blue
                : params.value === "Female"
                  ? "#FCE4EC" // light pink
                  : "#F5F5F5", // light grey
            color:
              params.value === "Male"
                ? "#1565C0"
                : params.value === "Female"
                  ? "#C2185B"
                  : "#616161",
            fontWeight: 500,
          }}
        />
      )
    },

    {
      field: "status",
      headerName: "Attendance",
      flex: 1,
      renderCell: (params) => {
        const value = params.value;

        return (
          <Box display="flex" alignItems="center" gap={1}>
            {/* KEEP CHECKBOX AS IT IS */}
            <Checkbox
              checked={value === "Present"}
              onChange={() => handleToggle(params.id)}
            />

            {/* STATUS CHIP WITH ICONS */}
            <Chip
              icon={
                value === "Present" ? (
                  <CheckCircleIcon fontSize="small" />
                ) : value === "Absent" ? (
                  <CancelIcon fontSize="small" />
                ) : (
                  <AccessTimeIcon fontSize="small" />
                )
              }
              label={value}
              size="small"
              sx={{
                backgroundColor:
                  value === "Present"
                    ? "#E8F5E9"
                    : value === "Absent"
                      ? "#FFEBEE"
                      : "#FFF3E0",

                color:
                  value === "Present"
                    ? "#2E7D32"
                    : value === "Absent"
                      ? "#C62828"
                      : "#EF6C00",

                fontWeight: 500,

                "& .MuiChip-icon": {
                  color: "inherit",
                },
              }}
            />
          </Box>
        );
      },
    }
  ];

  /* ================= Footer (like your image) ================= */

  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        {/* LEFT SIDE SUMMARY */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            px: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "green" }} />
            <Typography fontSize={13}>Present: {presentCount}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "red" }} />
            <Typography fontSize={13}>Absent: {absentCount}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "orange" }} />
            <Typography fontSize={13}>Late: {lateCount}</Typography>
          </Box>
        </Box>

        {/* RIGHT SIDE PAGINATION */}
        <GridPagination />
      </GridFooterContainer>
    );
  };

  return (
    <Box sx={{
      width: "100%", maxWidth: 1440, mx: "auto", 
      px: screens.xs ? 0 : 1,
      py: screens.xs ? 3 : 1
    }}>
      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Mark Attendance
        </Typography>

        <Typography color="text.secondary" fontSize={14} sx={{ mt: 0.5 }}>
          Track student attendance
        </Typography>
      </Box>

      {/* FILTERS */}
      <Box sx={{ mb: 3 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Autocomplete
              options={["FY BCA", "SY BCA"]}
              value={className}
              onChange={(e, v) => setClassName(v || "")}
              renderInput={(params) => (
                <TextField {...params} label="Class" size="small" />
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
                <TextField {...params} label="Section" size="small" />
              )}
              fullWidth
            />
          </Col>

          <Col xs={24} md={6}>
            <DatePicker
              label="Date"
              value={date ? dayjs(date) : null}
              onChange={(val) => setDate(val?.format("YYYY-MM-DD"))}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </Col>

          {isReady && (
            <Col xs={24} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                }
                label="Mark All Present"
              />
            </Col>
          )}
        </Row>
      </Box>

      {/* table */}
      <Paper sx={{ border: "1px solid #E5E7EB", overflow: "hidden" }}>
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
              slots={{
                footer: CustomFooter,
              }}
              sx={{
                minWidth: screens.xs ? 900 : "100%",
                border: 0,
              }}
            />
          </Box>
        )}
      </Paper>

      {/* SAVE BUTTON */}
      {isReady && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSave}>
            Save Attendance
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MarkAttendance;
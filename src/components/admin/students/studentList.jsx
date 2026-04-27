import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Chip,
  IconButton,
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

import {
  Add,
  Visibility,
  Edit,
  FilterList,
  Download,
  Notifications
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";




const students = [
  { id: "ADM001", name: "Rahul Kumar", class: 6, section: "A", gender: "Male", phone: "9876543210", status: "Active" },
  { id: "ADM002", name: "Priya Sharma", class: 10, section: "B", gender: "Female", phone: "9876543211", status: "Active" },
  { id: "ADM003", name: "Amit Singh", class: 8, section: "A", gender: "Male", phone: "9876543212", status: "Active" },
  { id: "ADM004", name: "Sneha Patel", class: 5, section: "C", gender: "Female", phone: "9876543213", status: "Inactive" },
];

const StudentsPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f5f7fb", minHeight: "100vh", py: 4 }}>
      <Container maxWidth={false} sx={{ px: 4 }}>

        

        {/* HEADER ROW */}
        <Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center"
  sx={{
    width: "100%",
    flexWrap: "nowrap"   // ❗ important (no wrap)
  }}
  mb={3}
>
  <Box>
    <Typography variant="h6" fontWeight={600}>
      Students
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Manage all student records
    </Typography>
  </Box>

  <Button
    variant="contained"
    startIcon={<Add />}
    sx={{
      whiteSpace: "nowrap",
      minWidth: 180
    }}
    onClick={() => navigate("/add-student")}  
  >
    ADD STUDENT
  </Button>
</Stack>

        {/* SEARCH + ACTION ROW */}
        <Stack
  direction={{ xs: "column", sm: "row" }}   // ✅ responsive
  justifyContent="space-between"
  alignItems={{ xs: "stretch", sm: "center" }}
  sx={{ width: "100%", gap: 2 }}
  mb={3}
>
  {/* SEARCH */}
  <TextField
    size="small"
    placeholder="Search students..."
    sx={{ width: { xs: "100%", sm: 300 } }}
  />

  {/* BUTTONS */}
  <Stack
    direction="row"
    spacing={2}
    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
  >
    <Button variant="outlined" startIcon={<FilterList />}>
      Filter
    </Button>

    <Button variant="outlined" startIcon={<Download />}>
      Export
    </Button>
  </Stack>
</Stack>
        {/* TABLE */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>

            <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
              <TableRow>
                <TableCell>Admission No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell align="center">Class</TableCell>
                <TableCell align="center">Section</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Guardian Phone</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell align="center">{s.class}</TableCell>
                  <TableCell align="center">{s.section}</TableCell>
                  <TableCell align="center">{s.gender}</TableCell>
                  <TableCell align="center">{s.phone}</TableCell>

                  <TableCell align="center">
                    <Chip
                      label={s.status}
                      size="small"
                      color={s.status === "Active" ? "primary" : "default"}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton size="small">
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

      </Container>
    </Box>
  );
};

export default StudentsPage;
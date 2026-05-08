import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  Tab,
  Tabs,
  Divider,
  Avatar,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ArrowBack,
  Email,
  Phone,
  Message,
  EventNote,
  CreditCard,
  FiberManualRecord,
  Warning,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

/* ─── Mock Data ─────────────────────────────────────── */
const student = {
  id: 1,
  name: "Rahul Sharma",
  rollNo: "#ST-2024-089",
  class: "10",
  section: "A",
  status: "Active",
  email: "rahul.sharma@student.edu",
  phone: "+91 98765 43210",
  attendance: 96,
  avatar: null,
};

const attendanceData = [
  { date: "Sep 1", value: 100 },
  { date: "Sep 8", value: 92 },
  { date: "Sep 15", value: 85 },
  { date: "Sep 22", value: 88 },
  { date: "Sep 29", value: 95 },
  { date: "Oct 6", value: 100 },
  { date: "Oct 13", value: 72 },
  { date: "Oct 20", value: 95 },
];

const academicData = [
  { subject: "Mathematics", score: "92/100", grade: "A", classAvg: 78, gradeColor: "#4CAF50" },
  { subject: "English", score: "85/100", grade: "B+", classAvg: 74, gradeColor: "#1565C0" },
  { subject: "Science", score: "90/100", grade: "A-", classAvg: 71, gradeColor: "#4CAF50" },
  { subject: "History", score: "78/100", grade: "B", classAvg: 69, gradeColor: "#1565C0" },
  { subject: "Physics", score: "88/100", grade: "A-", classAvg: 65, gradeColor: "#4CAF50" },
];

const recentActivity = [
  { label: "Term 1 Result Published", date: "Oct 24, 2024", color: "#1565C0" },
  { label: "Absent - Sick Leave", date: "Oct 18, 2024", color: "#F9A825" },
  { label: "Fee Payment Received", date: "Oct 10, 2024", color: "#2E7D32" },
  { label: "Guardian Meeting Scheduled", date: "Oct 5, 2024", color: "#9C27B0" },
];

/* ─── Grade Badge ─────────────────────────────────── */
const GradeBadge = ({ grade, color }) => (
  <Box
    sx={{
      width: 36, height: 36, borderRadius: "50%",
      backgroundColor: `${color}18`,
      display: "flex", alignItems: "center", justifyContent: "center",
      border: `2px solid ${color}40`,
    }}
  >
    <Typography sx={{ fontSize: 11, fontWeight: 700, color }}>{grade}</Typography>
  </Box>
);

/* ─── Custom Tooltip ──────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <Paper sx={{ p: 1, px: 1.5, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" fontWeight={600}>{label}</Typography>
        <Typography variant="caption" display="block" color="primary.main">
          {payload[0].value}
        </Typography>
      </Paper>
    );
  }
  return null;
};

/* ─── MAIN COMPONENT ─────────────────────────────── */
const ViewStudentDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [termFilter, setTermFilter] = useState("Term 1 (2024)");

  return (
    <Box sx={{ width: "100%", maxWidth: 1440, mx: "auto", px: 2, py: 2, backgroundColor: "background.default", minHeight: "100vh" }}>

      {/* ── Back Button ── */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "text.secondary", fontWeight: 500, textTransform: "none", pl: 0 }}
      >
        Back to Students
      </Button>

      {/* ── Profile Header Card ── */}
      <Paper
        sx={{
          p: 3, mb: 3,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          borderRadius: `${theme.shape.borderRadius}px`,
        }}
      >
        {/* Left: Avatar + Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 72, height: 72,
                bgcolor: "primary.main",
                fontSize: 28, fontWeight: 700,
              }}
            >
              {student.name.charAt(0)}
            </Avatar>
            {/* Online dot */}
            <Box
              sx={{
                position: "absolute", bottom: 4, right: 2,
                width: 12, height: 12, borderRadius: "50%",
                backgroundColor: "#4CAF50",
                border: "2px solid #fff",
              }}
            />
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
              <Typography variant="h5" color="text.primary">{student.name}</Typography>
              <Chip
                label={student.status}
                size="small"
                color="success"
                sx={{ color: "#fff", fontWeight: 600, height: 24 }}
              />
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.8 }}>
              {student.rollNo} &nbsp;|&nbsp; Grade {student.class} - Section {student.section}
            </Typography>

            <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                <Email sx={{ fontSize: 15, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">{student.email}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                <Phone sx={{ fontSize: 15, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">{student.phone}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right: Action Buttons */}
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<Message />}
            sx={{ borderColor: "#E5E7EB", color: "text.primary", textTransform: "none", fontWeight: 500 }}
          >
            Message Guardian
          </Button>
          <Button
            variant="outlined"
            startIcon={<EventNote />}
            sx={{ borderColor: "#E5E7EB", color: "text.primary", textTransform: "none", fontWeight: 500 }}
          >
            Record Attendance
          </Button>
          <Button
            variant="contained"
            startIcon={<CreditCard />}
            onClick={() => navigate(`/s-admin/students/${id}/collect-fee`)}
            sx={{
              background: "#C0715A",
              textTransform: "none", fontWeight: 600,
              "&:hover": { background: "#A85D48" },
            }}
          >
            Collect Fee
          </Button>
        </Box>
      </Paper>

      {/* ── Tabs ── */}
      <Paper sx={{ mb: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            px: 2,
            "& .MuiTab-root": { textTransform: "none", fontWeight: 500, fontSize: 14, color: "text.secondary" },
            "& .Mui-selected": { color: "text.primary", fontWeight: 600 },
            "& .MuiTabs-indicator": { backgroundColor: "#C0715A", height: 2.5 },
          }}
        >
          {["Overview", "Guardians", "Fees & Payments", "Attendance", "Exams"].map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </Paper>

      {/* ── Tab Content: Overview ── */}
      {activeTab === 0 && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 380px" }, gap: 3 }}>

          {/* LEFT COLUMN */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

            {/* Attendance Snapshot */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" color="text.primary">Attendance Snapshot</Typography>
                <Chip
                  label={`${student.attendance}% Overall`}
                  size="small"
                  sx={{ backgroundColor: "#E8F5E9", color: "#2E7D32", fontWeight: 600 }}
                />
              </Box>

              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={attendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1565C0" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1565C0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#1565C0"
                    strokeWidth={2}
                    fill="url(#attendGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#1565C0" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>

            {/* Academic Performance */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" color="text.primary">Academic Performance</Typography>
                <Select
                  value={termFilter}
                  onChange={(e) => setTermFilter(e.target.value)}
                  size="small"
                  sx={{ fontSize: 13, minWidth: 150 }}
                >
                  <MenuItem value="Term 1 (2024)">Term 1 (2024)</MenuItem>
                  <MenuItem value="Term 2 (2024)">Term 2 (2024)</MenuItem>
                </Select>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ "& th": { borderBottom: "1px solid #F3F4F6", pb: 1.5 } }}>
                      {["SUBJECT", "SCORE", "GRADE", "CLASS AVG"].map((h) => (
                        <TableCell key={h}>
                          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                            {h}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {academicData.map((row) => (
                      <TableRow
                        key={row.subject}
                        sx={{ "& td": { borderBottom: "1px solid #F9FAFB", py: 1.5 }, "&:last-child td": { border: 0 } }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight={500} color="text.primary">{row.subject}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">{row.score}</Typography>
                        </TableCell>
                        <TableCell>
                          <GradeBadge grade={row.grade} color={row.gradeColor} />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={row.classAvg}
                              sx={{
                                width: 60, height: 6, borderRadius: 3,
                                backgroundColor: "#E5E7EB",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: 3,
                                  backgroundColor: "#9CA3AF",
                                },
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">{row.classAvg}</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* RIGHT COLUMN */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

            {/* Fees Summary */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>Fees Summary</Typography>

              {/* Overdue Alert */}
              <Box
                sx={{
                  p: 2, mb: 2.5,
                  borderRadius: 2,
                  backgroundColor: "#FFF5F5",
                  border: "1px solid #FECACA",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Typography variant="caption" fontWeight={600} color="error.main">Overdue Amount</Typography>
                  <Warning sx={{ fontSize: 16, color: "error.main" }} />
                </Box>
                <Typography variant="h5" fontWeight={700} color="error.main" sx={{ my: 0.5 }}>
                  $450.00
                </Typography>
                <Typography variant="caption" color="error.main">
                  Tuition Fee - Term 1 (Due Oct 15)
                </Typography>
              </Box>

              {/* Fee Rows */}
              {[
                { label: "Total Paid (YTD)", value: "$1,200.00" },
                { label: "Upcoming Due", value: "$450.00 (Dec 1)" },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{ display: "flex", justifyContent: "space-between", py: 1.5, borderBottom: "1px solid #F3F4F6" }}
                >
                  <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                  <Typography variant="body2" fontWeight={600} color="text.primary">{item.value}</Typography>
                </Box>
              ))}

              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2.5, borderColor: "#E5E7EB", color: "text.primary", textTransform: "none", fontWeight: 500 }}
              >
                View Fee History
              </Button>
            </Paper>

            {/* Recent Activity */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" color="text.primary" sx={{ mb: 2.5 }}>Recent Activity</Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {recentActivity.map((item, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 2, position: "relative" }}>
                    {/* Timeline line */}
                    {index < recentActivity.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          left: 8, top: 20,
                          width: 2, height: "calc(100% - 4px)",
                          backgroundColor: "#E5E7EB",
                          zIndex: 0,
                        }}
                      />
                    )}

                    {/* Dot */}
                    <Box sx={{ mt: 0.8, zIndex: 1, flexShrink: 0 }}>
                      <FiberManualRecord sx={{ fontSize: 18, color: item.color }} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ pb: 2.5 }}>
                      <Typography variant="body2" fontWeight={500} color="text.primary">
                        {item.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{item.date}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>

          </Box>
        </Box>
      )}

      {/* ── Other Tabs placeholder ── */}
      {activeTab !== 0 && (
        <Paper sx={{ p: 5, borderRadius: `${theme.shape.borderRadius}px`, textAlign: "center" }}>
          <Typography color="text.secondary">
            {["Overview", "Guardians", "Fees & Payments", "Attendance", "Exams"][activeTab]} content coming soon.
          </Typography>
        </Paper>
      )}

    </Box>
  );
};

export default ViewStudentDetails;

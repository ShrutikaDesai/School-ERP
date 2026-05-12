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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
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
  Payments,
  AccountBalance,
  Money,
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

const guardiansData = [
  {
    name: "Rajesh Sharma",
    relation: "Father",
    phone: "+91 98765 12345",
    email: "rajesh.sharma@email.com",
    occupation: "Software Engineer",
    primary: true,
  },
  {
    name: "Sunita Sharma",
    relation: "Mother",
    phone: "+91 98765 67890",
    email: "sunita.sharma@email.com",
    occupation: "Teacher",
    primary: false,
  },
];

const feeHistory = [
  {
    title: "Tuition Fee - Term 1",
    dueDate: "Oct 15, 2024",
    amount: "$450.00",
    status: "Overdue",
    statusColor: "error",
  },
  {
    title: "Transport Fee",
    dueDate: "Sep 10, 2024",
    amount: "$200.00",
    status: "Paid",
    statusColor: "success",
  },
  {
    title: "Exam Fee",
    dueDate: "Aug 20, 2024",
    amount: "$150.00",
    status: "Paid",
    statusColor: "success",
  },
];

const paymentSummary = {
  totalPaid: "$1,200.00",
  pending: "$450.00",
  upcoming: "$300.00",
};

const handleDownloadReceipt = () => {
  const receiptContent = `
========================================
           SCHOOL ERP RECEIPT
========================================
Student Name : Rahul Sharma
Roll No      : #ST-2024-089
Class         : Grade 10 - Section A

----------------------------------------
Payment Details
----------------------------------------
Fee Type      : Tuition Fee - Term 1
Amount Paid   : $450.00
Payment Date  : Oct 10, 2024
Payment Mode  : Credit Card
Receipt ID    : REC-2024-1001

----------------------------------------
Status        : PAID
----------------------------------------

Thank you for your payment.
School ERP Management
========================================
  `;

  const blob = new Blob([receiptContent], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "School_Receipt_Rahul_Sharma.txt";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const paymentMethods = [
  {
    label: "Credit / Debit Card",
    value: "card",
    icon: <CreditCard fontSize="small" />,
  },
  {
    label: "UPI / Google Pay",
    value: "upi",
    icon: <Payments fontSize="small" />,
  },
  {
    label: "Bank Transfer",
    value: "bank",
    icon: <AccountBalance fontSize="small" />,
  },
  {
    label: "Cash Payment",
    value: "cash",
    icon: <Money fontSize="small" />,
  },
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
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const [paymentData, setPaymentData] = useState({
    amount: "",
    feeType: "",
    paymentMethod: "",
    transactionId: "",
    notes: "",
  });
  const handlePaymentChange = (e) => {
  setPaymentData({
    ...paymentData,
    [e.target.name]: e.target.value,
  });
};

const handleCollectPayment = () => {
  console.log("Collected Payment:", paymentData);

  setOpenPaymentModal(false);

  setPaymentData({
    amount: "",
    feeType: "",
    paymentMethod: "",
    transactionId: "",
    notes: "",
  });
};

const examColumns = [
  {
    accessorKey: "subject",
    header: "SUBJECT",
    cell: info => (
      <Typography variant="body2" fontWeight={500}>
        {info.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "score",
    header: "MARKS",
    cell: info => (
      <Typography variant="body2">
        {info.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "grade",
    header: "GRADE",
    cell: info => {
      const row = info.row.original;
      return (
        <GradeBadge
          grade={row.grade}
          color={row.gradeColor}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: () => (
      <Chip
        label="Passed"
        size="small"
        color="success"
        sx={{
          color: "#fff",
          fontWeight: 600,
        }}
      />
    ),
  },
];

const examTable = useReactTable({
  data: academicData.map(item => ({
    ...item,
    status: "Passed",
  })),
  columns: examColumns,
  getCoreRowModel: getCoreRowModel(),
});

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

      {/* ── Tab Content: Guardians ── */}
      {activeTab === 1 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 320px" },
            gap: 3,
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Guardian Information
              </Typography>

              {guardiansData.map((guardian, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 2,
                      py: 2,
                    }}
                  >
                    {/* LEFT */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: guardian.primary ? "primary.main" : "#9CA3AF",
                          width: 56,
                          height: 56,
                          fontWeight: 700,
                        }}
                      >
                        {guardian.name.charAt(0)}
                      </Avatar>

                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight={600}>
                            {guardian.name}
                          </Typography>

                          {guardian.primary && (
                            <Chip
                              label="Primary"
                              size="small"
                              color="success"
                              sx={{
                                height: 22,
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                          {guardian.relation}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          sx={{ mt: 0.8 }}
                        >
                          Occupation: {guardian.occupation}
                        </Typography>
                      </Box>
                    </Box>

                    {/* RIGHT */}
                    <Box sx={{ minWidth: 220 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Phone sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2">{guardian.phone}</Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Email sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2">{guardian.email}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  {index < guardiansData.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>

            {/* Emergency Contact */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Emergency Contact
              </Typography>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#FFF7ED",
                  border: "1px solid #FED7AA",
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Rajesh Sharma
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  +91 98765 12345
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Available 24/7 for emergencies
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Communication Preferences */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Communication Preferences
              </Typography>

              {[
                { label: "SMS Alerts", value: "Enabled" },
                { label: "Email Notifications", value: "Enabled" },
                { label: "Fee Reminders", value: "Enabled" },
                { label: "Exam Updates", value: "Enabled" },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1.4,
                    borderBottom:
                      index !== 3 ? "1px solid #F3F4F6" : "none",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="success.main"
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button
                  variant="outlined"
                  startIcon={<Message />}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Send Message
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Phone />}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Call Guardian
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Send Email
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}  

      {/* ── Tab Content: Fees & Payments ── */}
      {activeTab === 2 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 340px" },
            gap: 3,
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Payment Summary Cards */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3,1fr)" },
                gap: 2,
              }}
            >
              {[
                {
                  label: "Total Paid",
                  value: paymentSummary.totalPaid,
                  bg: "#E8F5E9",
                  color: "#2E7D32",
                },
                {
                  label: "Pending Due",
                  value: paymentSummary.pending,
                  bg: "#FFF5F5",
                  color: "#D32F2F",
                },
                {
                  label: "Upcoming Payments",
                  value: paymentSummary.upcoming,
                  bg: "#FFF8E1",
                  color: "#F9A825",
                },
              ].map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    backgroundColor: item.bg,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: item.color, mt: 1 }}
                  >
                    {item.value}
                  </Typography>
                </Paper>
              ))}
            </Box>

            {/* Fee History Table */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Payment History
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {["FEE TYPE", "DUE DATE", "AMOUNT", "STATUS"].map((h) => (
                        <TableCell key={h}>
                          <Typography
                            variant="caption"
                            fontWeight={700}
                            color="text.secondary"
                          >
                            {h}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {feeHistory.map((fee, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {fee.title}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {fee.dueDate}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {fee.amount}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={fee.status}
                            size="small"
                            color={fee.statusColor}
                            sx={{
                              fontWeight: 600,
                              color: "#fff",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Installment Plan */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Installment Progress
              </Typography>

              <Box sx={{ mb: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Paid: 3 of 4 installments
                  </Typography>

                  <Typography variant="body2" fontWeight={600}>
                    75%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#E5E7EB",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#1565C0",
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Paper>
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Upcoming Due */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upcoming Due
              </Typography>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#FFF5F5",
                  border: "1px solid #FECACA",
                }}
              >
                <Typography
                  variant="body2"
                  color="error.main"
                  fontWeight={600}
                >
                  Tuition Fee - Term 2
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="error.main"
                  sx={{ my: 1 }}
                >
                  $450.00
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Due Date: Dec 1, 2024
                </Typography>
              </Box>
            </Paper>

            {/* Payment Methods */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Payment Methods
              </Typography>

              {[
                "Credit / Debit Card",
                "UPI / Google Pay",
                "Bank Transfer",
                "Cash Payment",
              ].map((method, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 1.3,
                    borderBottom:
                      index !== 3 ? "1px solid #F3F4F6" : "none",
                  }}
                >
                  <Typography variant="body2">
                    {method}
                  </Typography>
                </Box>
              ))}
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {/* ── Collect Payment Modal ── */}
                <Dialog
                  open={openPaymentModal}
                  onClose={() => setOpenPaymentModal(false)}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle sx={{ fontWeight: 700 }}>
                    Collect Payment
                  </DialogTitle>

                  <DialogContent dividers>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                      
                      <TextField
                        label="Amount"
                        name="amount"
                        value={paymentData.amount}
                        onChange={handlePaymentChange}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        label="Fee Type"
                        name="feeType"
                        value={paymentData.feeType}
                        onChange={handlePaymentChange}
                        fullWidth
                      />

                      <TextField
                        select
                        label="Payment Method"
                        name="paymentMethod"
                        value={paymentData.paymentMethod}
                        onChange={handlePaymentChange}
                        fullWidth
                      >
                        {paymentMethods.map((method) => (
                          <MenuItem key={method.value} value={method.value}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {method.icon}
                              {method.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        label="Transaction ID"
                        name="transactionId"
                        value={paymentData.transactionId}
                        onChange={handlePaymentChange}
                        fullWidth
                      />

                      <TextField
                        label="Notes"
                        name="notes"
                        value={paymentData.notes}
                        onChange={handlePaymentChange}
                        fullWidth
                        multiline
                        rows={3}
                      />
                    </Box>
                  </DialogContent>

                  <DialogActions sx={{ p: 2 }}>
                    <Button
                      onClick={() => setOpenPaymentModal(false)}
                      variant="outlined"
                      sx={{ textTransform: "none" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={handleCollectPayment}
                      variant="contained"
                      sx={{
                        background: "#C0715A",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          background: "#A85D48",
                        },
                      }}
                    >
                      Submit Payment
                    </Button>
                  </DialogActions>
                </Dialog>
                
                <Button
                  variant="contained"
                  startIcon={<CreditCard />}
                  onClick={() => setOpenPaymentModal(true)}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    background: "#C0715A",
                    "&:hover": {
                      background: "#A85D48",
                    },
                  }}
                >
                  Collect Payment
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleDownloadReceipt}
                  sx={{
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Download Receipt
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Send Payment Reminder
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {/* ── Tab Content: Attendance ── */}
      {activeTab === 3 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 340px" },
            gap: 3,
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Attendance Overview */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6">Attendance Overview</Typography>
                <Chip
                  label={`${student.attendance}% Overall`}
                  color="success"
                  sx={{ fontWeight: 600, color: "#fff" }}
                />
              </Box>

              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1565C0" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1565C0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#1565C0"
                    fill="url(#attendanceGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>

            {/* Monthly Attendance Records */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Monthly Attendance Records
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {["DATE", "STATUS", "REMARK"].map((head) => (
                        <TableCell key={head}>
                          <Typography
                            variant="caption"
                            fontWeight={700}
                            color="text.secondary"
                          >
                            {head}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {[
                      {
                        date: "Oct 20, 2024",
                        status: "Present",
                        remark: "On Time",
                      },
                      {
                        date: "Oct 19, 2024",
                        status: "Present",
                        remark: "On Time",
                      },
                      {
                        date: "Oct 18, 2024",
                        status: "Absent",
                        remark: "Sick Leave",
                      },
                      {
                        date: "Oct 17, 2024",
                        status: "Present",
                        remark: "Late Entry",
                      },
                    ].map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2">{record.date}</Typography>
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={record.status}
                            size="small"
                            color={
                              record.status === "Present" ? "success" : "error"
                            }
                            sx={{ color: "#fff", fontWeight: 600 }}
                          />
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {record.remark}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Attendance Summary */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Attendance Summary
              </Typography>

              {[
                { label: "Total Working Days", value: "210" },
                { label: "Days Present", value: "202" },
                { label: "Days Absent", value: "8" },
                { label: "Late Entries", value: "3" },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1.5,
                    borderBottom:
                      index !== 3 ? "1px solid #F3F4F6" : "none",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>

                  <Typography variant="body2" fontWeight={600}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button
                  variant="contained"
                  startIcon={<EventNote />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    background: "#C0715A",
                    "&:hover": {
                      background: "#A85D48",
                    },
                  }}
                >
                  Mark Attendance
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Download Attendance Report
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Notify Guardian
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {/* ── Tab Content: Exams ── */}
      {activeTab === 4 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 340px" },
            gap: 3,
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            
            {/* Exam Performance */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Exam Performance
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    {examTable.getHeaderGroups().map(headerGroup => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <TableCell key={header.id}>
                            <Typography
                              variant="caption"
                              fontWeight={700}
                              color="text.secondary"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableHead>

                  <TableBody>
                    {examTable.getRowModel().rows.map(row => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Upcoming Exams */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Upcoming Exams
              </Typography>

              {[
                {
                  exam: "Mathematics Mid-Term",
                  date: "Nov 15, 2024",
                  status: "Scheduled",
                },
                {
                  exam: "Science Practical",
                  date: "Nov 22, 2024",
                  status: "Scheduled",
                },
                {
                  exam: "English Oral Test",
                  date: "Dec 2, 2024",
                  status: "Scheduled",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 2,
                    borderBottom:
                      index !== 2 ? "1px solid #F3F4F6" : "none",
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {item.exam}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 0.5 }}
                  >
                    Date: {item.date}
                  </Typography>

                  <Chip
                    label={item.status}
                    size="small"
                    color="primary"
                    sx={{
                      mt: 1,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            
            {/* Overall Exam Summary */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Exam Summary
              </Typography>

              {[
                { label: "Overall Percentage", value: "87%" },
                { label: "Average Grade", value: "A-" },
                { label: "Exams Completed", value: "5" },
                { label: "Upcoming Exams", value: "3" },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1.5,
                    borderBottom:
                      index !== 3 ? "1px solid #F3F4F6" : "none",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>

                  <Typography variant="body2" fontWeight={600}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 3, borderRadius: `${theme.shape.borderRadius}px` }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    background: "#C0715A",
                    "&:hover": {
                      background: "#A85D48",
                    },
                  }}
                >
                  View Full Report Card
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Download Exam Report
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                  }}
                >
                  Notify Guardian
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {/* ── Other Tabs placeholder ── */}
      {![0, 1, 2, 3, 4].includes(activeTab) && (
        <Paper
          sx={{
            p: 5,
            borderRadius: `${theme.shape.borderRadius}px`,
            textAlign: "center",
          }}
        >
          <Typography color="text.secondary">
            {["Overview", "Guardians", "Fees & Payments", "Attendance", "Exams"][activeTab]} content coming soon.
          </Typography>
        </Paper>
      )}

    </Box>
  );
};

export default ViewStudentDetails;

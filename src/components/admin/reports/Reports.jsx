import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Row, Col, Card, Button } from "antd";
import {
  PlayCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import BarChartIcon from "@mui/icons-material/BarChart";

/* ================= Report Data ================= */

const reportTypes = [
  {
    title: "Student Report",
    route: "/students",
    desc: "Generate comprehensive student reports including personal details, academic performance, and attendance history.",
    icon: <PeopleIcon />,
    bg: "#EEF2FF",
  },
  {
    title: "Attendance Report",
    route: "/attendance-report",
    desc: "View and export attendance data by class, section, and date range. Track trends over time.",
    icon: <EventIcon />,
    bg: "#E6F6EC",
  },
  {
    title: "Class Report",
    route: "/classes",
    desc: "Get detailed class-wise reports including student count, section distribution, and teacher assignments.",
    icon: <SchoolIcon />,
    bg: "#F3E8FF",
  },
  {
    title: "Summary Report",
    route: "/reports",
    desc: "Overview of all school statistics including total students, teachers, classes, and attendance metrics.",
    icon: <BarChartIcon />,
    bg: "#FFF4E5",
  },
];

const recentReports = [
  { name: "Class Report - April", date: "2026-05-01" },
  { name: "Attendance Report - March", date: "2026-04-28" },
  { name: "Student Report - Batch A", date: "2026-04-25" },
];

/* ================= Component ================= */

const Reports = () => {
  const navigate = useNavigate();
  const handleRun = (route) => {
    navigate(route);
  };

  const handleExport = () => {
  const blob = new Blob(["This is a dummy PDF file"], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "dummy.pdf";
  link.click();

  URL.revokeObjectURL(url);
};


  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        background: "#f9fafb",
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Reports Dashboard
      </Typography>

      {/* ================= REPORT CARDS ================= */}
      <Row gutter={[20, 20]}>
        {reportTypes.map((report, index) => (
          <Col xs={24} sm={12} key={index}>
            <Card
              bordered={false}
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                height: "100%",
                transition: "0.3s",
              }}
              bodyStyle={{ padding: 20 }}
            >
              {/* Top Content */}
              <div style={{ display: "flex", gap: 16 }}>
                {/* Icon */}
                <div
                  style={{
                    background: report.bg,
                    borderRadius: 10,
                    padding: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {report.icon}
                </div>

                {/* Text */}
                <div>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {report.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontSize: "13px",
                      mt: 0.5,
                    }}
                  >
                    {report.desc}
                  </Typography>
                </div>
              </div>

              {/* Buttons */}
              <Box
                sx={{
                  mt: 2.5,
                  display: "flex",
                  gap: 1.25,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={() => handleRun(report.route)}
                     style={{
                      borderRadius: 8,
                      width: "100%",
                    }}
                  >
                    Go to Module
                  </Button>
                </Box>

                <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport(report.title)}
                    style={{
                      borderRadius: 8,
                      width: "100%",
                    }}
                  >
                    Quick Export
                  </Button>
                </Box>
              </Box>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ================= RECENT REPORTS ================= */}
      <Card
        title="Recent Reports"
        style={{
          marginTop: 30,
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
        }}
      >
        {recentReports.map((report, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom:
                index !== recentReports.length - 1
                  ? "1px solid #f0f0f0"
                  : "none",
            }}
          >
            <div>
              <div style={{ fontWeight: 500 }}>{report.name}</div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {report.date}
              </div>
            </div>

            <Button
              type="text"
              size="small"
              icon={<DownloadOutlined />}
              onClick={() => handleExport(report.name)}
              style={{
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "#1976d2", // optional MUI-like blue
              }}
            >
              Download
            </Button>
          </div>
        ))}
      </Card>
    </Box>
  );
};

export default Reports;
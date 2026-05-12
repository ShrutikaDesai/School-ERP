// Dashboard.jsx

import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Select,
  theme,
} from "antd";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

import {
  BookOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import "./Dashboard.css";

const { Option } = Select;

const Dashboard = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState("all");

  /* =========================
     ATTENDANCE DATA
  ========================= */
  const attendanceMap = {
    all: [
      { month: "Jan", attendance: 80 },
      { month: "Feb", attendance: 85 },
      { month: "Mar", attendance: 79 },
      { month: "Apr", attendance: 82 },
      { month: "May", attendance: 90 },
    ],
    fybca: [
      { month: "Jan", attendance: 88 },
      { month: "Feb", attendance: 91 },
      { month: "Mar", attendance: 89 },
      { month: "Apr", attendance: 92 },
      { month: "May", attendance: 94 },
    ],
    sybca: [
      { month: "Jan", attendance: 78 },
      { month: "Feb", attendance: 82 },
      { month: "Mar", attendance: 80 },
      { month: "Apr", attendance: 85 },
      { month: "May", attendance: 87 },
    ],
    tybca: [
      { month: "Jan", attendance: 74 },
      { month: "Feb", attendance: 79 },
      { month: "Mar", attendance: 81 },
      { month: "Apr", attendance: 84 },
      { month: "May", attendance: 86 },
    ],
  };

  /* =========================
     CUSTOM TOOLTIP
  ========================= */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div
          style={{
            background: "#fff",
            padding: "8px 12px",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "#6B7280",
            }}
          >
            {label}
          </p>
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              color: "#1565C0",
            }}
          >
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  /* =========================
     TABLE COLUMNS
  ========================= */
  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
    },
    {
      title: "Course",
      dataIndex: "course",
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span
          style={{
            color:
              status === "Good"
                ? token.colorSuccess
                : token.colorWarning,
            fontWeight: 600,
          }}
        >
          {status}
        </span>
      ),
    },
  ];

  /* =========================
     TABLE DATA
  ========================= */
  const data = [
    {
      key: 1,
      name: "Amit Patil",
      course: "Computer Science",
      attendance: "92%",
      status: "Good",
    },
    {
      key: 2,
      name: "Priya Sharma",
      course: "Electronics",
      attendance: "74%",
      status: "Average",
    },
    {
      key: 3,
      name: "Rahul Desai",
      course: "Mechanical",
      attendance: "89%",
      status: "Good",
    },
  ];

  /* =========================
     KPI CARDS
  ========================= */
  const kpiCards = [
    {
      title: "Academic Courses",
      value: "24",
      icon: <BookOutlined />,
      bg: "linear-gradient(135deg,#1565C0,#42A5F5)",
      growth: "+12%",
      progress: 75,
    },
    {
      title: "Students",
      value: "1450",
      icon: <TeamOutlined />,
      bg: "linear-gradient(135deg,#2E7D32,#66BB6A)",
      growth: "+18%",
      progress: 88,
    },
    {
      title: "Attendance",
      value: "88%",
      icon: <CalendarOutlined />,
      bg: "linear-gradient(135deg,#EF6C00,#FFB74D)",
      growth: "+4%",
      progress: 88,
    },
    {
      title: "Reports",
      value: "156",
      icon: <BarChartOutlined />,
      bg: "linear-gradient(135deg,#6A1B9A,#BA68C8)",
      growth: "+22%",
      progress: 68,
    },
  ];

  return (
    <div className="dashboard-container">
      {/* =========================
          HEADER
      ========================= */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>
          Monitor academic performance, attendance, and student activity
        </p>
      </div>

      {/* =========================
          KPI GRID
      ========================= */}
      <div className="kpi-grid">
        {kpiCards.map((item, index) => (
          <div className="kpi-card" key={index}>
            <div className="kpi-top">
              <div>
                <div className="kpi-title">{item.title}</div>

                <div className="kpi-value">{item.value}</div>

                <div className="kpi-growth">
                  ↑ {item.growth} this month
                </div>
              </div>

              <div
                className="kpi-icon"
                style={{
                  background: item.bg,
                }}
              >
                {item.icon}
              </div>
            </div>

            <LinearProgress
              variant="determinate"
              value={item.progress}
              className="kpi-progress"
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#EDF2F7",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  background: item.bg,
                },
              }}
            />
          </div>
        ))}
      </div>

      {/* =========================
          CHART + OVERVIEW
      ========================= */}
      <div className="dashboard-middle">
        {/* Attendance Card */}
        <div className="dashboard-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: 0 }}>
              Class-wise Attendance
            </h2>

            <Select
              value={selectedClass}
              onChange={setSelectedClass}
              style={{
                width: isMobile ? 130 : 170,
              }}
            >
              <Option value="all">All</Option>
              <Option value="fybca">FY BCA</Option>
              <Option value="sybca">SY BCA</Option>
              <Option value="tybca">TY BCA</Option>
            </Select>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={attendanceMap[selectedClass]}
            >
              <defs>
                <linearGradient
                  id="attendanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#1565C0"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="#1565C0"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
              />

              <XAxis
                dataKey="month"
                tick={{ fill: "#64748B" }}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#64748B" }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="attendance"
                stroke="#1565C0"
                strokeWidth={3}
                fill="url(#attendanceGradient)"
                dot={{
                  r: 4,
                  fill: "#1565C0",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Academic Overview */}
<div className="dashboard-card">
  <h2>Academic Overview</h2>

  {[
    {
      label: "Semester 1 Pass Rate",
      value: "85%",
      color: "#1565C0",
    },
    {
      label: "Semester 2 Pass Rate",
      value: "78%",
      color: "#2E7D32",
    },
    {
      label: "Placement Readiness",
      value: "69%",
      color: "#EF6C00",
    },
  ].map((item, index) => (
    <div
      className="overview-item"
      key={index}
      style={{ marginBottom: "24px" }}
    >
      <div
        className="overview-label"
        style={{
          fontSize: "14px",
          color: "#64748b",
          marginBottom: "6px",
        }}
      >
        {item.label}
      </div>

      <div
        className="overview-value"
        style={{
          color: item.color,
          fontSize: "32px",   // smaller size
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {item.value}
      </div>
    </div>
  ))}
</div>
      </div>

      {/* =========================
          TABLE
      ========================= */}
      <div className="dashboard-card dashboard-table">
        <h2>Recent Student Activity</h2>

        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 700 }}
        />
      </div>

      {/* =========================
          QUICK REPORTS
      ========================= */}
      <div className="dashboard-card">
        <h2>Quick Reports</h2>

        <div className="quick-actions">
          <Button
            type="primary"
            onClick={() =>
              navigate("/s-admin/attendance-report")
            }
          >
            Attendance Reports
          </Button>

          <Button
            type="primary"
            onClick={() =>
              navigate("/s-admin/students")
            }
          >
            Student Reports
          </Button>

          <Button
            type="primary"
            onClick={() =>
              navigate("/s-admin/classes")
            }
          >
            Class Reports
          </Button>

          <Button
            type="primary"
            onClick={() =>
              navigate("/s-admin/sections")
            }
          >
            Section Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
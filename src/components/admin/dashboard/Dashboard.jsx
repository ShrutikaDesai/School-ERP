import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Button,
  Space,
  Select,
  theme,
  Grid
} from "antd";

import {
  BookOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined
} from "@ant-design/icons";

import { Column } from "@ant-design/plots";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid;

const Dashboard = () => {

  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState("all");


  const attendanceMap = {
    all: [
      { month: "Jan", attendance: 82 },
      { month: "Feb", attendance: 85 },
      { month: "Mar", attendance: 88 },
      { month: "Apr", attendance: 84 },
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
    ]
  };

  const attendanceConfig = {
    data: attendanceMap[selectedClass],
    xField: "month",
    yField: "attendance",
    color: token.colorInfo,
    height: isMobile ? 250 : 320,
    label: {
      position: "middle",
      style: { fill: "#fff" }
    }
  };


  const columns = [
    {
      title: "Student Name",
      dataIndex: "name"
    },
    {
      title: "Course",
      dataIndex: "course"
    },
    {
      title: "Attendance",
      dataIndex: "attendance"
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span
          style={{
            color: status === "Good"
              ? token.colorSuccess
              : token.colorWarning,
            fontWeight: 600
          }}
        >
          {status}
        </span>
      )
    }
  ];

  const data = [
    {
      key: 1,
      name: "Amit Patil",
      course: "Computer Science",
      attendance: "92%",
      status: "Good"
    },
    {
      key: 2,
      name: "Priya Sharma",
      course: "Electronics",
      attendance: "74%",
      status: "Average"
    },
    {
      key: 3,
      name: "Rahul Desai",
      course: "Mechanical",
      attendance: "89%",
      status: "Good"
    }
  ];

  return (
    <div
      style={{
        padding: isMobile ? 12 : 24
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 24
        }}
      >
        <div style={{ flex: 1 }}>
          <Title
            level={isMobile ? 4 : 3}
            style={{ margin: 0 }}
          >
            Dashboard
          </Title>

          <Text type="secondary">
            Monitor academic performance, attendance, and student activity
          </Text>
        </div>
      </div>



      {/* KPI Cards */}

      <Row gutter={[16, 16]}>

        {[
          {
            title: "Academic Courses",
            value: "24",
            icon: <BookOutlined />,
            bg: "linear-gradient(135deg,#1565C0,#42A5F5)",
            growth: "+12%",
            progress: 75
          },
          {
            title: "Students",
            value: "1450",
            icon: <TeamOutlined />,
            bg: "linear-gradient(135deg,#2E7D32,#66BB6A)",
            growth: "+18%",
            progress: 88
          },
          {
            title: "Attendance",
            value: "88%",
            icon: <CalendarOutlined />,
            bg: "linear-gradient(135deg,#EF6C00,#FFB74D)",
            growth: "+4%",
            progress: 88
          },
          {
            title: "Reports",
            value: "156",
            icon: <BarChartOutlined />,
            bg: "linear-gradient(135deg,#6A1B9A,#BA68C8)",
            growth: "+22%",
            progress: 68
          }

        ].map((item, index) => (

          <Col
            xs={24}
            sm={12}
            lg={6}
            key={index}
          >

            <Card
              hoverable
              bodyStyle={{ padding: 20 }}
              style={{
                borderRadius: 18,
                boxShadow: token.boxShadow,
                transition: "0.3s"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20
                }}
              >

                <div>

                  <Text type="secondary">
                    {item.title}
                  </Text>

                  <h2
                    style={{
                      margin: "8px 0 6px",
                      fontSize: 30,
                      fontWeight: 700
                    }}
                  >
                    {item.value}
                  </h2>

                  <Text
                    style={{
                      color: "#2E7D32",
                      fontWeight: 600
                    }}
                  >
                    ↑ {item.growth} this month
                  </Text>

                </div>


                <div
                  style={{
                    height: 56,
                    width: 56,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: "#fff",
                    background: item.bg
                  }}
                >
                  {item.icon}
                </div>

              </div>


              <div
                style={{
                  height: 8,
                  background: "#EDF2F7",
                  borderRadius: 20,
                  overflow: "hidden"
                }}
              >

                <div
                  style={{
                    height: "100%",
                    width: `${item.progress}%`,
                    background: item.bg,
                    borderRadius: 20
                  }}
                />

              </div>

            </Card>

          </Col>

        ))}

      </Row>



      {/* Charts */}

      <Row
        gutter={[16, 16]}
        style={{ marginTop: 24 }}
      >

        <Col xs={24} lg={14}>
          <Card
            title="Class-wise Attendance"
            extra={
              <Select
                value={selectedClass}
                onChange={setSelectedClass}
                style={{
                  width: isMobile ? 130 : 170
                }}
              >
                <Option value="all">All</Option>
                <Option value="fybca">FY BCA</Option>
                <Option value="sybca">SY BCA</Option>
                <Option value="tybca">TY BCA</Option>
              </Select>
            }
            style={{
              boxShadow: token.boxShadow
            }}
          >
            <Column {...attendanceConfig} />
          </Card>
        </Col>



        <Col xs={24} lg={10}>
          <Card
            title="Academic Overview"
            style={{
              boxShadow: token.boxShadow
            }}
          >

            <div style={{ marginBottom: 25 }}>
              <Text type="secondary">
                Semester 1 Pass Rate
              </Text>

              <h2 style={{ color: token.colorPrimary }}>
                85%
              </h2>
            </div>

            <div style={{ marginBottom: 25 }}>
              <Text type="secondary">
                Semester 2 Pass Rate
              </Text>

              <h2 style={{ color: token.colorSuccess }}>
                78%
              </h2>
            </div>

            <div>
              <Text type="secondary">
                Placement Readiness
              </Text>

              <h2 style={{ color: token.colorWarning }}>
                69%
              </h2>
            </div>

          </Card>
        </Col>

      </Row>

      {/* Table */}

      <Card
        title="Recent Student Activity"
        style={{
          marginTop: 24,
          boxShadow: token.boxShadow
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 700 }}
        />
      </Card>

      {/* Buttons */}

     <Card
  title="Quick Reports"
  style={{
    marginTop: 24,
    boxShadow: token.boxShadow
  }}
>
  <Space
    wrap
    direction={isMobile ? "vertical" : "horizontal"}
    style={{
      width: isMobile ? "100%" : "auto"
    }}
  >

    <Button
      block={isMobile}
      type="primary"
      onClick={() => navigate("/s-admin/attendance-report")}
    >
      Attendance Reports
    </Button>

    <Button
      block={isMobile}
      type="primary"
      onClick={() => navigate("/s-admin/students")}
    >
      Student Reports
    </Button>

    <Button
      block={isMobile}
      type="primary"
      onClick={() => navigate("/s-admin/classes")}
    >
      Class Reports
    </Button>

    <Button
      block={isMobile}
      type="primary"
      onClick={() => navigate("/s-admin/sections")}
    >
      Section Reports
    </Button>

  </Space>
</Card>

    </div>
  );
};

export default Dashboard;

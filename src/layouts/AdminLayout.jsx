import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Drawer,
  Grid,
  theme
} from "antd";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import {
  Outlet,
  useNavigate,
  useLocation
} from "react-router-dom";

import "./AdminLayout.css";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const AdminLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const navigate = useNavigate();
  const location = useLocation();

  const { token } = theme.useToken();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard"
    },
    {
      key: "/students",
      icon: <TeamOutlined />,
      label: "Students"
    },
    {
      key: "academics",
      icon: <BookOutlined />,
      label: "Academics",
      children: [
        {
          key: "/classes",
          label: "Classes"
        },
        {
          key: "/sections",
          label: "Sections"
        }
      ]
    },
    {
      key: "/attendance",
      icon: <CalendarOutlined />,
      label: "Attendance"
    },
    {
      key: "/reports",
      icon: <FileTextOutlined />,
      label: "Reports"
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings"
    }
  ];

  const profileMenu = {
    items: [
      {
        key: "1",
        icon: <UserOutlined />,
        label: "Profile"
      },
      {
        key: "2",
        icon: <LogoutOutlined />,
        label: "Logout"
      }
    ]
  };

const handleMenuClick = ({ key }) => {

if(key.startsWith("/")){
 navigate(key);
}

if(isMobile){
 setDrawerOpen(false);
}

};

  return (

    <Layout
      className="erp-layout"
      style={{
        height: "100vh",
        overflow: "hidden"
      }}
    >

      {/* Desktop Sidebar */}

      {!isMobile && (

        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={250}
          collapsedWidth={80}
          style={{
            background: token.colorPrimary,
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >

          <div className="erp-logo">
            {collapsed ? "ERP" : "School ERP"}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />

        </Sider>

      )}



      {/* Mobile Drawer */}

      <Drawer
        title="School ERP"
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={250}
        bodyStyle={{ padding: 0 }}
      >

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            borderRight: 0,
            height: "100%",
            overflowX: "hidden"
          }}
        />

      </Drawer>



      {/* Main Layout */}

      <Layout
        style={{
          marginLeft: isMobile ? 0 : (collapsed ? 80 : 250),
          transition: "all .2s ease",
          minWidth: 0,
          overflowX: "hidden"
        }}
      >

        {/* Header */}

        <Header
          className="erp-header"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: isMobile ? 0 : (collapsed ? 80 : 250),
            zIndex: 1000,
            height: 64,
            background: token.colorBgContainer,
            padding: isMobile ? "0 16px" : "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: token.boxShadow,
            transition: "all .2s ease"
          }}
        >

          <Button
            type="text"
            icon={
              isMobile
                ? <MenuOutlined />
                : collapsed
                  ? <MenuUnfoldOutlined />
                  : <MenuFoldOutlined />
            }
            onClick={() =>
              isMobile
                ? setDrawerOpen(true)
                : setCollapsed(!collapsed)
            }
            style={{
              fontSize: 18
            }}
          />

          <Space size={isMobile ? "small" : "middle"}>

            {!isMobile && (
              <Text strong>
                Welcome Admin
              </Text>
            )}

            <Dropdown
              menu={profileMenu}
              placement="bottomRight"
            >
              <Avatar
                className="admin-avatar"
                size="large"
                icon={<UserOutlined />}
                style={{
                  cursor: "pointer",
                  backgroundColor: token.colorPrimary
                }}
              />
            </Dropdown>

          </Space>

        </Header>



        {/* Scrollable Content */}

        <Content
          className="erp-content"
          style={{
            marginTop: 4,
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            overflowX: "hidden",
            padding: isMobile ? "35px 8px" : "40px 0px",
            background: token.colorBgLayout
          }}
        >

          <Outlet />

        </Content>

      </Layout>

    </Layout>

  );

};

export default AdminLayout;
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
  theme,
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
  LogoutOutlined,
} from "@ant-design/icons";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/students",
      icon: <TeamOutlined />,
      label: "Students",
    },
    {
      key: "/academics",
      icon: <BookOutlined />,
      label: "Academics",
    },
    {
      key: "/attendance",
      icon: <CalendarOutlined />,
      label: "Attendance",
    },
    {
      key: "/reports",
      icon: <FileTextOutlined />,
      label: "Reports",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  const profileMenu = {
    items: [
      {
        key: "1",
        icon: <UserOutlined />,
        label: "Profile",
      },
      {
        key: "2",
        icon: <LogoutOutlined />,
        label: "Logout",
      },
    ],
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <Layout
      className="erp-layout"
      style={{ minHeight: "100vh" }}
    >
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={250}
          style={{
            background: token.colorPrimary,
          }}
        >
          <div
            className="erp-logo"
            style={{
              height:64,
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              color:"#fff",
              fontSize:20,
              fontWeight:700,
              borderBottom:"1px solid rgba(255,255,255,.1)",
            }}
          >
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

      {/* Mobile Drawer Sidebar */}
      <Drawer
        title="School ERP"
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={250}
        bodyStyle={{ padding:0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            borderRight:0,
            height:"100%",
          }}
        />
      </Drawer>

      <Layout>

        {/* Header */}
        <Header
          className="erp-header"
          style={{
            background: token.colorBgContainer,
            padding: isMobile ? "0 16px" : "0 24px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            boxShadow: token.boxShadow,
          }}
        >
          <Button
            type="text"
            icon={
              isMobile ? (
                <MenuOutlined />
              ) : collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() =>
              isMobile
                ? setDrawerOpen(true)
                : setCollapsed(!collapsed)
            }
            style={{
              fontSize:18,
            }}
          />

          <Space size={isMobile ? "small" : "middle"}>
            {!isMobile && (
              <Text
                strong
                style={{
                  color: token.colorText,
                }}
              >
                Welcome Admin
              </Text>
            )}

            <Dropdown
              menu={profileMenu}
              placement="bottomRight"
            >
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{
                  cursor:"pointer",
                  backgroundColor: token.colorPrimary,
                }}
              />
            </Dropdown>
          </Space>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            padding: isMobile ? 16 : "24px 32px",
            minHeight:"calc(100vh - 64px)",
            background: token.colorBgLayout,
          }}
        >
          <Outlet />
        </Content>

      </Layout>
    </Layout>
  );
};

export default AdminLayout;
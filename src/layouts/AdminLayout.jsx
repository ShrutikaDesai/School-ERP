import React, { useEffect, useState } from "react";
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
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  BankOutlined
} from "@ant-design/icons";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

import "./AdminLayout.css";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const rootSubmenuKeys = ["students", "academics", "attendance", "others"];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const authPages = ["/admin-login", "/admin-signup"];
  const isAuthPage = authPages.includes(location.pathname);

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "DASHBOARD",
    },
    {
      key: "students",
      icon: <TeamOutlined />,
      label: "STUDENT MANAGEMENT",
      children: [
        { key: "/students", label: "Students" },
        { key: "/add-student", label: "Add Student" }
      ],
    },
    {
      key: "academics",
      icon: <BookOutlined />,
      label: "ACADEMICS",
      children: [
        { key: "/classes", label: "Classes" },
        { key: "/sections", label: "Sections" },
      ],
    },
    {
      key: "attendance",
      icon: <CalendarOutlined />,
      label: "ATTENDANCE",
      children: [
        { key: "/mark-attendance", label: "Mark Attendance" },
        { key: "/attendance-report", label: "Attendance Report" },
      ],
    },
    {
    key: "/reports",
    icon: <FileTextOutlined />, 
    label: "REPORTS",
  },

  // {
  //   key: "others",
  //   icon: <SettingOutlined />,
  //   label: "OTHERS",
  //   children: [
  //     { key: "/settings", label: "Settings" },
  //   ],
  // },
  ];

  const getOpenKey = () => {
    if (location.pathname.startsWith("/students")) return "students";
    if (location.pathname.startsWith("/classes") || location.pathname.startsWith("/sections")) return "academics";
    if (location.pathname.startsWith("/mark-attendance") || location.pathname.startsWith("/attendance-report")) return "attendance";
    if (location.pathname.startsWith("/reports") || location.pathname.startsWith("/settings")) return "others";
    return "";
  };

  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const activeKey = getOpenKey();
    setOpenKeys(activeKey ? [activeKey] : []);
  }, [location.pathname]);

  const handleOpenChange = (keys) => {
    const latest = keys.find((k) => !openKeys.includes(k));
    if (rootSubmenuKeys.includes(latest)) {
      setOpenKeys([latest]);
    } else {
      setOpenKeys(keys);
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key.startsWith("/")) navigate(key);
    if (isMobile) setDrawerOpen(false);
  };

  const profileMenu = {
    items: [
      { key: "1", icon: <UserOutlined />, label: "Profile" },
      { key: "2", icon: <LogoutOutlined />, label: "Logout" }
    ]
  };

  return (
    <Layout className="erp-layout" style={{ height: "100vh", overflow: "hidden" }}>

      {/* SIDEBAR */}
    {!isMobile && !isAuthPage && (
        // <Sider
        //   collapsible
        //   collapsed={collapsed}
        //   trigger={null}
        //   width={260}
        //   collapsedWidth={80}
        //   style={{
        //     background: token.colorPrimary,
        //     position: "fixed",
        //     left: 0,
        //     top: 0,
        //     bottom: 0,
        //     overflowY: "auto"
        //   }}
        // >

        //   {/* 🔥 USER PROFILE SECTION */}
        //   <div className="erp-user-panel-wrapper">
        //     <div className="erp-user-panel">
        //       <Avatar
        //         size={64}
        //         src="https://i.pravatar.cc/150?img=12"
        //         icon={<UserOutlined />}
        //         className="erp-user-avatar"
        //       />

        //       {!collapsed && (
        //         <div className="erp-user-info">
        //           <div className="erp-user-name">Admin User</div>
        //           <div className="erp-user-role">Administrator</div>
        //         </div>
        //       )}
        //     </div>
        //   </div>

        //   <Menu
        //     // theme="dark"
        //     mode="inline"
        //     selectedKeys={[location.pathname]}
        //     openKeys={openKeys}
        //     items={menuItems}
        //     onClick={handleMenuClick}
        //     onOpenChange={handleOpenChange}
        //   />
        // </Sider>

        <Sider
  collapsed={collapsed}
  trigger={null}
  width={260}
  collapsedWidth={80}
  className="erp-sidebar"
>

  {/* LOGO */}
  <div className="erp-logo">
    <div className="erp-logo-icon">
      <BankOutlined />  
    </div>

    {!collapsed && (
      <div className="erp-logo-text">
        School ERP
      </div>
    )}
  </div>

  {/* MENU */}
  <Menu
    mode="inline"
    className="erp-sidebar-menu"
    selectedKeys={[location.pathname]}
    openKeys={openKeys}
    items={menuItems}
    onClick={handleMenuClick}
    onOpenChange={handleOpenChange}
  />

  {/* BOTTOM USER */}
  <div className="erp-sidebar-footer">

    <div className="erp-footer-user">
      <Avatar
        size={40}
        src="https://i.pravatar.cc/150?img=12"
      />

      {!collapsed && (
        <div className="erp-footer-user-info">
          <div className="erp-footer-name">
            Admin User
          </div>

          <div className="erp-footer-email">
            admin@school.com
          </div>
        </div>
      )}
    </div>

    {!collapsed && (
      <SettingOutlined className="erp-footer-setting" />
    )}

  </div>

</Sider>
      )}

     {/* MOBILE DRAWER */}
{!isAuthPage && (
  <Drawer
    title="School ERP"
    placement="left"
    open={drawerOpen}
    onClose={() => setDrawerOpen(false)}
    width={260}
    bodyStyle={{ padding: 0 }}
  >
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      items={menuItems}
      onClick={handleMenuClick}
      onOpenChange={handleOpenChange}
      style={{
        background: "transparent",
        borderRight: "none",
        color: "#353333"
      }}
    />
  </Drawer>
)}

      {/* MAIN LAYOUT */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : (collapsed ? 80 : 260),
          transition: "all .2s ease"
        }}
      >

      {/* HEADER */}
{!isAuthPage && (
  <Header
    style={{
      position: "fixed",
      top: 0,
      left: isMobile ? 0 : (collapsed ? 80 : 260),
      right: 0,
      height: 64,
      background: token.colorBgContainer,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 16px",
      zIndex: 1000,
      boxShadow: token.boxShadow
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
    />

    <Space>
      {!isMobile && <Text strong>Welcome Admin</Text>}

      <Dropdown menu={profileMenu}>
        <Avatar
          icon={<UserOutlined />}
          style={{
            background: token.colorPrimary,
            cursor: "pointer"
          }}
        />
      </Dropdown>
    </Space>
  </Header>
)}

        {/* CONTENT */}
       <Content
  style={{
    marginTop: isAuthPage ? 0 : 64,
    height: isAuthPage
      ? "100vh"
      : "calc(100vh - 64px)",

    overflowY: "auto",
    padding: isAuthPage
      ? 0
      : isMobile
        ? 12
        : 20,

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



// ✅ UPDATED CODE WITH AUTO-OPEN SUBMENUS


// import React, { useEffect, useState } from "react";
// import {
//   Layout,
//   Menu,
//   Button,
//   Avatar,
//   Dropdown,
//   Space,
//   Typography,
//   Drawer,
//   Grid,
//   theme
// } from "antd";

// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   MenuOutlined,
//   DashboardOutlined,
//   TeamOutlined,
//   BookOutlined,
//   CalendarOutlined,
//   FileTextOutlined,
//   SettingOutlined,
//   UserOutlined,
//   LogoutOutlined
// } from "@ant-design/icons";

// import {
//   Outlet,
//   useNavigate,
//   useLocation
// } from "react-router-dom";

// import "./AdminLayout.css";

// const { Header, Sider, Content } = Layout;
// const { Text } = Typography;
// const { useBreakpoint } = Grid;
// const rootSubmenuKeys = ["students", "academics", "others"];

// const AdminLayout = () => {

//   const [collapsed, setCollapsed] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const screens = useBreakpoint();
//   const isMobile = !screens.md;

//   const navigate = useNavigate();
//   const location = useLocation();

//   const { token } = theme.useToken();

//   /* ✅ MENU WITH SUBMENUS (CLICKABLE GROUPS) */
//   const rootSubmenuKeys = ["students", "academics", "attendance", "others"];

//   const menuItems = [
//     {
//       key: "/",
//       icon: <DashboardOutlined />,
//       label: "DASHBOARD",
//     },

//     {
//       key: "students",
//       icon: <TeamOutlined />,
//       label: "STUDENT MANAGEMENT",
//       children: [
//         {
//           key: "/students",
//           label: "Students",
//         }
//       ],
//     },

//     {
//       key: "academics",
//       icon: <BookOutlined />,
//       label: "ACADEMICS",
//       children: [
//         {
//           key: "/classes",
//           label: "Classes",
//         },
//         {
//           key: "/sections",
//           label: "Sections",
//         },
//       ],
//     },

//     // ✅ NEW ATTENDANCE GROUP
//     {
//       key: "attendance",
//       icon: <CalendarOutlined />,
//       label: "ATTENDANCE",
//       children: [
//         {
//           key: "/mark-attendance",
//           label: "Mark Attendance",
//         },
//         {
//           key: "/attendance-report",
//           label: "Attendance Report",
//         },
//       ],
//     },

//     {
//       key: "others",
//       icon: <SettingOutlined />,
//       label: "OTHERS",
//       children: [
//         {
//           key: "/reports",
//           label: "Reports",
//         },
//         {
//           key: "/settings",
//           label: "Settings",
//         },
//       ],
//     },
//   ];

//   /* ✅ AUTO OPEN ACTIVE GROUP */
//   const getOpenKey = () => {
//     if (location.pathname.startsWith("/students")) return "students";
//     if (location.pathname.startsWith("/classes") || location.pathname.startsWith("/sections")) return "academics";
//     if (location.pathname.startsWith("/mark-attendance") || location.pathname.startsWith("/attendance-report")) return "attendance";
//     if (location.pathname.startsWith("/reports") || location.pathname.startsWith("/settings")) return "others";
//     return "";
//   };

//   const [openKeys, setOpenKeys] = useState(() => {
//     const activeKey = getOpenKey();
//     return activeKey ? [activeKey] : [];
//   });

//   useEffect(() => {
//     const activeKey = getOpenKey();
//     setOpenKeys(activeKey ? [activeKey] : []);
//   }, [location.pathname]);

//   const handleOpenChange = (keys) => {
//     const latestOpenKey = keys.find((key) => !openKeys.includes(key));

//     if (latestOpenKey && rootSubmenuKeys.includes(latestOpenKey)) {
//       setOpenKeys([latestOpenKey]);
//       return;
//     }

//     setOpenKeys(keys);
//   };

//   const profileMenu = {
//     items: [
//       {
//         key: "1",
//         icon: <UserOutlined />,
//         label: "Profile"
//       },
//       {
//         key: "2",
//         icon: <LogoutOutlined />,
//         label: "Logout"
//       }
//     ]
//   };

//   const handleMenuClick = ({ key }) => {
//     if (key.startsWith("/")) {
//       navigate(key);
//     }
//     if (isMobile) {
//       setDrawerOpen(false);
//     }
//   };

//   return (
//     <Layout className="erp-layout" style={{ height: "100vh", overflow: "hidden" }}>

//       {/* ✅ DESKTOP SIDEBAR */}
//       {!isMobile && (
//         <Sider
//           collapsible
//           collapsed={collapsed}
//           trigger={null}
//           width={250}
//           collapsedWidth={80}
//           style={{
//             background: token.colorPrimary,
//             position: "fixed",
//             left: 0,
//             top: 0,
//             bottom: 0,
//             height: "100vh",
//             overflowY: "auto"
//           }}
//         >
//           <div className="erp-logo">
//             {collapsed ? "ERP" : "School ERP"}
//           </div>

//           <Menu
//             theme="dark"
//             mode="inline"
//             selectedKeys={[location.pathname]}
//             openKeys={openKeys}
//             items={menuItems}
//             onClick={handleMenuClick}
//             onOpenChange={handleOpenChange}
//           />
//         </Sider>
//       )}

//       {/* ✅ MOBILE DRAWER */}
//       <Drawer
//         title="School ERP"
//         placement="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         width={250}
//         bodyStyle={{ padding: 0 }}
//       >
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           openKeys={openKeys}
//           items={menuItems}
//           onClick={handleMenuClick}
//           onOpenChange={handleOpenChange}
//           style={{ height: "100%" }}
//         />
//       </Drawer>

//       {/* ✅ MAIN CONTENT */}
//       <Layout
//         style={{
//           marginLeft: isMobile ? 0 : (collapsed ? 80 : 250),
//           transition: "all .2s ease"
//         }}
//       >

//         {/* HEADER */}
//         <Header
//           className="erp-header"
//           style={{
//             position: "fixed",
//             top: 0,
//             right: 0,
//             left: isMobile ? 0 : (collapsed ? 80 : 250),
//             zIndex: 1000,
//             height: 64,
//             background: token.colorBgContainer,
//             padding: isMobile ? "0 16px" : "0 24px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: token.boxShadow
//           }}
//         >
//           <Button
//             type="text"
//             icon={
//               isMobile
//                 ? <MenuOutlined />
//                 : collapsed
//                   ? <MenuUnfoldOutlined />
//                   : <MenuFoldOutlined />
//             }
//             onClick={() =>
//               isMobile
//                 ? setDrawerOpen(true)
//                 : setCollapsed(!collapsed)
//             }
//           />

//           <Space>
//             {!isMobile && <Text strong>Welcome Admin</Text>}

//             <Dropdown menu={profileMenu}>
//               <Avatar
//                 size="large"
//                 icon={<UserOutlined />}
//                 style={{ cursor: "pointer", backgroundColor: token.colorPrimary }}
//               />
//             </Dropdown>
//           </Space>
//         </Header>

//         {/* CONTENT */}
//         <Content
//           className="erp-content"
//           style={{
//             marginTop: 64,
//             height: "calc(100vh - 64px)",
//             overflowY: "auto",
//             padding: isMobile ? "16px" : "20px",
//             background: token.colorBgLayout
//           }}
//         >
//           <Outlet />
//         </Content>

//       </Layout>
//     </Layout>
//   );
// };

// export default AdminLayout;





// ✅ ORIGINAL CODE WITHOUT AUTO-OPEN SUBMENUS

// import React, { useState } from "react";
// import {
//   Layout,
//   Menu,
//   Button,
//   Avatar,
//   Dropdown,
//   Space,
//   Typography,
//   Drawer,
//   Grid,
//   theme
// } from "antd";

// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   MenuOutlined,
//   DashboardOutlined,
//   TeamOutlined,
//   BookOutlined,
//   CalendarOutlined,
//   FileTextOutlined,
//   SettingOutlined,
//   UserOutlined,
//   LogoutOutlined
// } from "@ant-design/icons";

// import {
//   Outlet,
//   useNavigate,
//   useLocation
// } from "react-router-dom";

// import "./AdminLayout.css";

// const { Header, Sider, Content } = Layout;
// const { Text } = Typography;
// const { useBreakpoint } = Grid;

// const AdminLayout = () => {

//   const [collapsed, setCollapsed] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const screens = useBreakpoint();
//   const isMobile = !screens.md;

//   const navigate = useNavigate();
//   const location = useLocation();

//   const { token } = theme.useToken();

//   const menuItems = [
//     {
//       key: "/",
//       icon: <DashboardOutlined />,
//       label: "Dashboard"
//     },
//     {
//       key: "/students",
//       icon: <TeamOutlined />,
//       label: "Students"
//     },
//     {
//       key: "academics",
//       icon: <BookOutlined />,
//       label: "Academics",
//       children: [
//         {
//           key: "/classes",
//           label: "Classes"
//         },
//         {
//           key: "/sections",
//           label: "Sections"
//         }
//       ]
//     },
//     {
//       key: "/attendance",
//       icon: <CalendarOutlined />,
//       label: "Attendance"
//     },
//     {
//       key: "/reports",
//       icon: <FileTextOutlined />,
//       label: "Reports"
//     },
//     {
//       key: "/settings",
//       icon: <SettingOutlined />,
//       label: "Settings"
//     }
//   ];

//   const profileMenu = {
//     items: [
//       {
//         key: "1",
//         icon: <UserOutlined />,
//         label: "Profile"
//       },
//       {
//         key: "2",
//         icon: <LogoutOutlined />,
//         label: "Logout"
//       }
//     ]
//   };

// const handleMenuClick = ({ key }) => {

// if(key.startsWith("/")){
//  navigate(key);
// }

// if(isMobile){
//  setDrawerOpen(false);
// }

// };

//   return (

//     <Layout
//       className="erp-layout"
//       style={{
//         height: "100vh",
//         overflow: "hidden"
//       }}
//     >

//       {/* Desktop Sidebar */}

//       {!isMobile && (

//         <Sider
//           collapsible
//           collapsed={collapsed}
//           trigger={null}
//           width={250}
//           collapsedWidth={80}
//           style={{
//             background: token.colorPrimary,
//             position: "fixed",
//             left: 0,
//             top: 0,
//             bottom: 0,
//             height: "100vh",
//             overflowY: "auto",
//             overflowX: "hidden"
//           }}
//         >

//           <div className="erp-logo">
//             {collapsed ? "ERP" : "School ERP"}
//           </div>

//           <Menu
//             theme="dark"
//             mode="inline"
//             selectedKeys={[location.pathname]}
//             items={menuItems}
//             onClick={handleMenuClick}
//           />

//         </Sider>

//       )}



//       {/* Mobile Drawer */}

//       <Drawer
//         title="School ERP"
//         placement="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         width={250}
//         bodyStyle={{ padding: 0 }}
//       >

//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           items={menuItems}
//           onClick={handleMenuClick}
//           style={{
//             borderRight: 0,
//             height: "100%",
//             overflowX: "hidden"
//           }}
//         />

//       </Drawer>



//       {/* Main Layout */}

//       <Layout
//         style={{
//           marginLeft: isMobile ? 0 : (collapsed ? 80 : 250),
//           transition: "all .2s ease",
//           minWidth: 0,
//           overflowX: "hidden"
//         }}
//       >

//         {/* Header */}

//         <Header
//           className="erp-header"
//           style={{
//             position: "fixed",
//             top: 0,
//             right: 0,
//             left: isMobile ? 0 : (collapsed ? 80 : 250),
//             zIndex: 1000,
//             height: 64,
//             background: token.colorBgContainer,
//             padding: isMobile ? "0 16px" : "0 24px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: token.boxShadow,
//             transition: "all .2s ease"
//           }}
//         >

//           <Button
//             type="text"
//             icon={
//               isMobile
//                 ? <MenuOutlined />
//                 : collapsed
//                   ? <MenuUnfoldOutlined />
//                   : <MenuFoldOutlined />
//             }
//             onClick={() =>
//               isMobile
//                 ? setDrawerOpen(true)
//                 : setCollapsed(!collapsed)
//             }
//             style={{
//               fontSize: 18
//             }}
//           />

//           <Space size={isMobile ? "small" : "middle"}>

//             {!isMobile && (
//               <Text strong>
//                 Welcome Admin
//               </Text>
//             )}

//             <Dropdown
//               menu={profileMenu}
//               placement="bottomRight"
//             >
//               <Avatar
//                 className="admin-avatar"
//                 size="large"
//                 icon={<UserOutlined />}
//                 style={{
//                   cursor: "pointer",
//                   backgroundColor: token.colorPrimary
//                 }}
//               />
//             </Dropdown>

//           </Space>

//         </Header>



//         {/* Scrollable Content */}

//         <Content
//           className="erp-content"
//           style={{
//             marginTop: 4,
//             height: "calc(100vh - 64px)",
//             overflowY: "auto",
//             overflowX: "hidden",
//             padding: isMobile ? "35px 8px" : "40px 0px",
//             background: token.colorBgLayout
//           }}
//         >

//           <Outlet />

//         </Content>

//       </Layout>

//     </Layout>

//   );

// };

// export default AdminLayout;

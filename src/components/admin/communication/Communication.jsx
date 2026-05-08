import React from "react";
import {
  Typography,
  Grid,
  theme
} from "antd";

import { RocketOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Communication = () => {

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // ✅ Using values from adminTheme
  const { token } = theme.useToken();

  return (

    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
        background: token.colorBgLayout
      }}
    >

      <RocketOutlined
        style={{
          fontSize: isMobile ? 60 : 80,
          color: token.colorPrimary,
          marginBottom: 24
        }}
      />

      <Title
        level={isMobile ? 2 : 1}
        style={{
          marginBottom: 10,
          color: token.colorText,
          fontFamily: token.fontFamily
        }}
      >
        Coming Soon...
      </Title>

      <Text
        style={{
          fontSize: isMobile ? 15 : 16,
          maxWidth: 500,
          lineHeight: 1.8,
          color: token.colorTextSecondary,
          fontFamily: token.fontFamily
        }}
      >
        We’re building something amazing for you.
        This feature will be available very soon.
      </Text>

    </div>
  );
};

export default Communication;
import { theme } from "antd";

const { defaultAlgorithm } = theme;

const adminTheme = {
  algorithm: defaultAlgorithm,

  token: {
    colorPrimary: "#1565C0",      // academic blue
    colorInfo: "#1565C0",
    colorSuccess: "#2E7D32",
    colorWarning: "#F9A825",
    colorError: "#D32F2F",

    colorBgLayout: "#F4F8FB",
    colorBgContainer: "#FFFFFF",

    colorText: "#1F2937",
    colorTextSecondary: "#64748B",

    borderRadius: 12,

    fontFamily: "Poppins, sans-serif",

    boxShadow: "0 4px 12px rgba(21,101,192,0.08)",
  },

  components: {
    Layout: {
      headerBg: "#ffffff",
      siderBg: "#0D47A1",
      bodyBg: "#F4F8FB",
    },

    Menu: {
      darkItemBg: "#0D47A1",
      darkItemColor: "#DCEBFF",
      darkItemHoverBg: "#1565C0",
      darkItemSelectedBg: "#1976D2",
      darkItemSelectedColor: "#ffffff",
    },

    Button: {
      borderRadius: 8,
      controlHeight: 40,
    },

    Card: {
      borderRadiusLG: 16,
    },

    Table: {
      headerBg: "#EAF2FB",
    }
  }
};

export default adminTheme;
import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({

    palette: {
        primary: {
            main: "#1565C0"
        },

        secondary: {
            main: "#1976D2"
        },

        success: {
            main: "#2E7D32"
        },

        warning: {
            main: "#F9A825"
        },

        error: {
            main: "#D32F2F"
        },

        background: {
            default: "#F4F8FB",
            paper: "#FFFFFF"
        },

        text: {
            primary: "#1F2937",
            secondary: "#64748B"
        }
    },


    shape: {
        borderRadius: 12
    },


    typography: {
        fontFamily: "Poppins, sans-serif",

        h5: {
            fontWeight: 600
        },

        h6: {
            fontWeight: 600
        },

        button: {
            textTransform: "none",
            fontWeight: 500
        }
    },


    components: {

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    height: 40,
                    boxShadow: "none"
                }
            }
        },


        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "0 4px 12px rgba(21,101,192,0.08)"
                }
            }
        },


        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16
                }
            }
        },


        MuiTextField: {
            styleOverrides: {
                root: {
                    background: "#fff"
                }
            }
        },


        MuiDataGrid: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#fff"
                },

                columnHeaders: {
                    backgroundColor: "#EAF2FB",
                    fontWeight: 600
                }
            }
        },


        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 18
                }
            }
        },


        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 8,
                    borderRadius: 5
                }
            }
        }

    }

});

export default muiTheme;
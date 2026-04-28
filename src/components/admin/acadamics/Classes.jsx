import React, { useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Chip,
    LinearProgress,
    TextField,
    MenuItem,
    InputAdornment,
    IconButton,
    Stack
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Col, Row } from "antd";
import {
    Add,
    Groups,
    Apartment,
    MenuBook,
    Search,
    Download,
    Visibility,
    Edit
} from "@mui/icons-material";

import { Grid as AntGrid } from "antd";
import AddClassModal from "../modals/AddClassModal.jsx";
const { useBreakpoint } = AntGrid;
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGridApiRef } from "@mui/x-data-grid";



const rows = [
    {
        id: 1,
        className: "FY BCA",
        sections: ["A", "B", "C"],
        sectionCount: 3,
        students: 156,
        capacity: 82,
        teacher: "P. Sharma",
        status: "Active"
    },
    {
        id: 2,
        className: "SY BCA",
        sections: ["A", "B"],
        sectionCount: 2,
        students: 98,
        capacity: 76,
        teacher: "R. Patil",
        status: "Active"
    },
    {
        id: 3,
        className: "TY BCA",
        sections: ["A", "B", "C", "D"],
        sectionCount: 4,
        students: 210,
        capacity: 91,
        teacher: "A. Desai",
        status: "Active"
    },
    {
        id: 4,
        className: "FY BSc",
        sections: ["A", "B"],
        sectionCount: 2,
        students: 88,
        capacity: 70,
        teacher: "S. Joshi",
        status: "Inactive"
    }
];


const StatCard = ({ icon, value, label, color }) => (

    <Card
        style={{
            height: "100%",
            borderRadius: 12,
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 12px rgba(21,101,192,0.08)"
        }}
    >
        <Box display="flex" gap={2} alignItems="center">

            <Box sx={{ color }}>
                {icon}
            </Box>

            <Box>
                <Typography variant="h5">
                    {value}
                </Typography>

                <Typography color="text.secondary">
                    {label}
                </Typography>
            </Box>

        </Box>

    </Card>

);

function ClassesContent() {

    // const screens = AntGrid.useBreakpoint();
    const screens = useBreakpoint();
    const apiRef = useGridApiRef();
const [openModal,setOpenModal]=useState(false);
const [modalMode,setModalMode]=useState("add");
const [selectedClass,setSelectedClass]=useState(null);

const handleOpen = () => {
    setOpenModal(true);
};

const handleClose = () => {
    setOpenModal(false);
};

const handleAdd = () => {
setModalMode("add");
setSelectedClass(null);
setOpenModal(true);
};

const handleView = (record) => {
setModalMode("view");
setSelectedClass(record);
setOpenModal(true);
};

const handleEdit = (record) => {
setModalMode("edit");
setSelectedClass(record);
setOpenModal(true);
};

const handleExport = () => {
    const visibleRows = Array.from(
        apiRef.current.getRowModels().values()
    );

    const now = new Date();

    const exportData = visibleRows.map((row) => ({
        ...row,
        exportDate: now.toLocaleDateString(),
        exportTime: now.toLocaleTimeString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Classes");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const file = new Blob([excelBuffer], {
        type: "application/octet-stream"
    });

    saveAs(file, "classes_filtered_data.xlsx");
};

const columns = [

    {
        field: "className",
        headerName: "Class",
        flex: 1
    },

    {
        field: "sections",
        headerName: "Sections",
        flex: 1.4,
        renderCell: (params) => (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                    minHeight: "100%",
                    py: 1
                }}
            >
                {params.value.map((sec) => (
                    <Chip
                        key={sec}
                        label={sec}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                ))}
            </Box>
        )
    },

    {
        field: "sectionCount",
        headerName: "Sections Count",
        flex: 1
    },

    {
        field: "students",
        headerName: "Students",
        flex: 1
    },

    {
        field: "capacity",
        headerName: "Capacity",
        flex: 1.3,
        renderCell: (params) => (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "100%",
                    py: 1
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={params.value}
                />

                <Typography variant="caption">
                    {params.value}%
                </Typography>
            </Box>
        )
    },

    {
        field: "teacher",
        headerName: "Coordinator",
        flex: 1
    },

    {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => (
            <Chip
                label={params.value}
                size="small"
                sx={{
                    background:
                        params.value === "Active"
                            ? "#5A84D6"
                            : "#ECECEC",
                    color:
                        params.value === "Active"
                            ? "#fff"
                            : "#111"
                }}
            />
        )
    },

    {
        field: "action",
        headerName: "Action",
        flex: 1,
        sortable: false,
        renderCell: (params) => (
            <Box display="flex">
                <IconButton
                    size="small"
                    onClick={() => handleView(params.row)}
                >
                    <Visibility />
                </IconButton>

                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                >
                    <Edit />
                </IconButton>
            </Box>
        )
    }

];

    return (

        <Box
            sx={{
                width: "100%",
                maxWidth: 1440,
                mx: "auto",
                px: screens.xs ? 2 : 4,
                py: screens.xs ? 3 : 6
            }}
        >

            <Stack
                direction={screens.md ? "row" : "column"}
                spacing={2}
                alignItems={screens.md ? "center" : "stretch"}
                justifyContent="space-between"
                sx={{ mb: 4, width: "100%" }}
            >

                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant={screens.xs ? "h6" : "h5"}
                        fontWeight={600}
                    >
                        Classes Management
                    </Typography>

                    <Typography color="text.secondary">
                        Manage class groups and faculty assignments
                    </Typography>
                </Box>

<Button
variant="contained"
startIcon={<Add />}
onClick={handleAdd}
>
Add Class
</Button>

            </Stack>


            {/* Stats */}
            <Box sx={{ mb: 4 }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <StatCard
                            icon={<Groups fontSize="large" />}
                            value="12"
                            label="Total Classes"
                            color="#1976d2"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <StatCard
                            icon={<Apartment fontSize="large" />}
                            value="18"
                            label="Sections"
                            color="#7b1fa2"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <StatCard
                            icon={<MenuBook fontSize="large" />}
                            value="520"
                            label="Students"
                            color="green"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <StatCard
                            icon={<Groups fontSize="large" />}
                            value="24"
                            label="Faculty"
                            color="#f57c00"
                        />
                    </Col>
                </Row>
            </Box>


            {/* Search Filters */}
            <Box sx={{ mb: 3 }}>
                <Row gutter={[16, 16]} align="middle" justify="space-between">
                    <Col xs={24} sm={24} md={12} lg={10} xl={9}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search Class"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Col>

                    <Col xs={24} sm={12} md={7} lg={5} xl={4}>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            defaultValue="all"
                        >
                            <MenuItem value="all">All Classes</MenuItem>
                            <MenuItem value="bca">BCA</MenuItem>
                            <MenuItem value="bsc">BSc</MenuItem>
                        </TextField>
                    </Col>

                    <Col xs={24} sm={12} md={5} lg={9} xl={11}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: { xs: "stretch", md: "flex-end" }
                            }}
                        >
                           <Button
    variant="outlined"
    startIcon={<Download />}
    onClick={handleExport}
    sx={{
        width: { xs: "100%", sm: "auto" },
        minWidth: { md: 140 }
    }}
>
    Export
</Button>
                        </Box>
                    </Col>
                </Row>
            </Box>


            {/* Table */}
            <Paper
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    overflow: "hidden"
                }}
            >

                <Box sx={{ overflowX: "auto" }}>

                    <DataGrid
                           apiRef={apiRef}
                        rows={rows}
                        columns={columns}
                        autoHeight
                        hideFooter
                        disableRowSelectionOnClick
                        rowHeight={72}
                        sx={{
                            minWidth: screens.xs ? 950 : "100%",
                            border: 0
                        }}
                    />

                </Box>

            </Paper>


<AddClassModal
open={openModal}
onClose={()=>setOpenModal(false)}
mode={modalMode}
initialValues={selectedClass}
/>



        </Box>

    );
}


export default function Classes() {

    return <ClassesContent />;

}

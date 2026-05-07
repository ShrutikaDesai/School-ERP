import React, { useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Chip,
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
    Edit,
    Delete
} from "@mui/icons-material";

import { Grid as AntGrid, Modal } from "antd";
import AddClassModal from "../modals/AddClassModal.jsx";
const { useBreakpoint } = AntGrid;
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGridApiRef } from "@mui/x-data-grid";



const initialRows = [
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


/* ================= Stat Card ================= */

const StatCard = ({
    icon,
    value,
    label,
    iconBg,
    iconColor
}) => (
    <Card
        style={{
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            height: "100%",
        }}
        bodyStyle={{
            padding: "20px",
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                minHeight: 70,
            }}
        >
            {/* ICON */}
            <Box
                sx={{
                    width: 58,
                    height: 58,
                    minWidth: 58,
                    borderRadius: "16px",
                    backgroundColor: iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: iconColor,

                    "& svg": {
                        fontSize: 30,
                    },
                }}
            >
                {icon}
            </Box>

            {/* CONTENT */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                        lineHeight: 1.1,
                    }}
                >
                    {value}
                </Typography>

                <Typography
                    sx={{
                        color: "#6B7280",
                        fontSize: 14,
                        mt: 0.5,
                    }}
                >
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
    const [rows, setRows] = useState(initialRows);
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [selectedClass, setSelectedClass] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [classFilter, setClassFilter] = useState("all");

    const handleClose = () => {
        setOpenModal(false);
        setSelectedClass(null);
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

    const handleDeleteClick = (row) => {
        setRowToDelete(row);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setRows(prev => prev.filter(r => r.id !== rowToDelete.id));
        setDeleteModalOpen(false);
        setRowToDelete(null);
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
        setRowToDelete(null);
    };

    const handleSubmitClass = (values) => {
        const normalizedData = {
            className: values.className.trim(),
            teacher: values.teacher.trim(),
            sections: values.sections,
            sectionCount: values.sections.length,
            students: Number(values.students),
            capacity: selectedClass?.capacity ?? 0,
            status: selectedClass?.status ?? "Active"
        };

        if (modalMode === "edit" && selectedClass) {
            setRows((currentRows) =>
                currentRows.map((row) =>
                    row.id === selectedClass.id
                        ? { ...row, ...normalizedData }
                        : row
                )
            );
        } else {
            setRows((currentRows) => [
                ...currentRows,
                {
                    id:
                        currentRows.length > 0
                            ? Math.max(...currentRows.map((row) => row.id)) + 1
                            : 1,
                    ...normalizedData
                }
            ]);
        }

        handleClose();
    };

    const handleExport = () => {
        const visibleRows = Array.from(
            apiRef.current.getRowModels().values()
        );

        const now = new Date();
        const exportDate = now.toLocaleDateString();
        const exportTime = now.toLocaleTimeString();

        const exportData = visibleRows.map((row, index) => ({
            "Sr No.": index + 1,
            Class: row.className,
            Sections: Array.isArray(row.sections) ? row.sections.join(", ") : row.sections,
            "Sections Count": row.sectionCount,
            Students: row.students,
            "Capacity (%)": row.capacity,
            Coordinator: row.teacher,
            Status: row.status
        }));

        const worksheet = XLSX.utils.aoa_to_sheet([
            ["Classes Data Export"],
            ["Export Date", exportDate],
            ["Export Time", exportTime],
            []
        ]);

        // 🔥 Add custom rows at top

        // 🔥 Shift table data down (important)
        XLSX.utils.sheet_add_json(worksheet, exportData, {
            origin: "A5",
            skipHeader: false
        });

        worksheet["!cols"] = [
            { wch: 10 },
            { wch: 18 },
            { wch: 20 },
            { wch: 16 },
            { wch: 12 },
            { wch: 14 },
            { wch: 20 },
            { wch: 12 }
        ];

        worksheet["!merges"] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Classes");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const file = new Blob([excelBuffer], {
            type: "application/octet-stream"
        });

        saveAs(file, "classes_data.xlsx");
    };

    const filteredRows = rows.filter((row) => {
        const matchesSearch =
            row.className.toLowerCase().includes(searchText.toLowerCase()) ||
            row.teacher.toLowerCase().includes(searchText.toLowerCase());

        const matchesClass =
            classFilter === "all" || row.className === classFilter;

        return matchesSearch && matchesClass;
    });


    const columns = [

        {
            field: "srNo",
            headerName: "Sr No.",
            width: 70,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
            )
        },

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
            headerName: "Student Count",
            flex: 1
        },

        {
            field: "capacity",
            headerName: "Capacity",
            flex: 1,
            renderCell: (params) => `${params.value}%`
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
                    sx={{
                        background:
                            params.value === "Active"
                                ? "linear-gradient(45deg,#4CAF50,#81C784)"
                                : "#E0E0E0",
                        color: params.value === "Active" ? "#fff" : "#333"
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

                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(params.row)}
                    >
                        <Delete />
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
                px: screens.xs ? 0 : 1,
                py: screens.xs ? 3 : 1
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
            {/* ================= STATS ================= */}

            <Box sx={{ mb: 4 }}>
                <Row gutter={[16, 16]}>

                    <Col xs={24} sm={12} lg={6}>
                        <StatCard
                            icon={<Groups />}
                            value={rows.length}
                            label="Total Classes"
                            iconBg="#E3F2FD"
                            iconColor="#1565C0"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <StatCard
                            icon={<Apartment />}
                            value={
                                rows.reduce(
                                    (total, row) => total + row.sectionCount,
                                    0
                                )
                            }
                            label="Total Sections"
                            iconBg="#F3E5F5"
                            iconColor="#7B1FA2"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <StatCard
                            icon={<MenuBook />}
                            value={
                                rows.reduce(
                                    (total, row) => total + row.students,
                                    0
                                )
                            }
                            label="Students"
                            iconBg="#E8F5E9"
                            iconColor="#2E7D32"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <StatCard
                            icon={<Groups />}
                            value={
                                new Set(rows.map((row) => row.teacher)).size
                            }
                            label="Faculty"
                            iconBg="#FFF3E0"
                            iconColor="#EF6C00"
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
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
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
                            value={classFilter}
                            onChange={(e) => setClassFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Classes</MenuItem>
                            <MenuItem value="FY BCA">FY BCA</MenuItem>
                            <MenuItem value="SY BCA">SY BCA</MenuItem>
                            <MenuItem value="TY BCA">TY BCA</MenuItem>
                            <MenuItem value="FY BSc">FY BSc</MenuItem>
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
                        rows={filteredRows}
                        columns={columns}
                        autoHeight
                        disableRowSelectionOnClick
                        rowHeight={72}

                        pagination
                        pageSizeOptions={[5, 10, 20, 50]}

                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                    page: 0
                                }
                            }
                        }}

                        sx={{
                            minWidth: screens.xs ? 950 : "100%",
                            border: 0
                        }}
                    />

                </Box>

            </Paper>


            <AddClassModal
                open={openModal}
                onClose={handleClose}
                mode={modalMode}
                initialValues={selectedClass}
                onSubmit={handleSubmitClass}
            />

            <Modal
                open={deleteModalOpen}
                onCancel={handleCancelDelete}
                onOk={handleConfirmDelete}
                okText="Delete"
                cancelText="Cancel"
                centered
                okButtonProps={{
                    danger: true,
                    style: {
                        background: "linear-gradient(45deg,#ff4d4f,#ff7875)",
                        border: "none"
                    }
                }}
                bodyStyle={{ padding: "20px 10px" }}
            >
                <Box textAlign="center">
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Delete Class
                    </Typography>

                    <Typography color="text.secondary">
                        Are you sure you want to delete{" "}
                        <b>{rowToDelete?.className}</b> class?
                    </Typography>
                </Box>
            </Modal>

        </Box>

    );
}


export default function Classes() {

    return <ClassesContent />;

}

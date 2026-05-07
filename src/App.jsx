import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import StudentsPage from "./components/admin/students/studentList";
import Classes from "./components/admin/acadamics/Classes";
import Sections from "./components/admin/acadamics/Sections";
import MarkAttendance from "./components/admin/attendance/MarkAttendance";
import AttendanceReport from "./components/admin/attendance/AttendanceReport.jsx";
import Reports from "./components/admin/reports/Reports.jsx";
import AddStudent from "./components/admin/students/AddStudent.jsx";
import StudentLists from "./components/admin/students/StudentLists.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentLists />} />
              {/* <Route path="/students" element={<StudentsPage />} /> */}
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="/attendance-report" element={<AttendanceReport />} />
          <Route path="/reports" element={<Reports />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
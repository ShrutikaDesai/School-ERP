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
import AdminSignUp from "./components/admin/AdminSignUp.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import QuickAccess from "./components/admin/dashboard/QuickAccess.jsx";
import TeachersList from "./components/admin/teachers/TeachersList.jsx";
import AcademicFees from "./components/admin/academicFees/AcademicFees.jsx";
import Exams from "./components/admin/exams/Exams.jsx";
import Transport from "./components/admin/transport/Transport.jsx";
import Communication from "./components/admin/communication/Communication.jsx";
import Settings from "./components/admin/settings/Settings.jsx";
import Profile from "./components/admin/profile/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
            <Route path="/" element={<AdminLogin />} />
          <Route path="signup" element={<AdminSignUp />} />

        {/* ADMIN ROUTES */}
        <Route path="/s-admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quick-access" element={<QuickAccess />} />
          <Route path="students" element={<StudentLists />} />
          {/* <Route path="students" element={<StudentsPage />} /> */}
          <Route path="teachers" element={<TeachersList />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="students/:id/edit" element={<AddStudent mode="edit" />}/>
          <Route path="students/:id/view" element={<AddStudent mode="view" />} />
          <Route path="classes" element={<Classes />} />
          <Route path="sections" element={<Sections />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="attendance-report" element={<AttendanceReport />} />
          <Route path="reports" element={<Reports />} />
          <Route path="academic-fees" element={<AcademicFees />} />
          <Route path="exams" element={<Exams />} />
          <Route path="transport" element={<Transport />} />
          <Route path="communication" element={<Communication />} />
          <Route path="settings" element={<Settings />} />  
          <Route path="profile" element={<Profile />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
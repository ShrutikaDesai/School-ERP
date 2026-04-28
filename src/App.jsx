import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import StudentsPage from "./components/admin/students/studentList";
import AddStudentPage from "./components/admin/students/AddStudentPage";
import Classes from "./components/admin/acadamics/Classes";
import Sections from "./components/admin/acadamics/Sections";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/sections" element={<Sections />} />
          {/* <Route path="/attendance" element={<Attendance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
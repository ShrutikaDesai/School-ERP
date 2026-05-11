const STUDENTS_STORAGE_KEY = "erp_students";

export const defaultStudents = [
  {
    id: 1,
    name: "Amit Sharma",
    rollNo: "101",
    class: "7th Std",
    section: "A",
    gender: "Male",
    phone: "9876543210",
    status: "Active"
  },
  {
    id: 2,
    name: "Priya Patil",
    rollNo: "102",
    class: "8th Std",
    section: "B",
    gender: "Female",
    phone: "9876543211",
    status: "Active"
  },
  {
    id: 3,
    name: "Rahul Desai",
    rollNo: "103",
    class: "9th Std",
    section: "A",
    gender: "Male",
    phone: "9876543212",
    status: "Inactive"
  }
];

export const getStoredStudents = () => {
  if (typeof window === "undefined") {
    return defaultStudents;
  }

  const savedStudents = window.localStorage.getItem(STUDENTS_STORAGE_KEY);

  if (!savedStudents) {
    window.localStorage.setItem(
      STUDENTS_STORAGE_KEY,
      JSON.stringify(defaultStudents)
    );
    return defaultStudents;
  }

  try {
    const parsedStudents = JSON.parse(savedStudents);
    return Array.isArray(parsedStudents) ? parsedStudents : defaultStudents;
  } catch {
    return defaultStudents;
  }
};

export const saveStudents = (students) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STUDENTS_STORAGE_KEY,
    JSON.stringify(students)
  );
};

export const addStudentToStorage = (student) => {
  const students = getStoredStudents();
  const updatedStudents = [...students, student];
  saveStudents(updatedStudents);
  return updatedStudents;
};


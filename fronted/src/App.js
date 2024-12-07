import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentTable from "./components/StudentTable";
import Pagination from "./components/Pagination";

const App = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Размер страницы
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudents = async (page, size) => {
    try {
      const response = await axios.get(
          `http://localhost:8000/students?page=${page}&size=${size}`
      );
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
      <div style={{ padding: "20px" }}>
        <h1>Список студентов</h1>
        <label>
          Размер страницы:
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
        <StudentTable students={students} />
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
  );
};

export default App;
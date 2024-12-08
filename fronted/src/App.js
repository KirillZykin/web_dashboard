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
      const skip = (page - 1) * size; // Смещение
      const response = await axios.get(
          `http://127.0.0.1:3000/students?skip=${skip}&limit=${size}`
      );
      setStudents(response.data); // Предполагается, что API возвращает массив студентов
      // Замените `100` на общее количество записей, возвращаемое API
      setTotalPages(Math.ceil(100 / size));
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
          <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
        {students.length === 0 ? (
            <p>Нет данных для отображения.</p>
        ) : (
            <StudentTable students={students} />
        )}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
  );
};

export default App;
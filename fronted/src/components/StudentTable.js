//Компонент таблицы

import React from "react";

const StudentTable = ({ students }) => {
    return (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
            <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Курс</th>
                <th>Группа</th>
                <th>Факультет</th>
            </tr>
            </thead>
            <tbody>
            {students && students.length > 0 ? (
                students.map((student, index) => (
                    <tr key={index}>
                        <td>{student.last_name}</td>
                        <td>{student.first_name}</td>
                        <td>{student.middle_name}</td>
                        <td>{student.course}</td>
                        <td>{student.group}</td>
                        <td>{student.faculty}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="6">Нет данных</td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default StudentTable;
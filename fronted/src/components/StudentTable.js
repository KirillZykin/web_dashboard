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
            {students.map((student, index) => (
                <tr key={index}>
                    <td>{student.lastName}</td>
                    <td>{student.firstName}</td>
                    <td>{student.middleName}</td>
                    <td>{student.course}</td>
                    <td>{student.group}</td>
                    <td>{student.faculty}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default StudentTable;
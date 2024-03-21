import React, { useState } from 'react';
import '../styles/excel.css'; // Make sure to adjust the path as needed

function Excel() {
  const [students, setStudents] = useState([
    { id: 1, name: '', hindi: 0, maths: 0, english: 0, science: 0, operation: 'add', result: '' }
  ]);

  const addStudent = () => {
    const newId = students.length + 1;
    setStudents([...students, 
      { id: newId, name: '', hindi: 0, maths: 0, english: 0, science: 0, operation: 'add', result: '' }]);
  };

  const handleStudentChange = (id, field, value) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, [field]: field === 'name' ? value : Number(value) } : student
    );
    setStudents(updatedStudents);
  };

  const handleOperationChange = (id, operation) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, operation } : student
    );
    setStudents(updatedStudents);
  };

  const calculateResult = (id) => {
    const student = students.find(student => student.id === id);
    const marks = [student.hindi, student.maths, student.english, student.science];

    let calcResult;
    switch (student.operation) {
      case 'add':
        calcResult = marks.reduce((acc, curr) => acc + curr, 0);
        break;
      case 'subtract':
        calcResult = marks.reduce((acc, curr) => acc - curr);
        break;
      case 'multiply':
        calcResult = marks.reduce((acc, curr) => acc * curr, 1);
        break;
      case 'divide':
        calcResult = marks.reduce((acc, curr, i) => i === 0 ? curr : acc / curr);
        break;
      case 'mean':
        calcResult = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
        break;
      case 'mode':
        // Implement mode calculation
        calcResult = 'Mode not implemented';
        break;
      default:
        calcResult = 'Invalid operation';
    }

    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, result: calcResult.toString() } : student
    );
    setStudents(updatedStudents);
  };

  const resetResults = (id) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, result: '', hindi: 0, maths: 0, english: 0, science: 0 } : student
    );
    setStudents(updatedStudents);
  };

  return (
    <div className="excel-container">
      <table className="excel-table">
        <thead>
          <tr>
            <th><input></input></th>
            <th><input></input></th>
            <th><input></input></th>
            <th><input></input></th>
            <th><input></input></th>
            <th><input></input></th>
            <th><input></input></th>
            <th><input></input></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td><input type="text" value={student.name} onChange={(e) => handleStudentChange(student.id, 'name', e.target.value)} /></td>
              <td><input type="number" value={student.hindi} onChange={(e) => handleStudentChange(student.id, 'hindi', e.target.value)} /></td>
              <td><input type="number" value={student.maths} onChange={(e) => handleStudentChange(student.id, 'maths', e.target.value)} /></td>
              <td><input type="number" value={student.english} onChange={(e) => handleStudentChange(student.id, 'english', e.target.value)} /></td>
              <td><input type="number" value={student.science} onChange={(e) => handleStudentChange(student.id, 'science', e.target.value)} /></td>
              <td>
                <select onChange={(e) => handleOperationChange(student.id, e.target.value)} value={student.operation}>
                  <option value="add">Add</option> 
                  <option value="subtract">Subtract</option>
                  <option value="multiply">Multiply</option>
                  <option value="divide">Divide</option>
                  <option value="mean">Mean</option>
                  <option value="mode">Mode</option>
                </select>
              </td>
              <td>
                <button onClick={() => calculateResult(student.id)} className="action-btn calculate">Calculate</button> <span></span>
                <button onClick={() => resetResults(student.id)} className="action-btn reset">Reset</button>
              </td>
              <td>{student.result}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addStudent} className="add-student-btn">Add Student</button>
    </div>
  );
}

export default Excel;


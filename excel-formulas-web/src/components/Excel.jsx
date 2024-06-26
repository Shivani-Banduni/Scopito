import React, { useState } from 'react';
import '../styles/excel.css'; 

function Grid() {
  const createInitialGrid = () => Array.from({ length: 10 }, () => Array(10).fill(''));

  const [data, setData] = useState(createInitialGrid);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [result, setResult] = useState(''); // State to store the operation result

  const handleCellChange = (row, col, value) => {
    const newData = [...data];
    newData[row] = [...newData[row]];
    newData[row][col] = value;
    setData(newData);
  };

 
  const toggleCellSelection = (row, col) => {
    const key = `${row}-${col}`;
    setSelectedCells((prevSelectedCells) => {
      const newSelectedCells = new Set(prevSelectedCells);
      if (newSelectedCells.has(key)) {
        newSelectedCells.delete(key);
      } else {
        newSelectedCells.add(key);
      }
      return newSelectedCells;
    });
  };

  const performOperation = (operation) => {
    const values = Array.from(selectedCells).map((key) => {
      const [row, col] = key.split('-').map(Number);
      return parseFloat(data[row][col]) || 0;
    });

    if (!values.length) return;

    let calcResult;
    switch (operation) {
      case 'add':
        calcResult = values.reduce((acc, value) => acc + value, 0);
        break;
      case 'subtract':
        calcResult = values.reduce((acc, value) => acc - value);
        break;
      case 'multiply':
        calcResult = values.reduce((acc, value) => acc * value);
        break;
      default:
        console.log('Operation not supported');
        return;
    }

    setResult(calcResult); 
  };


  const resetGrid = () => {
    setData(createInitialGrid());
    setSelectedCells(new Set());
    setResult(''); 
  };

  
  const addRow = () => {
    setData([...data, Array(10).fill('')]); 
  };

  return (
    <div><br/>
      <div className="operations">
        <button onClick={() => performOperation('add')}>Add</button>
        <button onClick={() => performOperation('subtract')}>Subtract</button>
        <button onClick={() => performOperation('multiply')}>Multiply</button>
        <button onClick={resetGrid}>Reset</button>
        <button onClick={addRow}>Add Row</button> {/* Button to add a new row */}
      </div>
      <table className="grid-table">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} 
                    className={selectedCells.has(`${rowIndex}-${colIndex}`) ? 'selected' : ''} 
                    onClick={() => toggleCellSelection(rowIndex, colIndex)}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
     
    <div className='result' ><br/>
    <b>  {result}</b> <br/>
    </div>
    </div>
  );
}

export default Grid;
